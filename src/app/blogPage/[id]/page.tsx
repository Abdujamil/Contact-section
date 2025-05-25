import React from "react";
import { notFound } from "next/navigation";
import { blogData } from "@/data/blog";
import ScrollWrapper from "@/components/ScrollBar/ScrollWrapper";
import styles from "@/app/page.module.scss";
import BlogPageContent from "@/components/blogPageCard/BlogPageContent";
import Footer from "@/app/footer";

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

  if (fromHeader) {
    console.log("hey!");
  }
  if (!faqItem) return notFound();
  return (
    <>
      <ScrollWrapper>
        <div className={`h-dvh mt-[120px]`}>
          <h1
            className={`${styles.txtGradientRight} max-w-[882px] m-auto text-center text-[56px] leading-[110%] mb-10`}
          >
            Транскрибация лекции с учетом академических требований
          </h1>
          <div className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto px-[10px] mb-[100px] grid">
            <BlogPageContent fromHeader={fromHeader} id={id} />
          </div>

          <Footer />
        </div>
      </ScrollWrapper>
    </>
  );
}
