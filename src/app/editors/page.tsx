// "use client";
//
// import React from "react";
// import Bg from "@/components/background/bg";
// // import Footer from "@/app/footer";
// import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// // import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import {useParams} from "next/navigation";
// // import HeaderStyles from "@/components/header/Header.module.css";
// import styles from "@/app/page.module.scss";
// import Link from "next/link";
// import Image from "next/image";
// import {editors} from "@/data/editors";
// import {blogData} from "@/data/blog";
// import BlogCard from "@/components/BlogCard/BlogCard";
// import TryBlock from "@/components/TryBlock/page";
// import BlogAside from "@/components/blogPageCard/blogAside";
//
// export default function Editors() {
//     const params = useParams();
//     const editorId = Number(params.id);
//
//     const items = editors.map((editor) => ({
//         id: `editor-${editor.id}`,
//         title: editor.name,
//     }));
//
//     return (
//         <>
//             <Bg/>
//             <div className={`min-h-screen mt-[120px]`}>
//                 <Breadcrumbs editorId={editorId} inBlog={true} editorPage={true}/>
//                 <div className={`max-w-[1180px] px-[10px] m-auto min-h-screen`}>
//                     <h1
//                         className={`${styles.txtGradientRight} w-fit m-auto text-center text-[28px] md:text-[48px] leading-[110%] text-3xl  mb-[20px] md:mb-[40px] mt-[-8px]`}
//                     >
//                         Наши редакторы
//                     </h1>
//
//                     <div className={`md:flex gap-[40px] mb-[50px]`}>
//                         <aside className="md:sticky top-[90px] h-fit z-[10] w-[260px] m-auto md:m-0">
//                             <BlogAside items={items}/>
//                         </aside>
//
//                         <div className={` w-full max-w-[860px] flex flex-col gap-[50px]`}>
//                             {editors.map((editor) => {
//                                 const editorBlogs = blogData
//                                     .filter((blog) => blog.editorId === editor.id)
//                                     .slice(0, 3);
//
//                                 return (
//                                     <div id={`editor-${editor.id}`} key={editor.id}
//                                          className="flex flex-col gap-[30px]">
//                                         {/* Ссылка на страницу редактора */}
//                                         <Link
//                                             href={`/editorPage/${editor.id}`}
//                                             className={`${styles.authorBlock} ${styles.shadowcards} group flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc]`}
//                                         >
//                                             <div className="min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
//                                                 {editor.avatar ? (
//                                                     <Image
//                                                         src={editor.avatar}
//                                                         alt={editor.name}
//                                                         width={101}
//                                                         height={90}
//                                                     />
//                                                 ) : (
//                                                     <div className="bg-gray-700 w-full h-full"/>
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px]">
//                                                     {editor.name}
//                                                 </h3>
//                                                 <p className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}>
//                                                     {editor.bio}
//                                                 </p>
//                                             </div>
//                                         </Link>
//
//                                         {/* Блоги редактора */}
//                                         {editorBlogs.length > 0 && (
//                                             <div>
//                                                 <div
//                                                     className={`${styles.editorCards} grid grid-cols-3 gap-[40px] mb-[60px]`}
//                                                 >
//                                                     {editorBlogs.map((item) => (
//                                                         <BlogCard
//                                                             key={item.id}
//                                                             id={item.id}
//                                                             num={item.num}
//                                                             title={item.title}
//                                                             date={item.date}
//                                                             src={item.src}
//                                                             editorId={item.editorId}
//                                                         />
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                     {/* Блок Попробовать */}
//                     <div className={`flex gap-[40px]`}>
//                         <div className="w-[348px]">
//
//                         </div>
//
//                         <TryBlock
//                             title="Хотите протестировать?"
//                             content="
//                         Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только
//                         результат."
//                         />
//                     </div>
//                 </div>
//                 {/*<Footer/>*/}
//             </div>
//         </>
//     );
// }

"use client";

import React, { useState, useEffect } from "react";
import Bg from "@/components/background/bg";
// import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import {useParams} from "next/navigation";
// import HeaderStyles from "@/components/header/Header.module.css";
import styles from "@/app/page.module.scss";
import Link from "next/link";
import Image from "next/image";
import {editors} from "@/data/editors";
import {blogData} from "@/data/blog";
import {BlogItem} from '@/data/blog';
import BlogCard from "@/components/BlogCard/BlogCard";
import TryBlock from "@/components/TryBlock/page";
import BlogAside from "@/components/blogPageCard/blogAside";

