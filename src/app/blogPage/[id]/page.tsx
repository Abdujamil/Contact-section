import React from "react";
import { notFound } from "next/navigation";
import { blogData } from "@/data/blog";
import ScrollWrapper from "@/components/ScrollBar/ScrollWrapper";


export async function generateStaticParams() {
  return blogData.map((item) => ({
    id: item.id.toString(),
  }));
}

export default function blogPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const id = parseInt(params.id);
  const fromHeader = searchParams?.from === "header";
  const faqItem = blogData.find((item) => item.id === id);

  if (!faqItem || !fromHeader) return notFound();
  return (
        <>
            <ScrollWrapper>
                <div className={`h-dvh`}>
                    <div
                        className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto mt-[120px] px-[10px] mb-[100px] grid grid-cols-4 gap-[58px]">
                        {id}
                    </div>
                </div>
            </ScrollWrapper>
        </>
    );
}
