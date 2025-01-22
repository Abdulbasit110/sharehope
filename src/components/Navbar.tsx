import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Recycle, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user,logout } = useAuthStore();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-700">ShareHope</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* User Navigation */}
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

                {/* Admin Navigation */}
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

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
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
                  to="/registration"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
            <div className="flex flex-col space-y-4 p-4">
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
                    <LogOut className="h-5 w-5" />
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
                    to="/registration"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
