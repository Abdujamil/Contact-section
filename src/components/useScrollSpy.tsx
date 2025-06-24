
// v-1
// import { useEffect, useState } from "react";

// interface UseScrollSpyOptions {
//   sectionIds: string[];
//   offset?: number;
// }

// export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
//   const [activeId, setActiveId] = useState<string | null>(null);

//   useEffect(() => {
//     const elements = sectionIds
//       .map((id) => document.getElementById(id.replace("#", "")))
//       .filter(Boolean) as HTMLElement[];

//     if (elements.length === 0) return;

//     const scrollContainer =
//       document.querySelector('[data-simplebar] .simplebar-content-wrapper') || window;

//     const handleScroll = () => {
//       let currentId: string | null = null;

//       for (let i = 0; i < elements.length; i++) {
//         const el = elements[i];
//         const rect = el.getBoundingClientRect();

//         if (rect.top - offset <= 0) {
//           currentId = `#${el.id}`;
//         } else {
//           break;
//         }
//       }

//       // Обновляем только если нашли новый активный id
//       if (currentId && currentId !== activeId) {
//         setActiveId(currentId);
//       }
//     };

//     scrollContainer.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleScroll);
//     handleScroll(); // начальный запуск

//     return () => {
//       scrollContainer.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleScroll);
//     };
//   }, [sectionIds, offset, activeId]);

//   return activeId;
// }

// v-2
import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [initialScrollY, setInitialScrollY] = useState<number>(0);

  useEffect(() => {
    const elements = sectionIds
        .map((id) => document.getElementById(id.replace("#", "")))
        .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const scrollContainer =
        document.querySelector("[data-simplebar] .simplebar-content-wrapper") ||
        window;

    // Запоминаем начальную позицию скролла с небольшой задержкой
    const timer = setTimeout(() => {
      setInitialScrollY(window.scrollY || window.pageYOffset);
    }, 100);

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const scrollThreshold = 20; // Порог в пикселях

      // Проверяем, действительно ли пользователь проскроллил достаточно
      if (!hasScrolled && Math.abs(currentScrollY - initialScrollY) > scrollThreshold) {
        setHasScrolled(true);
        // Как только начали скроллить - сразу активируем первый элемент
        if (elements.length > 0) {
          const firstElementId = `#${elements[0].id}`;
          if (activeId !== firstElementId) {
            setActiveId(firstElementId);
          }
          return; // Выходим, чтобы не перезаписать логикой ниже
        }
      }

      let foundActiveId: string | null = null;

      // Находим активный элемент только если пользователь уже скроллил
      if (hasScrolled) {
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          const rect = el.getBoundingClientRect();

          if (rect.top - offset <= 0) {
            foundActiveId = `#${el.id}`;
          } else {
            break;
          }
        }

        // Если нашли активный элемент - обновляем
        if (foundActiveId && foundActiveId !== activeId) {
          setActiveId(foundActiveId);
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timer);
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset, activeId, hasScrolled, initialScrollY]);

  return activeId;
}



// import { useEffect, useState } from "react";

// interface UseScrollSpyOptions {
//   sectionIds: string[];
//   offset?: number;
// }

// export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
//   const [activeId, setActiveId] = useState<string | null>(null);

//   useEffect(() => {
//     const elements = sectionIds
//       .map((id) => document.getElementById(id.replace("#", "")))
//       .filter(Boolean) as HTMLElement[];

//     if (elements.length === 0) return;

//     const scrollContainer =
//       document.querySelector("[data-simplebar] .simplebar-content-wrapper") ||
//       window;

//     const handleScroll = () => {
//       let foundActiveId: string | null = null;

//       // Находим активный элемент
//       for (let i = 0; i < elements.length; i++) {
//         const el = elements[i];
//         const rect = el.getBoundingClientRect();

//         if (rect.top - offset <= 0) {
//           foundActiveId = `#${el.id}`;
//         } else {
//           break;
//         }
//       }

//       // Если нашли активный элемент - обновляем
//       if (foundActiveId) {
//         if (foundActiveId !== activeId) {
//           setActiveId(foundActiveId);
//         }
//       } else {
//         // Если не нашли активный элемент, проверяем - не находимся ли мы в самом начале
//         if (elements.length > 0) {
//           const firstElement = elements[0];
//           const firstRect = firstElement.getBoundingClientRect();

//           // Если первый элемент еще не дошел до offset, активируем его
//           if (firstRect.top > offset && activeId !== `#${firstElement.id}`) {
//             setActiveId(`#${firstElement.id}`);
//           }
//           // Иначе сохраняем текущий activeId (не сбрасываем)
//         }
//       }
//     };

//     scrollContainer.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleScroll);
//     handleScroll(); // начальный запуск

//     return () => {
//       scrollContainer.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleScroll);
//     };
//   }, [sectionIds, offset, activeId]);

//   return activeId;
// }
