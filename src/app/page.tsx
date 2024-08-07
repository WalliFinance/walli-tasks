'use client'

import { FormEvent, useState } from 'react'
import styles from './page.module.scss'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  async function register(ev:FormEvent){
    ev.preventDefault()
    if(name!=='' && email!=="" && password===confirmPassword){
      const createUser = await fetch(`http://localhost:4000/users`,{
        method: 'POST',
        body: JSON.stringify(
          {
            name,email,password
          }
        ),
        headers:{
          "Content-Type": "application/json"
        }
      })
      alert('Usuario cadastrado com sucesso')
    }else{
      console.log('Preencha tudo corretamente')
    }
  }

  return(
    <main className={styles.main}>
    <form onSubmit={(ev)=>register(ev)}>
      <label htmlFor="name">Nome</label>
      <input 
      type="text"
      value={name}
      onChange={(ev)=>setName(ev.currentTarget.value)}
      />
      <label htmlFor="email">Email</label>
      <input 
      type="text"
      value={email}
      onChange={(ev)=>setEmail(ev.currentTarget.value)}
      />
      <label htmlFor="password">Senha</label>
      <input 
      type="password"
      value={password}
      onChange={(ev)=>setPassword(ev.currentTarget.value)}
      />
      <label htmlFor="confirmPassword">Confirmação de senha</label>
      <input 
      type="password"
      value={confirmPassword}
      onChange={(ev)=>setConfirmPassword(ev.currentTarget.value)}
      />
      <button>Registrar</button>
    </form>
    </main>
  )
}