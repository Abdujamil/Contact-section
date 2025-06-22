"use client";

import React from "react";
import Bg from "@/components/background/bg";
import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import {useParams} from "next/navigation";
// import HeaderStyles from "@/components/header/Header.module.css";
import styles from "@/app/page.module.scss";
import Link from "next/link";
import Image from "next/image";
import {editors} from "@/data/editors";
import {blogData} from "@/data/blog";
import BlogCard from "@/components/BlogCard/BlogCard";
import TryBlock from "@/components/TryBlock/page";
import BlogAside from "@/components/blogPageCard/blogAside";

export default function Editors() {
    const params = useParams();
    const editorId = Number(params.id);

    const items = editors.map((editor) => ({
        id: `editor-${editor.id}`,
        title: editor.name,
    }));

    return (
        <>
            <Bg/>
            <div className={`min-h-screen mt-[120px]`}>
                <Breadcrumbs editorId={editorId} inBlog={true} editorPage={true}/>
                <div className={`max-w-[1180px] px-[10px] m-auto min-h-screen`}>
                    <h1
                        className={`${styles.txtGradientRight} text-center text-[48px] leading-[110%] text-3xl mb-[30px] mt-[-8px]`}
                    >
                        Наши редакторы
                    </h1>

                    <div className={`flex gap-[40px]`}>
                        <aside className="sticky top-20 h-fit z-[10] w-[260px]">
                            <BlogAside items={items} />
                        </aside>

                        <div className={` w-full max-w-[860px] flex flex-col gap-[50px] mb-[50px]`}>
                            {editors.map((editor) => {
                                const editorBlogs = blogData
                                    .filter((blog) => blog.editorId === editor.id)
                                    .slice(0, 3);

                                return (
                                    <div id={`editor-${editor.id}`} key={editor.id} className="flex flex-col gap-[30px]">
                                        {/* Ссылка на страницу редактора */}
                                        <Link
                                            href={`/editorPage/${editor.id}`}
                                            className={`${styles.authorBlock} ${styles.shadowcards} group flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc]`}
                                        >
                                            <div className="min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
                                                {editor.avatar ? (
                                                    <Image
                                                        src={editor.avatar}
                                                        alt={editor.name}
                                                        width={101}
                                                        height={90}
                                                    />
                                                ) : (
                                                    <div className="bg-gray-700 w-full h-full"/>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px]">
                                                    {editor.name}
                                                </h3>
                                                <p className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}>
                                                    {editor.bio}
                                                </p>
                                            </div>
                                        </Link>

                                        {/* Блоги редактора */}
                                        {editorBlogs.length > 0 && (
                                            <div>
                                                <div
                                                    className={`${styles.blogCards} grid grid-cols-3 gap-[40px] mb-[60px]`}
                                                >
                                                    {editorBlogs.map((item) => (
                                                        <BlogCard
                                                            key={item.id}
                                                            id={item.id}
                                                            num={item.num}
                                                            title={item.title}
                                                            date={item.date}
                                                            src={item.src}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Блок Попробовать */}
                    <TryBlock
                        title="Хотите протестировать?"
                        content="
                        Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только
                        результат."
                    />
                </div>
                <Footer/>
            </div>
        </>
    );
}
