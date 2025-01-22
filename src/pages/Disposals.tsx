import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Trash2, Calendar, MapPin } from 'lucide-react';
import type { Disposal } from '@/types';

const disposalSchema = z.object({
  items: z.array(z.object({
    type: z.string().min(1, 'Type is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    reason: z.string().min(1, 'Reason is required'),
  })).min(1, 'At least one item is required'),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupAddress: z.string().min(1, 'Pickup address is required'),
});

type DisposalForm = z.infer<typeof disposalSchema>;

const disposalData = [
  {
    id: "disposal-1", // Unique identifier for disposal
    items: [
      {
        type: "Plastic Bottles",
        quantity: 20,
        reason: "Broken and no longer usable"
      },
      {
        type: "Old Electronics",
        quantity: 5,
        reason: "Damaged and cannot be repaired"
      }
    ],
    pickupDate: "2025-01-25",
    pickupAddress: "123 Recycling Avenue, EcoCity, Planet Earth",
    createdAt: "2025-01-20T10:30:00Z",
    status: "pending" // Example statuses: 'pending', 'picked_up', 'completed'
  }]

export default function Disposals() {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const { data: disposals } = useQuery({
    queryKey: ['disposals'],
    queryFn: async () => {
      const { data } = await axios.get<Disposal[]>('/api/disposals/my-disposals');
      return data;
    },
  });

  const createDisposal = useMutation({
    mutationFn: async (data: DisposalForm) => {
      const { data: response } = await axios.post('/api/disposals', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disposals'] });
      setIsCreating(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DisposalForm>({
    resolver: zodResolver(disposalSchema),
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Disposals</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create Disposal Request
        </button>
      </div>

      {/* Disposal List */}
      <div className="grid gap-6">
        {disposalData?.map((disposal) => (
          <div
            key={disposal.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  Disposal Request
                </h3>
                <p className="text-gray-500">
                  Created on {format(new Date(disposal.createdAt), 'PPP')}
                </p>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${disposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  disposal.status === 'picked_up' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'}
              `}>
                {disposal.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Trash2 className="h-5 w-5" />
                <span>{disposal.items.length} items</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{format(new Date(disposal.pickupDate), 'PPP')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 md:col-span-2">
                <MapPin className="h-5 w-5" />
                <span>{disposal.pickupAddress}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <ul className="space-y-2">
                {disposal.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.type}</span>
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Create Disposal Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Disposal Request</h2>
            <form onSubmit={handleSubmit((data) => createDisposal.mutate(data))} className="space-y-4">
              {/* Add form fields for items, pickup date, and address */}

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
                  disabled={createDisposal.isPending}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {createDisposal.isPending ? 'Creating...' : 'Create Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}