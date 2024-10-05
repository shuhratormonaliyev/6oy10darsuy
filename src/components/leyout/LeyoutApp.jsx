import React from 'react'
import { Link } from 'react-router-dom'

function LayoutApp({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mening Saytim</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-200">Bosh sahifa</Link></li>
              <li><Link to="/about" className="hover:text-blue-200">Haqida</Link></li>
              <li><Link to="/contact" className="hover:text-blue-200">Aloqa</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Mening Saytim. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  )
}

export default LayoutApp