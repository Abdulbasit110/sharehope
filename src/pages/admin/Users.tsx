import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { User, Edit, Trash, Mail } from 'lucide-react';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: 'Role must be admin or user' }),
  }),
});

type UserForm = z.infer<typeof userSchema>;

const dummyUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'user' },
];

export default function Users() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<UserForm | null>(null);
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Replace with your API endpoint
      return new Promise((resolve) => {
        setTimeout(() => resolve(dummyUsers), 500); // Simulate delay with dummy data
      });
    },
  });

  const createUser = useMutation({
    mutationFn: async (data: UserForm) => {
      const { data: response } = await axios.post('/api/users', data); // Replace with actual API
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsCreating(false);
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserForm }) => {
      const { data: response } = await axios.patch(`/api/users/${id}`, data); // Replace with actual API
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/users/${id}`); // Replace with actual API
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: editingUser || undefined,
  });

  return (
    <div className="space-y-8 mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-600" />
                  <span>{user.name}</span>
                </h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this user?')) {
                      deleteUser.mutate(user.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{user.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit User Modal */}
      {(isCreating || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Add User'}
            </h2>
            <form
              onSubmit={handleSubmit((data) =>
                editingUser
                  ? updateUser.mutate({ id: editingUser.id, data })
                  : createUser.mutate(data)
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
                  Role
                </label>
                <select
                  {...register('role')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUser.isPending || updateUser.isPending}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {createUser.isPending || updateUser.isPending
                    ? 'Saving...'
                    : editingUser
                    ? 'Update User'
                    : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
