// "use client";
// import React, { useState, useEffect } from "react";
// import HeaderStyles from "../header/Header.module.css";
// import styles from "@/app/page.module.scss";
// import BlogAside from "./blogAside";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import { blogData } from "@/data/blog";
// import { useAuth } from "../context/AuthContext";
// import Image from "next/image";
// import Link from "next/link";
// import BlogCard from "../BlogCard/BlogCard";
// import { useRouter } from "next/navigation";
// import { editors } from "@/data/editors";
// import Breadcrumbs from "../breadCrumbs/breadCrumbs";
//
// export default function BlogPageContent({
//   id,
//   fromHeader,
// }: {
//   id: number;
//   fromHeader?: boolean;
// }) {
//   const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
//   const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
//   const [initialized, setInitialized] = useState(false);
//   const { showRegisterPromo } = useAuth();
//
//   const [openFaqItem, setOpenFaqItem] = useState(
//     () => blogData.find((item) => item.id === id) || null
//   );
//
//   useEffect(() => {
//     if (!fromHeader) {
//       setOpenQuestionId(id);
//     }
//     setInitialized(true);
//   }, [id, fromHeader]);
//
//   useEffect(() => {
//     blogData.forEach((item) => {
//       if (typeof item.src === "string") {
//         const img = new window.Image();
//         img.src = item.src;
//         img.onload = () => {
//           setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
//         };
//       }
//     });
//   }, []);
//
//   const currentFaqItem = blogData.find((item) => item.id === id);
//   useEffect(() => {
//     const found = blogData.find((item) => item.id === openQuestionId);
//     if (found) {
//       setOpenFaqItem(found);
//     }
//   }, [openQuestionId]);
//
//   const currentIndex = blogData.findIndex((item) => item.id === openQuestionId);
//   const currentEditor = editors.find(
//     (editor) => editor.id === currentFaqItem?.editorId
//   );
//
//   const router = useRouter();
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       const prevId = blogData[currentIndex - 1].id; // ← добавляем эту строку
//       setOpenQuestionId(prevId);
//       router.push(`/blogPage/${prevId}`);
//     }
//   };
//
//   const handleNext = () => {
//     if (currentIndex < blogData.length - 1) {
//       const nextId = blogData[currentIndex + 1].id; // ← и эту тоже
//       setOpenQuestionId(nextId);
//       router.push(`/blogPage/${nextId}`);
//     }
//   };
//
//
//   if (!currentFaqItem) return null;
//
//   if (!initialized) return <div>Загрузка...</div>;
//   if (!loadedImages) return <div>Загрузка...</div>;
//
//   return (
//     <>
//       <div className={`w-full md:grid gap-[40px] grid-cols-[260px_1fr] mb-[150px]`}>
//         <Breadcrumbs blogTitle={currentFaqItem?.title} />
//
//         {/* Левый ASIDE (BlogAside) */}
//         <aside className="md:sticky top-[80px] h-fit z-[10] md:w-[260px] md:px-0 m-auto md:m-0 mb-5">
//           {showRegisterPromo && (
//             <div
//               className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[6px]`}
//             >
//               <h3
//                 className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}
//               >
//                 При регистрации дарим 30 минут!
//               </h3>
//               <div className="relative w-full h-[51px] !overflow-hidden">
//                 <button
//                   className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["blogTryBtn"]} w-full !h-full group flex items-center border !border-[#353535] !justify-center`}
//                   data-text=""
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <svg
//                     className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clipPath="url(#clip0_3537_3888)">
//                       <path
//                         d="M11.9998 23.1838C9.78797 23.1838 7.62577 22.5279 5.78666 21.299C3.94756 20.0702 2.51415 18.3236 1.6677 16.28C0.821252 14.2365 0.599783 11.9879 1.0313 9.81855C1.46281 7.64918 2.52793 5.65648 4.09196 4.09245C5.65599 2.52842 7.64869 1.4633 9.81806 1.03179C11.9874 0.600271 14.2361 0.82174 16.2796 1.66819C18.3231 2.51464 20.0697 3.94804 21.2985 5.78715C22.5274 7.62626 23.1833 9.78846 23.1833 12.0003C23.1833 14.9664 22.005 17.8109 19.9077 19.9082C17.8104 22.0055 14.9659 23.1838 11.9998 23.1838ZM11.9998 2.41453C10.104 2.41453 8.25064 2.97673 6.67426 4.03003C5.09788 5.08333 3.86925 6.58043 3.14372 8.33201C2.41819 10.0836 2.22836 12.011 2.59823 13.8704C2.9681 15.7299 3.88106 17.4379 5.22166 18.7785C6.56226 20.1191 8.27028 21.0321 10.1297 21.4019C11.9892 21.7718 13.9166 21.582 15.6682 20.8565C17.4197 20.1309 18.9168 18.9023 19.9701 17.3259C21.0234 15.7495 21.5856 13.8962 21.5856 12.0003C21.5856 9.45802 20.5757 7.01983 18.778 5.22215C16.9803 3.42446 14.5422 2.41453 11.9998 2.41453Z"
//                         fill="#737373"
//                       />
//                       <path
//                         d="M15.6666 16.7933L11.2012 12.3279V4.81104H12.7988V11.6649L16.7929 15.667L15.6666 16.7933Z"
//                         fill="#737373"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_3537_3888">
//                         <rect width="24" height="24" fill="white" />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                   <span className="font-normal !text-[#adadad] text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
//                     Получить
//                   </span>
//                 </button>
//               </div>
//             </div>
//           )}
//
//           <BlogAside items={currentFaqItem.aside} />
//         </aside>
//
//         {/* Контент */}
//         <div className="w-full">
//           <section
//             className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
//           >
//             {openFaqItem && (
//               <div
//                 className={`${styles.BlogPageContent} text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
//               >
//                 <div className="flex items-center justify-center mb-[30px]">
//                   <Image
//                     className="rounded-[6px]"
//                     src="/blgLg1.png"
//                     alt="blog img"
//                     width={600}
//                     height={300}
//                   />
//                 </div>
//                 {currentFaqItem.fullAnswer}
//               </div>
//             )}
//
//             <div
//               className={`w-full flex flex-col gap-2 md:flex-row items-center justify-between mt-[30px] mb-[40px]`}
//             >
//               <div className="relative w-full max-w-[260px] md:m-0  m-auto h-[51px] !overflow-hidden">
//                 <button
//                   onClick={handlePrev}
//                   className={` ${styles["btn"]} ${styles["blogLeftBtn"]} ${HeaderStyles["login-button"]} border !border-[#353535] w-full !h-full group flex items-center !justify-between`}
//                   data-text=""
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <svg
//                     className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
//                     width="26"
//                     height="26"
//                     viewBox="0 0 26 26"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <rect
//                       width="24"
//                       height="24"
//                       rx="2"
//                       transform="matrix(-1 0 0 1 25 1)"
//                       fill="#737373"
//                     />
//                     <g clipPath="url(#clip0_3502_3398)">
//                       <path
//                         d="M20.1836 13H5.81716"
//                         stroke="#191919"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M9.92167 8.8953L5.81698 13L9.92167 17.1047"
//                         stroke="#191919"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_3502_3398">
//                         <rect
//                           width="17.4147"
//                           height="17.4147"
//                           fill="white"
//                           transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 25.3145 13)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//
//                   <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
//                     Предыдущая
//                   </span>
//                 </button>
//                 <div className={styles.highlight} />
//               </div>
//               <div className="relative w-full max-w-[260px] md:m-0  m-auto h-[51px] !overflow-hidden">
//                 <button
//                   onClick={handleNext}
//                   className={` ${styles["btn"]} ${styles["blogNextBtn"]} ${HeaderStyles["login-button"]} border !border-[#353535]  w-full !h-full group flex items-center !justify-between`}
//                   data-text=""
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
//                     Следующая
//                   </span>
//
//                   <svg
//                     className={`${styles.sendIconRight}  transition-all !duration-[.13s] ease-in`}
//                     width="26"
//                     height="26"
//                     viewBox="0 0 26 26"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <rect
//                       x="1"
//                       y="1"
//                       width="24"
//                       height="24"
//                       rx="2"
//                       fill="#737373"
//                     />
//                     <g clipPath="url(#clip0_3069_1633)">
//                       <path
//                         d="M5.81641 13H20.1828"
//                         stroke="#191919"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M16.0783 8.8953L20.183 13L16.0783 17.1047"
//                         stroke="#191919"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_3069_1633">
//                         <rect
//                           width="17.4147"
//                           height="17.4147"
//                           fill="white"
//                           transform="translate(0.685547 13) rotate(-45)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </button>
//                 <div className={styles.highlight} />
//               </div>
//             </div>
//
//             {currentEditor && (
//               <Link
//                 href={`/editorPage/${currentEditor.id}`}
//                 className={`${styles.authorBlock} ${styles.shadowcards}
//                 group w-full md:flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc]`}
//               >
//                 <div className="flex items-center mb-[21px] md:mb-0 md:block gap-5  min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
//                   {currentEditor.avatar ? (
//                     <Image
//                       src={currentEditor.avatar}
//                       alt={currentEditor.name}
//                       width={101}
//                       height={90}
//                     />
//                   ) : (
//                     <div className="bg-gray-700 w-full h-full" />
//                   )}
//
//                   <h3 className=" text-[#adadad] text-[20px] leading-[120%] mb-[10px] block md:hidden">
//                     {currentEditor.name}
//                   </h3>
//                 </div>
//                 <div>
//                   <h3 className=" text-[#adadad] text-[20px] leading-[120%] mb-[10px] hidden md:block">
//                     {currentEditor.name}
//                   </h3>
//                   <p
//                     className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}
//                   >
//                     {currentEditor.bio ??
//                       "Редактор этого материала. Больше информации вы найдёте на его странице."}
//                   </p>
//                 </div>
//               </Link>
//             )}
//           </section>
//         </div>
//       </div>
//
//       {/* Похожие статьи */}
//       <h2
//         className={`${styles.txtGradientRight} text-center text-[28px] leading-[85%] mb-[50px]
//         md:text-[48px]
//         `}
//       >
//         Похожие статьи{" "}
//       </h2>
//       <div className={`${styles.blogCardsContainer} h-auto w-full`}>
//         <div
//           className={`${styles.blogCards} grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[40px] gap-[20px]`}
//         >
//           {blogData.slice(0, 8).map((item) => (
//             <BlogCard
//               key={item.id}
//               id={item.id}
//               num={item.num}
//               title={item.title}
//               date={item.date}
//               src={item.src}
//               editorId={item.editorId}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import HeaderStyles from "../header/Header.module.css";
import styles from "@/app/page.module.scss";
import BlogAside from "./blogAside";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { blogData } from "@/data/blog";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../BlogCard/BlogCard";
import { useRouter } from "next/navigation";
import { editors } from "@/data/editors";
import Breadcrumbs from "../breadCrumbs/breadCrumbs";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// Компонент точек индикатора
const SliderDots = ({
                      total,
                      current,
                      onDotClick
                    }: {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}) => {
  return (
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: total }).map((_, index) => (
            <button
                key={index}
                onClick={() => onDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 border border-[#5C5C5C] ${
                    index === current
                        ? 'bg-[rgba(119,156,177,0.25098)]'
                        : ' hover:bg-gray-500'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
            />
        ))}
      </div>
  );
};

