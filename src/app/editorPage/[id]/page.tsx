// "use client";
//
// import React, {useEffect, useState} from "react";
// import { useParams } from "next/navigation";
// import Bg from "@/components/background/bg";
// // import Footer from "@/app/footer";
// import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
// import { editors } from "@/data/editors";
// import Image from "next/image";
// import styles from "@/app/page.module.scss";
// import { blogData } from "@/data/blog";
// import BlogCard from "@/components/BlogCard/BlogCard";
// import Link from "next/link";
// import TryBlock from '@/components/TryBlock/page';
//
// export default function EditorPage() {
//   const params = useParams();
//   const editorId = Number(params.id);
//
//   const [isMobile, setIsMobile] = useState(false);
//
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);
//
//   const currentEditor = editors.find((editor) => editor.id === editorId);
//
//   if (!currentEditor) return <div>Редактор не найден</div>;
//
//   return (
//     <>
//       <Bg />
//       <div className={`min-h-screen mt-[119px]`}>
//         <div className={`max-w-[1180px] px-[10px] min-h-screen m-auto`}>
//           <Breadcrumbs
//             editorName={currentEditor.name}
//             editorId={currentEditor.id}
//           />
//
//           {/* Автор */}
//           <div
//             className={`${styles.shadowcards} ${styles.authorBlockActive} group w-full mb-[40px] md:flex items-center gap-[21px] p-[20px] rounded-[6px]`}
//           >
//             <div className="flex items-center gap-5 mb-[21px] md:mb-0 md:block min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
//               {currentEditor.avatar ? (
//                 <Image
//                   src={currentEditor.avatar}
//                   alt={currentEditor.name}
//                   width={101}
//                   height={90}
//                 />
//               ) : (
//                 <div className="bg-gray-700 w-full h-full" />
//               )}
//
//               <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px] block md:hidden">
//                 {currentEditor.name}
//               </h3>
//             </div>
//             <div>
//               <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px] hidden md:block">
//                 {currentEditor.name}
//               </h3>
//               <p className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}>
//                 {currentEditor.bio ??
//                   "Редактор этого материала. Больше информации вы найдёте на его странице."}
//               </p>
//             </div>
//           </div>
//
//           {/* Статьи */}
//           <div className={``}>
//             <h2
//               className={`text-[#878787] text-[20px] md:text-[24px] text-center leading-[120%] mb-[20px]`}
//             >
//               Все статьи данного редактора
//             </h2>
//
//             {/*  Статьи данного редактора */}
//             <div
//               className={`${styles.blogCards} grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[40px] gap-[20px] md:mb-[150px] mb-[80px]`}
//             >
//               {blogData
//                 .filter((item) => item.editorId === currentEditor.id)
//                 .map((item) => (
//                   <BlogCard
//                     id={item.id}
//                     key={item.id}
//                     num={item.num}
//                     title={item.title}
//                     date={item.date}
//                     src={item.src}
//                     editorId={item.editorId}
//                   />
//                 ))}
//             </div>
//
//             {/* Другие редакторы AUDIOSECTOR */}
//             <div
//               className={`${styles.similarEditors} mb-[50px]`}
//             >
//               <h2
//                 className={`${styles.txtGradientRight} w-fit md:text-[48px] text-[24px] leading-[110%] m-auto text-center md:mb-[40px] mb-[20px]`}
//               >
//                 Другие редакторы AUDIOSECTOR
//               </h2>
//
//               <div className={`grid md:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[20px] items-center`}>
//                 {editors
//                   .filter((editor) => editor.id !== currentEditor.id)
//                   .slice(0, 4)
//                   .map((editor) => (
//                     <Link
//                       key={editor.id}
//                       href={`/editorPage/${editor.id}`}
//                       className={`${styles.authorBlock} ${styles.shadowcards} group w-full max-w-[580px] md:flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc] active:scale-[0.95]`}
//                     >
//                       <div className=" flex items-center mb-[21px] md:mb-0 md:block gap-5 min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
//                         {editor.avatar ? (
//                           <Image
//                             src={editor.avatar}
//                             alt={editor.name}
//                             width={101}
//                             height={90}
//                           />
//                         ) : (
//                           <div className="bg-gray-700 w-full h-full" />
//                         )}
//
//                         <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] block md:hidden">
//                           {editor.name}
//                         </h3>
//                       </div>
//                       <div>
//                         <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] hidden md:block">
//                           {editor.name}
//                         </h3>
//                         <p className="text-[#adadad] text-[16px] leading-[130%]">
//                           {editor.bio ??
//                             "Редактор этого материала. Больше информации вы найдёте на его странице."}
//                         </p>
//                       </div>
//                     </Link>
//                   ))}
//               </div>
//             </div>
//
//             {/* Блок Попробовать */}
//             {isMobile ? (
//                 <TryBlock
//                     title="Хотите протестировать?"
//                     content="Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только результат."
//                 />
//             ) : (
//              <TryBlock
//                  title="Попробуйте 30 минут бесплатной транскрибации"
//                  content="
//                  Зарегистрируйтесь и получите 30 бесплатных минут. Подходит
//                   для интервью, встреч, звонков и тп. Убедитесь в точности и удобстве
//                   сервиса — без риска."
//              />
//             )}
//
//           </div>
//         </div>
//
//         {/*<Footer />*/}
//       </div>
//     </>
//   );
// }


"use client";

