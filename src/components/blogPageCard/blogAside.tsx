// ScrollWrapper version(base)
// "use client";
// import { useScrollSpy } from "../useScrollSpy";
// import React, { useState, useEffect } from "react";
// import styles from "@/app/page.module.scss";
// import HeaderStyles from "../header/Header.module.css";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import { useScrollContainer } from "@/components/ScrollBar/ScrollWrapper";
//
// type AsideItem = {
//   id: string;
//   title: string;
//   subtitle?: string[];
// };
//
// export default function BlogAside({ items }: { items: AsideItem[] }) {
//   const scrollContainer = useScrollContainer();
//   // Состояние для отслеживания кликнутого элемента
//   const [clickedHash, setClickedHash] = useState<string | null>(null);
//   const [lastActiveHash, setLastActiveHash] = useState<string>("");
//
//   // Собираем все section IDs
//   // const sectionIds = items.flatMap((item) => {
//   //   const baseId = item.id.replace(/^#/, "");
//   //   const subtitleIds =
//   //     item.subtitle?.map((_, subIndex) => `${baseId}-${subIndex}`) ?? [];
//   //   return [item.id, ...subtitleIds.map((id) => `#${id}`)];
//   // });
//
//   // const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });
//   const sectionIds = items.map((item) => item.id);
//   const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });
//
//   // Используем кликнутый хеш, если он есть, иначе scrollSpy результат
//   // const activeHash =
//   //   clickedHash || scrollSpyHash || (items.length > 0 ? items[0].id : "");
//
//   // Сбрасываем кликнутый хеш когда scrollSpy догоняет
//
//   useEffect(() => {
//     if (clickedHash && scrollSpyHash === clickedHash) {
//       setClickedHash(null);
//     }
//   }, [clickedHash, scrollSpyHash]);
//
//   useEffect(() => {
//     if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
//       setLastActiveHash(scrollSpyHash);
//     }
//   }, [scrollSpyHash, lastActiveHash]);
//
//   // const handleAnchorClick = (href: string) => {
//   //   setClickedHash(href);
//   // };
//
//   useEffect(() => {
//     if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
//       setLastActiveHash(scrollSpyHash);
//     }
//   }, [scrollSpyHash, lastActiveHash]);
//
//   const activeHash = clickedHash || lastActiveHash;
//
//   useEffect(() => {
//     if (clickedHash && scrollSpyHash === clickedHash) {
//       setClickedHash(null);
//     }
//   }, [clickedHash, scrollSpyHash]);
//
//   const handleAnchorClick = (
//     href: string,
//     index: number,
//     e: React.MouseEvent
//   ) => {
//     e.preventDefault();
//
//     if (!scrollContainer) return;
//
//     // Получаем доступ к кастомному скроллу SimpleBar
//     type SimpleBarElement = HTMLElement & { __isSimpleBar?: boolean };
//
//     const simpleBar = (scrollContainer as SimpleBarElement).__isSimpleBar
//       ? scrollContainer
//       : scrollContainer?.closest(".simplebar-content-wrapper");
//
//     if (!simpleBar) return;
//
//
//
//     // Для остальных элементов - обычный скролл к якорю
//     const targetElement = scrollContainer.querySelector(href);
//     if (targetElement) {
//       const offset = 100;
//       const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
//       simpleBar.scrollTo({
//         top: targetPosition,
//         behavior: "smooth",
//       });
//       setClickedHash(href);
//     }
//   };
//
//   return (
//     <ul className="space-y-4 font-bold text-sm">
//       {items.map((item, index) => {
//         const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
//
//         return (
//           <li key={baseId}>
//             <a
//               href={baseId}
//               onClick={(e) => handleAnchorClick(baseId, index, e,)}
//               className={`relative !text-[16px] text-[#adadad] font-normal
//                 group
//                  ${styles["blogAsideBtn"]}
//                  ${HeaderStyles["login-button"]}
//                  ${styles["faqTryBtn"]}
//                  w-full !h-full flex items-center !justify-start !text-left
//                  font-normal text-[16px] leading-[20px] ease-in duration-150 !p-[12px] !rounded-[6px]
//                  ${
//                    activeHash === baseId
//                      ? `${styles.blogAsideBtnActive} !border-[#adadad]`
//                      : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
//                  }
//                 active:will-change-transform
//
//               `}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//             >
//               {item.title}
//             </a>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// ScrollWrapper v2
// "use client";
// import { useScrollSpy } from "../useScrollSpy";
// import React, { useState, useEffect } from "react";
// import styles from "@/app/page.module.scss";
// import HeaderStyles from "../header/Header.module.css";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import { useScrollContainer } from "@/components/ScrollBar/ScrollWrapper";

// type AsideItem = {
//   id: string;
//   title: string;
// };

// export default function BlogAside({ items }: { items: AsideItem[] }) {
//   const scrollContainer = useScrollContainer();
//   const [clickedHash, setClickedHash] = useState<string | null>(null);
//   const [lastActiveHash, setLastActiveHash] = useState<string>("");

//   const sectionIds = items.map((item) => item.id);
//   const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });

//   useEffect(() => {
//     if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
//       setLastActiveHash(scrollSpyHash);
//     }
//   }, [scrollSpyHash, lastActiveHash]);

//   const activeHash = clickedHash || lastActiveHash;

