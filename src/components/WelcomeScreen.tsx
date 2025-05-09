'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

const WelcomeScreen: React.FC = () => {
  const { updateState } = useAppContext();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!name.trim()) {
      setError('Silakan masukkan nama Anda untuk melanjutkan');
      return;
    }
    
    updateState({ 
      userName: name,
      currentStep: 2
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">10 Minutes Marketer</h1>
        <p className="text-gray-600 mb-8">
          Rasakan pengalaman sebagai Social Media Marketer! Buat postingan Instagram untuk klien dalam waktu kurang dari 10 menit.
        </p>
        
        <div className="mb-6">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
            Siapa nama Anda?
          </label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama Anda"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
        >
          Mulai
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
