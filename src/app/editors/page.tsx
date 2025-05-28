"use client";

import React from "react";
import Bg from "@/components/background/bg";
import ScrollWrapper from "@/components/ScrollBar/ScrollWrapper";
import Footer from "@/app/footer";
import Breadcrumbs from "@/components/breadCrumbs/breadCrumbs";

export default function editors() {
  return (
    <>
      <Bg />
      <ScrollWrapper>
        <Bg />
        <div className={`min-h-screen mt-[120px]`}>
          <Breadcrumbs />
          <div className={`max-w-[1180px] m-auto`}>
            <h1 className="text-white min-h-screen text-3xl font-bold mb-4">
              Editors will here
            </h1>
          </div>

          <Footer />
        </div>
      </ScrollWrapper>
    </>
  );
}
