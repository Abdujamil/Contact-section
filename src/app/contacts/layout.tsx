'use client';
import Link from "next/link";
import React, {ReactNode, useEffect} from "react";
import Bg from "@/components/background/bg";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import {usePathname} from "next/navigation";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";


const navItems = [
    {
        href: "/contacts/connection", label: "Связаться",
        icon: (
            <svg
                width="30"
                height="17"
                viewBox="0 0 30 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M27.4161 0H11.1661C9.79114 0 8.66614 1.125 8.66614 2.5V13.75C8.66614 14.413 8.92953 15.0489 9.39837 15.5178C9.86721 15.9866 10.5031 16.25 11.1661 16.25H27.4161C28.8036 16.25 29.9161 15.1375 29.9161 13.75V2.5C29.9161 1.83696 29.6527 1.20107 29.1839 0.732233C28.7151 0.263392 28.0792 0 27.4161 0ZM27.4161 4.5875L19.2911 8.75L11.1661 4.5875V2.5L19.2911 6.6375L27.4161 2.5V4.5875ZM6.12375 3.125H7.16602C7.14102 3.3375 7.16602 3.5375 7.16602 3.75V5.11492H6.12375C4.17487 5.11492 4.19616 5.36961 4.87375 4.11492C5.20044 3.50999 5.43625 3.125 6.12375 3.125Z"
                    fill="#adadad"
                />
                <path
                    d="M7.16602 7.26168H3.90583C3.21833 7.26168 2.98252 7.64667 2.65583 8.2516C1.97824 9.50629 1.95695 9.2516 3.90583 9.2516H7.16602V7.88668C7.16602 7.67418 7.14102 7.47418 7.16602 7.26168Z"
                    fill="#adadad"
                />
                <path
                    d="M7.16602 11.5188H1.66602C0.978516 11.5188 0.742703 11.9038 0.416016 12.5088C-0.261577 13.7635 -0.282861 13.5088 1.66602 13.5088H7.16602V12.1438C7.16602 11.9313 7.14102 11.7313 7.16602 11.5188Z"
                    fill="#adadad"
                />
            </svg>
        ),
    },
    {
        href: "/contacts/details", label: "Реквизиты",
        icon: (
            <svg
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.3929 7.38281V0H5.85938C5.19337 0 4.55465 0.259277 4.08372 0.720792C3.61278 1.18231 3.34821 1.80826 3.34821 2.46094V14.7656H12.5558C13.2218 14.7656 13.8605 15.0249 14.3315 15.4864C14.8024 15.9479 15.067 16.5739 15.067 17.2266C15.067 17.8792 14.8024 18.5052 14.3315 18.9667C13.8605 19.4282 13.2218 19.6875 12.5558 19.6875H3.34821V23.7891C3.34821 24.4417 3.61278 25.0677 4.08372 25.5292C4.55465 25.9907 5.19337 26.25 5.85938 26.25H20.9263C21.5923 26.25 22.2311 25.9907 22.702 25.5292C23.1729 25.0677 23.4375 24.4417 23.4375 23.7891V9.84375H15.904C15.238 9.84375 14.5993 9.58447 14.1284 9.12296C13.6574 8.66144 13.3929 8.03549 13.3929 7.38281ZM6.69643 12.3047C6.69643 12.0871 6.78462 11.8785 6.9416 11.7246C7.09857 11.5708 7.31148 11.4844 7.53348 11.4844H19.2522C19.4742 11.4844 19.6871 11.5708 19.8441 11.7246C20.0011 11.8785 20.0893 12.0871 20.0893 12.3047C20.0893 12.5222 20.0011 12.7309 19.8441 12.8847C19.6871 13.0386 19.4742 13.125 19.2522 13.125H7.53348C7.31148 13.125 7.09857 13.0386 6.9416 12.8847C6.78462 12.7309 6.69643 12.5222 6.69643 12.3047ZM6.69643 22.1484C6.69643 21.9309 6.78462 21.7222 6.9416 21.5684C7.09857 21.4146 7.31148 21.3281 7.53348 21.3281H19.2522C19.4742 21.3281 19.6871 21.4146 19.8441 21.5684C20.0011 21.7222 20.0893 21.9309 20.0893 22.1484C20.0893 22.366 20.0011 22.5746 19.8441 22.7285C19.6871 22.8823 19.4742 22.9688 19.2522 22.9688H7.53348C7.31148 22.9688 7.09857 22.8823 6.9416 22.7285C6.78462 22.5746 6.69643 22.366 6.69643 22.1484ZM15.067 7.38281V0.410156L23.019 8.20312H15.904C15.682 8.20312 15.4691 8.1167 15.3121 7.96286C15.1552 7.80902 15.067 7.60037 15.067 7.38281ZM0.837054 16.4062C0.615053 16.4062 0.402145 16.4927 0.245167 16.6465C0.0881895 16.8004 0 17.009 0 17.2266C0 17.4441 0.0881895 17.6528 0.245167 17.8066C0.402145 17.9604 0.615053 18.0469 0.837054 18.0469H12.5558C12.7778 18.0469 12.9907 17.9604 13.1477 17.8066C13.3047 17.6528 13.3929 17.4441 13.3929 17.2266C13.3929 17.009 13.3047 16.8004 13.1477 16.6465C12.9907 16.4927 12.7778 16.4062 12.5558 16.4062H0.837054Z"
                    fill="#adadad"
                />
            </svg>
        ),
    },
];