// Альтернативный способ - используем any для обхода конфликта типов
const MobileBlogSlider = ({ editorBlogs }: { editorBlogs: BlogItem[] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === editorBlogs.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? editorBlogs.length - 1 : prev - 1
        );
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentSlide < editorBlogs.length - 1) {
            nextSlide();
        }
        if (isRightSwipe && currentSlide > 0) {
            prevSlide();
        }
    };

    return (
        <div className="relative">
            <div
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {editorBlogs.map((item) => (
                        <div key={item.id} className="w-full flex-shrink-0 px-[10px]">
                            <BlogCard
                                id={item.id}
                                num={item.num}
                                title={item.title}
                                date={item.date}
                                src={item.src}
                                editorId={item.editorId}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Кнопки навигации */}
            {/*{editorBlogs.length > 1 && (*/}
            {/*    <>*/}
            {/*        <button*/}
            {/*            onClick={prevSlide}*/}
            {/*            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"*/}
            {/*            disabled={currentSlide === 0}*/}
            {/*        >*/}
            {/*            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*            </svg>*/}
            {/*        </button>*/}

            {/*        <button*/}
            {/*            onClick={nextSlide}*/}
            {/*            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"*/}
            {/*            disabled={currentSlide === editorBlogs.length - 1}*/}
            {/*        >*/}
            {/*            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*            </svg>*/}
            {/*        </button>*/}
            {/*    </>*/}
            {/*)}*/}

            {/* Индикаторы */}
            {editorBlogs.length > 1 && (
                <div className="flex justify-center mt-4 space-x-[2px]">
                    {editorBlogs.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors border border-[#5C5C5C] ${
                                index === currentSlide ? 'bg-[rgba(119,156,177,0.25098)]' : 'hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Editors() {
    const params = useParams();
    const editorId = Number(params.id);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const items = editors.map((editor) => ({
        id: `editor-${editor.id}`,
        title: editor.name,
    }));

    return (
        <>
            <Bg/>
            <div className={`min-h-screen mt-[130px]`}>
                <Breadcrumbs editorId={editorId} inBlog={true} editorPage={true}/>
                <div className={`max-w-[1180px] px-[10px] m-auto min-h-screen`}>
                    <h1
                        className={`${styles.txtGradientRight} w-fit m-auto text-center text-[28px] md:text-[48px] leading-[110%] text-3xl  mb-[20px] md:mb-[40px] mt-[-8px]`}
                    >
                        Наши редакторы
                    </h1>

                    <div className={`md:flex gap-[40px] mb-[50px]`}>
                        <aside className="md:sticky top-[90px] h-fit z-[10] max-w-[320px] md:w-[260px] m-auto mb-5 md:m-0">
                            <BlogAside items={items} variant="editors"/>
                        </aside>

                        <div className={` w-full max-w-[860px] flex flex-col gap-10 md:gap-[50px]`}>
                            {editors.map((editor) => {
                                const editorBlogs = blogData
                                    .filter((blog) => blog.editorId === editor.id)
                                    .slice(0, 3);

                                return (
                                    <div id={`editor-${editor.id}`} key={editor.id}
                                         className="flex flex-col gap-[30px]">
                                        {/* Ссылка на страницу редактора */}
                                        <Link
                                            href={`/editorPage/${editor.id}`}
                                            className={`${styles.authorBlock} ${styles.shadowcards} group md:flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc]`}
                                        >
                                            <div className="flex items-center gap-5 mb-[21px] md:mb-0 md:block min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
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
                                                <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] block md:hidden">
                                                    {editor.name}
                                                </h3>
                                            </div>
                                            <div>
                                                <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] hidden md:block">
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
                                                {isMobile ? (
                                                    // Мобильный слайдер
                                                    <div className="mb-[40px]">
                                                        <MobileBlogSlider editorBlogs={editorBlogs} />
                                                    </div>
                                                ) : (
                                                    // Десктопная сетка
                                                    <div
                                                        className={`${styles.editorCards} grid grid-cols-3 gap-[40px] mb-[60px]`}
                                                    >
                                                        {editorBlogs.map((item) => (
                                                            <BlogCard
                                                                key={item.id}
                                                                id={item.id}
                                                                num={item.num}
                                                                title={item.title}
                                                                date={item.date}
                                                                src={item.src}
                                                                editorId={item.editorId}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Блок Попробовать */}
                    <div className={`flex gap-[40px]`}>
                        <div className="w-[348px] hidden md:block">

                        </div>

                        <TryBlock
                            title="Хотите протестировать?"
                            content="
                        Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только
                        результат."
                        />
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        </>
    );
}
