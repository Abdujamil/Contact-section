import React from "react";
import { notFound } from "next/navigation";
import { blogData } from "@/data/blog";
import styles from "@/app/page.module.scss";
import BlogPageContent from "@/components/blogPageCard/BlogPageContent";
import Footer from "@/app/footer";
import Bg from "@/components/background/bg";
import { createSlug } from "@/components/utils/createSlug";

export async function generateStaticParams() {
  return blogData.map((item) => ({
    id: item.id.toString(),
  }));
}

export default function blogPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log('🔍 Looking for slug:', params.slug);
  
  const fromHeader = searchParams?.from === "header";
  
  // Ищем блог по slug
  const blogItem = blogData.find((item) => {
    const itemSlug = createSlug(item.title);
    const match = itemSlug === params.slug;
    console.log(`🔎 "${item.title}" -> "${itemSlug}" === "${params.slug}" ? ${match}`);
    return match;
  });
  
  if (!blogItem) {
    console.log('❌ Blog item not found for slug:', params.slug);
    console.log('📋 Available slugs:', blogData.map(item => createSlug(item.title)));
    return notFound();
  }
  
  console.log('✅ Found blog item:', blogItem.title);

  return (
    <>
      <Bg />
      <div className={`h-dvh mt-[134px]`}>
        <h1
          className={`${styles.txtGradientRight} max-w-[882px] m-auto text-center text-[56px] leading-[110%] mb-10`}
        >
          Транскрибация лекции с учетом академических требований
        </h1>
        <div className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto px-[10px] mb-[100px] grid">
          <BlogPageContent fromHeader={fromHeader} id={blogItem.id} />
        </div>

        <Footer />
      </div>
    </>
  );
}
