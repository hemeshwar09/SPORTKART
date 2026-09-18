import React, {createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({children}){
  const [user, setUser] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('auth_user')) }catch(e){ return null }
  })

  useEffect(()=>{
    if(user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  },[user])

  const signup = (name, email, password) => {
    // simple client-side signup: store in localStorage users list
    const users = JSON.parse(localStorage.getItem('users')||'[]')
    if(users.find(u=>u.email===email)) return { error: 'Email already in use' }
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { ok: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')||'[]')
    const u = users.find(x=>x.email===email && x.password===password)
    if(!u) return { error: 'Invalid credentials' }
    setUser({ id: u.id, name: u.name, email: u.email })
    return { ok: true }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){ return useContext(AuthContext) }
