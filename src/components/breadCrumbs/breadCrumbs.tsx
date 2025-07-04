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
    // organizationTab?: string;
}

export default function Breadcrumbs({
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
        <nav className="absolute font-[Rubik] !text-[16px] top-[75px] left-[20px] md:left-[30px] text-sm text-[#adadad] mb-4">
            <ul className="flex gap-2 flex-wrap">
                <li>
                    <Link
                        href="/"
                        className={`${styles["menu-item"]} !hover:text-[#3D9ED6] `}
                    >
                        Главная
                    </Link>
                </li>

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
                                className={`${styles["menu-item"]}  `}
                            >
                                Редакторы
                            </Link>
                        </li>
                        <li className={`flex items-center justify-center`}>
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z" fill="#ADADAD"/>
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
                            <svg
                                width="6"
                                height="10"
                                viewBox="0 0 6 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.25 0.917969L5.33333 5.0013L1.25 9.08464"
                                    stroke="#CCCCCC"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                        <li>
                            <Link
                                href="/blog" // или просто /blog, если такая страница есть
                                className={`${styles["menu-item"]} `}
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
                                className={`${styles["menu-item"]} `}
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

