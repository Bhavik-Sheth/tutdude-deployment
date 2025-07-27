
import React from 'react';
import { StockItem } from '../types';

interface AddStockScreenProps {
  stock: StockItem[];
  onUpdateStock: (itemId: string, newCount: number) => void;
  onBack: () => void;
}

const AddStockScreen: React.FC<AddStockScreenProps> = ({ stock, onUpdateStock, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-green-800">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-6 text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Manage Stock</h1>
      </div>
      <p className="text-sm text-gray-400 mb-6">Adjust stock levels for each item. Changes are saved automatically.</p>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {stock.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
            <span className="font-medium text-lg text-gray-200">{item.name}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onUpdateStock(item.id, item.count - 1)}
                className="w-10 h-10 rounded-full bg-gray-600 text-gray-200 text-2xl hover:bg-red-500 transition-colors"
              >
                -
              </button>
              <span className="w-16 text-center font-semibold text-2xl text-white">{item.count}</span>
              <button
                onClick={() => onUpdateStock(item.id, item.count + 1)}
                className="w-10 h-10 rounded-full bg-gray-600 text-gray-200 text-2xl hover:bg-green-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-8 border-t border-gray-700 pt-6">
          <button
            onClick={onBack}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-800 focus:ring-green-500 transition-colors"
          >
            Done
          </button>
      </div>
    </div>
  );
};

export default AddStockScreen;