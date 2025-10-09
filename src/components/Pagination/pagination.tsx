"use client";

import React from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import headerStyles from "@/components/header/Header.module.css";
import {Check} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}) => {
  // Генерация номеров страниц для отображения
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

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
        if (totalPages > 4) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Показываем последние страницы
        pages.push(1);
        if (totalPages > 4) {
          pages.push("...");
        }
        for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
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

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 ${className}`}
    >
      {/* Кнопка "Предыдущая" */}
      <div className="relative w-full max-w-[260px] h-[51px] !overflow-hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
            className={`${styles.sendIconLeft} transition-all !duration-[.13s] ease-in`}
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
          <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#adadad]">
            Предыдущая
          </span>
        </button>
        {/*<div className={styles.highlight} />*/}
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
            // <button
            //   key={page}
            //   onClick={() => onPageChange(Number(page))}
            //   className={`cursor-pointer flex items-center
            //     px-[15px] py-[18px] max-h-[50px] rounded-[4px] border text-[20px] min-w-[40px]
            //     ${
            //       currentPage === page
            //         ? "text-[#3D9ED6] border-[#353535] "
            //         : "text-[#ADADAD] border border-transparent hover:text-[#3D9ED6] hover:border-[#CCCCCC]"
            //     }
            //   `}
            // >
            //   {page}
            // </button>
          <div className="relative">
            <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className={`${headerStyles["login-button"]} 
                !px-[15px] !py-[18px] !h-[50px] rounded-[4px] border text-[20px] !min-w-[40px]
                ${
                    currentPage === page
                        ? "!text-[#3D9ED6] !border-[#353535] "
                        : "text-[#ADADAD] border border-transparent hover:text-[#3D9ED6] hover:border-[#CCCCCC]"
                }
                group flex items-center justify-center`}
            >
                        <span className="font-normal text-[20px] ">
                           {page}
                        </span>
            </button>

            <div className={styles.highlight}/>
          </div>
          );
        })}
      </div>

      {/* Кнопка "Следующая" */}
      {/* max-w-[260px] h-[51px] */}
      <div className="relative w-full max-w-[260px] h-[51px] !overflow-hidden">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${styles["btn"]} ${styles["blogNextBtn"]} ${
            HeaderStyles["login-button"]
          } border !border-[#353535] w-full !h-full group flex items-center !justify-between ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          data-text=""
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc]">
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
            <rect x="1" y="1" width="24" height="24" rx="2" fill="#737373" />
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
        {/*<div className={styles.highlight} />*/}
      </div>
    </div>
  );
};

export default Pagination;
