import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Building, Edit, Trash, Tag } from 'lucide-react';
import type { Brand } from '@/types';

const brandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.string().url('Must be a valid URL'),
  description: z.string().optional(),
});

type BrandForm = z.infer<typeof brandSchema>;

export default function Brands() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const queryClient = useQueryClient();

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await axios.get<Brand[]>('/api/brands');
      return data;
    },
  });

  const createBrand = useMutation({
    mutationFn: async (data: BrandForm) => {
      const { data: response } = await axios.post('/api/brands', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setIsCreating(false);
    },
  });

  const updateBrand = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BrandForm }) => {
      const { data: response } = await axios.patch(`/api/brands/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setEditingBrand(null);
    },
  });

  const deleteBrand = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/brands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: editingBrand || undefined,
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brand Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Brand
        </button>
      </div>

      {/* Brand List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands?.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-12 h-12 object-contain rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{brand.name}</h3>
                  <p className="text-gray-500">{brand.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingBrand(brand)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this brand?')) {
                      deleteBrand.mutate(brand.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Brand Modal */}
      {(isCreating || editingBrand) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingBrand ? 'Edit Brand' : 'Add Brand'}
            </h2>
            <form
              onSubmit={handleSubmit((data) =>
                editingBrand
                  ? updateBrand.mutate({ id: editingBrand.id, data })
                  : createBrand.mutate(data)
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Logo URL
                </label>
                <input
                  type="url"
                  {...register('logo')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                {errors.logo && (
                  <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
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
                    setEditingBrand(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBrand.isPending || updateBrand.isPending}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {createBrand.isPending || updateBrand.isPending
                    ? 'Saving...'
                    : editingBrand
                    ? 'Update Brand'
                    : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}