"use client";
import React, { useState, useEffect } from "react";
import HeaderStyles from "../header/Header.module.css";
import styles from "@/app/page.module.scss";
import BlogAside from "./blogAside";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { blogData } from "@/data/blog";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "../BlogCard/BlogCard";
import { useRouter } from "next/navigation";
import { editors } from "@/data/editors";
export default function BlogPageContent({
  id,
  fromHeader,
}: {
  id: number;
  fromHeader?: boolean;
}) {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [initialized, setInitialized] = useState(false);

  const { showRegisterPromo } = useAuth();

  const [openFaqItem, setOpenFaqItem] = useState(
    () => blogData.find((item) => item.id === id) || null
  );

  useEffect(() => {
    if (!fromHeader) {
      setOpenQuestionId(id);
    }
    setInitialized(true);
  }, [id, fromHeader]);

  useEffect(() => {
    blogData.forEach((item) => {
      if (typeof item.src === "string") {
        const img = new window.Image();
        img.src = item.src;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
        };
      }
    });
  }, []);

  const currentFaqItem = blogData.find((item) => item.id === id);
  useEffect(() => {
    const found = blogData.find((item) => item.id === openQuestionId);
    if (found) {
      setOpenFaqItem(found);
    }
  }, [openQuestionId]);

  const currentIndex = blogData.findIndex((item) => item.id === openQuestionId);
  const currentEditor = editors.find(
    (editor) => editor.id === currentFaqItem?.editorId
  );

  const router = useRouter();
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevId = blogData[currentIndex - 1].id; // ← добавляем эту строку
      setOpenQuestionId(prevId);
      router.push(`/blogPage/${prevId}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < blogData.length - 1) {
      const nextId = blogData[currentIndex + 1].id; // ← и эту тоже
      setOpenQuestionId(nextId);
      router.push(`/blogPage/${nextId}`);
    }
  };

  if (!currentFaqItem) return null;

  if (!initialized) return <div>Загрузка...</div>;
  if (!loadedImages) return <div>Загрузка...</div>;

  return (
    <>
      <div className={`w-full grid gap-[40px] grid-cols-[260px_1fr]`}>
        {/* Левый ASIDE (BlogAside) */}
        <aside className="sticky top-20 h-fit z-[10] w-[260px]">
          {showRegisterPromo && (
            <div
              className={`${styles.registerBlock} mb-[20px] p-[20px] text-center border border-[#353535] rounded-[6px]`}
            >
              <p
                className={`${styles.text} mb-[16px] text-[#3D9ED6] text-[20px] font-[400] leading-[110%]`}
              >
                При регистрации дарим 30 минут!
              </p>
              <div className="relative w-full h-[51px] !overflow-hidden">
                <button
                  className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["faqTryBtn"]} w-full !h-full group flex items-center !justify-between`}
                  data-text=""
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg
                    className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3537_3888)">
                      <path
                        d="M11.9998 23.1838C9.78797 23.1838 7.62577 22.5279 5.78666 21.299C3.94756 20.0702 2.51415 18.3236 1.6677 16.28C0.821252 14.2365 0.599783 11.9879 1.0313 9.81855C1.46281 7.64918 2.52793 5.65648 4.09196 4.09245C5.65599 2.52842 7.64869 1.4633 9.81806 1.03179C11.9874 0.600271 14.2361 0.82174 16.2796 1.66819C18.3231 2.51464 20.0697 3.94804 21.2985 5.78715C22.5274 7.62626 23.1833 9.78846 23.1833 12.0003C23.1833 14.9664 22.005 17.8109 19.9077 19.9082C17.8104 22.0055 14.9659 23.1838 11.9998 23.1838ZM11.9998 2.41453C10.104 2.41453 8.25064 2.97673 6.67426 4.03003C5.09788 5.08333 3.86925 6.58043 3.14372 8.33201C2.41819 10.0836 2.22836 12.011 2.59823 13.8704C2.9681 15.7299 3.88106 17.4379 5.22166 18.7785C6.56226 20.1191 8.27028 21.0321 10.1297 21.4019C11.9892 21.7718 13.9166 21.582 15.6682 20.8565C17.4197 20.1309 18.9168 18.9023 19.9701 17.3259C21.0234 15.7495 21.5856 13.8962 21.5856 12.0003C21.5856 9.45802 20.5757 7.01983 18.778 5.22215C16.9803 3.42446 14.5422 2.41453 11.9998 2.41453Z"
                        fill="#737373"
                      />
                      <path
                        d="M15.6666 16.7933L11.2012 12.3279V4.81104H12.7988V11.6649L16.7929 15.667L15.6666 16.7933Z"
                        fill="#737373"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3537_3888">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                    Получить
                  </span>
                  <svg
                    className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3537_3888)">
                      <path
                        d="M11.9998 23.1838C9.78797 23.1838 7.62577 22.5279 5.78666 21.299C3.94756 20.0702 2.51415 18.3236 1.6677 16.28C0.821252 14.2365 0.599783 11.9879 1.0313 9.81855C1.46281 7.64918 2.52793 5.65648 4.09196 4.09245C5.65599 2.52842 7.64869 1.4633 9.81806 1.03179C11.9874 0.600271 14.2361 0.82174 16.2796 1.66819C18.3231 2.51464 20.0697 3.94804 21.2985 5.78715C22.5274 7.62626 23.1833 9.78846 23.1833 12.0003C23.1833 14.9664 22.005 17.8109 19.9077 19.9082C17.8104 22.0055 14.9659 23.1838 11.9998 23.1838ZM11.9998 2.41453C10.104 2.41453 8.25064 2.97673 6.67426 4.03003C5.09788 5.08333 3.86925 6.58043 3.14372 8.33201C2.41819 10.0836 2.22836 12.011 2.59823 13.8704C2.9681 15.7299 3.88106 17.4379 5.22166 18.7785C6.56226 20.1191 8.27028 21.0321 10.1297 21.4019C11.9892 21.7718 13.9166 21.582 15.6682 20.8565C17.4197 20.1309 18.9168 18.9023 19.9701 17.3259C21.0234 15.7495 21.5856 13.8962 21.5856 12.0003C21.5856 9.45802 20.5757 7.01983 18.778 5.22215C16.9803 3.42446 14.5422 2.41453 11.9998 2.41453Z"
                        fill="#737373"
                      />
                      <path
                        d="M15.6666 16.7933L11.2012 12.3279V4.81104H12.7988V11.6649L16.7929 15.667L15.6666 16.7933Z"
                        fill="#737373"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3537_3888">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <div className={styles.highlight} />
              </div>
            </div>
          )}

          <BlogAside items={currentFaqItem.aside} />
        </aside>

        {/* Контент */}
        <div className="w-full">
          <section
            className={`${styles.accordion} w-full flex flex-col gap-[5px]`}
          >
            
            {openFaqItem && (
              <div
                className={`${styles.BlogPageContent} text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
              >
                <div className="flex items-center justify-center mb-[30px]">
                  <Image
                    className="rounded-[6px]"
                    src="/blgLg1.png"
                    alt="blog img"
                    width={600}
                    height={300}
                  />
                </div>
                {currentFaqItem.fullAnswer}
              </div>
            )}

            <div
              className={`w-full flex items-center justify-between mt-[30px]`}
            >
              <div className="relative w-full max-w-[218px] h-[51px] !overflow-hidden">
                <button
                  onClick={handlePrev}
                  className={` ${styles["btn"]} ${styles["blogLeftBtn"]} ${HeaderStyles["login-button"]} w-full !h-full group flex items-center !justify-between`}
                  data-text=""
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg
                    className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.92167 8.8953L5.81698 13L9.92167 17.1047"
                        stroke="#191919"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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

                  <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                    Предыдущая
                  </span>

                  <svg
                    className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.92167 8.8953L5.81698 13L9.92167 17.1047"
                        stroke="#191919"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                </button>
                <div className={styles.highlight} />
              </div>
              <div className="relative w-full max-w-[218px] h-[51px] !overflow-hidden">
                <button
                  onClick={handleNext}
                  className={` ${styles["btn"]} ${styles["blogNextBtn"]} ${HeaderStyles["login-button"]}  w-full !h-full group flex items-center !justify-between`}
                  data-text=""
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg
                    className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
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

                  <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                    Следующая
                  </span>

                  <svg
                    className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
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
          </section>
        </div>
      </div>

      {/* Автор статьи */}
      <div
        className={`grid gap-[40px] mt-[40px] ${
          showRegisterPromo ? "grid-cols-[260px_1fr]" : "grid-cols-[260px_1fr]"
        }`}
      >
        <div></div>
        {currentEditor && (
          <Link
            href={`/editorPage/${currentEditor.id}`}
            className={`${styles.authorBlock} w-full mb-[150px] flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535]`}
          >
            <div className="min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
              {currentEditor.avatar ? (
                <Image
                  src={currentEditor.avatar}
                  alt={currentEditor.name}
                  width={101}
                  height={90}
                />
              ) : (
                <div className="bg-gray-700 w-full h-full" />
              )}
            </div>
            <div>
              <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px]">
                {currentEditor.name}
              </h3>
              <p className="text-[#ccc] text-[16px] leading-[130%]">
                {currentEditor.bio ??
                  "Редактор этого материала. Больше информации вы найдёте на его странице."}
              </p>
            </div>
          </Link>
        )}
      </div>

      {/* Похожие статьи */}
      <h2
        className={`${styles.txtGradientRight} text-center text-[56px] leading-[110%] mb-10`}
      >
        Похожие статьи{" "}
      </h2>
      <div className={`${styles.blogCardsContainer} h-auto w-full`}>
        <div
          className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[127px]`}
        >
          {blogData.slice(0, 8).map((item) => (
            <BlogCard
              key={item.id}
              id={item.id}
              num={item.num}
              title={item.title}
              date={item.date}
              src={item.src}
            />
          ))}
        </div>
      </div>
    </>
  );
}
