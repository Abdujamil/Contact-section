// "use client";
// // @ts-expect-error: типы ломаются из-за package.json exports
// import SimpleBar from "simplebar-react";
// import { useRef, useEffect } from "react";
// import "simplebar-react/dist/simplebar.min.css";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function ScrollWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const simpleBarRef = useRef<SimpleBar | null>(null);

// //   const [scrollStopThreshold, setScrollStopThreshold] = useState(0.1); // "остановка при"
// //   const [scrollEaseFactor, setScrollEaseFactor] = useState(0.2); // "насколько плавный скролл"

//   const scrollStopThreshold = 0.1;
//   const scrollEaseFactor = 0.2;

//   const thresholdRef = useRef(scrollStopThreshold);
//   const easeRef = useRef(scrollEaseFactor);

//   useEffect(() => {
//     thresholdRef.current = scrollStopThreshold;
//   }, [scrollStopThreshold]);

//   useEffect(() => {
//     easeRef.current = scrollEaseFactor;
//   }, [scrollEaseFactor]);

//   useEffect(() => {
//     if (!simpleBarRef.current) return;

//     const scrollContainer = simpleBarRef.current.getScrollElement();

//     // === ScrollTrigger proxy ===
//     ScrollTrigger.scrollerProxy(scrollContainer, {
//       scrollTop(value) {
//         if (arguments.length) {
//           scrollContainer.scrollTop = value;
//         }
//         return scrollContainer.scrollTop;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       pinType: scrollContainer.style.transform ? "transform" : "fixed",
//     });

//     let currentScroll = 0;
//     let targetScroll = 0;
//     let isScrolling = false;

//     const initScroll = () => {
//       currentScroll = scrollContainer.scrollTop;
//       targetScroll = currentScroll;
//     };

//     // const smoothScroll = () => {
//     //   const diff = targetScroll - currentScroll;
//     //   if (Math.abs(diff) < 0.05) {
//     //     currentScroll = targetScroll;
//     //     scrollContainer.scrollTop = currentScroll;
//     //     isScrolling = false;
//     //     return;
//     //   }

//     //   currentScroll += diff * 0.07;
//     //   scrollContainer.scrollTop = currentScroll;
//     //   requestAnimationFrame(smoothScroll);
//     // };

//     const smoothScroll = () => {
//       const diff = targetScroll - currentScroll;
//       if (Math.abs(diff) < thresholdRef.current) {
//         currentScroll = targetScroll;
//         scrollContainer.scrollTop = currentScroll;
//         isScrolling = false;
//         return;
//       }

//       currentScroll += diff * easeRef.current;
//       scrollContainer.scrollTop = currentScroll;
//       requestAnimationFrame(smoothScroll);
//     };

//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();
//       targetScroll += e.deltaY;

//       const maxScroll =
//         scrollContainer.scrollHeight - scrollContainer.clientHeight;
//       targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

//       if (!isScrolling) {
//         isScrolling = true;
//         requestAnimationFrame(smoothScroll);
//       }
//     };

//     const handleScroll = () => {
//       if (!isScrolling) {
//         currentScroll = scrollContainer.scrollTop;
//         targetScroll = currentScroll;
//       }

//       // Scroll-based animation
//       const section = scrollContainer.querySelector(
//         "#sectionPin"
//       ) as HTMLElement;
//       const pinWrap = scrollContainer.querySelector(".pin-wrap") as HTMLElement;
//       if (!section || !pinWrap) return;

//       const sectionTop = section.offsetTop;
//       const scrollY = scrollContainer.scrollTop;
//       const scrollLength = pinWrap.scrollWidth - window.innerWidth;

//       if (scrollY >= sectionTop && scrollY <= sectionTop + scrollLength) {
//         const progress = (scrollY - sectionTop) / scrollLength;
//         pinWrap.style.transform = `translateX(${-progress * scrollLength}px)`;
//       }

//       ScrollTrigger.update(); // sync ScrollTrigger
//     };

//     const handleAnchorClick = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.tagName === "A") {
//         const anchor = target.getAttribute("href");
//         if (anchor?.startsWith("#")) {
//           const el = scrollContainer.querySelector(anchor);
//           if (el) {
//             e.preventDefault();

//             //   const elTop = (el as HTMLElement).offsetTop;
//             const offset = 200; // отступ вверх (в пикселях)
//             const elTop = (el as HTMLElement).offsetTop + offset;

