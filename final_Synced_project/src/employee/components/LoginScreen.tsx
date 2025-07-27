
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [outletId, setOutletId] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (outletId && passkey) {
      onLogin();
    } else {
      alert('Please enter both Outlet ID and Passkey.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-800">
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">Outlet Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="outletId" className="block text-sm font-medium text-gray-300">
            Enter Outlet ID
          </label>
          <input
            id="outletId"
            type="text"
            value={outletId}
            onChange={(e) => setOutletId(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., OUTLET-123"
          />
        </div>
        <div>
          <label htmlFor="passkey" className="block text-sm font-medium text-gray-300">
            Enter Passkey
          </label>
          <input
            id="passkey"
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;