import React from "react";
import Link from "next/link";
import styles from '../../app/page.module.scss'
import headerStyles from "../../components/header/Header.module.css";
import {useMouseTracking} from "../hooks/useMouseTracking";

const links = [
    {href: "/blog", label: "Блог"},
    {href: "/contacts", label: "Контакты"},
    {href: "/license", label: "Лицензии"},
    {href: "/oferta", label: "Оферта"},
    {href: "/politic", label: "Политика"},
];

const FooterLinks: React.FC = () => {
    const topLinks = links.slice(0, 2);
    const bottomLinks = links.slice(2);

    const {handleMouseMove, handleMouseUp, handleMouseLeave} = useMouseTracking();

    return (
        <div className={styles.links}>
            <div className="flex items-end justify-between flex-col h-[89px]">
                <div className="flex items-center gap-[9px]">
                    {topLinks.map(link => (
                        <div key={link.href} className="relative">
                            <Link
                                href={link.href}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseLeave}
                                className={`${headerStyles["login-button"]} !border-none group !h-[33px] flex items-center justify-center`}
                            >
                                <span className="font-normal text-[18px] leading-[120%]">{link.label}</span>
                            </Link>
                            <div className={styles.highlight}/>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-[9px] list-none">
                    {bottomLinks.map(link => (
                        <div key={link.href} className="relative">
                            <Link href={link.href}
                                  onMouseMove={handleMouseMove}
                                  onMouseUp={handleMouseUp}
                                  onMouseLeave={handleMouseLeave}
                                  className={`${headerStyles["login-button"]} !border-none group !h-[33px] flex items-center justify-center`}>
                                <span className="font-normal text-[18px] leading-[120%]">{link.label}</span>
                            </Link>
                            <div className={styles.highlight}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FooterLinks;