//             const maxScroll =
//               scrollContainer.scrollHeight - scrollContainer.clientHeight;

//             targetScroll = Math.max(0, Math.min(elTop, maxScroll));

//             if (!isScrolling) {
//               isScrolling = true;
//               requestAnimationFrame(smoothScroll);
//             }
//           }
//         }
//       }
//     };

//     const setupAnimation = () => {
//       const pinWrap = scrollContainer.querySelector(".pin-wrap") as HTMLElement;
//       const section = scrollContainer.querySelector(
//         "#sectionPin"
//       ) as HTMLElement;

//       if (!pinWrap || !section) return;

//       const pinWrapWidth = pinWrap.scrollWidth;
//       const horizontalScrollLength = pinWrapWidth - window.innerWidth;

//       gsap.to(pinWrap, {
//         x: -horizontalScrollLength,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           scroller: scrollContainer,
//           scrub: true,
//           pin: true,
//           start: "top top",
//           end: () => `${pinWrapWidth}px`,
//         },
//       });

//       ScrollTrigger.addEventListener("refresh", () => {
//         // ScrollTrigger.update();
//         if (!isScrolling) ScrollTrigger.update();
//       });

//       ScrollTrigger.refresh();
//     };

//     initScroll();

//     scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
//     scrollContainer.addEventListener("scroll", handleScroll);
//     scrollContainer.addEventListener("click", handleAnchorClick);

//     requestAnimationFrame(setupAnimation);

//     return () => {
//       scrollContainer.removeEventListener("wheel", handleWheel);
//       scrollContainer.removeEventListener("scroll", handleScroll);
//       scrollContainer.removeEventListener("click", handleAnchorClick);
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <>
//       {/* <div className="fixed top-[10%] left-0 z-50 bg-black text-white p-2 text-xs space-y-2">
//         <div>
//           <label>
//             Порог остановки (threshold): {scrollStopThreshold.toFixed(3)}
//           </label>
//           <input
//             type="range"
//             min="0.001"
//             max="0.5"
//             step="0.001"
//             value={scrollStopThreshold}
//             onChange={(e) => setScrollStopThreshold(parseFloat(e.target.value))}
//           />
//         </div>
//         <div>
//           <label>
//              Скорость плавности (ease): {scrollEaseFactor.toFixed(3)}
//           </label>
//           <input
//             type="range"
//             min="0.01"
//             max="0.5"
//             step="0.001"
//             value={scrollEaseFactor}
//             onChange={(e) => setScrollEaseFactor(parseFloat(e.target.value))}
//           />
//         </div>
//       </div> */}
//       <SimpleBar
//         className="max-h-screen"
//         ref={simpleBarRef}
//         style={{ overflowAnchor: "none"}}
//       >
//         {children}
//       </SimpleBar>
//     </>
//   );
// }

"use client";
// @ts-expect-error: типы ломаются из-за package.json exports
import SimpleBar from "simplebar-react";
import { useRef, useEffect, createContext, useContext, ReactNode } from "react";
import "simplebar-react/dist/simplebar.min.css";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Создаем контекст для передачи scroll ref'а
const ScrollContext = createContext<HTMLElement | null>(null);

export const useScrollContainer = () => {
  return useContext(ScrollContext);
};

interface ScrollWrapperProps {
  children: ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const simpleBarRef = useRef<SimpleBar | null>(null);
  const scrollStopThreshold = 0.1;
  const scrollEaseFactor = 0.2;

  const thresholdRef = useRef(scrollStopThreshold);
  const easeRef = useRef(scrollEaseFactor);

  useEffect(() => {
    thresholdRef.current = scrollStopThreshold;
  }, [scrollStopThreshold]);

  useEffect(() => {
    easeRef.current = scrollEaseFactor;
  }, [scrollEaseFactor]);

  useEffect(() => {
    if (!simpleBarRef.current) return;

    const scrollContainer = simpleBarRef.current.getScrollElement();

    // === ScrollTrigger proxy ===
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        if (arguments.length) {
          scrollContainer.scrollTop = value;
        }
        return scrollContainer.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollContainer.style.transform ? "transform" : "fixed",
    });

    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;

    const initScroll = () => {
      currentScroll = scrollContainer.scrollTop;
      targetScroll = currentScroll;
    };

