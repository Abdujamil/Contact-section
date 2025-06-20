// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import { faqData } from "@/data/faq";
// import CardListt from "./ShowCardList";
// // import FaqAside from "./FaqAside";
// import styles from "@/app/faq/faq.module.scss";
// import HeaderStyles from "../header/Header.module.css";
// import { motion, AnimatePresence } from "framer-motion";


// export default function FaqPageContent({ id }: { id: number }) {
//   const [openQuestionId, setOpenQuestionId] = useState<number | null>(id);
//   const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

//   // Предзагрузка изображений при монтировании
//   useEffect(() => {
//     faqData.forEach((item) => {
//       if (typeof item.largeImgSrc === "string") {
//         const img = new window.Image();
//         img.src = item.largeImgSrc;
//         img.onload = () => {
//           setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
//         };
//       }
//     });
//   }, []);

//   const { currentFaqItem, openFaqItem } = useMemo(() => {
//     const current = faqData.find((item) => item.id === id);
//     const open = faqData.find((item) => item.id === openQuestionId) || current;
//     return { currentFaqItem: current, openFaqItem: open };
//   }, [id, openQuestionId]);

//   if (!currentFaqItem || !openFaqItem) return null;

//   return (
//     <>
//       <aside className="sticky top-20 h-fit w-[260px] backdrop-blur-sm z-[999999]">
//         <div
//           className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[8px]`}
//         >
//           <p
//             className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}
//           >
//             При регистрации дарим 30 минут!
//           </p>

//           <div className="relative w-full flex h-[51px] items-center justify-center">
//             <button
//               className={`${HeaderStyles["login-button"]} w-full max-w-[200px] !h-full  group flex items-center justify-center`}
//               data-text=""
//             >
//               <span className="font-normal  text-[20px] leading-[120%]">
//                 Попробовать
//               </span>
//             </button>
//             <div className={styles.highlight} />
//           </div>
//         </div>

//         {/* {openQuestionId && (
//                         <>
//                             <div className="relative w-full h-[260px] mb-[20px] rounded-[8px]">
//                                 <Image
//                                     src={openFaqItem.largeImgSrc}
//                                     alt={openFaqItem.question}
//                                     fill
//                                     sizes="260px"
//                                     className="rounded-[8px] object-cover"
//                                     priority={openFaqItem.id === id}
//                                     quality={85}
//                                     onLoadingComplete={() => setLoadedImages(prev => ({...prev, [openFaqItem.id]: true}))}
//                                 />

//                                 {!loadedImages[openFaqItem.id] && (
//                                     <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-[8px]"/>
//                                 )}


//                             </div>
//                             <FaqAside items={openFaqItem.aside}/>
//                         </>
//                     )} */}

