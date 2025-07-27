
import React from 'react';
import type { Store } from '../types';

interface SelectStoreScreenProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
  onBack: () => void;
}

const SelectStoreScreen: React.FC<SelectStoreScreenProps> = ({ stores, onSelectStore, onBack }) => {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto min-h-screen">
       <button onClick={onBack} className="mb-4 text-fresh-green-dark font-semibold">&larr; Back to Home</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select a Store</h2>
      <div className="space-y-4">
        {stores.map(store => (
          <div
            key={store.id}
            onClick={() => store.isOpen && onSelectStore(store)}
            className={`bg-white p-6 rounded-2xl shadow-md transition-all duration-300 ${store.isOpen ? 'cursor-pointer hover:shadow-lg hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
                <p className="text-fresh-gray-dark">{store.area}</p>
                <p className="text-sm text-gray-500 mt-1">{store.hours}</p>
              </div>
              <div className="text-right">
                {store.isOpen ? (
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-fresh-green"></span>
                    </span>
                    <span className="text-fresh-green font-semibold">Open Now</span>
                  </div>
                ) : (
                  <span className="text-red-500 font-semibold">Closed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStoreScreen;
