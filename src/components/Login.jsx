import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios.post('https://trello.vimlc.uz/api-docs/#/Authentication/post_api_auth_login', userData)
    .then(response => {
        console.log(response.data);
        navigate('/');
    })
    .catch(error => {
        console.log(error);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="flex flex-col w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4 text-center">Login</h2>
        <input
          className="p-2 mb-4 border border-gray-300 rounded"
          ref={emailRef}
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="p-2 mb-4 border border-gray-300 rounded"
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />
        <button
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
