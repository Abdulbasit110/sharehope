import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const ngoSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'Address must be at least 10 characters long'),
  password: z.string().min(6, 'password must be at least 6 characters long'),
  phone: z.string().regex(/^\d{10,15}$/, 'Phone number should contain 10 to 15 digits'),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
  location: z.object({
    latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
  }),
  website: z.string().url('Please enter a valid website URL').optional(),
  establishedYear: z.number().min(1800, 'Establishment year should be after 1800').max(new Date().getFullYear(), 'Establishment year cannot be in the future'),
});

type NgoForm = z.infer<typeof ngoSchema>;

function NgoRegistration() {

    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NgoForm>({
    resolver: zodResolver(ngoSchema),
  });

  const onSubmit = async (data: NgoForm) => {
    try {
      console.log('NGO Registration Data:', data);
      const res = await axiosInstance.post("/ngo/register", data);
      console.log('NGO Registration Response:', res.data);
      navigate("/ngologin")
      // Handle form submission (e.g., send to API)
    } catch (error) {
      console.error('NGO Registration Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 ">
      {/* Heading */}
      <div className="text-center mb-7 mt-11">
        <h1 className="text-4xl font-extrabold text-green-600">
          Register Your NGO
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mt-2">
          Join our platform to connect with donors and create a bigger impact in your community.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              NGO Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter NGO name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register('description')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Your description"
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              {...register('address')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter address"
              rows={3}
            ></textarea>
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register('phone')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                {...register('location.latitude', { valueAsNumber: true })}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Latitude"
              />
              {errors.location?.latitude && (
                <p className="text-red-600 text-sm mt-1">{errors.location.latitude.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                {...register('location.longitude', { valueAsNumber: true })}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Longitude"
              />
              {errors.location?.longitude && (
                <p className="text-red-600 text-sm mt-1">{errors.location.longitude.message}</p>
              )}
            </div>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              id="website"
              {...register('website')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Website URL"
            />
            {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>}
          </div>

          {/* Established Year */}
          <div>
            <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700">
              Established Year
            </label>
            <input
              type="number"
              id="establishedYear"
              {...register('establishedYear', { valueAsNumber: true })}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Year"
            />
            {errors.establishedYear && (
              <p className="text-red-600 text-sm mt-1">{errors.establishedYear.message}</p>
            )}
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

export default NgoRegistration;
