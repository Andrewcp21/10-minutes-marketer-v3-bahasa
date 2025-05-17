'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import graduates from '../data/graduates'

const FeedbackScreen: React.FC = () => {
  const { state, resetState } = useAppContext();

  const handlePlayAgain = () => {
    resetState();
  };

  // Removed download and share functionality as requested

  // Calculate time taken in minutes and seconds
  const minutesTaken = Math.floor(state.elapsedTime / 60);
  const secondsTaken = state.elapsedTime % 60;

  // Convert score to star rating (out of 5)
  const starRating = state.score ? Math.round((state.score / 100) * 5) : 0;

  return (
    <div className="min-h-screen bg-white p-4" style={{
    background: 'linear-gradient(135deg, #ECFFF9 6.9%, #FCFFE5 52.75%, #FFEBF9 100%)',
  }}>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Client Feedback</h1>
          <p className="text-gray-600">
            {state.clientName} telah memberikan review terhadap postingan Instagram Anda
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              {state.clientName ? (
                <Image 
                  src={`/clients/${state.clientName.toLowerCase()}.png`} 
                  alt={`${state.clientName} logo`}
                  className="w-full h-full object-cover"
                  width={48}
                  height={48}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    console.error(`Error loading client logo: ${state.clientName}`); 
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.className = "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl";
                      parent.innerHTML = state.clientName ? state.clientName.charAt(0) : "?";
                    }
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {state.clientName ? state.clientName.charAt(0) : "?"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{state.clientName}</h2>
              <p className="text-sm text-gray-500">{state.clientType} • {state.clientPersonality}</p>
            </div>
          </div>
          
          <h3 className="font-semibold mb-3">Client Feedback:</h3>
<div className="sm:max-h-none max-h-60 overflow-auto italic text-blue-800 whitespace-pre-line">
  &quot;{state.feedbackMessage}&quot;
</div>
        </div>
        


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">


       <div className="bg-white p-6 rounded-lg border border-gray-200">
  <h3 className="font-semibold text-gray-800 mb-2">Skor Anda</h3>
  <div className="flex flex-col md:flex-row md:items-center">
    <div className="text-4xl font-bold text-black md:mr-3 mb-2 md:mb-0">
      {state.score}/100
    </div>
    <div className="flex justify-center md:justify-start text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill={i < starRating ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </div>
</div>

          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Waktu Pengerjaan</h3>
            <div className="text-4xl font-bold text-green-600">
              {minutesTaken}:{secondsTaken.toString().padStart(2, '0')}
            </div>
            {state.elapsedTime < 600 && (
              <p className="text-sm text-green-600 mt-1">
                Selesai kurang dari 10 menit! (+10 poin bonus)
              </p>
            )}
          </div>
        </div>

        

<div className="bg-white p-6 rounded-lg border mb-8">
  <h3 className="text-xl font-bold  mb-4 text-center">
    Kenali Alumni RevoU yang Berkarier sebagai Social Media Marketer 🎓
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
    {graduates.map((grad, i) => (
      <div key={i} className="h-full">
<a
  href={grad.profileLink}
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col text-center p-4 bg-white rounded-lg shadow hover:shadow-lg hover:ring-2 hover:ring-black transition transform hover:-translate-y-1 active:scale-[0.98] group h-full min-h-[360px] cursor-pointer"
>
  {/* Top section with image and company logo overlay */}
  <div className="relative w-24 h-24 mb-4 self-center">
  {/* Profile image */}
  <Image
    src={grad.image}
    alt={grad.name}
    width={96}
    height={96}
    className="rounded-full object-cover border-2 w-full h-full"
  />

  {/* Larger company logo badge */}
  {grad.logo && (
    <div className="absolute -top-3 -left-3 bg-white p-1.5 rounded-xl shadow-md">
      <Image
        src={grad.logo}
        alt={grad.company}
        width={30} // scaled up
        height={30}
        className="object-contain"
      />
    </div>
  )}

  {/* LinkedIn hover */}
  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
    View LinkedIn
  </div>
</div>


  {/* Name + Job */}
  <p className="font-semibold text-center leading-snug break-words">{grad.name}</p>
  <p className="text-sm text-center mt-1">{grad.job} at {grad.company}</p>

  {/* CTA (mobile only) */}
  <div className="mt-2 text-xs sm:hidden">
    Tap untuk lihat profil ↗
  </div>
</a>


      </div>
    ))}
  </div>
</div>


        <div className="flex justify-center">
        <button
  onClick={handlePlayAgain}
  className="w-full md:w-1/2 bg-[#fede3c] hover:bg-yellow-300 text-black font-bold py-3 px-4 rounded-md transition duration-200 shadow hover:shadow-lg active:scale-95 px-4 py-2 border border-black text-black rounded-md"
>
  Main Lagi
</button>

        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
