"use client"
import React, { useEffect } from 'react'
import { useQRCode } from 'next-qrcode'

const page = () => {
    const { Canvas } = useQRCode();
    return (
        <Canvas
            text='https://laligadelamusica42.vercel.app/api/confirm/1'
            logo={`/logo.png`}
            options={{
                level: 'M',
                margin: 1,
                scale: 1,
                width: 256,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            }}
        />
    )
}

export default page