//   useEffect(() => {
//     if (clickedHash && scrollSpyHash === clickedHash) {
//       setClickedHash(null);
//     }
//   }, [clickedHash, scrollSpyHash]);

//   const handleAnchorClick = (
//     href: string,
//     index: number,
//     e: React.MouseEvent
//   ) => {
//     e.preventDefault();

//     if (!scrollContainer) return;

//     // Получаем доступ к кастомному скроллу SimpleBar
//     type SimpleBarElement = HTMLElement & { __isSimpleBar?: boolean };

//     const simpleBar = (scrollContainer as SimpleBarElement).__isSimpleBar
//       ? scrollContainer
//       : scrollContainer?.closest(".simplebar-content-wrapper");

//     if (!simpleBar) return;

//     // Для первого элемента - скроллим в самый верх
//     if (index === 0) {
//       // simpleBar.scrollTo({ top: 0, behavior: "smooth" });
//       // setClickedHash(href);
//       // window.history.pushState(null, "", window.location.pathname);
//       // return;
//     }

//     // Для последнего элемента - скроллим в самый низ
//     if (index === items.length - 1) {
//       // simpleBar.scrollTo({
//       //   top: simpleBar.scrollHeight,
//       //   behavior: "smooth",
//       // });
//       // setClickedHash(href);
//       // window.history.pushState(null, "", window.location.pathname + href);
//       // return;
//     }

//     // Для остальных элементов - обычный скролл к якорю
//     const targetElement = scrollContainer.querySelector(href);
//     if (targetElement) {
//       const offset = 100;
//       const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
//       simpleBar.scrollTo({
//         top: targetPosition,
//         behavior: "smooth",
//       });
//       setClickedHash(href);
//     }
//   };

//   return (
//     <ul className="space-y-[5px] font-bold text-sm">
//       {items.map((item, index) => {
//         const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
//         // const isFirst = index === 0;
//         // const isLast = index === items.length - 1;

//         return (
//           <li key={baseId}>
//             <a
//               href={baseId} // Для первого элемента используем #top
//               onClick={(e) => {
//                 handleAnchorClick(baseId, index, e);
//               }}
//               className={`
//                 group
//                 ${styles["blogAsideBtn"]}
//                 ${HeaderStyles["login-button"]}
//                 ${styles["faqTryBtn"]}
//                 w-full !h-full flex items-center !justify-start !text-left
//                 font-normal text-[16px] leading-[20px] ease-in duration-150 !p-[12px] !rounded-[6px]
//                 ${
//                   activeHash === baseId
//                     ? `${styles.blogAsideBtnActive} !text-[#3D9ED6] !border-[#adadad]`
//                     : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
//                 }
//               `}
//               data-text=""
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//             >
//               <span
//                 className={`w-full !text-[16px] text-[#adadad] ${
//                   activeHash === baseId ? "!text-[#adadad]" : ""
//                 }`}
//               >
//                 {item.title}
//               </span>

//               {activeHash === baseId && <div className={styles.highlight} />}
//             </a>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// SmoothScroll
"use client";
import { useScrollSpy } from "../useScrollSpy";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "../header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import { usePathname } from "next/navigation";

type AsideItem = {
  id: string;
  title: string;
  subtitle?: string[];
};

export default function BlogAside({ items }: { items: AsideItem[] }) {
  // const pathname = usePathname();
  // Состояние для отслеживания кликнутого элемента
  const [clickedHash, setClickedHash] = useState<string | null>(null);
  const [lastActiveHash, setLastActiveHash] = useState<string>("");

  const sectionIds = items.map((item) => item.id);
  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });


  useEffect(() => {
    if (clickedHash && scrollSpyHash === clickedHash) {
      setClickedHash(null);
    }
  }, [clickedHash, scrollSpyHash]);

  useEffect(() => {
    if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
      setLastActiveHash(scrollSpyHash);
    }
  }, [scrollSpyHash, lastActiveHash]);

  const activeHash = clickedHash || lastActiveHash;

  const handleAnchorClick = (
      href: string,
      index: number,
      e: React.MouseEvent
  ) => {
    e.preventDefault();

    // Теперь используем обычный DOM, не SimpleBar
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 100 // Используем тот же offset что и в SmoothScroll
      const targetPosition = (targetElement as HTMLElement).offsetTop - offset;

      // Используем window.scrollTo для совместимости с SmoothScroll
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setClickedHash(href);
    }
  };

  return (
      <ul className="space-y-4 font-bold text-sm">
        {items.map((item, index) => {
          const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;

          return (
              <li key={baseId}>
                <a
                    href={baseId}
                    onClick={(e) => handleAnchorClick(baseId, index, e)}
                    className={`relative !text-[16px] text-[#adadad] font-normal
                group
                 ${styles["blogAsideBtn"]}
                 ${HeaderStyles["login-button"]}
                 ${styles["faqTryBtn"]}
                 w-full !h-full flex items-center !justify-start !text-left
                 font-normal text-[16px] leading-[20px] ease-in duration-150 !p-[12px] !rounded-[6px]
                 ${
                        activeHash === baseId
                            ? `${styles.blogAsideBtnActive} !border-[#adadad]`
                            : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
                    }
                active:will-change-transform
              `}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                  {item.title}
                </a>
              </li>
          );
        })}
      </ul>
  );
}