import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TrustMed</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link to="/balance" className="text-gray-600 hover:text-blue-600">Balance</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
                <div className="relative group">
                  <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-600">
                    <User className="w-5 h-5 mr-1" />
                    Profile
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
                <Link to="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Dashboard</Link>
                  <Link to="/balance" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Balance</Link>
                  <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About Us</Link>
                  <Link to="/profile" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About Us</Link>
                  <Link to="/login" className="block px-3 py-2 text-blue-600 hover:text-blue-700">Login</Link>
                  <Link to="/signup" className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Sign Up
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