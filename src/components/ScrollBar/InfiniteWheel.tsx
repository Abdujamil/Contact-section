// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { Observer } from "gsap/Observer";
//
// gsap.registerPlugin(Observer);
//
// interface WheelProps {
//     items: string[];
//     onSelect: (value: string) => void;
//     initialIndex?: number;
//     className?: string;
// }
//
// export default function InfiniteWheel({
//                                           items,
//                                           onSelect,
//                                           initialIndex = 0,
//                                           className = "",
//                                       }: WheelProps) {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
//
//     // refs to control animation / index safely inside callbacks
//     const isAnimatingRef = useRef(false);
//     const currentIndexRef = useRef<number>(initialIndex);
//     const obsRef = useRef<any>(null);
//
//     // Создаем бесконечный массив для плавной прокрутки
//     const createInfiniteArray = (baseArray: string[], repeatCount: number = 5): string[] => {
//         const result: string[] = [];
//         for (let i = 0; i < repeatCount; i++) {
//             result.push(...baseArray);
//         }
//         return result;
//     };
//
//     const infiniteItems = createInfiniteArray(items, 5);
//     const middleStartIndex = Math.floor(infiniteItems.length / 2) - Math.floor(items.length / 2);
//
//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;
//
//         const itemEls = Array.from(container.children) as HTMLElement[];
//         if (!itemEls.length) return;
//
//         const itemHeight = 40; // фиксированная высота
//
//         // Устанавливаем начальную позицию в середине бесконечного массива
//         const startIndex = middleStartIndex + initialIndex;
//         gsap.set(container, { y: -startIndex * itemHeight });
//         currentIndexRef.current = startIndex;
//
//         // Устанавливаем выбранный индекс относительно оригинального массива
//         const relativeIndex = startIndex % items.length;
//         setSelectedIndex(relativeIndex);
//         onSelect(items[relativeIndex]);
//
//         const animateToIndex = (targetIndex: number) => {
//             if (isAnimatingRef.current) return;
//             isAnimatingRef.current = true;
//
//             // Нормализуем индекс в пределах бесконечного массива
//             const clampedIndex = Math.max(0, Math.min(targetIndex, infiniteItems.length - 1));
//
//             gsap.to(container, {
//                 y: -clampedIndex * itemHeight,
//                 duration: 0.3,
//                 ease: "power2.out",
//                 onComplete: () => {
//                     currentIndexRef.current = clampedIndex;
//
//                     // Вычисляем относительный индекс в оригинальном массиве
//                     const relativeIndex = clampedIndex % items.length;
//                     setSelectedIndex(relativeIndex);
//                     onSelect(items[relativeIndex]);
//
//                     // Проверяем, нужно ли "перепрыгнуть" для бесконечности
//                     const distanceFromStart = clampedIndex;
//                     const distanceFromEnd = infiniteItems.length - 1 - clampedIndex;
//                     const cycleThreshold = items.length;
//
//                     if (distanceFromStart < cycleThreshold) {
//                         // Перепрыгиваем ближе к концу
//                         const newIndex = clampedIndex + items.length * 2;
//                         gsap.set(container, { y: -newIndex * itemHeight });
//                         currentIndexRef.current = newIndex;
//                     } else if (distanceFromEnd < cycleThreshold) {
//                         // Перепрыгиваем ближе к началу
//                         const newIndex = clampedIndex - items.length * 2;
//                         gsap.set(container, { y: -newIndex * itemHeight });
//                         currentIndexRef.current = newIndex;
//                     }
//
//                     isAnimatingRef.current = false;
//                 },
//             });
//         };
//
//         const step = (delta: number) => {
//             const next = currentIndexRef.current + delta;
//             animateToIndex(next);
//         };
//
//         // Observer для обработки wheel/touch/pointer событий
//         const obs = Observer.create({
//             target: container,
//             type: "wheel,touch,pointer",
//             wheelSpeed: -1,
//             tolerance: 10,
//             preventDefault: true,
//
//             onChange: (self: any) => {
//                 const dy = self.deltaY;
//                 if (Math.abs(dy) < 10) return;
//                 const dir = dy > 0 ? 1 : -1;
//                 step(dir);
//             },
//
//             onDragEnd: (self: any) => {
//                 if (isAnimatingRef.current) return;
//                 const currentY = Number(gsap.getProperty(container, "y") || 0);
//                 const guessedIndex = Math.round(-currentY / itemHeight);
//                 animateToIndex(guessedIndex);
//             },
//         });
//
//         obsRef.current = obs;
//
//         return () => {
//             if (obsRef.current && typeof obsRef.current.kill === "function") {
//                 obsRef.current.kill();
//                 obsRef.current = null;
//             }
//             gsap.killTweensOf(container);
//         };
//     }, [items, initialIndex, onSelect]);
//
//     // Функция для получения выбранного значения (для внешнего использования)
//     const getSelectedValue = () => {
//         return items[selectedIndex];
//     };
//
//     // Добавляем метод для программной установки значения
//     useEffect(() => {
//         if (containerRef.current) {
//             const container = containerRef.current;
//             const itemHeight = 40;
//
//             // Находим индекс в бесконечном массиве, соответствующий нужному значению
//             const targetItemIndex = initialIndex % items.length;
//             const targetInfiniteIndex = middleStartIndex + targetItemIndex;
//
//             gsap.set(container, { y: -targetInfiniteIndex * itemHeight });
//             currentIndexRef.current = targetInfiniteIndex;
//             setSelectedIndex(targetItemIndex);
//         }
//     }, [initialIndex]);
//
//     return (
//         <div className={`relative h-40 overflow-hidden ${className}`}>
//             {/* Контейнер с элементами */}
//             <div
//                 ref={containerRef}
//                 className="flex flex-col items-center will-change-transform overflow-hidden"
//                 style={{ touchAction: "pan-y" }}
//             >
//                 {infiniteItems.map((item, idx) => {
//                     // Вычисляем, является ли этот элемент выбранным
//                     const relativeIndex = idx % items.length;
//                     const currentRelativeIndex = currentIndexRef.current % items.length;
//                     const isSelected = relativeIndex === selectedIndex;
//
//                     return (
//                         <div
//                             key={`${item}-${idx}`}
//                             className={`h-10 flex items-center justify-center select-none transition-all duration-200 ${
//                                 isSelected
//                                     ? "text-[#cccccc] text-[20px]"
//                                     : "text-[#878787] text-[18px]"
//                             }`}
//                             style={{
//                                 minHeight: 40,
//                                 lineHeight: "40px"
//                             }}
//                         >
//                             {item}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
//
//
// // "use client";
// // import React, {useEffect, useRef, useState} from "react";
// // import gsap from "gsap";
// // import {Observer} from "gsap/Observer";
// //
// // gsap.registerPlugin(Observer);
// //
// // interface WheelProps {
// //     items: string[];
// //     onSelect: (value: string) => void;
// //     initialIndex?: number;
// //     className?: string;
// // }
// //
// // export default function InfiniteWheel({
// //                                           items,
// //                                           onSelect,
// //                                           initialIndex = 0,
// //                                           className = "",
// //                                       }: WheelProps) {
// //     const containerRef = useRef<HTMLDivElement | null>(null);
// //     const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
// //
// //     // refs to control animation / index safely inside callbacks
// //     const isAnimatingRef = useRef(false);
// //     const currentIndexRef = useRef<number>(initialIndex);
// //     const obsRef = useRef<any>(null);
// //
// //     useEffect(() => {
// //         const container = containerRef.current;
// //         if (!container) return;
// //
// //         const itemEls = Array.from(container.children) as HTMLElement[];
// //         if (!itemEls.length) return;
// //
// //         //     // Создаем бесконечный массив для плавной прокрутки
// //         const createInfiniteArray = (baseArray: string[], repeatCount: number = 5): string[] => {
// //             const result: string[] = [];
// //             for (let i = 0; i < repeatCount; i++) {
// //                 result.push(...baseArray);
// //             }
// //             return result;
// //         };
// //
// //         const infiniteItems = createInfiniteArray(items, 5);
// //
// //         const middleStartIndex = Math.floor(infiniteItems.length / 2) - Math.floor(items.length / 2);
// //         const itemHeight = 40; // фиксированная высота
// //
// //         // Устанавливаем начальную позицию в середине бесконечного массива
// //         const startIndex = middleStartIndex + initialIndex;
// //         gsap.set(container, {y: -startIndex * itemHeight});
// //         currentIndexRef.current = startIndex;
// //
// //         // Устанавливаем выбранный индекс относительно оригинального массива
// //         const relativeIndex = startIndex % items.length;
// //         setSelectedIndex(relativeIndex);
// //         onSelect(items[relativeIndex]);
// //
// //         const animateToIndex = (targetIndex: number) => {
// //             if (isAnimatingRef.current) return;
// //             isAnimatingRef.current = true;
// //
// //             // Нормализуем индекс в пределах бесконечного массива
// //             const clampedIndex = Math.max(0, Math.min(targetIndex, infiniteItems.length - 1));
// //
// //             gsap.to(container, {
// //                 y: -clampedIndex * itemHeight,
// //                 duration: 0.3,
// //                 ease: "power2.out",
// //                 onComplete: () => {
// //                     currentIndexRef.current = clampedIndex;
// //
// //                     // Вычисляем относительный индекс в оригинальном массиве
// //                     const relativeIndex = clampedIndex % items.length;
// //                     setSelectedIndex(relativeIndex);
// //                     onSelect(items[relativeIndex]);
// //
// //                     // Проверяем, нужно ли "перепрыгнуть" для бесконечности
// //                     const distanceFromStart = clampedIndex;
// //                     const distanceFromEnd = infiniteItems.length - 1 - clampedIndex;
// //                     const cycleThreshold = items.length;
// //
// //                     if (distanceFromStart < cycleThreshold) {
// //                         // Перепрыгиваем ближе к концу
// //                         const newIndex = clampedIndex + items.length * 2;
// //                         gsap.set(container, {y: -newIndex * itemHeight});
// //                         currentIndexRef.current = newIndex;
// //                     } else if (distanceFromEnd < cycleThreshold) {
// //                         // Перепрыгиваем ближе к началу
// //                         const newIndex = clampedIndex - items.length * 2;
// //                         gsap.set(container, {y: -newIndex * itemHeight});
// //                         currentIndexRef.current = newIndex;
// //                     }
// //
// //                     isAnimatingRef.current = false;
// //                 },
// //             });
// //         };
// //
// //         const step = (delta: number) => {
// //             const next = currentIndexRef.current + delta;
// //             animateToIndex(next);
// //         };
// //
// //         // Observer для обработки wheel/touch/pointer событий
// //         const obs = Observer.create({
// //             target: container,
// //             type: "wheel,touch,pointer",
// //             wheelSpeed: -1,
// //             tolerance: 10,
// //             preventDefault: true,
// //
// //             onChange: (self: any) => {
// //                 const dy = self.deltaY;
// //                 if (Math.abs(dy) < 10) return;
// //                 const dir = dy > 0 ? 1 : -1;
// //                 step(dir);
// //             },
// //
// //             onDragEnd: (self: any) => {
// //                 if (isAnimatingRef.current) return;
// //                 const currentY = Number(gsap.getProperty(container, "y") || 0);
// //                 const guessedIndex = Math.round(-currentY / itemHeight);
// //                 animateToIndex(guessedIndex);
// //             },
// //         });
// //
// //         obsRef.current = obs;
// //
// //         return () => {
// //             if (obsRef.current && typeof obsRef.current.kill === "function") {
// //                 obsRef.current.kill();
// //                 obsRef.current = null;
// //             }
// //             gsap.killTweensOf(container);
// //         };
// //     }, [items, initialIndex, onSelect]);
// //
// //     return (
// //         <div className={`relative h-40 overflow-hidden ${className}`}>
// //             <div
// //                 ref={containerRef}
// //                 className="flex flex-col items-center will-change-transform"
// //                 style={{touchAction: "pan-y"}}
// //             >
// //                 {items.map((item, idx) => (
// //                     <div
// //                         key={idx}
// //                         className={`h-10 flex items-center justify-center select-none transition-colors duration-150 ${
// //                             idx === selectedIndex ? "text-blue-500 font-semibold" : "text-gray-500"
// //                         }`}
// //                         style={{minHeight: 40}}
// //                     >
// //                         {item}
// //                     </div>
// //                 ))}
// //             </div>
// //
// //             {/* индикатор выбора (центр) */}
// //             <div
// //                 className="pointer-events-none absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 border-t border-b border-blue-200"></div>
// //         </div>
// //     );
// // }