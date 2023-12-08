"use client"
import React, { useEffect } from "react";
import Image from 'next/image'

const page = () => {
    const redirToVercel = () => {
        if (window.location.href.includes('onrender.com')) {
          window.location.href = 'https://laligadelamusica42.vercel.app/'
        }
    }

    useEffect(() => {
        redirToVercel();
    })
    return (
        <div className="container h-full">
            <div className="flex items-center justify-center transform translate-y-[300px] font-bold text-neutral-200 text-xl">Proximamente:</div>
            <div className="flex items-center justify-center h-screen">
                <Image src={`/logo.png`} width={100} height={100} alt='laligadelamusica42_logo' className="ml-5" />
                <div className="mr-5 text-4xl font-bold text-center text-white">La Liga de la Música</div>
            </div>
        </div>
    );
}

export default page;