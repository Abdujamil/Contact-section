// import {useEffect, useState} from "react";

// interface UseScrollSpyOptions {
//     sectionIds: string[]; // список ID секций с якорями
//     offset?: number;      // насколько раньше триггерить активацию (в пикселях)
//     threshold?: number;   // доля видимости (0–1)
// }

// /**
//  * useScrollSpy — определяет активную секцию при скролле
//  */
// export function useScrollSpy({
//                                  sectionIds,
//                                  offset = 0,
//                                  threshold = 0.5,
//                              }: UseScrollSpyOptions) {
//     const [activeId, setActiveId] = useState<string | null>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 const visible = entries
//                     .filter((entry) => entry.isIntersecting)
//                     .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

//                 if (visible.length > 0) {
//                     const firstVisible = visible[0];
//                     setActiveId("#" + firstVisible.target.id);
//                 }
//             },
//             {
//                 threshold,
//                 rootMargin: `-${offset}px 0px -50% 0px`,
//             }
//         );

//         sectionIds.forEach((id) => {
//             const el = document.getElementById(id.replace("#", ""));
//             if (el) observer.observe(el);
//         });

//         return () => observer.disconnect();
//     }, [sectionIds, offset, threshold]);

//     return activeId;
// }


import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const scrollContainer =
      document.querySelector('[data-simplebar] .simplebar-content-wrapper') || window;

    const handleScroll = () => {
      let currentId: string | null = null;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();

        if (rect.top - offset <= 0) {
          currentId = `#${el.id}`;
        } else {
          break;
        }
      }

      // Обновляем только если нашли новый активный id
      if (currentId && currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // начальный запуск

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset, activeId]);

  return activeId;
}

