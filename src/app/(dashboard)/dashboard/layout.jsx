import { Inter } from 'next/font/google'
import Image from 'next/image'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import '@/app/globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard - La Liga de la Música - 42Málaga',
  description: 'Dashboard page of La Liga de la Música 42Málaga',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className='dark w-full h-full'>
        <body classNameName={inter.classNameName}>
          <div className=''>
            {children}
          </div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
        </body>
      </html>
    </ClerkProvider>
  )
}