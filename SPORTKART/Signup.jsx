import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    const res = signup(name, email, password)
    if(res.error) setError(res.error)
    else navigate('/')
  }

  return (
    <div style={{maxWidth:420,margin:'48px auto',padding:'18px',background:'#fff',borderRadius:10}}>
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:12}}>
          <label>Name</label>
          <input required value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Email</label>
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #ddd'}} />
        </div>
        {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}
        <div><button className="btn" style={{padding:'8px 12px'}}>Create account</button></div>
      </form>
    </div>
  )
}
