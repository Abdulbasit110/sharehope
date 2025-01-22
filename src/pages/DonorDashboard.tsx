import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, Gift, Award } from 'lucide-react';

function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-green-600 text-white py-8 px-4 text-center mt-12 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-lg mt-2">
          Track your contributions, rewards, and impact in one place.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Heart className="w-8 h-8 text-green-600" />,
              value: '25',
              label: 'Donations Made',
            },
            {
              icon: <Package className="w-8 h-8 text-green-600" />,
              value: '50+',
              label: 'Items Donated',
            },
            {
              icon: <Gift className="w-8 h-8 text-green-600" />,
              value: '5',
              label: 'Rewards Earned',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
            >
              <div className="bg-green-100 p-3 rounded-full">{stat.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Activity Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Donations
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {[
              {
                id: '1',
                ngo: 'Green Earth Foundation',
                items: 'Clothes, Shoes',
                date: 'Jan 15, 2025',
              },
              {
                id: '2',
                ngo: 'Helping Hands',
                items: 'Books, Stationery',
                date: 'Jan 10, 2025',
              },
              {
                id: '3',
                ngo: 'Care for All',
                items: 'Toys, Kitchenware',
                date: 'Jan 5, 2025',
              },
            ].map((donation) => (
              <div
                key={donation.id}
                className="flex justify-between items-center p-4 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Donated to: {donation.ngo}
                  </h3>
                  <p className="text-gray-600">Items: {donation.items}</p>
                </div>
                <p className="text-gray-500">{donation.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Make a Donation',
                description: 'Start donating items to registered NGOs.',
                link: '/donations',
                icon: <Heart className="w-6 h-6 text-white" />,
                bgColor: 'bg-green-600',
              },
              {
                title: 'View Rewards',
                description: 'Check and redeem your earned rewards.',
                link: '/vouchers',
                icon: <Gift className="w-6 h-6 text-white" />,
                bgColor: 'bg-blue-600',
              },
              {
                title: 'Track Donations',
                description: 'View your donation history and status.',
                link: '/donation-history',
                icon: <Package className="w-6 h-6 text-white" />,
                bgColor: 'bg-yellow-600',
              },
              {
                title: 'Profile Settings',
                description: 'Update your account and preferences.',
                link: '/profile',
                icon: <Award className="w-6 h-6 text-white" />,
                bgColor: 'bg-purple-600',
              },
            ].map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`flex items-center space-x-4 p-4 rounded-lg shadow-md ${action.bgColor} text-white hover:shadow-lg transition duration-300`}
              >
                <div className="p-3 rounded-full bg-white bg-opacity-20">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{action.title}</h3>
                  <p className="text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DonorDashboard;
