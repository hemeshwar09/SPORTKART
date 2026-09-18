import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider, useAuth } from './AuthContext'

function Nav(){
  const { user, logout } = useAuth()
  return (
    <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,maxWidth:1100,marginLeft:'auto',marginRight:'auto',padding:'0 18px'}}>
      <div style={{fontWeight:700,fontSize:20}}>IDP SPORTKART</div>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign Up</Link>}
        {user && <span style={{marginLeft:8}}>Hi, {user.name}</span>}
        {user && <a href="#" onClick={(e)=>{e.preventDefault(); logout();}}>Logout</a>}
      </div>
    </header>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
