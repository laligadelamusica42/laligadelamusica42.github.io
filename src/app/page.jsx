"use client"
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = 'https://laligadelamusica42.vercel.app/'
    }
  }
  
  const checkIfDev = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('dev');
    } else if (process.env.NODE_ENV === 'production') {
      router.replace(`/ondev`);
    }
  }

  useEffect(() => {
    redirToVercel();
    checkIfDev();
  });

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>

      </main>
      <footer>
        
      </footer>
    </>
  )
}