//         <AnimatePresence mode="wait">
//           {openQuestionId && openFaqItem ? (
//             <motion.div
//               key={openFaqItem?.id}
//               initial={{ opacity: 1, y: -30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 6,
//                 mass: 0.3,
//               }}
//               className="relative w-full h-[260px] mb-[20px] rounded-[8px] border border-[#353535]"
//             >
//               <Image
//                 src={openFaqItem.largeImgSrc}
//                 alt={openFaqItem.question}
//                 fill
//                 sizes="260px"
//                 className="rounded-[8px] object-cover"
//                 priority={openFaqItem.id === id}
//                 quality={85}
//                 onLoadingComplete={() =>
//                   setLoadedImages((prev) => ({
//                     ...prev,
//                     [openFaqItem.id]: true,
//                   }))
//                 }
//               />
//               {!loadedImages[openFaqItem.id] && (
//                 <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-[8px]" />
//               )}
//             </motion.div>
//           ) : (
//             <div className="relative w-full h-[260px] mb-[20px] rounded-[8px] border border-[#353535]">
//               <Image
//                 src="/faq-default-img.png"
//                 alt="Изображение по умолчанию"
//                 fill
//                 sizes="260px"
//                 className="rounded-[8px] object-cover"
//                 quality={85}
//                 priority
//               />
//             </div>
//           )}
//         </AnimatePresence>
//       </aside>
//       <div className="col-span-3">
//         <div className="pb-[40px]">
//           <h2
//             className={`${styles.title} ${styles.txtGradientRight} mb-[30px] font-normal leading-[110%] text-[48px] text-[#CCCCCC]`}
//           >
//             FAQ: Ответы на главные вопросы
//           </h2>
//           <section
//             className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
//           >
//             <CardListt
//               initialOpenId={id}
//               onToggle={(id) => setOpenQuestionId(id)}
//             />
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { faqData } from "@/data/faq";
import CardListt from "./ShowCardList";
// import FaqAside from "./FaqAside";
import styles from "../../app/faq/faq.module.scss";
import HeaderStyles from "../header/Header.module.css";
import { useAuth } from "@/components/context/AuthContext";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqPageContent({
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

  const [openFaqItem, setOpenFaqItem] = useState(
    () => faqData.find((item) => item.id === id) || null
  );

  useEffect(() => {
    if (!fromHeader) {
      setOpenQuestionId(id);
    }
    setInitialized(true);
  }, [id, fromHeader]);

  useEffect(() => {
    faqData.forEach((item) => {
      if (typeof item.largeImgSrc === "string") {
        const img = new window.Image();
        img.src = item.largeImgSrc;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
        };
      }
    });
  }, []);

  const currentFaqItem = faqData.find((item) => item.id === id);
  // const openFaqItem = faqData.find(item => item.id === openQuestionId || item.id === id);

  useEffect(() => {
    const found = faqData.find((item) => item.id === openQuestionId);
    if (found) {
      setOpenFaqItem(found);
    }
  }, [openQuestionId]);

  if (!currentFaqItem) return null;

  return (
    <>
      <h2
          className={`${styles.title} ${styles.txtGradientRight} pl-[308px] mb-[30px] mt-[-8px] font-normal leading-[110%] text-[48px] text-[#CCCCCC]`}
      >
        Ответы на главные вопросы
      </h2>

      <div className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto px-[10px] mb-[90px] grid grid-cols-4 gap-[40px]">
        <aside className="sticky top-[65px] h-fit w-[260px] backdrop-blur-sm z-[9999]">
          {/* Промо блок */}
          {showRegisterPromo && (
              <div
                  className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[8px]`}
              >
                <p className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}
                >
                  При регистрации дарим 30 минут!
                </p>
                <div className="relative w-[220px] h-[51px] !overflow-hidden">
                  <button
                      className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} border !border-[#353535]  w-full !h-full group flex items-center !justify-between`}
                      data-text=""
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                  >

                    <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                      Попробовать
                    </span>

                    <svg
                        className={`${styles.sendIconLeft2}  transition-all !duration-[.15s] ease-in`}
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                          fill="#737373"
                      />
                    </svg>

                    <svg
                        className={`${styles.sendIconRight2}  transition-all !duration-[.15s] ease-in`}
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                          fill="#737373"
                      />
                    </svg>
                  </button>
                  <div className={styles.highlight} />
                </div>
              </div>
          )}

          {/* Сайдбар с картинкой и FAQAside */}
          <AnimatePresence mode="wait">
            {openQuestionId && openFaqItem ? (
                <motion.div
                    key={openFaqItem?.id}
                    initial={{ opacity: 1, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 6,
                      mass: 0.3,
                    }}
                    className="relative w-full h-[260px] mb-[20px] rounded-[8px] border border-[#353535]"
                >
                  <Image
                      src={openFaqItem.largeImgSrc}
                      alt={openFaqItem.question}
                      fill
                      sizes="260px"
                      className="rounded-[8px] object-cover"
                      priority={openFaqItem.id === id}
                      quality={85}
                      onLoadingComplete={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [openFaqItem.id]: true,
                          }))
                      }
                  />
                  {!loadedImages[openFaqItem.id] && (
                      <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-[8px]" />
                  )}
                </motion.div>
            ) : (
                <div className="relative w-full h-[260px] mb-[20px] rounded-[8px] border border-[#353535]">
                  <Image
                      src="/faq-default-img.png"
                      alt="Изображение по умолчанию"
                      fill
                      sizes="260px"
                      className="rounded-[8px] object-cover"
                      quality={85}
                      priority
                  />
                </div>
            )}
          </AnimatePresence>
        </aside>
        <div className="col-span-3">
          <div className="pb-[40px]">
            <section
                className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
            >
              {initialized && (
                  <CardListt
                      initialOpenId={openQuestionId ?? undefined}
                      onToggle={(id) => setOpenQuestionId(id)}
                  />
              )}
            </section>
          </div>
        </div>
      </div>

    </>
  );
}
