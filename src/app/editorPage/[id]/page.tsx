"use client";

import React from "react";
import { useParams } from "next/navigation";

import Bg from "@/components/background/bg";
import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";
import { editors } from "@/data/editors";
import Image from "next/image";
import styles from "@/app/page.module.scss";

export default function EditorPage() {
  const params = useParams();
  const editorId = Number(params.id);

  const currentEditor = editors.find((editor) => editor.id === editorId);

  if (!currentEditor) return <div>Редактор не найден</div>;

  return (
    <>
      <Bg />
        <Bg />
        <div className={`min-h-screen mt-[120px]`}>
          <div className={`max-w-[1180px] min-h-screen m-auto`}>
            <Breadcrumbs
              editorName={currentEditor.name}
              editorId={currentEditor.id}
            />
            {/* Автор */}
            <div
              className={`${styles.authorBlock} w-full mb-[40px] flex items-center gap-[21px] p-[20px] rounded-[6px] border border-[#353535]`}
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
            </div>

            {/* Статьи */}
            <div className={``}>
              <h2 className={`text-[#3D9ED6] text-[24px] leading-[120%]`}>Все статьи данного редактора</h2>
            </div>

          </div>

          <Footer />
        </div>
    </>
  );
}
