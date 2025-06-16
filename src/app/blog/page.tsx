"use client";

import React, {useState} from "react";
import styles from "@/app/page.module.scss";
import BlogCard from "@/components/BlogCard/BlogCard";
import {blogData} from "@/data/blog";
import Bg from "@/components/background/bg";
import Pagination from "@/components/Pagination/pagination";
import Footer from "../footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(blogData.length / cardsPerPage);

    // Получаем карточки для текущей страницы
    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return blogData.slice(startIndex, endIndex);
    };

    // Функция для изменения страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Прокрутка к началу карточек при смене страницы
        document.querySelector(`.${styles.blogCardsContainer}`)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <>
            <Bg/>
            <div className={`h-screen flex flex-col items-center justify-center`}>
                <Breadcrumbs blogUrl={true}/>
                <div
                    className={`${styles.blog} w-full min-h-full h-auto mx-auto flex flex-col items-center`}
                >
                    <div
                        className={`${styles.blogContainer} w-full max-w-[1180px] px-[10px] min-h-full h-auto mt-[120px] mb-[127px] mx-auto flex flex-col items-center`}
                    >
                        <h1
                            className={`${styles.txtGradientRight} text-center text-[48px] leading-[110%] mb-[30px] mt-[-8px]`}
                        >
                            Полезные статьи и советы{" "}
                        </h1>

                        <div className={`${styles.blogCardsContainer} h-auto w-full`}>
                            <div
                                className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[50px]`}
                            >
                                {getCurrentPageCards().map((item) => (
                                    <BlogCard
                                        id={item.id}
                                        key={item.id}
                                        num={item.num}
                                        title={item.title}
                                        date={item.date}
                                        src={item.src}
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Пагинация */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="mb-[127px]"
                        />
                    </div>

                    <Footer/>
                </div>
            </div>
        </>
    );
};

export default Blog;
