'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import closeImage from '@/public/assets/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1).svg'

export default function Home() {
  const [lists,setLists] = useState<number[]>([])
  const [listName, setListName] = useState('')
  const refSection = useRef<HTMLDivElement>(null)
  

  function createCard(ev:any){
    const container = ev.currentTarget.parentElement
    const input = container.querySelector('input')

    const button = container.querySelector('button')
    const cardContainer = document.createElement('article')
    const p = document.createElement('p')
    p.innerText = input.value
    cardContainer.appendChild(p)
    input.remove()
    container.insertBefore(cardContainer,button)
    button.removeEventListener('click',createCard)
    button.addEventListener('click',openFormCard)
  }


  function fillFormList(ev:any){
    ev.preventDefault()
    const div = ev.currentTarget.parentElement
    const image = div.querySelector('img')
    const input = div.querySelector('input')
    div.querySelector('p').innerText= input.value
    const button = div.querySelector('button')
    input.style.display = 'none'
    button.remove()
    const createBtn = document.createElement('button')
    createBtn.innerText = 'Adicionar um cartão'
    createBtn.addEventListener('click',openFormCard)
    image.remove()
    div.appendChild(createBtn)
  }

  function closeFormCard(ev:any){
    const parent = ev.currentTarget.parentElement
    const input = parent.querySelector('input')
    const button = parent.querySelector('button')  
    const image = parent.querySelector('img')
    parent.removeChild(input)
    parent.removeChild(image)
    button.removeEventListener('click',createCard)
    button.addEventListener('click',openFormCard)
  }

  function openFormCard(ev:any){
    const div = ev.currentTarget.parentElement
    const formContainer = document.createElement('div')
    const input = document.createElement('input')
    input.placeholder = 'Insira um nome para esse cartão'
    const imageClose = document.createElement('img')
    imageClose.src = closeImage.src
    imageClose.addEventListener('click',closeFormCard)
    div.appendChild(formContainer)
    const currentButton = ev.currentTarget
    formContainer.append(input,currentButton,imageClose)
 
    ev.currentTarget.removeEventListener('click',openFormCard)
    ev.currentTarget.addEventListener('click',createCard)
  }

  function closeFormList(ev:any){
    const parent = ev.currentTarget.parentElement
    const input = parent.querySelector('input')
    const button = parent.querySelector('button')
    const image = parent.querySelector('img')
    parent.removeChild(button)
    parent.removeChild(image)
    input.style.display ='none'
  }
  
  function createList() {
    if (lists.length < 1) {
      const container = document.createElement('div');
      container.addEventListener('click',openForm)
      const text = document.createElement('p');
      text.innerText = 'Adicionar lista';
      container.append(text);
      if (refSection.current) {
        refSection.current.append(container);
      }
    }else{
      console.log('Já tem algo')
    }
  }



  function openForm(ev:any){
    const div = ev.currentTarget  
    if(div.querySelector('input') ){
      return ''
    }else{
      const form = document.createElement('form')
      form.addEventListener('submit',(ev)=>fillFormList(ev))
      const input = document.createElement('input')
      input.placeholder = 'Digite o nome da lista'
      const button = document.createElement('button')
      button.innerText = 'Adicionar lista'
      button.addEventListener('click',fillFormList)
      const imageClose = document.createElement('img')
      imageClose.src = closeImage.src
      imageClose.addEventListener('click',closeFormList)
      
      div.append(input,button,imageClose)
    }
  }

  useEffect(()=>{
    createList()
  });

  
 

  return (
    <div className={styles.container}>
     <header className={styles.header}>
        <h1>WalliTask</h1>
        <nav>
          <ul>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/'}>Inicio</Link>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
      <aside>
        <h3>Seus quadros</h3>
      </aside>
      <section ref={refSection}>
      </section>
    </main>
    </div>
    
  );
}
