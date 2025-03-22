import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'

import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast'

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}
