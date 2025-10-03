"use client";
import Link from "next/link";
import styles from "@/app/page.module.scss";

interface BreadcrumbsProps {
    editorName?: string;
    editorId?: number;
    blogTitle?: string;
    blogUrl?: true;
    policy?: boolean;
    policyOferta?: boolean;
    policyUrLicense?: boolean;
    offerUrl?: boolean;
    licenseUrl?: boolean;
    contactUrl?: boolean;
    detailsUrl?: boolean;
    inBlog?: boolean;
    editorPage?: boolean;
    faq?: boolean;
    faqPage?: boolean;
    organizationAbout?: boolean;
    organizationApi?: boolean;
    organizationApiTranslate?: boolean;
    organizationWhereDoYouLose?: boolean;
    loginUrl?: boolean;
    registerUrl?: boolean;
    forgotPasswordrUrl?: boolean;
}

export default function Breadcrumbs({
                                        loginUrl,
                                        registerUrl,
                                        forgotPasswordrUrl,
                                        editorName,
                                        editorId,
                                        blogTitle,
                                        inBlog,
                                        editorPage,
                                        blogUrl,
                                        contactUrl,
                                        detailsUrl,
                                        policy,
                                        policyOferta,
                                        policyUrLicense,
                                        offerUrl,
                                        licenseUrl,
                                        faq,
                                        faqPage,
                                        organizationAbout,
                                        organizationApi,
                                        organizationApiTranslate,
                                        organizationWhereDoYouLose,
                                    }: BreadcrumbsProps) {

    return (
        <nav
            className="w-full absolute z-[999] font-[Rubik] !text-[12px] md:!text-[16px] pt-[3px] top-[60px] md:pb-[3px] left-0 text-[#adadad] md:mb-4 max-w-[100%] border-b border-b-[#FFFFFF19]">
            <div
                className="w-full pl-[29px] !text-[12px] md:!text-[16px] mb-2.5 md:mb-0"
                style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                }}
            >
                <Link
                    href="/"
                    className={`${styles["menu-item"]} !hover:text-[#3D9ED6] !text-[12px] md:!text-[16px] inline`}
                >
                    Главная
                </Link>

                {loginUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Войти
                        </span>
                    </>
                )}

                {registerUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Регистрация
                        </span>
                    </>
                )}

                {forgotPasswordrUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Забыли пароль
                        </span>
                    </>
                )}

                {policy && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Политика конфиденциальности
                        </span>
                    </>
                )}

                {policyOferta && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Публичная оферта
                        </span>
                    </>
                )}

                {policyUrLicense && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Лицензии
                        </span>
                    </>
                )}

                {organizationAbout && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            О компании
                        </span>
                    </>
                )}

                {organizationApi && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Подключить Api
                        </span>
                    </>
                )}

                {organizationApiTranslate && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Что такое Api
                        </span>
                    </>
                )}

                {organizationWhereDoYouLose && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Где вы теряете
                        </span>
                    </>
                )}

                {offerUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="inline">
                            Публичная оферта
                        </span>
                    </>
                )}

                {licenseUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="inline">
                            Лицензии
                        </span>
                    </>
                )}

                {contactUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Связаться
                        </span>
                    </>
                )}

                {detailsUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Реквизиты
                        </span>
                    </>
                )}

                {faq && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Faq
                        </span>
                    </>
                )}

                {blogUrl && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Блог
                        </span>
                    </>
                )}

                {faqPage && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Faq
                        </span>
                    </>
                )}

                {editorName && editorId && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <Link
                            href="/editors"
                            className={`${styles["menu-item"]} !text-[12px] md:!text-[16px] inline`}
                        >
                            Редакторы
                        </Link>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            {editorName}
                        </span>
                    </>
                )}

                {inBlog && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <Link
                            href="/blog"
                            className={`${styles["menu-item"]} !text-[12px] md:!text-[16px] inline`}
                        >
                            Блог
                        </Link>
                    </>
                )}

                {editorPage && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            Редакторы
                        </span>
                    </>
                )}

                {blogTitle && (
                    <>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <Link
                            href="/blog"
                            className={`${styles["menu-item"]} !text-[12px] md:!text-[16px] inline`}
                        >
                            Блог
                        </Link>
                        <span className="inline-flex items-center justify-center mx-2">
                            <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.5 9.11625L5.285 4.33125L6.16875 5.215L1.38375 10L0.5 9.11625ZM0.5 1.02412L1.38375 0.140375L3.92812 2.7767L3.04374 3.66045L0.5 1.02412Z"
                                    fill="#ADADAD"/>
                            </svg>
                        </span>
                        <span className="text-[#3D9ED6] inline">
                            {blogTitle}
                        </span>
                    </>
                )}
            </div>
        </nav>
    );
}