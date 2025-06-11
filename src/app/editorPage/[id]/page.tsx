"use client";

import React from "react";
import { useParams } from "next/navigation";

import Bg from "@/components/background/bg";
import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import { editors } from "@/data/editors";
import Image from "next/image";
import styles from "@/app/page.module.scss";
import { blogData } from "@/data/blog";
import BlogCard from "@/components/BlogCard/BlogCard";
import Link from "next/link";
import TryBlock from '@/components/TryBlock/page';

export default function EditorPage() {
  const params = useParams();
  const editorId = Number(params.id);

  const currentEditor = editors.find((editor) => editor.id === editorId);

  if (!currentEditor) return <div>Редактор не найден</div>;

  return (
    <>
      <Bg />
      <div className={`min-h-screen mt-[119px]`}>
        <div className={`max-w-[1180px] px-[10px] min-h-screen m-auto`}>
          <Breadcrumbs
            editorName={currentEditor.name}
            editorId={currentEditor.id}
          />
          {/* Автор */}
          <div
            className={`${styles.shadowcards} ${styles.authorBlockActive} group w-full mb-[40px] flex items-center gap-[21px] p-[20px] rounded-[6px]`}
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
              <p className={`${styles.authorDesc} text-[#adadad] text-[16px] leading-[130%]`}>
                {currentEditor.bio ??
                  "Редактор этого материала. Больше информации вы найдёте на его странице."}
              </p>
            </div>
          </div>

          {/* Статьи */}
          <div className={``}>
            <h2
              className={`text-[#3D9ED6] text-[24px] leading-[120%] mb-[20px]`}
            >
              Все статьи данного редактора
            </h2>

            {/*  Статьи данного редактора */}
            <div
              className={`${styles.blogCards} grid grid-cols-4 gap-[40px] mb-[150px]`}
            >
              {blogData
                .filter((item) => item.editorId === currentEditor.id)
                .map((item) => (
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

            {/* Другие редакторы AUDIOSECTOR */}
            <div
              className={`${styles.similarEditors} mb-[100px]`}
            >
              <h2
                className={`${styles.txtGradientRight} text-[48px] leading-[110%] m-auto text-center mb-[30px]`}
              >
                Другие редакторы AUDIOSECTOR
              </h2>

              <div className={`grid grid-cols-2 gap-[40px] items-center`}>
                {editors
                  .filter((editor) => editor.id !== currentEditor.id)
                  .slice(0, 4)
                  .map((editor) => (
                    <Link
                      key={editor.id}
                      href={`/editorPage/${editor.id}`}
                      className={`${styles.authorBlock} ${styles.shadowcards} group w-full max-w-[580px] flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535] hover:border-[#ccc] active:scale-[0.95]`}
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
                        <h3 className="text-[#adadad] text-[20px] leading-[120%] mb-[10px]">
                          {editor.name}
                        </h3>
                        <p className="text-[#adadad] text-[16px] leading-[130%]">
                          {editor.bio ??
                            "Редактор этого материала. Больше информации вы найдёте на его странице."}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Блок Попробовать */}
           <TryBlock />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
