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
  useEffect(() => {
    redirToVercel();
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
