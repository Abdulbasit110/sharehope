import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import image from '../assets/images/clothing-donation.jpg';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Login failed');

      const { user, token } = await response.json();
      setAuth(user, token);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-blue-50 to-green-50">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white max-w-4xl w-full">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={image}
            alt="Cloth donation illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900 bg-opacity-20" />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            Welcome Back to <span className="text-green-600">Your Dashboard!</span>
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            Log in to continue contributing to meaningful causes and making a difference!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 rounded-md text-white font-medium bg-green-600 hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-transform duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Footer Section */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/registration" className="text-green-700 font-bold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
