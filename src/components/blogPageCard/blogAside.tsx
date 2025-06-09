// "use client";
// import { useScrollSpy } from "../useScrollSpy";
// import React, { useState, useEffect } from "react";
// import styles from "@/app/page.module.scss";

// type AsideItem = {
//   id: string;
//   title: string;
//   subtitle: string[];
// };

// export default function BlogAside({ items }: { items: AsideItem[] }) {
//   // Состояние для отслеживания кликнутого элемента
//   const [clickedHash, setClickedHash] = useState<string | null>(null);

//   // Собираем все section IDs
//   const sectionIds = items.flatMap((item) => {
//     const baseId = item.id.replace(/^#/, "");
//     const subtitleIds = item.subtitle.map(
//       (_, subIndex) => `${baseId}-${subIndex}`
//     );
//     return [item.id, ...subtitleIds.map((id) => `#${id}`)];
//   });

//   const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });

//   // Используем кликнутый хеш, если он есть, иначе scrollSpy результат
//   const activeHash = clickedHash || scrollSpyHash || (items.length > 0 ? items[0].id : "");

//   // Сбрасываем кликнутый хеш когда scrollSpy догоняет
//   useEffect(() => {
//     if (clickedHash && scrollSpyHash === clickedHash) {
//       setClickedHash(null);
//     }
//   }, [clickedHash, scrollSpyHash]);

//   const handleAnchorClick = (href: string) => {
//     setClickedHash(href);
//   };

//   return (
//     <ul className="space-y-4 font-bold text-sm">
//       {items.map((item) => {
//         const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;

//         return (
//           <li key={baseId}>
//             <a
//               href={baseId}
//               onClick={() => handleAnchorClick(baseId)}
//               className={`relative block text-[16px] font-normal
//                 ${styles.linkGlow}
//                 ${
//                   activeHash === baseId
//                     ? "text-[#3D9ED6]"
//                     : "text-[#878787] hover:text-[#ccc]"
//                 }
//                 active:text-[#4a738c]
//                 active:will-change-transform
//               `}
//             >
//               {item.title}
//             </a>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

"use client";
import { useScrollSpy } from "../useScrollSpy";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "../header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { useScrollContainer } from "@/components/ScrollBar/ScrollWrapper";

type AsideItem = {
  id: string;
  title: string;
};

export default function BlogAside({ items }: { items: AsideItem[] }) {
  const scrollContainer = useScrollContainer();
  const [clickedHash, setClickedHash] = useState<string | null>(null);
  const [lastActiveHash, setLastActiveHash] = useState<string>("");

  const sectionIds = items.map((item) => item.id);
  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });

  useEffect(() => {
    if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
      setLastActiveHash(scrollSpyHash);
    }
  }, [scrollSpyHash, lastActiveHash]);

  const activeHash = clickedHash || lastActiveHash;

  useEffect(() => {
    if (clickedHash && scrollSpyHash === clickedHash) {
      setClickedHash(null);
    }
  }, [clickedHash, scrollSpyHash]);

  const handleAnchorClick = (
    href: string,
    index: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (!scrollContainer) return;

    // Получаем доступ к кастомному скроллу SimpleBar
    type SimpleBarElement = HTMLElement & { __isSimpleBar?: boolean };

    const simpleBar = (scrollContainer as SimpleBarElement).__isSimpleBar
      ? scrollContainer
      : scrollContainer?.closest(".simplebar-content-wrapper");

    if (!simpleBar) return;

    // Для первого элемента - скроллим в самый верх
    if (index === 0) {
      simpleBar.scrollTo({ top: 0, behavior: "smooth" });
      setClickedHash(href);
      window.history.pushState(null, "", window.location.pathname);
      return;
    }

    // Для последнего элемента - скроллим в самый низ
    if (index === items.length - 1) {
      simpleBar.scrollTo({
        top: simpleBar.scrollHeight,
        behavior: "smooth",
      });
      setClickedHash(href);
      window.history.pushState(null, "", window.location.pathname + href);
      return;
    }

    // Для остальных элементов - обычный скролл к якорю
    const targetElement = scrollContainer.querySelector(href);
    if (targetElement) {
      const offset = 100;
      const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
      simpleBar.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setClickedHash(href);
    }
  };

  return (
    <ul className="space-y-[5px] font-bold text-sm">
      {items.map((item, index) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
        // const isFirst = index === 0;
        // const isLast = index === items.length - 1;

        return (
          <li key={baseId}>
            <a
              href={baseId} // Для первого элемента используем #top
              onClick={(e) => handleAnchorClick(baseId, index, e)}
              className={`
                group
                ${styles["blogAsideBtn"]}
                ${HeaderStyles["login-button"]}
                ${styles["faqTryBtn"]}
                w-full !h-full flex items-center !justify-start !text-left
                font-normal text-[16px] leading-[20px] ease-in duration-150 !p-[12px] !rounded-[6px]
                ${
                  activeHash === baseId
                    ? `${styles.blogAsideBtnActive} !text-[#3D9ED6] !border-[#adadad]`
                    : "!border-transparent hover:!border-[#353535] group-hover:!text-[#ccc]"
                }
              `}
              data-text=""
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`w-full !text-[16px] ${
                  activeHash === baseId
                    ? "!text-[#3D9ED6]"
                    : "group-hover:!text-[#ccc]"
                }`}
              >
                {item.title}
              </span>

              {activeHash === baseId && <div className={styles.highlight} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
