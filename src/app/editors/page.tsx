"use client";

import React from "react";
import Bg from "@/components/background/bg";
import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { useParams } from "next/navigation";
import HeaderStyles from "@/components/header/Header.module.css";
import styles from "@/app/page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { editors } from "@/data/editors";
import { blogData } from "@/data/blog";
import BlogCard from "@/components/BlogCard/BlogCard";

export default function Editors() {
  const params = useParams();
  const editorId = Number(params.id);

  return (
    <>
      <Bg />
      <div className={`min-h-screen mt-[120px]`}>
        <Breadcrumbs editorId={editorId} inBlog={true} editorPage={true} />
        <div className={`max-w-[1180px] m-auto min-h-screen`}>
          <h1
            className={`${styles.txtGradientRight} text-center text-[56px] leading-[110%] text-3xl mb-[40px]`}
          >
            Наши редакторы
          </h1>

          <div className={`flex flex-col gap-[60px] mb-[100px]`}>
            {editors.map((editor) => {
              const editorBlogs = blogData
                .filter((blog) => blog.editorId === editor.id)
                .slice(0, 4);

              return (
                <div key={editor.id} className="flex flex-col gap-[30px]">
                  {/* Ссылка на страницу редактора */}
                  <Link
                    href={`/editorPage/${editor.id}`}
                    className={`${styles.authorBlock} flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#3D9ED6]`}
                  >
                    <div className="min-w-[101px] min-h-[90px] rounded-[4px] overflow-hidden">
                      {editor.avatar ? (
                        <Image
                          src={editor.avatar}
                          alt={editor.name}
                          width={101}
                          height={90}
                        />
                      ) : (
                        <div className="bg-gray-700 w-full h-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[#3D9ED6] text-[20px] leading-[120%] mb-[10px]">
                        {editor.name}
                      </h3>
                      <p className="text-[#ccc] text-[16px] leading-[130%]">
                        {editor.bio}
                      </p>
                    </div>
                  </Link>

                  {/* Блоги редактора */}
                  {editorBlogs.length > 0 && (
                    <div>
                      <div
                        className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[60px]`}
                      >
                        {editorBlogs.map((item) => (
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
                  )}
                </div>
              );
            })}
          </div>

          {/* Блок Попробовать */}

          <div className={`w-full flex items-center justify-center mb-[100px]`}>
            <div
              className={`${styles.editorTryBlock} w-full max-w-[560px] text-center px-[39px] py-[40px] rounded-[8px] border-[#353535]`}
            >
              <h3
                className={`${styles.txtGradientRight} text-[32px] leading-[120%] mb-[20px]`}
              >
                Хотите протестировать?
              </h3>
              <p
                className={`text-[#A4A4A4] leading-[140%] text-[18px] mb-[20px]`}
              >
                Попробуйте AUDIOSECTOR прямо сейчас. Никаких сложностей. Только
                результат.
              </p>

              <div className="relative w-full max-w-[220px] m-auto h-[51px] !overflow-hidden ">
                <button
                  className={` ${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["faqTryBtn"]} w-full !h-full group flex items-center !justify-between`}
                  data-text=""
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg
                    className={`${styles.sendIconLeft}  transition-all !duration-[.15s] ease-in`}
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                      fill="#737373"
                    />
                  </svg>
                  <span className="font-normal text-[20px] leading-[120%] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc]">
                    Попробовать
                  </span>
                  <svg
                    className={`${styles.sendIconRight}  transition-all !duration-[.15s] ease-in`}
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.625 0.871195V1.74239L14.7964 1.75176L17.9732 1.76581L17.9893 11.9859L18 22.2108H14.8125H11.625V23.1054V24L11.5018 23.9766C11.4375 23.9625 8.94643 23.5691 5.97321 23.1007C2.99464 22.637 0.433928 22.2342 0.27857 22.2061L0 22.1593V11.9953C0 6.4075 0.0160713 1.83607 0.0375004 1.83607C0.0857143 1.83607 11.3571 0.0562077 11.5018 0.0234203L11.625 1.90735e-06V0.871195ZM11.625 12V20.5714H13.8482H16.0714V12V3.42857H13.8482H11.625V12ZM9.39107 11.2974C9.13929 11.4286 9.03214 11.6393 9.03214 12C9.03214 12.3607 9.13929 12.5714 9.39107 12.7026C9.63214 12.8337 9.86786 12.8197 10.0768 12.6698C10.2911 12.5105 10.3929 12.2998 10.3929 12C10.3929 11.7002 10.2911 11.4895 10.0768 11.3302C9.86786 11.1803 9.63214 11.1663 9.39107 11.2974Z"
                      fill="#737373"
                    />
                  </svg>
                </button>
                <div className={styles.highlight} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
