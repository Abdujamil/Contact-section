"use client";
import {useScrollSpy} from "../useScrollSpy";
import React, {useState, useEffect} from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "../header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";

type AsideItem = {
    id: string;
    title: string;
    subtitle?: string[];
};

type BlogAsideProps = {
    items: AsideItem[];
    variant?: 'default' | 'editors'; // Добавляем проп для варианта отображения
};

export default function BlogAside({items, variant = 'default'}: BlogAsideProps) {
    const [clickedHash, setClickedHash] = useState<string | null>(null);
    const [lastActiveHash, setLastActiveHash] = useState<string>("");

    const sectionIds = items.map((item) => item.id);
    const scrollSpyHash = useScrollSpy({sectionIds, offset: 100});

    useEffect(() => {
        if (clickedHash && scrollSpyHash === clickedHash) {
            setClickedHash(null);
        }
    }, [clickedHash, scrollSpyHash]);

    useEffect(() => {
        if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
            setLastActiveHash(scrollSpyHash);
        }
    }, [scrollSpyHash, lastActiveHash]);

    const activeHash = clickedHash || lastActiveHash;

    const handleAnchorClick = (
        href: string,
        index: number,
        e: React.MouseEvent
    ) => {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
            const offset = 100;
            const targetPosition = (targetElement as HTMLElement).offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            setClickedHash(href);
        }
    };

    // Определяем классы для разных вариантов
    const containerClasses = variant === 'editors'
        ? "grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-[10px] md:gap-0"
        : "space-y-[10px]";

    // Функция для получения классов элемента
    const getItemClasses = (href: string) => {
        const baseClasses = `relative font-[Rubik] !font-light text-[#adadad] !leading-[130%] text-balance
           group
           ${styles["blogAsideBtn"]}
           ${HeaderStyles["login-button"]}
           ${styles["faqTryBtn"]}
           w-full !h-full flex !justify-start items-center ease-in duration-150 !rounded-[6px]
           ${
            activeHash === href
                ? `${styles.blogAsideBtnActive} !border-[#adadad]`
                : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
        }
           active:will-change-transform`;

        if (variant === 'editors') {
            return `${baseClasses} !text-[14px] md:!text-[16px] !justify-center md:!justify-start !text-center md:!text-left
                text-[14px] md:text-[16px] !p-[8px] md:!p-[12px] min-h-[48px] md:min-h-auto`;
        } else {
            return `${baseClasses} !text-[16px] !justify-start !text-left text-[16px] !p-[12px]`;
        }
    };

    return (
        <ul className={containerClasses}>
            {items.map((item, index) => {
                const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
                const href = baseId;

                return (
                    <li key={baseId}>
                        <a
                            href={href}
                            onClick={(e) => handleAnchorClick(href, index, e)}
                            className={getItemClasses(href)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {item.title}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
