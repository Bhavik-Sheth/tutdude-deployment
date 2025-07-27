
import React from 'react';
import type { Order } from '../types';

interface SplashScreenProps {
  onStart: () => void;
  onViewOrders: () => void;
  recentOrder: Order | null;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onViewOrders, recentOrder }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fresh-gray-light p-8 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        {recentOrder && (
          <div className="mb-8 p-6 bg-fresh-green-light border-2 border-dashed border-fresh-green-dark rounded-2xl text-left animate-fade-in-down">
            <h3 className="text-xl font-bold text-fresh-green-dark mb-2">Your Order is Confirmed!</h3>
            <p className="text-gray-700"><span className="font-semibold">Pickup ID:</span> <span className="font-bold text-xl">{recentOrder.id}</span></p>
            <p className="text-gray-700"><span className="font-semibold">Store:</span> {recentOrder.store.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Pickup Slot:</span> {recentOrder.pickupTime}</p>
          </div>
        )}

        <h1 className="text-5xl font-bold text-fresh-green-dark">FreshStock</h1>
        <p className="text-lg text-fresh-gray-dark mt-2 mb-8">
          Fresh Ingredients, Easy Orders / ताज़ा सामग्री, आसान ऑर्डर
        </p>
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="w-full bg-fresh-green hover:bg-fresh-green-dark text-white font-bold py-4 px-6 rounded-xl text-xl transition-transform transform hover:scale-105"
          >
            Start New Order
          </button>
          <button
            onClick={onViewOrders}
            className="w-full bg-fresh-gray hover:bg-gray-300 text-fresh-gray-dark font-bold py-4 px-6 rounded-xl text-xl transition-transform transform hover:scale-105"
          >
            My Past Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
