// "use client";
// import { useScrollSpy } from "../useScrollSpy";
// import React from "react";

// type AsideItem = {
//   id: string;
//   title: string;
//   subtitle: string[];
// };

// export default function BlogAside({ items }: { items: AsideItem[] }) {
//   const sectionIds = items.map((item) => item.id);
//   console.log("SectionIds", sectionIds);
//   const activeHash = useScrollSpy({ sectionIds, offset: 100 });

//   return (
//     <ul className="space-y-4 text-[#737373] font-bold text-sm">
//       {items.map((item) => (
//         <li key={item.id} className="group cursor-pointer">
//           <a
//             href={item.id}
//             className={`text-[16px] font-normal transition-colors duration-300 group-hover:text-[#3D9ED6]  ${
//               activeHash === item.id ? "text-[#3D9ED6]" : ""
//             }`}
//           >
//             {item.title}
//             {item.subtitle.map((sub, index) => [
//               <ul className={`list-disc pl-[15px] my-[10px]`}>
//                 <li key={index}>{sub}</li>
//               </ul>,
//             ])}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// }

"use client";
import { useScrollSpy } from "../useScrollSpy";
import React from "react";
// import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
// import HeaderStyles from "@/components/header/Header.module.css";
import styles from "@/app/page.module.scss";

type AsideItem = {
  id: string;
  title: string;
  subtitle: string[];
};

export default function BlogAside({ items }: { items: AsideItem[] }) {
  // Собираем все section IDs
  const sectionIds = items.flatMap((item) => {
    const baseId = item.id.replace(/^#/, "");
    const subtitleIds = item.subtitle.map(
      (_, subIndex) => `${baseId}-${subIndex}`
    );
    return [item.id, ...subtitleIds.map((id) => `#${id}`)];
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.removeProperty("--mouse-x");
    target.style.removeProperty("--mouse-y");
  };

  // const activeHash = useScrollSpy({ sectionIds, offset: 100 });

  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });
  const activeHash = scrollSpyHash || (items.length > 0 ? items[0].id : "");

  return (
    <ul className="space-y-4 font-bold text-sm pl-[15px] ">
      {items.map((item) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
        // const plainBaseId = baseId.replace("#", "");

        return (
          <>
            <li
              className={`
                list-disc
                marker:transition-all 
                marker:duration-150 
                ${
                  activeHash === baseId
                    ? "marker:text-[#3D9ED6]"
                    : "marker:text-transparent"
                }
              `}
              key={baseId}
            >
              <a
                href={baseId}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative block text-[16px] font-normal transition-colors 
                  ${styles.linkGlow}
                  ${
                    activeHash === baseId
                      ? "text-[#3D9ED6]" // активный цвет
                      : "text-[#878787] hover:text-[#ccc]"
                  } // обычный ховер
                `}
              >
                {item.title}
              </a>
            </li>
          </>
        );
      })}
    </ul>
  );
}
