'use client'

import { FormEvent, useState } from "react"


type User = {
name:string,
id:string,
email:string,
password:string
}

export default function Login(){
    const [emailUser,setEmailUser] = useState('')
    const [passwordUser,setPasswordUser] = useState('')
    
    async function searchInDB(ev:FormEvent){
        ev.preventDefault()
        const getDb = await fetch('http://localhost:4000/users')
        const converseDb:User[] = await getDb.json()
        
        const email:any = converseDb.filter(user=>(user.email === emailUser))
        const password = email.filter(user=>(user.password === passwordUser ))

        if(password.length>0){
            console.log('Usuario encontrado com sucesso')
        }else{
            console.log('Usuario não encontrado no nosso banco de dados')
        }
        
    }
    return(
        <>
        <form onSubmit={(ev)=>searchInDB(ev)}>
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            value={emailUser}
            onChange={(ev)=>setEmailUser(ev.currentTarget.value)}
            />
            <label htmlFor="password">Senha</label>
            <input 
            type="password" 
            value={passwordUser}
            onChange={(ev)=>setPasswordUser(ev.currentTarget.value)}
            />
            <button>Login</button>
        </form>
        </>
    )
}