
import React, { useState, useMemo } from 'react';
import { Order } from '../types';

interface CompleteOrderScreenProps {
  orders: Order[];
  onCompleteOrder: (orderId: string) => void;
  onBack: () => void;
}

const CompleteOrderScreen: React.FC<CompleteOrderScreenProps> = ({ orders, onCompleteOrder, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pendingOrders = useMemo(() => {
    return orders
      .filter(order => order.status === 'pending')
      .filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [orders, searchTerm]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="mr-6 text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Complete Orders</h1>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {pendingOrders.length > 0 ? (
          pendingOrders.map(order => (
            <div key={order.id} className="bg-gray-800 p-5 rounded-lg shadow-lg border border-green-900/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-green-400 truncate">{order.id}</h3>
                <p className="text-sm text-gray-400 mb-3">Booked at: {order.bookingTime}</p>
                <ul className="text-sm list-disc list-inside text-gray-300 space-y-1">
                  {order.items.map(item => (
                    <li key={item.itemId}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onCompleteOrder(order.id)}
                className="bg-green-600 text-white text-sm w-full mt-4 font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Completed
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 md:col-span-2 xl:col-span-3 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-400">No Pending Orders</h3>
            <p className="text-gray-500 mt-2">{searchTerm ? 'No orders match your search.' : 'All orders are completed!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteOrderScreen;