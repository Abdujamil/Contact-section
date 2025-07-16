"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import styles from "@/app/page.module.scss";

interface BreadcrumbsProps {
    editorName?: string;
    editorId?: number;
    blogTitle?: string;
    blogUrl?: true;
    policyUrl?: boolean;
    // policyTab?: string;
    offerUrl?: boolean;
    licenseUrl?: boolean;
    contactUrl?: boolean;
    inBlog?: boolean;
    editorPage?: boolean;
    faq?: boolean;
    faqPage?: boolean;
    organizationUrl?: boolean;
    loginUrl?: boolean;
    // organizationTab?: string;
}

export default function Breadcrumbs({
                                        loginUrl,
                                        editorName,
                                        editorId,
                                        blogTitle,
                                        inBlog,
                                        editorPage,
                                        blogUrl,
                                        contactUrl,
                                        policyUrl,
                                        // policyTab,
                                        offerUrl,
                                        licenseUrl,
                                        faq,
                                        faqPage,
                                        organizationUrl,
                                        // organizationTab
                                    }: BreadcrumbsProps) {
    //   const pathname = usePathname();

    return (
        <nav className="w-full absolute font-[Rubik] !text-[12px] md:!text-[16px] top-[70px] left-0 text-[#adadad] md:mb-4 max-w-[100%] overflow-auto border-b border-b-[#FFFFFF19] md:pb-2">
            <ul className="w-full flex flex-nowrap gap-2 text-nowrap pl-[30px] !text-[12px] md:!text-[16px]">
                <li>
                    <Link
                        href="/"
                        className={`${styles["menu-item"]} !hover:text-[#3D9ED6] !text-[12px] md:!text-[16px]`}
                    >
                        Главная
                    </Link>
                </li>

                {loginUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Войти
                        </li>
                    </>
                )}

                {policyUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Политика конфиденциальности
                        </li>
                    </>
                )}

                {organizationUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                           Организациям
                        </li>
                    </>
                )}

                {offerUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
                            Публичная оферта
                        </li>
                    </>
                )}

                {licenseUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
                            Лицензии
                        </li>
                    </>
                )}

                {contactUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Контакты
                        </li>
                    </>
                )}

                {faq && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Faq
                        </li>
                    </>
                )}

                {blogUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Блог
                        </li>
                    </>
                )}

                {faqPage && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className={`text-[#3D9ED6]`}>
                            Faq
                        </li>
                    </>
                )}

                {editorName && editorId && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
                            <Link
                                href={`/editors`}
                                className={`${styles["menu-item"]} !text-[12px] md:!text-[16px]`}
                            >
                                Редакторы
                            </Link>
                        </li>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
              <span className={`!text-[#3D9ED6] `}>
                {editorName}
              </span>
                        </li>
                    </>
                )}

                {inBlog && (
                    <>
                        <li className="flex items-center justify-center">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
                            <Link
                                href="/blog" // или просто /blog, если такая страница есть
                                className={`${styles["menu-item"]} !text-[12px] md:!text-[16px]`}
                            >
                                Блог
                            </Link>
                        </li>
                    </>
                )}

                {editorPage && (
                    <>
                    <li className="flex items-center justify-center">
                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                        </svg>
                    </li>
                    <li
                        className={`!text-[#3D9ED6] `}
                    >
                        Редакторы
                    </li>
                    </>
                    )}

                {blogTitle && (
                    <>
                        <li className="flex items-center justify-center">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className={`${styles["menu-item"]} !text-[12px] md:!text-[16px]`}
                            >
                                Блог
                            </Link>
                        </li>
                    </>
                )}

                {blogTitle && (
                    <>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
                            </svg>
                        </li>
                        <li className="text-[#3D9ED6] ">{blogTitle}</li>
                    </>
                )}
            </ul>
        </nav>
    );
}

