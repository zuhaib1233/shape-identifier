import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("isLoggedIn", "true");
        navigate('/home');
      } else {
        const error = await response.json();
        alert(error.detail || "Invalid credentials");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handlelogin}
      className="p-6 rounded w-full max-w-sm"
      style={{ backgroundColor: 'transparent' }}
    >
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />

      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{
          backgroundColor: "rgb(76, 112, 163)",
          color: "rgb(255, 255, 255)",
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: "rgb(60, 90, 130)",
          },
          '&:active': {
            backgroundColor: "rgb(50, 75, 110)",
          },
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
