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
    offerUrl?: boolean;
    licenseUrl?: boolean;
    contactUrl?: boolean;
    inBlog?: boolean;
    editorPage?: boolean;
    faq?: boolean;
    faqPage?: boolean;
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
                                        offerUrl,
                                        licenseUrl,
                                        faq,
                                        faqPage
                                    }: BreadcrumbsProps) {
    //   const pathname = usePathname();

    return (
        <nav className="absolute top-[75px] left-[30px] text-sm text-[#999] mb-4">
            <ul className="flex gap-2 flex-wrap">
                <li>
                    <Link
                        href="/"
                        className={`${styles["menu-item"]} !text-[#adadad] !text-[14px]`}
                    >
                        Главная
                    </Link>
                </li>

                {policyUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Политика конфиденциальности
                        </li>
                    </>
                )}

                {offerUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Публичная оферта
                        </li>
                    </>
                )}

                {licenseUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Лицензии
                        </li>
                    </>
                )}

                {contactUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Контакы
                        </li>
                    </>
                )}

                {faq && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Faq
                        </li>
                    </>
                )}

                {blogUrl && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                            Блог
                        </li>
                    </>
                )}

                {faqPage && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                        <Link
                            href={`/`}
                            className={`${styles["menu-item"]} !text-[#adadad] !text-[14px]`}
                        >
                            Faq
                        </Link>
                        <li className={`flex items-center justify-center`}>
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
                            Страница Faq
                        </li>
                    </>
                )}

                {editorName && editorId && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                                href={`/editors`}
                                className={`${styles["menu-item"]} !text-[#adadad] !text-[14px]`}
                            >
                                Редакторы
                            </Link>
                        </li>
                        <li className={`flex items-center justify-center`}>
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
              <span className={`!text-[#3D9ED6] !text-[14px]`}>
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
                                className={`${styles["menu-item"]} !text-[#adadad] !text-[14px]`}
                            >
                                Блог
                            </Link>
                        </li>
                    </>
                )}

                {editorPage && (
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
                                href="/editor" // или просто /blog, если такая страница есть
                                className={`!text-[#3D9ED6] !text-[14px]`}
                            >
                                Редакторы
                            </Link>
                        </li>
                    </>
                )}

                {blogTitle && (
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
                                href="/blog"
                                className={`${styles["menu-item"]} !text-[#adadad] !text-[14px]`}
                            >
                                Блог
                            </Link>
                        </li>
                    </>
                )}

                {blogTitle && (
                    <>
                        <li className={`flex items-center justify-center`}>
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
                        <li className="text-[#3D9ED6] !text-[14px]">{blogTitle}</li>
                    </>
                )}
            </ul>
        </nav>
    );
}

