
import React, { useState } from 'react';

interface PickupTimeScreenProps {
  onConfirm: (timeSlot: string) => void;
  onBack: () => void;
}

const timeSlots = [
  { time: '8 AM – 10 AM', available: true },
  { time: '10 AM – 12 PM', available: true },
  { time: '12 PM - 2 PM', available: true },
  { time: '2 PM – 4 PM', available: false },
  { time: '4 PM – 6 PM', available: true },
  { time: '6 PM – 8 PM', available: true },
];

const PickupTimeScreen: React.FC<PickupTimeScreenProps> = ({ onConfirm, onBack }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-md mx-auto min-h-screen flex flex-col">
       <button onClick={onBack} className="mb-4 text-fresh-green-dark font-semibold self-start">&larr; Back to Order</button>
      <div className="bg-white p-8 rounded-2xl shadow-lg flex-grow flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Pickup Time</h2>
        <p className="text-center text-gray-500 mb-8">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>

        <div className="space-y-4 flex-grow">
          {timeSlots.map(({ time, available }) => (
            <button
              key={time}
              onClick={() => available && setSelectedSlot(time)}
              disabled={!available}
              className={`w-full text-left p-4 rounded-xl text-lg font-semibold transition-all duration-200
                ${!available ? 'bg-fresh-gray text-gray-400 cursor-not-allowed line-through' : ''}
                ${available && selectedSlot === time ? 'bg-fresh-green text-white ring-4 ring-fresh-green-light' : ''}
                ${available && selectedSlot !== time ? 'bg-fresh-gray-light text-gray-700 hover:bg-green-200' : ''}
              `}
            >
              {time}
            </button>
          ))}
        </div>

        <button
          onClick={() => selectedSlot && onConfirm(selectedSlot)}
          disabled={!selectedSlot}
          className="w-full bg-fresh-green-dark text-white font-bold py-4 px-6 rounded-xl text-xl mt-8 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-800"
        >
          Confirm Slot
        </button>
      </div>
    </div>
  );
};

export default PickupTimeScreen;
