import React, { useState, useEffect } from 'react'
import './index.css'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Dashboard />
    </div>
  )
}
