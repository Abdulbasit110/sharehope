import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Recycle, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">EcoWardrobe</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'user' && (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                      Dashboard
                    </Link>
                    <Link to="/donations" className="text-gray-700 hover:text-gray-900">
                      Donations
                    </Link>
                    <Link to="/disposals" className="text-gray-700 hover:text-gray-900">
                      Disposals
                    </Link>
                    <Link to="/vouchers" className="text-gray-700 hover:text-gray-900">
                      Vouchers
                    </Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="text-gray-700 hover:text-gray-900">
                      Dashboard
                    </Link>
                    <Link to="/admin/ngos" className="text-gray-700 hover:text-gray-900">
                      NGOs
                    </Link>
                    <Link to="/admin/brands" className="text-gray-700 hover:text-gray-900">
                      Brands
                    </Link>
                    <Link to="/admin/users" className="text-gray-700 hover:text-gray-900">
                      Users
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}