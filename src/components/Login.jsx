import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Barcha maydonlarni to\'ldiring');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Noto\'g\'ri email formati');
      return false;
    }
    if (password.length < 8) {
      setError('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    axios.post('https://trello.vimlc.uz/api/auth/login', userData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setIsLoading(false);
        navigate('/');
      })
      .catch(error => {
        setIsLoading(false);
        setError('Login xatosi. Iltimos, qaytadan urinib ko\'ring.');
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="flex flex-col w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          className="p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="p-2 mb-4 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Yuklanmoqda...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;