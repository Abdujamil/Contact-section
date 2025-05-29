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

  // const activeHash = useScrollSpy({ sectionIds, offset: 100 });

  const scrollSpyHash = useScrollSpy({ sectionIds, offset: 100 });
  const activeHash = scrollSpyHash || (items.length > 0 ? items[0].id : "");

  return (
    <ul className="space-y-4 font-bold text-sm">
      {items.map((item) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
        // const plainBaseId = baseId.replace("#", "");

        return (
          <>
            <li
              key={baseId}
            >
              <a
                href={baseId}
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
            </li>
          </>
        );
      })}
    </ul>
  );
}