export default function BlogPageContent({
                                          id,
                                          fromHeader,
                                        }: {
  id: number;
  fromHeader?: boolean;
}) {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [initialized, setInitialized] = useState(false);
  const { showRegisterPromo } = useAuth();

  // Состояния для слайдера
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const [openFaqItem, setOpenFaqItem] = useState(
      () => blogData.find((item) => item.id === id) || null
  );

  // Проверка мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!fromHeader) {
      setOpenQuestionId(id);
    }
    setInitialized(true);
  }, [id, fromHeader]);

  useEffect(() => {
    blogData.forEach((item) => {
      if (typeof item.src === "string") {
        const img = new window.Image();
        img.src = item.src;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
        };
      }
    });
  }, []);

  const currentFaqItem = blogData.find((item) => item.id === id);
  useEffect(() => {
    const found = blogData.find((item) => item.id === openQuestionId);
    if (found) {
      setOpenFaqItem(found);
    }
  }, [openQuestionId]);

  const currentIndex = blogData.findIndex((item) => item.id === openQuestionId);
  const currentEditor = editors.find(
      (editor) => editor.id === currentFaqItem?.editorId
  );

  const router = useRouter();
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevId = blogData[currentIndex - 1].id;
      setOpenQuestionId(prevId);
      router.push(`/blogPage/${prevId}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < blogData.length - 1) {
      const nextId = blogData[currentIndex + 1].id;
      setOpenQuestionId(nextId);
      router.push(`/blogPage/${nextId}`);
    }
  };

  // Функции для слайдера
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(blogData.length, 8));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(blogData.length, 8)) % Math.min(blogData.length, 8));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Обработка свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (!currentFaqItem) return null;

  if (!initialized) return <div>Загрузка...</div>;
  if (!loadedImages) return <div>Загрузка...</div>;

  return (
      <>
        <div className={`w-full md:grid gap-[40px] grid-cols-[260px_1fr] mb-[80px] md:mb-[150px]`}>
          <Breadcrumbs blogTitle={currentFaqItem?.title} />

          {/* Левый ASIDE (BlogAside) */}
          <aside className="md:sticky top-[80px] h-fit z-[10] max-w-[320px] md:w-[260px] md:px-0 m-auto md:m-0 mb-5">
            {showRegisterPromo && (
                <div
                    className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[6px]`}
                >
                  <h3
                      className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}
                  >
                    При регистрации дарим 30 минут!
                  </h3>
                  <div className="relative w-full h-[51px] !overflow-hidden">
                    <button
                        className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["blogTryBtn"]} w-full !h-full group flex items-center border !border-[#353535] !justify-between md:!justify-center`}
                        data-text=""
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                      <svg
                          className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3537_3888)">
                          <path
                              d="M11.9998 23.1838C9.78797 23.1838 7.62577 22.5279 5.78666 21.299C3.94756 20.0702 2.51415 18.3236 1.6677 16.28C0.821252 14.2365 0.599783 11.9879 1.0313 9.81855C1.46281 7.64918 2.52793 5.65648 4.09196 4.09245C5.65599 2.52842 7.64869 1.4633 9.81806 1.03179C11.9874 0.600271 14.2361 0.82174 16.2796 1.66819C18.3231 2.51464 20.0697 3.94804 21.2985 5.78715C22.5274 7.62626 23.1833 9.78846 23.1833 12.0003C23.1833 14.9664 22.005 17.8109 19.9077 19.9082C17.8104 22.0055 14.9659 23.1838 11.9998 23.1838ZM11.9998 2.41453C10.104 2.41453 8.25064 2.97673 6.67426 4.03003C5.09788 5.08333 3.86925 6.58043 3.14372 8.33201C2.41819 10.0836 2.22836 12.011 2.59823 13.8704C2.9681 15.7299 3.88106 17.4379 5.22166 18.7785C6.56226 20.1191 8.27028 21.0321 10.1297 21.4019C11.9892 21.7718 13.9166 21.582 15.6682 20.8565C17.4197 20.1309 18.9168 18.9023 19.9701 17.3259C21.0234 15.7495 21.5856 13.8962 21.5856 12.0003C21.5856 9.45802 20.5757 7.01983 18.778 5.22215C16.9803 3.42446 14.5422 2.41453 11.9998 2.41453Z"
                              fill="#737373"
                          />
                          <path
                              d="M15.6666 16.7933L11.2012 12.3279V4.81104H12.7988V11.6649L16.7929 15.667L15.6666 16.7933Z"
                              fill="#737373"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3537_3888">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="font-normal !text-[#adadad] text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
                    Получить
                  </span>
                    </button>
                  </div>
                </div>
            )}

            <BlogAside items={currentFaqItem.aside} />
          </aside>

          {/* Контент */}
          <div className="w-full">
            <section
                className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
            >
              {openFaqItem && (
                  <div
                      className={`${styles.BlogPageContent} text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
                  >
                    <div className="flex items-center justify-center mb-[30px]">
                      <Image
                          className="rounded-[6px]"
                          src="/blgLg1.png"
                          alt="blog img"
                          width={600}
                          height={300}
                      />
                    </div>
                    {currentFaqItem.fullAnswer}
                  </div>
              )}

              <div
                  className={`w-full flex flex-col gap-2 md:flex-row items-center justify-between mt-[30px] mb-[40px]`}
              >
                <div className="relative w-full max-w-[260px] md:m-0  m-auto h-[51px] !overflow-hidden">
                  <button
                      onClick={handlePrev}
                      className={` ${styles["btn"]} ${styles["blogLeftBtn"]} ${HeaderStyles["login-button"]} border !border-[#353535] w-full !h-full group flex items-center !justify-between`}
                      data-text=""
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                  >
                    <svg
                        className={`${styles.sendIconLeft}  transition-all !duration-[.13s] ease-in`}
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                          width="24"
                          height="24"
                          rx="2"
                          transform="matrix(-1 0 0 1 25 1)"
                          fill="#737373"
                      />
                      <g clipPath="url(#clip0_3502_3398)">
                        <path
                            d="M20.1836 13H5.81716"
                            stroke="#191919"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.92167 8.8953L5.81698 13L9.92167 17.1047"
                            stroke="#191919"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3502_3398">
                          <rect
                              width="17.4147"
                              height="17.4147"
                              fill="white"
                              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 25.3145 13)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
                    Предыдущая
                  </span>
                  </button>
                  <div className={styles.highlight} />
                </div>
                <div className="relative w-full max-w-[260px] md:m-0  m-auto h-[51px] !overflow-hidden">
                  <button
                      onClick={handleNext}
                      className={` ${styles["btn"]} ${styles["blogNextBtn"]} ${HeaderStyles["login-button"]} border !border-[#353535]  w-full !h-full group flex items-center !justify-between`}
                      data-text=""
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                  >
                  <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in ">
                    Следующая
                  </span>

                    <svg
                        className={`${styles.sendIconRight}  transition-all !duration-[.13s] ease-in`}
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                          x="1"
                          y="1"
                          width="24"
                          height="24"
                          rx="2"
                          fill="#737373"
                      />
                      <g clipPath="url(#clip0_3069_1633)">
                        <path
                            d="M5.81641 13H20.1828"
                            stroke="#191919"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.0783 8.8953L20.183 13L16.0783 17.1047"
                            stroke="#191919"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3069_1633">
                          <rect
                              width="17.4147"
                              height="17.4147"
                              fill="white"
                              transform="translate(0.685547 13) rotate(-45)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <div className={styles.highlight} />
                </div>
              </div>

              {currentEditor && (
                  <Link
                      href={`/editorPage/${currentEditor.id}`}
                      className={`${styles.authorBlock} ${styles.shadowcards} 
                      group w-full md:flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc]`}
                        >
                    <div className="flex items-center mb-[21px] md:mb-0 md:block gap-5  min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
                      {currentEditor.avatar ? (
                          <Image
                              src={currentEditor.avatar}
                              alt={currentEditor.name}
                              width={101}
                              height={90}
                          />
                      ) : (
                          <div className="bg-gray-700 w-full h-full" />
                      )}

                      <h3 className=" text-[#adadad] text-[20px] leading-[120%] mb-[10px] block md:hidden">
                        {currentEditor.name}
                      </h3>
                    </div>
                    <div>
                      <h3 className=" text-[#adadad] text-[20px] leading-[120%] mb-[10px] hidden md:block">
                        {currentEditor.name}
                      </h3>
                      <p
                          className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}
                      >
                        {currentEditor.bio ??
                            "Редактор этого материала. Больше информации вы найдёте на его странице."}
                      </p>
                    </div>
                  </Link>
              )}
            </section>
          </div>
        </div>

        {/* Похожие статьи */}
        <h2
            className={`${styles.txtGradientRight}w-fit text-center text-[28px] leading-[85%] mb-[50px] md:text-[48px]`}
        >
          Похожие статьи
        </h2>
        <div className={`${styles.blogCardsContainer} h-auto max-w-[360px] m-auto md:max-w-full md:m-0`}>
          {isMobile ? (
              /* Мобильный слайдер */
              <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                  {blogData.slice(0, 8).map((item) => (
                      <div key={item.id} className="w-full flex-shrink-0 px-2">
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

                {/* Индикаторы */}
                <SliderDots
                    total={Math.min(blogData.length, 8)}
                    current={currentSlide}
                    onDotClick={goToSlide}
                />
              </div>
          ) : (
              /* Десктопная сетка */
              <div
                  className={`${styles.blogCards} grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[40px] gap-[20px]`}
              >
                {blogData.slice(0, 8).map((item) => (
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
      </>
  );
}