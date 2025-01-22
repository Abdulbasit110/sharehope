import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const donorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP Code'),
});

type DonorForm = z.infer<typeof donorSchema>;

function DonorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorForm>({
    resolver: zodResolver(donorSchema),
  });

  const onSubmit = (data: DonorForm) => {
    console.log('Donor Data:', data);
    // Handle form submission (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            Become a Donor
          </h1>
          <p className="text-gray-700 text-lg mt-2">
            Join us in making a difference and help us create a positive impact.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register('phone')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              {...register('address')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your address"
              rows={3}
            ></textarea>
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* City, State, and ZIP Code Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                {...register('city')}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="City"
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                {...register('state')}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="State"
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                {...register('zipCode')}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="ZIP Code"
              />
              {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonorRegistration;
