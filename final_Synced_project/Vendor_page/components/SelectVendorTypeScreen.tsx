
import React from 'react';
import type { VendorType } from '../types';

interface SelectVendorTypeScreenProps {
  vendorTypes: VendorType[];
  onSelectVendorType: (vendorType: VendorType) => void;
  onBack: () => void;
}

const SelectVendorTypeScreen: React.FC<SelectVendorTypeScreenProps> = ({ vendorTypes, onSelectVendorType, onBack }) => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <button onClick={onBack} className="mb-4 text-fresh-green-dark font-semibold">&larr; Back to Store Selection</button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What do you sell?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {vendorTypes.map(type => (
          <div
            key={type.id}
            onClick={() => onSelectVendorType(type)}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            {type.icon}
            <p className="mt-4 text-lg font-semibold text-gray-700 text-center">{type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectVendorTypeScreen;
