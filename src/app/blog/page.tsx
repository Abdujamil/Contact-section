"use client";

import React, { useState } from "react";
import styles from "@/app/page.module.scss";
import BlogCard from "@/components/BlogCard/BlogCard";
import { blogData } from "@/data/blog";
import Bg from "@/components/background/bg";
import HeaderStyles from "@/components/header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(blogData.length / cardsPerPage);

  // Получаем карточки для текущей страницы
  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return blogData.slice(startIndex, endIndex);
  };

  // Функция для изменения страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Прокрутка к началу карточек при смене страницы
    document.querySelector(`.${styles.blogCardsContainer}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Генерация номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если страниц много, показываем с многоточием
      if (currentPage <= 3) {
        // Показываем первые страницы
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Показываем последние страницы
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Показываем текущую страницу с окружением
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <Bg />
      <div className={`h-screen flex flex-col items-center justify-center`}>
        <Bg />
        <div
          className={`${styles.blog} w-full min-h-full h-auto mx-auto flex flex-col items-center`}
        >
          <div
            className={`${styles.blogContainer} w-full max-w-[1180px] px-[10px] min-h-full h-auto mt-[120px] mb-[127px] mx-auto flex flex-col items-center`}
          >
            <h1
              className={`${styles.txtGradientRight} text-center text-[48px] leading-[110%] mb-[30px] mt-[-8px]`}
            >
              Полезные статьи и советы{" "}
            </h1>

            <div className={`${styles.blogCardsContainer} h-auto w-full`}>
              <div
                className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[50px]`}
              >
                {getCurrentPageCards().map((item) => (
                  <BlogCard
                    id={item.id}
                    key={item.id}
                    num={item.num}
                    title={item.title}
                    date={item.date}
                    src={item.src}
                  />
                ))}
              </div>
            </div>
            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="w-full max-w-[747px] flex justify-center items-center gap-10 mb-[127px]">
                {/* Кнопка "Предыдущая" */}
                <div className="relative w-full max-w-[260px] h-[51px] !overflow-hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${styles["btn"]} ${styles["blogLeftBtn"]} ${
                      HeaderStyles["login-button"]
                    } border !border-[#353535] w-full !h-full group flex items-center !justify-between ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    data-text=""
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg
                      className={`${styles.sendIconLeft} transition-all !duration-[.15s] ease-in`}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="24"
                        height="24"
                        rx="2"
                        transform="matrix(-1 0 0 1 25 1)"
                        fill="#737373"
                      />
                      <g clipPath="url(#clip0_3502_3398)">
                        <path
                          d="M20.1836 13H5.81716"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.92167 8.8953L5.81698 13L9.92167 17.1047"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3502_3398">
                          <rect
                            width="17.4147"
                            height="17.4147"
                            fill="white"
                            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 25.3145 13)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#adadad]">
                      Предыдущая
                    </span>
                  </button>
                  <div className={styles.highlight} />
                </div>

                {/* Номера страниц */}
                <div className="flex items-center gap-[9px]">
                  {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-3 py-2 max-h-[50px] text-[#ADADAD]"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`cursor-pointer flex items-center
                        px-[18px] py-[15px] max-h-[50px] rounded-lg border text-[20px] transition-all duration-200 min-w-[40px]
                        ${
                          currentPage === page
                            ? "text-[#3D9ED6] border-[#CCCCCC]"
                            : "text-[#ADADAD] border border-transparent hover:text-[#3D9ED6] hover:border-[#CCCCCC]"
                        }
                      `}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Кнопка "Следующая" */}
                <div className="relative w-full max-w-[260px] h-[51px] !overflow-hidden">
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`${styles["btn"]} ${styles["blogNextBtn"]} ${
                      HeaderStyles["login-button"]
                    } border !border-[#353535] w-full !h-full group flex items-center !justify-between ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    data-text=""
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                      Следующая
                    </span>
                    <svg
                      className={`${styles.sendIconRight} transition-all !duration-[.15s] ease-in`}
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="24"
                        height="24"
                        rx="2"
                        fill="#737373"
                      />
                      <g clipPath="url(#clip0_3069_1633)">
                        <path
                          d="M5.81641 13H20.1828"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.0783 8.8953L20.183 13L16.0783 17.1047"
                          stroke="#191919"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3069_1633">
                          <rect
                            width="17.4147"
                            height="17.4147"
                            fill="white"
                            transform="translate(0.685547 13) rotate(-45)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <div className={styles.highlight} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

// "use client";

// import React, { useState } from "react";
// import styles from "@/app/page.module.scss";
// import BlogCard from "@/components/BlogCard/BlogCard";
// import { blogData } from "@/data/blog";
// import Bg from "@/components/background/bg";

// const BlogWithPagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 8;

//   // Вычисляем общее количество страниц
//   const totalPages = Math.ceil(blogData.length / cardsPerPage);

//   // Получаем карточки для текущей страницы
//   const getCurrentPageCards = () => {
//     const startIndex = (currentPage - 1) * cardsPerPage;
//     const endIndex = startIndex + cardsPerPage;
//     return blogData.slice(startIndex, endIndex);
//   };

//   // Функция для изменения страницы
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Прокрутка к началу карточек при смене страницы
//     document.querySelector(`.${styles.blogCardsContainer}`)?.scrollIntoView({
//       behavior: 'smooth'
//     });
//   };

//   // Генерация номеров страниц для отображения
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       // Если страниц мало, показываем все
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Если страниц много, показываем с многоточием
//       if (currentPage <= 3) {
//         // Показываем первые страницы
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         // Показываем последние страницы
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         // Показываем текущую страницу с окружением
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pages.push(i);
//         }
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <>
//       <div className={`${styles.blogCardsContainer} h-auto w-full`}>
//         <div
//           className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[60px]`}
//         >
//           {getCurrentPageCards().map((item) => (
//             <BlogCard
//               id={item.id}
//               key={item.id}
//               num={item.num}
//               title={item.title}
//               date={item.date}
//               src={item.src}
//             />
//           ))}
//         </div>

//         {/* Пагинация */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 mb-[127px]">
//             {/* Кнопка "Предыдущая" */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`
//                 px-4 py-2 rounded-lg border transition-all duration-200
//                 ${currentPage === 1
//                   ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
//                 }
//               `}
//             >
//               Предыдущая
//             </button>

//             {/* Номера страниц */}
//             <div className="flex items-center gap-1">
//               {getPageNumbers().map((page, index) => {
//                 if (page === '...') {
//                   return (
//                     <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
//                       ...
//                     </span>
//                   );
//                 }

//                 return (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`
//                       px-3 py-2 rounded-lg border transition-all duration-200 min-w-[40px]
//                       ${currentPage === page
//                         ? 'bg-blue-500 text-white border-blue-500'
//                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
//                       }
//                     `}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Кнопка "Следующая" */}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`
//                 px-4 py-2 rounded-lg border transition-all duration-200
//                 ${currentPage === totalPages
//                   ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
//                 }
//               `}
//             >
//               Следующая
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default BlogWithPagination;