export default function ContactLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const setRealVh = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
        }
        setRealVh()
        window.addEventListener('resize', setRealVh)
        return () => window.removeEventListener('resize', setRealVh)
    }, [])

    return (
        <>
            <div className={`${styles.page} h-full`}>
                <Bg/>
                {/*md:pt-[74px]*/}
                <div
                    className={`${styles.contact} w-full h-full  min-h-[calc(var(--vh,1vh)*100-127px)]  mx-auto flex flex-col items-center justify-center mt-[100px] 
                    md:pt-[50px] md:mt-0 md:overflow-y-hidden`}
                >
                    <div
                        className={`${styles.contactContainer} w-full h-full flex justify-center items-center md:mb-0 mb-25 `}
                    >
                        <div
                            className={`w-full md:flex justify-center items-start md:gap-[40px] gap-[20px] md:ml-[-1px]`}
                        >
                            <div className={`${styles.contactLeftContent} md:mb-[0] mb-[20px] md:mt-0 mt-[20px]`}>
                                {/*${ pathname === '/contacts/details' ? 'md:mb-[30px] leading-[68%]' : 'md:mb-[27px] leading-[79%]' }*/}
                                <h1
                                    className={`${styles.txtGradientRight} tracking-[-1px]
                                     md:text-[48px] text-[28px] md:text-left text-center font-normal  md:mb-[27.8px] leading-[72%] md:ml-[-5px] md:mt-[2px] mb-[20px] mt-[0]`}
                                >
                                    Контакты
                                </h1>

                                <aside
                                    className="md:w-[260px] w-[320px] m-auto md:m-0 flex flex-col items-start md:ml-[-5px] md:mt-0 mb-5">
                                    <div
                                        className={`${styles.licenseBtns} ${styles.btns} flex flex-col items-start justify-start w-full md:max-w-[260px] max-w-full  
                                        p-[19px] md:pr-[18px] gap-[11px] bg-[rgba(0, 0, 0, 0.07)] border border-[#353535] rounded-[6px]`}
                                    >
                                        {navItems.map((item, index) => {
                                            const isActive = pathname === item.href;
                                            const isFirst = index === 0;

                                            return (
                                                <div key={item.label}
                                                     className={`relative !w-[220px] m-auto !overflow-hidden ${isFirst ? '' : 'md:mt-[-1px]' }`}>
                                                    <Link
                                                        href={item.href}
                                                        onMouseMove={handleMouseMove}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={() => {
                                                            // отмечаем, что это внутренний клик по навигации в контактах
                                                            try { sessionStorage.setItem('contactsInternalNav', 'true'); } catch(e) {}
                                                        }}
                                                        className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} border !border-[#353535] transition-all !duration-[.13s] ease-in cursor-pointer md:!w-[220px] !w-full !h-[51px] m-auto !rounded-[4px] group flex items-center !justify-between`}
                                                        style={{color: isActive ? "#3D9ED6" : "#adadad"}}
                                                    >
                                                    <span
                                                        className={`md:ml-[-1px] text-left whitespace-nowrap text-[20px] !transition-all !duration-[.13s] !ease-in ${
                                                            isActive ? "!text-[#3D9ED6]" : "#adadad"} 
                                                        ${isFirst ? "!w-[190px]" : ""}
                                                        `}
                                                    >
                                                      {item.label}
                                                    </span>

                                                        <span
                                                            className={`${styles.sendIconLeft2} flex items-center justify-end transition-all !duration-[.13s] ease-in ${isFirst ? 'md:mr-[-4px] md:mt-[3px]' : 'md:mr-[-1px] md:mt-[1px]' }`}>
                                          {item.icon}
                                        </span>
                                                        <span
                                                            className={`${styles.sendIconRight2} flex items-center justify-end transition-all !duration-[.13s] ease-in ${isFirst ? 'md:mr-[-4px] md:mt-[3px]' : 'md:mr-[-1px] md:mt-[1px]' }`}>
                                          {item.icon}
                                        </span>
                                                    </Link>

                                                    <div className={styles.highlight}/>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </aside>
                            </div>

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
