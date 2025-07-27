
import React from 'react';
import type { Order, Product } from '../types';

interface PastOrdersScreenProps {
  orders: Order[];
  products: Product[];
  onReorder: (order: Order) => void;
  onBack: () => void;
}

const PastOrdersScreen: React.FC<PastOrdersScreenProps> = ({ orders, products, onReorder, onBack }) => {
  const getItemSummary = (order: Order): string => {
    return order.items
      .map(item => products.find(p => p.id === item.productId)?.name)
      .filter(Boolean)
      .slice(0, 3)
      .join(', ') + (order.items.length > 3 ? '...' : '');
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto min-h-screen">
      <button onClick={onBack} className="mb-4 text-fresh-green-dark font-semibold">&larr; Back to Home</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Past Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-2xl shadow-md">
          <p className="text-gray-500 text-lg">You have no past orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <p className="mt-2 text-gray-700">Items: {getItemSummary(order)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">₹{order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => onReorder(order)}
                  className="bg-fresh-green-light text-fresh-green-dark font-semibold py-2 px-6 rounded-xl hover:bg-green-200 transition-colors"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastOrdersScreen;
