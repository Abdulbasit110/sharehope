import { Link } from 'react-router-dom';
import { Recycle, Heart, Award, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Give Your Clothes a Second Life
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our mission to reduce textile waste and help those in need. Donate your unused clothes
          and earn rewards while making a positive impact on the environment.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-green-700"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-50"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Easy Donation Process</h3>
          <p className="text-gray-600">
            Schedule pickups or drop-offs with nearby NGOs in just a few clicks.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Earn Rewards</h3>
          <p className="text-gray-600">
            Get exclusive vouchers from top clothing brands for your contributions.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Eco-Friendly Disposal</h3>
          <p className="text-gray-600">
            Ensure your non-donatable clothes are disposed of responsibly.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-green-50 py-12 rounded-lg">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-green-600">10K+</div>
            <div className="text-gray-600">Items Donated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">50+</div>
            <div className="text-gray-600">Partner NGOs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">5K+</div>
            <div className="text-gray-600">Happy Donors</div>
          </div>
        </div>
      </section>
    </div>
  );
}