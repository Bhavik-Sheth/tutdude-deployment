
import React from 'react';
import type { Order, Product, CartItem } from '../types';

interface OrderConfirmationScreenProps {
  order: Order;
  products: Product[];
  onGoHome: () => void;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({ order, products, onGoHome }) => {
  const findProduct = (productId: string) => products.find(p => p.id === productId);

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full text-center">
        <div className="w-16 h-16 bg-fresh-green-light rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-fresh-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed!</h2>

        <div className="bg-fresh-gray-light p-6 rounded-xl my-6">
          <p className="text-gray-600 text-lg">Your Pickup ID</p>
          <p className="text-5xl font-extrabold text-fresh-green-dark tracking-widest my-2">{order.id}</p>
          <p className="text-gray-500">Show this ID at the counter</p>
        </div>

        <div className="text-left border-t border-b border-gray-200 py-4 my-6">
          <h4 className="font-bold text-lg mb-2">Order Summary</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {order.items.map(item => {
              const product = findProduct(item.productId);
              return product ? (
                <div key={item.productId} className="flex justify-between text-gray-700">
                  <span>{product.name}</span>
                  <span>{item.quantity} {product.unit}</span>
                </div>
              ) : null;
            })}
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
            <span>Total Amount</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-left bg-fresh-gray p-4 rounded-xl">
            <p><span className="font-semibold">Pickup Slot:</span> {order.pickupTime}</p>
            <p><span className="font-semibold">Location:</span> {order.store.name}</p>
        </div>

        <button
          onClick={onGoHome}
          className="w-full bg-fresh-green-dark text-white font-bold py-4 px-6 rounded-xl text-xl mt-8 transition-colors hover:bg-green-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
