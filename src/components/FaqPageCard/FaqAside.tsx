// "use client";
// import { useScrollSpy } from "../useScrollSpy";
// import styles from "@/app/page.module.scss";

// type AsideItem = {
//   id: string;
//   title: string;
// };

// export default function FaqAside({ items }: { items: AsideItem[] }) {
//   const sectionIds = items.map((item) => item.id);
//   const activeHash = useScrollSpy({ sectionIds, offset: 100 });

//   return (
//     <ul className="space-y-4 text-[#737373] font-bold text-sm">
//       {items.map((item) => (
//         <li key={item.id} className="group cursor-pointer">
//           <a
//             href={item.id}
//             className={`
//                 ${styles.linkGlow}
//                 text-[16px] font-normal transition-colors duration-300
//                 active:will-change-transform
//                 ${
//                   activeHash === item.id
//                     ? "text-[#3D9ED6]"
//                     : "text-[#878787] hover:text-[#ccc]"
//                 }
//                 active:scale-[.95]
//             `}
//           >
//             {item.title}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// }

"use client";
import { useScrollSpy } from "../useScrollSpy";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.scss";

type AsideItem = {
  id: string;
  title: string;
};

export default function FaqAside({ items }: { items: AsideItem[] }) {
  // Состояние для отслеживания кликнутого элемента
  const [clickedHash, setClickedHash] = useState<string | null>(null);

  const sectionIds = items.map((item) => item.id);
  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });

  // Используем кликнутый хеш, если он есть, иначе scrollSpy результат
  const activeHash =
    clickedHash || scrollSpyHash || (items.length > 0 ? items[0].id : "");

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
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;

        return (
          <div key={item.id}>
            <a
              href={baseId}
              onClick={() => handleAnchorClick(baseId)}
              className={`relative block text-[16px] font-normal
                ${styles.linkGlow}
                ${
                  activeHash === baseId
                    ? "text-[#3D9ED6]"
                    : "text-[#878787] hover:text-[#ccc]"
                }
                active:text-[#4a738c]
                active:will-change-transform
              `}
            >
              {item.title}
            </a>
          </div>
        );
      })}
    </div>
  );
}
