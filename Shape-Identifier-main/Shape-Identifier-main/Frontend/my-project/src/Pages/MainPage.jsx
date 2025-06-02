import React from 'react';
import CanvasDraw from '../Components/CanvasDraw';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    navigate("/"); 
  };

  return (
    <div className='App min-h-screen bg-gray-50'>
      {/* Top Heading bar */}
      <header
        className='w-full text-white py-5 flex justify-between items-center px-6 shadow-md'
        style={{ backgroundColor: 'rgb(24,39,55)' }}
      >
        <h1 className="text-3xl font-bold text-center w-full">Shape Predictor</h1>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute right-6 top-5 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded"
        >
          Logout
        </button>
      </header>

      <main>
        <CanvasDraw />
      </main>
    </div>
  );
}

export default App;
