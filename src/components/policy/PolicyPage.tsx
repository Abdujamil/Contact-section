"use client";
import React, { useState } from "react";
import styles from "@/app/page.module.scss";
import Bg from "@/components/background/bg";
import PolicySidebar from "@/components/policy/PolicySidebar";
import PolicyContent from "@/components/policy/PolicyContent";

export type PolicyTab = "policy" | "offer" | "license";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("policy");
  const policyAnchors = [
    { id: "#introduction", title: "Введение" },
    { id: "#data-collection", title: "Сбор данных" },
    { id: "#data-usage", title: "Использование данных" },
    { id: "#data-sharing", title: "Передача данных" },
    { id: "#security", title: "Безопасность" },
    { id: "#cookies", title: "Файлы cookie" },
    { id: "#user-rights", title: "Права пользователей" },
    { id: "#contact", title: "Контактная информация" },
  ];

  return (
    <>
      <Bg />
      <div
        className={`${styles.politic} w-full max-w-[1180px] m-auto h-dvh mt-[134px]`}
      >
        <Bg />
        <h1
          className={`${styles.txtGradientRight} text-center text-[56px] leading-[110%] mb-[60px]`}
        >
          Политика конфиденциальности
        </h1>

        <div className="w-full grid gap-[40px] grid-cols-[260px_1fr]">
          <PolicySidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <PolicyContent activeTab={activeTab} />
        </div>
      </div>
    </>
  );
}
