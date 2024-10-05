import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sahifa topilmadi</h2>
        <p className="text-xl text-gray-600 mb-8">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage