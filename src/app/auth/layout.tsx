'use client';
import Link from "next/link";
import React, {ReactNode} from "react";
import Bg from "@/components/background/bg";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import {usePathname} from "next/navigation";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";


const navItems = [
    {
        href: "/auth/login", label: "Вход",
        icon: (
            <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.625 1.37119V2.24239L14.7964 2.25176L17.9732 2.26581L17.9893 12.4859L18 22.7108H14.8125H11.625V23.6054V24.5L11.5018 24.4766C11.4375 24.4625 8.94643 24.0691 5.97321 23.6007C2.99464 23.137 0.433928 22.7342 0.27857 22.7061L0 22.6593V12.4953C0 6.9075 0.0160713 2.33607 0.0375004 2.33607C0.0857143 2.33607 11.3571 0.556208 11.5018 0.52342L11.625 0.500002V1.37119ZM11.625 12.5V21.0714H13.8482H16.0714V12.5V3.92857H13.8482H11.625V12.5ZM9.39107 11.7974C9.13929 11.9286 9.03214 12.1393 9.03214 12.5C9.03214 12.8607 9.13929 13.0714 9.39107 13.2026C9.63214 13.3337 9.86786 13.3197 10.0768 13.1698C10.2911 13.0105 10.3929 12.7998 10.3929 12.5C10.3929 12.2002 10.2911 11.9895 10.0768 11.8302C9.86786 11.6803 9.63214 11.6663 9.39107 11.7974Z"
                    fill="#ADADAD"/>
            </svg>
        ),
    },
    {
        href: "/auth/register", label: "Регистрация",
        icon: (
            <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4682_4058)">
                    <path
                        d="M7.6721 1.0657C7.08147 1.22976 6.25038 1.79695 5.68929 2.42976C5.26741 2.89851 5.0396 3.29226 4.89616 3.78914C4.81601 4.07508 4.80335 4.2157 4.80757 4.86726C4.80757 5.31258 4.84132 5.84226 4.88351 6.17039L4.95522 6.72351L4.82866 6.88758C4.66413 7.08914 4.63882 7.2157 4.67257 7.58133C4.71054 8.00789 4.84976 8.51414 5.03538 8.92195C5.12819 9.11882 5.20413 9.30632 5.20413 9.33914C5.20413 9.47508 5.50366 10.3891 5.67241 10.7548C5.94663 11.3688 6.23772 11.8141 6.67647 12.3016C7.30507 13.0001 7.85772 13.3141 8.53694 13.361C9.92491 13.4595 11.3129 12.0063 11.9499 9.79851C12.0216 9.55008 12.0807 9.32039 12.0807 9.28758C12.0807 9.25945 12.1566 9.06726 12.2494 8.8657C12.4604 8.41101 12.5869 7.88133 12.5869 7.42195C12.5869 7.08914 12.5785 7.0657 12.4435 6.90632L12.3001 6.74226L12.3633 6.34382C12.4477 5.75789 12.4857 4.33289 12.4182 4.00945C12.3001 3.40476 11.9119 2.87039 11.2201 2.35008C10.524 1.83445 9.37647 1.27664 8.62554 1.08914C8.2121 0.990701 7.97163 0.981325 7.6721 1.0657Z"
                        fill="#ADADAD"/>
                    <path
                        d="M6.14835 12.9578C6.0007 13.1406 5.21601 13.6844 4.63804 14.0078C4.07273 14.3219 3.84491 14.4297 2.79866 14.875C2.22069 15.1188 1.88741 15.3391 1.50351 15.7375C1.11116 16.1453 0.879132 16.5063 0.609132 17.125C0.132414 18.2219 -0.0658678 19.6328 0.0185072 21.2781C0.0649135 22.2578 0.237882 23.4156 0.356007 23.575C0.465695 23.7203 1.65538 24.1469 2.55398 24.3625C4.33429 24.7891 6.17788 24.9766 8.66273 24.9766C11.2024 24.9766 13.1473 24.7703 14.9318 24.3203C15.8051 24.1 16.8682 23.7109 16.9694 23.575C17.0201 23.5094 17.1635 22.7828 17.2268 22.2813C17.3576 21.2594 17.3491 19.7781 17.2057 18.8641C17.0116 17.6125 16.5349 16.4969 15.9105 15.8313C15.4085 15.2922 15.1343 15.1188 14.1471 14.7156C13.0249 14.2563 11.4935 13.3469 11.1771 12.9625L11.1012 12.8641L10.8185 13.1266C9.3546 14.5094 8.00038 14.5188 6.5407 13.1594C6.23273 12.8734 6.22007 12.8688 6.14835 12.9578Z"
                        fill="#ADADAD"/>
                </g>
                <defs>
                    <clipPath id="clip0_4682_4058">
                        <rect width="18" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        href: "/auth/forgot-password", label: "Забыли пароль",
        icon: (
            <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4682_4064)">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M8.4375 0.760742C7.09484 0.760742 5.80718 1.29669 4.85777 2.25068C3.90837 3.20467 3.375 4.49855 3.375 5.8477V10.9347H0V24.4999H16.875V10.9347H13.5V5.8477C13.5 4.49855 12.9666 3.20467 12.0172 2.25068C11.0678 1.29669 9.78016 0.760742 8.4375 0.760742ZM5.0625 5.8477C5.0625 4.94827 5.41808 4.08568 6.05101 3.44968C6.68395 2.81369 7.54239 2.45639 8.4375 2.45639C9.33261 2.45639 10.191 2.81369 10.824 3.44968C11.4569 4.08568 11.8125 4.94827 11.8125 5.8477V10.9347H5.0625V5.8477ZM8.4375 15.1738C8.06604 15.1738 7.70496 15.297 7.41026 15.5242C7.11557 15.7514 6.90372 16.07 6.80758 16.4306C6.71143 16.7911 6.73637 17.1734 6.87851 17.5183C7.02065 17.8631 7.27206 18.1512 7.59375 18.3379V20.2607H9.28125V18.3379C9.60294 18.1512 9.85435 17.8631 9.99649 17.5183C10.1386 17.1734 10.1636 16.7911 10.0674 16.4306C9.97128 16.07 9.75943 15.7514 9.46474 15.5242C9.17004 15.297 8.80896 15.1738 8.4375 15.1738Z"
                          fill="#ADADAD"/>
                </g>
                <defs>
                    <clipPath id="clip0_4682_4064">
                        <rect width="18" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
        ),
    },
];

