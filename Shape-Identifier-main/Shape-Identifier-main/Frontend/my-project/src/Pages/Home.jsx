import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Select Prediction Type</h1>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/text')}
        >
          Alphabet/Digit Prediction
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/shape')}
        >
          Shape Prediction
        </button>
      </div>
    </div>
  );
};

export default HomePage;
