import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        const userData = {
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value,
        };

        axios.post(`https://trello.vimlc.uz/api-docs/#/Authentication/post_api_auth_register`, userData)
            .then(response => {
                console.log(response.data);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
            <form
                className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-20"
                onSubmit={handleRegister}
            >
                <h2 className="mb-6 text-2xl font-bold text-center">Ro'yxatdan o'tish</h2>
                <input
                    className="p-2 mb-4 border rounded"
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={firstNameRef}
                    type="text"
                    placeholder="Ism"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={lastNameRef}
                    type="text"
                    placeholder="Familiya"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={passwordRef}
                    type="password"
                    placeholder="Parol"
                    required
                />
                <input
                    className="p-2 mb-4 border rounded"
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Parolni tasdiqlang"
                    required
                />
                <button className="p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">
                    Ro'yxatdan o'tish
                </button>
            </form>
        </div>
    );
}

export default Register;
