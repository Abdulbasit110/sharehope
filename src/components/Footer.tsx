import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-500">ShareHope</h2>
            <p className="text-gray-400">
              Transforming lives and saving the planet, one wardrobe at a time. Join us in making a
              difference!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/donations" className="text-gray-400 hover:text-white">
                  Donations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400">123 hope Street, GreenCity, Planet Earth</p>
            <p className="text-gray-400">Email: contact@sharehope.com</p>
            <p className="text-gray-400">Phone: +123-456-7890</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition duration-300" />
            </a>
          </div>

          {/* CopyRight */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ShareHope. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
