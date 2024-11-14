import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ sortBy, setSortBy }) {
  const location = useLocation();

  return (
    <header className="bg-orange-500 text-white p-4 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">News</Link>
        <nav className="flex items-center space-x-4">
          {location.pathname === '/' && (
            <div className="flex space-x-2">
              <button 
                onClick={() => setSortBy('new')} 
                className={`px-3 py-1 rounded ${sortBy === 'new' ? 'bg-white text-orange-500' : 'bg-orange-600 hover:bg-orange-700'}`}
              >
                New
              </button>
              <button 
                onClick={() => setSortBy('old')} 
                className={`px-3 py-1 rounded ${sortBy === 'old' ? 'bg-white text-orange-500' : 'bg-orange-600 hover:bg-orange-700'}`}
              >
                Old
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}