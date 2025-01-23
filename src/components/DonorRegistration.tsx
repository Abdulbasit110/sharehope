// @ts-nocheck
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const donorSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type DonorForm = z.infer<typeof donorSchema>;

function DonorRegistration() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonorForm>({
    resolver: zodResolver(donorSchema),
  });

  const onSubmit = async (data: DonorForm) => {
    try {
      await axiosInstance.post("/users/register", data);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mt-16">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">Become a Donor</h1>
          <p className="text-gray-700 text-lg mt-2">
            Join us in making a difference and help us create a positive impact.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-500"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
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
              {...register("email")}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
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
              {...register("password")}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-500"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-500"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonorRegistration;
