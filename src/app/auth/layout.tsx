'use client';
// app/(auth)/layout.tsx
import Link from "next/link";
import React, { ReactNode } from "react";
import Bg from "@/components/background/bg";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import { usePathname } from "next/navigation";


const navItems = [
    { href: "/auth/login", label: "Вход" },
    { href: "/auth/register", label: "Регистрация" },
    { href: "/auth/forgot-password", label: "Забыли пароль?" },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <Bg />
            <div
                className={`${styles.politic} w-full max-w-[1180px] px-[10px] m-auto h-auto min-h-dvh mt-[120px]`}
            >
            <div className="w-full md:grid gap-[40px] grid-cols-[260px_1fr]">
                <aside className="md:w-[260px] w-[320px] m-auto md:m-0 flex flex-col items-start mt-25">
                    <div
                        className={`${styles.btns} ${styles.licenseBtns} flex flex-col items-start justify-start w-full max-w-[320[px] md:max-w-[260px] p-[20px] gap-[12px] bg-[rgba(0, 0, 0, 0.07)] border border-[#353535] rounded-[6px]`}
                    >


                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            console.log(pathname, item.href);

                            return (
                                <div key={item.href} className="relative !w-[220px] m-auto md:m-0 !overflow-hidden">
                                    <Link
                                        href={item.href}
                                        className={`
                                          ${styles["btn"]}
                                          ${HeaderStyles["login-button"]}
                                          ${styles["customBtn"]}
                                          border !border-[#353535]
                                          cursor-pointer !w-[220px] m-auto md:m-0 !h-[51px]
                                          !rounded-[4px] group flex items-center !justify-between
                                          transition-all !duration-[.13s] ease-in
                                          ${isActive ? "!text-[#3D9ED6]" : "text-[#adadad]"}
                                        `}
                                                                    >
                                        <span
                                            className={`
                                            whitespace-nowrap w-[95px] text-[20px] text-left
                                            !transition-all !duration-[.13s] !ease-in
                                            ${isActive ? "!text-[#3D9ED6]" : "text-[#adadad]"}
                                          `}
                                        >
                                          {item.label}
                                        </span>
                                        <div className={styles.highlight} />
                                    </Link>
                                </div>
                            );
                        })}

                    </div>
                </aside>

                <div
                    className={`${styles.BlogPageContent} mb-[40px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
                >
                    {children}
                </div>
            </div>

        </div>
        </>
    );
}
