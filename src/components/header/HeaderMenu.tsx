import Link from 'next/link';
// import ArrowIcon from '@/../public/arrow.svg'
import React, { useEffect, useState } from 'react';
import styles from "./Header.module.css";
import Image, { StaticImageData } from 'next/image';
import { useAuth } from "@/components/context/AuthContext";

interface NavigationItem {
    id: string;
    title: string;
    href?: string;
    img?: StaticImageData;
    children?: NavigationItem[];
}


const navigationData: NavigationItem[] = [
    {
        id: 'main',
        title: 'Главная',
        href: '/'
    },
    {
        id: 'services',
        title: 'Стоимость',
    },
    {
        id: 'faq',
        title: 'Faq',
        href: '/'
    },
    {
        id: 'organization',
        title: 'Организациям',
        children: [
            {
                id: 'cert-compliance', title: 'О компании', href: '/organizations/about'
            },
            {
                id: 'decl-compliance', title: 'Где вы теряете', href: '/organizations/where-you-lose'
            },
            {
                id: 'cert-agro', title: 'API ', href: '/organizations/api'
            }
        ]
    },
    {
        id: 'blog',
        title: 'Блог',
        href: '/blog'
    },
    {
        id: 'contacts',
        title: 'Контакты',
        children: [
            {
                id: 'cert-compliance', title: 'Связаться', href: '/contacts/connection'
            },
            {
                id: 'decl-compliance', title: 'Реквизиты', href: '/contacts/details'
            }
        ]
    }
];

interface HeaderMenuProps {
    active: boolean;
    onClose?: () => void;
}

const HeaderMenu = ({ active }: HeaderMenuProps) => {

    // Login
    const { toggleRegisterPromo, showRegisterPromo } = useAuth();
    const [isIconVisible, setIsIconVisible] = useState(false);

    const [navigationStack, setNavigationStack] = useState([
        { items: navigationData, title: 'NVSERT' }
    ]);

    const canGoBack = navigationStack.length > 1;


    const handleItemClick = (item: NavigationItem) => {

        if (item.children && item.children.length > 0) {
            setNavigationStack(prev => [
                ...prev,
                {
                    items: item.children!,
                    title: item.title,
                    parentId: item.id
                }
            ]);

        }
    };

    const handleGoBack = () => {
        if (!canGoBack) return;

        setNavigationStack(prev => prev.slice(0, -1));
    };

    useEffect(() => {
        if (!active) {
            setTimeout(() => {
                setNavigationStack([{ items: navigationData, title: 'NVSERT' }]);
            }, 300);
        }
    }, [active]);

    const currentLevel = navigationStack[navigationStack.length - 1];

    return (
        <div className={`${styles["header__menu-mob"]} md:hidden block  ${active && styles.active }`}>
            <div className={`${styles["header__menu-mob-inner"]}`}>
                <nav className={`${styles["header-nav"]} flex flex-col gap-[26px] relative overflow-hidden w-full`}>
                    <div className={`${styles["header-nav__list"]} items-center !grid grid-cols-3`}>
                        {canGoBack &&
                            <>
                                <button
                                    className='px-[6px]'
                                    onClick={handleGoBack}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12.7451L1.24719 5.95076L0 7.20562L6.75281 14L8 12.7451ZM8 1.25486L6.75281 0L3.16208 3.74341L4.41015 4.99827L8 1.25486Z" fill="#ADADAD"/>
                                    </svg>
                                </button>

                                <span className=' text-[24px] text-center text-[#adadad]'>{currentLevel.title}</span>
                            </>
                        }
                    </div>
                    <div
                        className="flex transition-transform"
                        style={{
                            transform: `translateX(-${(navigationStack.length - 1) * 100}%)`
                        }}
                    >
                        {navigationStack.map((level, index) => (
                            <ul
                                key={index}
                                className={`${styles["header-nav__list"]} font-[Rubik] flex min-w-full flex-shrink-0`}
                            >
                                <li>
                                    {level.items.map((item, index_item) =>
                                        item.href ? (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                className={`${index_item === 0 ? 'first-child' : ''} ${item.img ? 'have-img' : ''} ${styles["header__menu-mob-item"]}`}
                                            >
                                                <div className="flex items-center gap-[20px]">
                                                    {item.img &&
                                                        <Image src={item.img} alt="document" width={43} height={60}/>
                                                    }
                                                    <span className="text-[18px] text-[#adadad]">{item.title}</span>
                                                </div>
                                                {item.children && (
                                                    // <Image src={ArrowIcon} alt="more" width={20} height={20} />

                                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0 12.7451L6.75281 5.95076L8 7.20562L1.24719 14L0 12.7451ZM0 1.25486L1.24719 0L4.83792 3.74341L3.58985 4.99827L0 1.25486Z"
                                                            fill="#ADADAD"/>
                                                    </svg>
                                                )}
                                            </Link>
                                        ) : (
                                            <button
                                                key={item.id}
                                                onClick={() => handleItemClick(item)}
                                                className={`${index_item === 0 ? 'first-child' : ''} ${item.img ? 'have-img' : ''} ${styles["header__menu-mob-item"]}`}
                                            >
                                                <div className="flex items-center gap-[20px]">
                                                    {item.img &&
                                                        <Image src={item.img} alt="document" width={43} height={60}/>
                                                    }
                                                    <span className="text-[18px] text-[#adadad]">{item.title}</span>
                                                </div>
                                                {item.children && (
                                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0 12.7451L6.75281 5.95076L8 7.20562L1.24719 14L0 12.7451ZM0 1.25486L1.24719 0L4.83792 3.74341L3.58985 4.99827L0 1.25486Z"
                                                            fill="#ADADAD"/>
                                                    </svg>
                                                )}
                                            </button>
                                        )
                                    )}
                                </li>
                            </ul>
                        ))}
                    </div>
                </nav>

                <div className="flex flex-col items-center gap-[10px] px-[40px] pb-[80px]  text-[#FFF]">

                    <div className="flex items-center mt-[13px] gap-[10px]">
                        <div className="overflow-hidden">
                            <Link
                                href={`/auth/login`}
                                className={`${styles["login-button"]} group flex items-center justify-center`}
                                data-text={showRegisterPromo ? "Войти" : "Выйти"}
                                onClick={toggleRegisterPromo}
                                onMouseEnter={() => setIsIconVisible(true)}
                                onMouseLeave={() => setIsIconVisible(false)}>
                                <div className="flex items-center gap-[10px]">
                                    <svg
                                        className={`${styles["login-icon"]} ${
                                            isIconVisible ? styles["login-icon-visible"] : ""
                                        }`}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="font-normal text-[18px] leading-[120%]">
                                         {showRegisterPromo ? "Войти" : "Выйти"}
                                      </span>
                                </div>
                                {/*<div className={styles.highlight} />*/}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;