export default function AuthLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <Bg/>
            <div
                className={`${styles['auth-content']} pt-[61px] h-full w-full max-w-[1180px] px-[10px] m-auto flex justify-center items-center`}
            >
                <div className="w-full flex items-center justify-center h-full">
                    <div className={`md:flex gap-[40px] md:pt-[60px] md:pb-[60px]`}>
                        <aside className="md:w-[260px] w-[320px] m-auto md:m-0 flex flex-col items-start mt-25 mb-5">
                            <h2
                                className={`${styles.txtGradientRight} hidden md:block leading-[85%] md:text-[48px] text-[28px] md:text-left text-center font-normal md:mb-[23px] mb-[20px] mt-[0]`}
                            >
                                Вход
                            </h2>
                            <div
                                className={`${styles.btns} ${styles.licenseBtns} 
                                h-[213px] flex flex-col items-start justify-start w-full max-w-[320px] 
                                md:max-w-[260px] gap-2.5 pl-[19px] py-[19px] p-[18px] md:bg-[rgba(0, 0, 0, 0.07)] md:border border-[#353535] rounded-[6px]`}
                            >
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    const isFirst = index === 0;

                                    return (
                                        <div key={item.label} className={`relative !w-[220px]`}>
                                            <Link
                                                href={item.href}
                                                onMouseMove={handleMouseMove}
                                                onMouseLeave={handleMouseLeave}
                                                className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} !overflow-hidden
                                                border !border-[#353535] transition-all !duration-[.13s] ease-in !py-[13px] !px-[15px] !pl-[14px] !pb-[15px]
                                                cursor-pointer md:!w-[220px] !w-full !h-[51px] m-auto !rounded-[4px] group flex items-center gap-2.5`}
                                                style={{color: isActive ? "#3D9ED6" : "#adadad"}}
                                            >
                                                <span
                                                    className={`text-left whitespace-nowrap text-[20px] !transition-all !duration-[.13s] !ease-in mb-[1px] ${
                                                        isActive ? "!text-[#3D9ED6]" : "#adadad"} 
                                                    ${isFirst ? "!w-[190px]" : ""}
                                                    `}
                                                >
                                                  {item.label}
                                                </span>

                                                <span
                                                    className={`${styles.sendIconLeft2} ${isFirst ? "!w-[152px]" : ""} flex items-center justify-end transition-all !duration-[.13s] ease-in`}>
                                                  {item.icon}
                                                </span>

                                                <span
                                                    className={`${styles.sendIconRight2} flex items-center justify-end transition-all !duration-[.13s] ease-in`}>
                                                  {item.icon}
                                                </span>
                                            </Link>

                                            <div className={styles.highlight}/>
                                        </div>
                                    );
                                })}

                            </div>
                        </aside>

                        <div className={`md:pb-0 pb-20 pr-[1px]`}>
                                {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
