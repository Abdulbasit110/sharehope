import { useNavigate } from 'react-router-dom';

import donor from '../assets/images/clothing-donor.jpg';
import ngo from '../assets/images/clothing-ngo.jpg';

export default function UserTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-blue-50 to-green-50">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl p-8 md:p-12">
        {/* Enhanced Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Start Your Journey
          </span>
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Choose how you would like to register and make a difference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donor Section */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition duration-300"
            onClick={() => navigate('/register/donor')}
          >
            <img
              src={donor}
              alt="Donor"
              className="w-40 h-40 mb-4 object-cover rounded-full shadow-sm"
            />
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Become a Donor
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Join us as a donor and help bring hope to those in need through your contributions.
            </p>
          </div>

          {/* NGO Section */}
          <div
            className="flex flex-col items-center justify-center p-6 bg-blue-100 hover:bg-blue-200 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition duration-300"
            onClick={() => navigate('/register/ngo')}
          >
            <img
              src={ngo}
              alt="NGO"
              className="w-40 h-40 mb-4 object-cover rounded-full shadow-sm"
            />
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              Join as an NGO
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Sign up as an NGO to receive donations and create lasting impacts in your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
