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

type AsideItem = {
  id: string;
  title: string;
};

export default function BlogAside({ items }: { items: AsideItem[] }) {
  // Состояние для отслеживания кликнутого элемента
  const [clickedHash, setClickedHash] = useState<string | null>(null);
  // Состояние для сохранения последнего активного элемента
  const [lastActiveHash, setLastActiveHash] = useState<string>("");

  const sectionIds = items.map((item) => item.id);

  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });

  // Обновляем lastActiveHash когда scrollSpy находит новый активный элемент
  useEffect(() => {
    if (scrollSpyHash && scrollSpyHash !== lastActiveHash) {
      setLastActiveHash(scrollSpyHash);
    }
  }, [scrollSpyHash, lastActiveHash]);

  // Используем кликнутый хеш, если он есть, иначе последний активный
  const activeHash = clickedHash || lastActiveHash;

  // Сбрасываем кликнутый хеш когда scrollSpy догоняет
  useEffect(() => {
    if (clickedHash && scrollSpyHash === clickedHash) {
      setClickedHash(null);
    }
  }, [clickedHash, scrollSpyHash]);

  const handleAnchorClick = (href: string) => {
    setClickedHash(href);
  };

  return (
    <ul className="space-y-4 font-bold text-sm">
      {items.map((item) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;

        return (
          <li key={baseId}>
            {/* <div className="relative w-full !overflow-hidden">
              <a
                href={baseId}
                className={`${styles["blogAsideBtn"]} ${HeaderStyles["login-button"]} ${styles["faqTryBtn"]} w-full !h-full group flex items-center !justify-start !text-left
                ${
                   activeHash === baseId
                     ? "!border-[#353535]"
                     : "!text-[#878787] hover:text-[#ccc] !border-transparent !group-hover:text-[#ccc]"
                 } 
                `}
                data-text=""
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className={`font-normal text-[16px] leading-[20px] !ease-in
                 ${
                   activeHash === baseId
                     ? "!text-[#3D9ED6] border-[#353535]"
                     : "!text-[#878787] hover:text-[#ccc] border-transparent !group-hover:text-[#ccc]"
                 } 
                `}
                >
                  {item.title}
                </span>
              </a>
              {activeHash === baseId && <div className={styles.highlight} />}
            </div> */}

            <a
              href={baseId}
              onClick={() => handleAnchorClick(baseId)}
              className={`
                  ${styles["blogAsideBtn"]}
                  ${HeaderStyles["login-button"]}
                  ${styles["faqTryBtn"]}
                  w-full !h-full group flex items-center !justify-start !text-left
                  font-normal text-[16px] leading-[20px] ease-in duration-150
                  ${
                    activeHash === baseId
                      ? "!text-[#3D9ED6] !border-[#353535]"
                      : "!text-[#878787] !border-transparent hover:!text-[#ccc] hover:!border-[#ccc]"
                  }
                `}
              data-text=""
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`w-full ${
                    activeHash === baseId
                      ? "!text-[#3D9ED6] !border-[#353535]"
                      : "!text-[#878787] group-hover:!text-[#ccc]"
                  }`}>{item.title}</span>
            </a>

            {/* <a
              href={baseId}
              onClick={() => handleAnchorClick(baseId)}
              className={`relative block text-[16px] font-normal p-[6px] rounded-[6px] border
                ${styles.linkGlow}
                ${
                  activeHash === baseId
                    ? "text-[#3D9ED6] border-[#353535]"
                    : "text-[#878787] hover:text-[#ccc] border-transparent hover:border-[#ccc] "
                } 
                active:text-[#4a738c]
                 active:will-change-transform
              `}
            >
              {item.title}
            </a> */}
          </li>
        );
      })}
    </ul>
  );
}
