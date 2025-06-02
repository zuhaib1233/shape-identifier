import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './Pages/MainPage.jsx'; 
import TextPrediction from './Pages/TextPrediction.jsx';
import Login from './Pages/Login_page.jsx';
import HomePage from './Pages/Home.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/shape" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/text" element={<ProtectedRoute><TextPrediction /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
