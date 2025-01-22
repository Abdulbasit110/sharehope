import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Building2, Phone, Mail, MapPin, Edit, Trash } from 'lucide-react';
import type { NGO } from '@/types';

const ngoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type NGOForm = z.infer<typeof ngoSchema>;

const ngoData = [
  {
    id: "ngo-1",
    name: "Green Earth Foundation",
    email: "contact@greenearth.org",
    phone: "+1234567890",
    address: "123 Green Street, EcoCity, Planet Earth",
    description: "An NGO dedicated to promoting environmental sustainability and reducing textile waste.",
    latitude: 40.7128,
    longitude: -74.0060,
    createdAt: "2025-01-15T10:30:00Z",
  }]

export default function NGOs() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingNGO, setEditingNGO] = useState<NGO | null>(null);
  const queryClient = useQueryClient();

  const { data: ngos } = useQuery({
    queryKey: ['ngos'],
    queryFn: async () => {
      const { data } = await axios.get<NGO[]>('/api/ngos');
      return data;
    },
  });

  const createNGO = useMutation({
    mutationFn: async (data: NGOForm) => {
      const { data: response } = await axios.post('/api/ngos', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
      setIsCreating(false);
    },
  });

  const updateNGO = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: NGOForm }) => {
      const { data: response } = await axios.patch(`/api/ngos/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
      setEditingNGO(null);
    },
  });

  const deleteNGO = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/ngos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngos'] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NGOForm>({
    resolver: zodResolver(ngoSchema),
    defaultValues: editingNGO || undefined,
  });

  return (
    <div className="space-y-8 mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">NGO Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add NGO
        </button>
      </div>

      {/* NGO List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ngoData?.map((ngo) => (
          <div
            key={ngo.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{ngo.name}</h3>
                <p className="text-gray-500">{ngo.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingNGO(ngo)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this NGO?')) {
                      deleteNGO.mutate(ngo.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{ngo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{ngo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{ngo.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit NGO Modal */}
      {(isCreating || editingNGO) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingNGO ? 'Edit NGO' : 'Add NGO'}
            </h2>
            <form
              onSubmit={handleSubmit((data) =>
                editingNGO
                  ? updateNGO.mutate({ id: editingNGO.id, data })
                  : createNGO.mutate(data)
              )}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )} 

                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingNGO(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createNGO.isPending || updateNGO.isPending}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {createNGO.isPending || updateNGO.isPending
                    ? 'Saving...'
                    : editingNGO
                    ? 'Update NGO'
                    : 'Add NGO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
