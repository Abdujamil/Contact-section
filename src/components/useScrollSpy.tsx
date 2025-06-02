
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

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const scrollContainer =
      document.querySelector("[data-simplebar] .simplebar-content-wrapper") ||
      window;

    const handleScroll = () => {
      // Отмечаем, что пользователь начал скроллить
      if (!hasScrolled) {
        setHasScrolled(true);
      }

      let foundActiveId: string | null = null;

      // Находим активный элемент
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
      if (foundActiveId) {
        if (foundActiveId !== activeId) {
          setActiveId(foundActiveId);
        }
      } else {
        // Если не нашли активный элемент, проверяем - не находимся ли мы в самом начале
        if (elements.length > 0 && hasScrolled) {
          const firstElement = elements[0];
          const firstRect = firstElement.getBoundingClientRect();

          // Если первый элемент еще не дошел до offset, активируем его
          if (firstRect.top > offset && activeId !== `#${firstElement.id}`) {
            setActiveId(`#${firstElement.id}`);
          }
          // Иначе сохраняем текущий activeId (не сбрасываем)
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Убираем начальный запуск handleScroll()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset, activeId, hasScrolled]);

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