    const smoothScroll = () => {
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) < thresholdRef.current) {
        currentScroll = targetScroll;
        scrollContainer.scrollTop = currentScroll;
        isScrolling = false;
        return;
      }

      currentScroll += diff * easeRef.current;
      scrollContainer.scrollTop = currentScroll;
      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY;

      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = () => {
      if (!isScrolling) {
        currentScroll = scrollContainer.scrollTop;
        targetScroll = currentScroll;
      }

      // Scroll-based animation
      const section = scrollContainer.querySelector(
        "#sectionPin"
      ) as HTMLElement;
      const pinWrap = scrollContainer.querySelector(".pin-wrap") as HTMLElement;
      if (!section || !pinWrap) return;

      const sectionTop = section.offsetTop;
      const scrollY = scrollContainer.scrollTop;
      const scrollLength = pinWrap.scrollWidth - window.innerWidth;

      if (scrollY >= sectionTop && scrollY <= sectionTop + scrollLength) {
        const progress = (scrollY - sectionTop) / scrollLength;
        pinWrap.style.transform = `translateX(${-progress * scrollLength}px)`;
      }

      ScrollTrigger.update(); // sync ScrollTrigger
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const anchor = target.getAttribute("href");
        if (anchor?.startsWith("#")) {
          const el = scrollContainer.querySelector(anchor);
          if (el) {
            e.preventDefault();

            const offset = 180; // отступ вверх (в пикселях)
            const elTop = (el as HTMLElement).offsetTop + offset;

            const maxScroll =
              scrollContainer.scrollHeight - scrollContainer.clientHeight;

            targetScroll = Math.max(0, Math.min(elTop, maxScroll));

            if (!isScrolling) {
              isScrolling = true;
              requestAnimationFrame(smoothScroll);
            }
          }
        }
      }
    };

    // const handleAnchorClick = (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   if (target.tagName === "A") {
    //     const anchor = target.getAttribute("href");
    //     if (!anchor) return;

    //     e.preventDefault();

    //     // Получаем индекс элемента из data-атрибута
    //     const index = target.dataset.index ? parseInt(target.dataset.index) : -1;
    //     const totalItems = target.dataset.totalItems ? parseInt(target.dataset.totalItems) : -1;

    //     // Для первого элемента - скролл вверх
    //     if (anchor === "#top" || index === 0) {
    //       targetScroll = 0;
    //     }
    //     // Для последнего элемента - скролл вниз
    //     else if (index === totalItems - 1) {
    //       targetScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    //     }
    //     // Для остальных якорей
    //     else if (anchor.startsWith("#") && anchor !== "#") {
    //       const el = scrollContainer.querySelector(anchor);
    //       if (el) {
    //         const offset = 150;
    //         const elTop = (el as HTMLElement).offsetTop - offset;
    //         targetScroll = Math.max(0, Math.min(elTop, scrollContainer.scrollHeight - scrollContainer.clientHeight));
    //       }
    //     }

    //     if (!isScrolling) {
    //       isScrolling = true;
    //       requestAnimationFrame(smoothScroll);
    //     }
    //   }
    // };

    const setupAnimation = () => {
      const pinWrap = scrollContainer.querySelector(".pin-wrap") as HTMLElement;
      const section = scrollContainer.querySelector(
        "#sectionPin"
      ) as HTMLElement;

      if (!pinWrap || !section) return;

      const pinWrapWidth = pinWrap.scrollWidth;
      const horizontalScrollLength = pinWrapWidth - window.innerWidth;

      gsap.to(pinWrap, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller: scrollContainer,
          scrub: true,
          pin: true,
          start: "top top",
          end: () => `${pinWrapWidth}px`,
        },
      });

      ScrollTrigger.addEventListener("refresh", () => {
        if (!isScrolling) ScrollTrigger.update();
      });

      ScrollTrigger.refresh();
    };

    initScroll();

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("click", handleAnchorClick);

    requestAnimationFrame(setupAnimation);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("scroll", handleScroll);
      scrollContainer.removeEventListener("click", handleAnchorClick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    const scrollContainer = simpleBarRef.current?.getScrollElement();
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [pathname]);

  // Получаем scroll контейнер для передачи в контекст
  const scrollContainer = simpleBarRef.current?.getScrollElement() || null;

  return (
    <ScrollContext.Provider value={scrollContainer}>
      <SimpleBar
        className="max-h-screen"
        ref={simpleBarRef}
        style={{ overflowAnchor: "none" }}
      >
        {children}
      </SimpleBar>
    </ScrollContext.Provider>
  );
}