import React, {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Bg from "@/components/background/bg";
// import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import { editors } from "@/data/editors";
import Image from "next/image";
import styles from "@/app/page.module.scss";
import { blogData } from "@/data/blog";
import BlogCard from "@/components/BlogCard/BlogCard";
import Link from "next/link";
import TryBlock from '@/components/TryBlock/page';

export default function EditorPage() {
  const params = useParams();
  const editorId = Number(params.id);

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentEditor = editors.find((editor) => editor.id === editorId);
  const editorArticles = blogData.filter((item) => item.editorId === currentEditor?.id);

  // Функции для слайдера
  const nextSlide = () => {
    setCurrentSlide((prev) =>
        prev === editorArticles.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
        prev === 0 ? editorArticles.length - 1 : prev - 1
    );
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

    if (isLeftSwipe && currentSlide < editorArticles.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  if (!currentEditor) return <div>Редактор не найден</div>;

  return (
      <>
        <Bg />
        <div className={`min-h-screen mt-[129px]`}>
          <div className={`max-w-[1180px] px-[10px] min-h-screen m-auto`}>
            <Breadcrumbs
                editorName={currentEditor.name}
                editorId={currentEditor.id}
            />

            {/* Автор */}
            <div
                className={`${styles.shadowcards} ${styles.authorBlockActive} group w-full mb-[40px] md:flex items-center gap-[21px] p-[20px] rounded-[6px]`}
            >
              <div className="flex items-center gap-5 mb-[21px] md:mb-0 md:block min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
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

                <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px] block md:hidden">
                  {currentEditor.name}
                </h3>
              </div>
              <div>
                <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px] hidden md:block">
                  {currentEditor.name}
                </h3>
                <p className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}>
                  {currentEditor.bio ??
                      "Редактор этого материала. Больше информации вы найдёте на его странице."}
                </p>
              </div>
            </div>

            {/* Статьи */}
            <div className={``}>
              <h2
                  className={`text-[#878787] text-[20px] md:text-[24px] text-center leading-[120%] mb-[20px]`}
              >
                Все статьи данного редактора
              </h2>

              {/*  Статьи данного редактора */}
              {isMobile ? (
                  // Мобильный слайдер
                  <div className="relative mb-[80px]">
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
                        {editorArticles.map((item) => (
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
                    {/*{editorArticles.length > 1 && (*/}
                    {/*    <>*/}
                    {/*      <button*/}
                    {/*          onClick={prevSlide}*/}
                    {/*          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"*/}
                    {/*          disabled={currentSlide === 0}*/}
                    {/*      >*/}
                    {/*        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                    {/*        </svg>*/}
                    {/*      </button>*/}

                    {/*      <button*/}
                    {/*          onClick={nextSlide}*/}
                    {/*          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"*/}
                    {/*          disabled={currentSlide === editorArticles.length - 1}*/}
                    {/*      >*/}
                    {/*        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                    {/*        </svg>*/}
                    {/*      </button>*/}
                    {/*    </>*/}
                    {/*)}*/}

                    {/* Индикаторы */}
                    {editorArticles.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-[2px]">
                          {editorArticles.map((_, index) => (
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
              ) : (
                  // Десктопная сетка
                  <div
                      className={`${styles.blogCards} grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[40px] gap-[20px] md:mb-[150px] mb-[80px]`}
                  >
                    {editorArticles.map((item) => (
                        <BlogCard
                            id={item.id}
                            key={item.id}
                            num={item.num}
                            title={item.title}
                            date={item.date}
                            src={item.src}
                            editorId={item.editorId}
                        />
                    ))}
                  </div>
              )}

              {/* Другие редакторы AUDIOSECTOR */}
              <div
                  className={`${styles.similarEditors} mb-[50px]`}
              >
                <h2
                    className={`${styles.txtGradientRight} w-fit md:text-[48px] text-[24px] leading-[110%] m-auto text-center md:mb-[40px] mb-[20px]`}
                >
                  Другие редакторы AUDIOSECTOR
                </h2>

                <div className={`grid md:grid-cols-2 grid-cols-1 md:gap-[40px] gap-[20px] items-center`}>
                  {editors
                      .filter((editor) => editor.id !== currentEditor.id)
                      .slice(0, 4)
                      .map((editor) => (
                          <Link
                              key={editor.id}
                              href={`/editorPage/${editor.id}`}
                              className={`${styles.authorBlock} ${styles.shadowcards} group w-full max-w-[580px] md:flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc] active:scale-[0.95]`}
                          >
                            <div className=" flex items-center mb-[21px] md:mb-0 md:block gap-5 min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
                              {editor.avatar ? (
                                  <Image
                                      src={editor.avatar}
                                      alt={editor.name}
                                      width={101}
                                      height={90}
                                  />
                              ) : (
                                  <div className="bg-gray-700 w-full h-full" />
                              )}

                              <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] block md:hidden">
                                {editor.name}
                              </h3>
                            </div>
                            <div>
                              <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px] hidden md:block">
                                {editor.name}
                              </h3>
                              <p className="text-[#adadad] text-[16px] leading-[130%]">
                                {editor.bio ??
                                    "Редактор этого материала. Больше информации вы найдёте на его странице."}
                              </p>
                            </div>
                          </Link>
                      ))}
                </div>
              </div>

              {/* Блок Попробовать */}
              {isMobile ? (
                  <TryBlock
                      title="Хотите протестировать?"
                      content="Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только результат."
                  />
              ) : (
                  <TryBlock
                      title="Попробуйте 30 минут бесплатной транскрибации"
                      content="
                 Зарегистрируйтесь и получите 30 бесплатных минут. Подходит
                  для интервью, встреч, звонков и тп. Убедитесь в точности и удобстве
                  сервиса — без риска."
                  />
              )}

            </div>
          </div>

          {/*<Footer />*/}
        </div>
      </>
  );
}