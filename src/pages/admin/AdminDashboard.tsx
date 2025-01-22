import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Package, Gift, ClipboardCheck } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-green-600 text-white py-8 px-4 text-center mt-12 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-lg mt-2">
          Manage the platform effectively with all key tools and insights.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Overview Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Users className="w-8 h-8 text-green-600" />, label: 'Total Users', value: '1,250' },
            { icon: <Building2 className="w-8 h-8 text-green-600" />, label: 'Total NGOs', value: '75' },
            { icon: <Package className="w-8 h-8 text-green-600" />, label: 'Total Donations', value: '5,000+' },
            { icon: <Gift className="w-8 h-8 text-green-600" />, label: 'Total Rewards', value: '2,300' },
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

        {/* Quick Links Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Manage Users',
                description: 'View, add, and update user accounts.',
                link: '/admin/users',
                icon: <Users className="w-6 h-6 text-white" />,
                bgColor: 'bg-blue-600',
              },
              {
                title: 'Manage NGOs',
                description: 'Review and update registered NGOs.',
                link: '/admin/ngos',
                icon: <Building2 className="w-6 h-6 text-white" />,
                bgColor: 'bg-green-600',
              },
              {
                title: 'Manage Brands',
                description: 'Update brand partnerships and offers.',
                link: '/admin/brands',
                icon: <Gift className="w-6 h-6 text-white" />,
                bgColor: 'bg-yellow-600',
              },
              {
                title: 'View Donations',
                description: 'Track donations made on the platform.',
                link: '/admin/donations',
                icon: <Package className="w-6 h-6 text-white" />,
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

        {/* Recent Activity Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {[
              { id: '1', action: 'User John Doe registered.', date: 'Jan 20, 2025' },
              { id: '2', action: 'Green Earth Foundation added.', date: 'Jan 18, 2025' },
              { id: '3', action: 'Donation of 50 items processed.', date: 'Jan 15, 2025' },
              { id: '4', action: 'Reward voucher claimed by Jane Smith.', date: 'Jan 12, 2025' },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center p-4 border-b last:border-b-0"
              >
                <p className="text-gray-800">{activity.action}</p>
                <p className="text-gray-500 text-sm">{activity.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
