
import React from 'react';
import { Page } from '../types';

interface HomeScreenProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const HomeButton: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full text-center p-8 bg-gray-800 border border-green-800 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-900/50 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex flex-col items-center justify-center h-48"
    >
        <span className="text-2xl font-semibold text-gray-100">{children}</span>
    </button>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-100">Dashboard</h1>
            <button onClick={onLogout} className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">Logout</button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <HomeButton onClick={() => onNavigate(Page.BookOrder)}>Book Order For a Customer</HomeButton>
        <HomeButton onClick={() => onNavigate(Page.CompleteOrder)}>Complete Order</HomeButton>
        <HomeButton onClick={() => onNavigate(Page.AddStock)}>Add Stock</HomeButton>
      </div>
    </div>
  );
};

export default HomeScreen;