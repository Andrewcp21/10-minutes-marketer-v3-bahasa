'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';

const Timer: React.FC = () => {
  const { state, updateState } = useAppContext();
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes
  const [clientSide, setClientSide] = useState(false);

  // ✅ Ensure this runs only on client
  useEffect(() => {
    setClientSide(true);
  }, []);

  useEffect(() => {
    if (!clientSide || !state.timerStart) return;

    const calculateTimes = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - state.timerStart!) / 1000);
      const remaining = Math.max(600 - elapsed, 0);
      return { remaining, elapsed };
    };

    const { remaining, elapsed } = calculateTimes();
    setTimeLeft(remaining);

    if (state.elapsedTime !== elapsed) {
      updateState({ elapsedTime: elapsed });
    }

    const interval = setInterval(() => {
      const { remaining, elapsed } = calculateTimes();
      setTimeLeft(remaining);

      if (state.elapsedTime !== elapsed) {
        updateState({ elapsedTime: elapsed });
      }

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clientSide, state.timerStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!clientSide) return null;

  return (
    <div className="fixed top-4 right-4 bg-white shadow-md rounded-lg p-2 text-center">
      <div className="text-sm font-semibold text-gray-600">Sisa Waktu</div>
      <div className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-blue-600'}`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Timer;
