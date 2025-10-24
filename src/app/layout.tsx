import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Roboto} from "next/font/google";
import Header from "@/components/header/Header";
import React from "react";
import {AuthProvider} from "@/components/context/AuthContext";
import FootCondition from '@/components/ConditionalFooter/page'
import BrowserProvider from "@/components/BrowserProvider/BrowserProvider";
import styles from "@/app/page.module.scss";
import Head from "next/head";

export const metadata: Metadata = {
    title: "Audiosector",
    description: "Магазин профессионального аудиооборудования",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Audiosector",
    }
};

export const viewport: Viewport = {
    themeColor: "#0d0d0d",
};

const roboto = Roboto({
    subsets: ["latin", "cyrillic"],
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal"],
    display: "swap",
    variable: "--font-roboto",
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
            <Head>
                <link rel="preload" as="image" href="/bg.svg" />
            </Head>
            <body className={`antialiased min-h-screen flex flex-col ${roboto.variable}}`}>
                <div
                    className={`${styles.faqBg} fixed w-full h-dvh bg-[url(/bg.svg)] bg-no-repeat left-0 top-0 z-[-1]`}
                    style={{backgroundAttachment: 'fixed',}}
                >
                    <div className={`${styles.linear}  absolute inset-0 bg-black/20`}></div>
                </div>
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
