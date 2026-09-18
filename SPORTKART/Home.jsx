import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Home(){
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    axios.get('/api/products').then(r=>setProducts(r.data)).catch(err=>{
      console.error(err)
      // fallback to local data file if called directly (dev server may not proxy)
      fetch('/data/products.json').then(r=>r.json()).then(setProducts).catch(()=>{})
    })
  },[])

  const filtered = products.filter(p=> p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{maxWidth:1100,margin:'18px auto',padding:'0 18px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <div style={{fontWeight:700,fontSize:20}}>IDP SPORTKART</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <input id="search" placeholder="Search products" value={q} onChange={e=>setQ(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid #ddd',width:320}} />
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:16}}>
        {filtered.map(p=> (
          <div key={p.id} style={{background:'#fff',borderRadius:10,overflow:'hidden',boxShadow:'0 6px 18px rgba(16,24,40,.06)'}}>
            <img src={p.image} alt={p.name} style={{width:'100%',height:160,objectFit:'cover'}} />
            <div style={{padding:12}}>
              <h4 style={{margin:'0 0 6px'}}>{p.name}</h4>
              <div style={{display:'flex',alignItems:'center'}}><div style={{color:'#666',fontSize:12}}>{p.category}</div><div style={{flex:1}}></div><div style={{color:'#0b76ef',fontWeight:600}}>${(p.price||0).toFixed(2)}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
