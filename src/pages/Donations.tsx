import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Package, Calendar, MapPin, AlertCircle } from 'lucide-react';
import type { Donation, NGO } from '@/types';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const donationSchema = z.object({
  ngoId: z.string().min(1, 'Please select an NGO'),
  items: z.array(z.object({
    type: z.string().min(1, 'Type is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    condition: z.enum(['new', 'good', 'fair']),
    description: z.string().optional(),
  })).min(1, 'At least one item is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupAddress: z.string().min(1, 'Pickup address is required'),
});

type DonationForm = z.infer<typeof donationSchema>;

const donationData = [{
  ngoId: "12345", // Sample NGO ID
  items: [
    {
      type: "Clothes",
      quantity: 5,
      condition: "good",
      description: "Gently used shirts and pants."
    },
    {
      type: "Shoes",
      quantity: 2,
      condition: "new",
      description: "Brand-new shoes in original packaging."
    },
    {
      type: "Books",
      quantity: 10,
      condition: "fair",
      description: "Used textbooks with some wear."
    }
  ],
  pickupDate: "2022-03-25",
  pickupAddress: "123 Green Street, EcoCity, Planet Earth",
  createdAt : "Wed Jan 22 2025 13:55:39 GMT+0500 (Pakistan Standard Time)",
  status : "test"
}];

const ngosData = [
  {
    "ngoId" :123,
    "name": "Green Earth Foundation",
    "email": "info@greenearth.org",
    "password": "password123",
    "address": "123 Green Street, EcoCity, Planet Earth",
    "phone": "1234567890",
    "description": "An NGO dedicated to promoting environmental sustainability.",
    "location": { "latitude": 40.7128, "longitude": -74.006 },
    "status": "active",
    "website": "https://greenearth.org",
    "establishedYear": 2005,
    "createdAt": "2023-01-01T10:00:00.000Z"
  }]

export default function Donations() {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: donations } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/ngo/getall', data);
      console.log(data)
      return data;
    },
  });

  const { data: ngos } = useQuery({
    queryKey: ['ngos'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/ngo/getall', data);
      console.log(data)
      return data;
    },
  });

  const createDonation = useMutation({
    mutationFn: async (data: DonationForm) => {
      console.log(data)
      const { data: response } = await axiosInstance.post('/donations/create-donation', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      setIsCreating(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
  });

  return (
    <div className="space-y-8 mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">My Donations</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create Donation
        </button>
      </div>

      {/* Donation List */}
      <div className="grid gap-6">
        {donationData?.map((donation , index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  Donation to {donation.ngoId.name}
                </h3>
                <p className="text-gray-500">
                  Created on {format(new Date(donation.createdAt), 'PPP')}
                </p>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  donation.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                  donation.status === 'picked_up' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'}
              `}>
                {donation.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Package className="h-5 w-5" />
                <span>{donation.items.length} items</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{format(new Date(donation.pickupDate), 'PPP')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 md:col-span-2">
                <MapPin className="h-5 w-5" />
                <span>{donation.pickupAddress}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <ul className="space-y-2">
                {donation.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.type} ({item.condition})</span>
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Create Donation Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Donation</h2>
           <form onSubmit={handleSubmit((data) => {
            setTimeout(() => {
              navigate("/dashboard")
            }, 2000);
            createDonation.mutate(data)}
            )} className="space-y-4">
      {/* Select NGO */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Select NGO</label>
    <select
      {...register('ngoId')}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
    >
      <option value="">Select an NGO</option>
      {ngosData?.map((ngo) => (
        <option key={ngo.id} value={ngo.id}>
          {ngo.name}
        </option>
      ))}
    </select>
    {errors.ngoId && <p className="mt-1 text-sm text-red-600">{errors.ngoId.message}</p>}
  </div>

  {/* Pickup Date */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
    <input
      type="date"
      {...register('pickupDate')}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
    />
    {errors.pickupDate && <p className="mt-1 text-sm text-red-600">{errors.pickupDate.message}</p>}
  </div>

  {/* Pickup Address */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
    <input
      type="text"
      {...register('pickupAddress')}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      placeholder="Enter the pickup address"
    />
    {errors.pickupAddress && <p className="mt-1 text-sm text-red-600">{errors.pickupAddress.message}</p>}
  </div>

  {/* Items */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Donation Item</label>
    <div className="space-y-2 ">
      {/* {fields.map((field, index) => ( */}
        <div className="flex items-center space-x-4">
          {/* Item Type */}
          <input
            type="text"
            // {...register(`items.${index}.type`)}
            placeholder="Item Type"
            className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {/* Quantity */}
          <input
            type="number"
            // {...register(`items.${index}.quantity`)}
            placeholder="Quantity"
            className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {/* Condition */}
          <select
            // {...register(`items.${index}.condition`)}
            className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
          {/* <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button> */}
        </div>
      {/* ))} */}
      {/* <button
        type="button"
        onClick={() => append({ type: '', quantity: 1, condition: 'new', description: '' })}
        className="text-green-600 hover:text-green-800"
      >
        + Add Item
      </button> */}
    </div>
  </div>

  {/* Form Actions */}
  <div className="flex justify-end space-x-4">
    <button
      type="button"
      onClick={() => setIsCreating(false)}
      className="px-4 py-2 text-gray-700 hover:text-gray-900"
    >
      Cancel
    </button>
    <button
      type="submit"
      onClick = {
        ()=> {
        setTimeout(() => {
              navigate("/dashboard")
            }, 2000);}}
      disabled={createDonation.isPending}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
    >
      {createDonation.isPending ? 'Creating...' : 'Create Donation'}
    </button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
}

