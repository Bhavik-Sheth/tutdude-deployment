
import React, { useState } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
        setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Place Order via Call</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        {isSubmitted ? (
            <div className="text-center py-8">
                <p className="text-lg text-fresh-green-dark">Request sent!</p>
                <p className="text-gray-600">We will call you soon to place your order.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" defaultValue="Ramesh Kumar" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-fresh-green focus:border-fresh-green" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" defaultValue="98XXXXXX98" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-fresh-green focus:border-fresh-green" />
                </div>
              </div>
              <button type="submit" className="w-full mt-6 bg-fresh-green-dark text-white font-bold py-3 px-4 rounded-xl hover:bg-green-800 transition-colors">
                Submit Request
              </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default HelpModal;
