import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-green-600">FreshStock</h1>
        <p className="text-xl text-gray-500 mt-2">Unified Management for Vendors & Outlets</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div
          onClick={() => navigateTo(Page.VENDOR)}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-green-500/20 border border-gray-200 hover:border-green-400 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-2"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-700">For Food Vendor</h2>
          <p className="text-gray-600">Place new orders for fresh ingredients and track your pickup details.</p>
        </div>
        <div
          onClick={() => navigateTo(Page.EMPLOYEE)}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-green-500/20 border border-gray-200 hover:border-green-400 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-2"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-700">For Outlet Employee</h2>
          <p className="text-gray-600">Manage customer orders, update stock levels, and keep the outlet running.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;