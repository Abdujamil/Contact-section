"use client";

import React from 'react';
import styles from "@/app/page.module.scss";
import BlogCard from '@/components/BlogCard/BlogCard'
import {blogData} from "@/data/blog";
import Bg from "@/components/background/bg";
import ScrollWrapper from "@/components/ScrollBar/ScrollWrapper";



const Blog = () => {

    return (
        <ScrollWrapper>
            <div className={`h-screen flex flex-col items-center justify-center`}>
                <Bg/>
                <div
                    className={`${styles.blog} w-full min-h-full h-auto mx-auto flex flex-col items-center`}>
                    <div
                        className={`${styles.blog} w-full max-w-[1180px] px-[10px] min-h-full h-auto mt-[120px] mb-[127px] mx-auto flex flex-col items-center`}>
                        <h1 className={`${styles.txtGradientRight} text-center text-[56px] leading-[110%] mb-10`}>Полезные
                            статьи и советы </h1>

                        <div className={`${styles.blogCardsContainer} h-auto w-full`}>
                            <div className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[127px]`}>
                                {
                                    blogData.map((item) => (
                                        <BlogCard
                                            id={item.id}
                                            key={item.id}
                                            num={item.num}
                                            title={item.title}
                                            date={item.date}
                                            src={item.src}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollWrapper>
    );
};

export default Blog;