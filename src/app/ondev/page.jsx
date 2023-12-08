"use client"
import React, { useEffect } from "react";

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
        <div>OnDev</div>
    );
}

export default page;