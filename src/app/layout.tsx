import type {Metadata, Viewport} from "next";
// import {Rubik} from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import React from "react";
import {AuthProvider} from "@/components/context/AuthContext";
import FootCondition from '@/components/ConditionalFooter/page'
import BrowserProvider from "@/components/BrowserProvider/BrowserProvider";
import Script from "next/script";

// import localFont from 'next/font/local'
//
// const simpleSquare = localFont({
//     src: '../../public/fonts/ST-SimpleSquare.woff2',
//     variable: '--font-simple-square',
//     weight: '400',
//     style: 'normal',
//     display: 'swap',
// })
//
// const rubik = localFont({
//     src: [
//         {
//             path: '../../public/fonts/Rubik-Light.ttf',
//             weight: '300',
//             style: 'normal',
//         },
//         {
//             path: '../../public/fonts/Rubik-Regular.ttf',
//             weight: '400',
//             style: 'normal',
//         },
//     ],
//     variable: '--font-rubik',
//     display: 'swap',
// })

export const metadata: Metadata = {
    title: "Audiosector",
    description: "Магазин профессионального аудиооборудования",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Audiosector",
    },
};

export const viewport: Viewport = {
    themeColor: "#0d0d0d",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className={`antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
            <Header/>
            <main className="flex-grow">
                {children}
            </main>
            <FootCondition/>
        </AuthProvider>

        {/*  Добавляем браузерный класс на <html> */}
        <BrowserProvider/>
        </body>
        </html>
    );
}
