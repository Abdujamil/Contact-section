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

  const activeHash = useScrollSpy({ sectionIds, offset: 100 });

  return (
    <ul className="space-y-4 text-[#737373] font-bold text-sm">
      {items.map((item) => {
        const baseId = item.id.startsWith("#") ? item.id : `#${item.id}`;
        // const plainBaseId = baseId.replace("#", "");

        return (
          <li key={baseId}>
            {/* Главный заголовок */}
            <a
              href={baseId}
              className={`block text-[16px] font-normal transition-colors duration-300 hover:text-[#3D9ED6] ${
                activeHash === baseId ? "text-[#3D9ED6]" : ""
              }`}
            >
              {item.title}
            </a>

            {/* Подзаголовки */}
            {/* {item.subtitle.length > 0 && (
              <ul className="list-disc pl-[15px] font-normal my-[15px]">
                {item.subtitle.map((sub, subIndex) => {
                  const subId = `${plainBaseId}-${subIndex}`; // e.g. "about-0"
                  const isActive = activeHash === `#${subId}`;

                  return (
                    <li className="my-[15px]" key={subId}>
                      <a
                        href={`#${subId}`}
                        className={`transition-colors text-[16px] duration-300 hover:text-[#3D9ED6] font-normal ${
                          isActive ? "text-[#3D9ED6]" : ""
                        }`}
                      >
                        {sub}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )} */}
          </li>
        );
      })}
    </ul>
  );
}
