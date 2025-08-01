import React from "react";
import {notFound} from "next/navigation";
import {blogData} from "@/data/blog";
import styles from "@/app/page.module.scss";
import BlogPageContent from "@/components/blogPageCard/BlogPageContent";
// import Footer from "@/app/footer";
import Bg from "@/components/background/bg";
import {createSlug} from "@/components/utils/createSlug";


export async function generateStaticParams() {
    try {
        if (!blogData || !Array.isArray(blogData)) {
            console.error("blogData is not available or not an array");
            return [];
        }

        const params = blogData
            .map((item) => {
                const slug = createSlug(item.title);

                if (!slug) {
                    console.warn(`Empty slug for item: ${item.title}`);
                    return null;
                }

                console.log(`Generated static param: "${item.title}" -> "${slug}"`);
                return {slug};
            })
            .filter(Boolean);

        console.log("Total generated params:", params.length);
        return params;
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    try {
        const {slug} = await params;
        const blogItem = blogData.find((item) => createSlug(item.title) === slug);

        if (!blogItem) {
            return {
                title: "Блог не найден",
                description: "Запрашиваемая страница блога не существует",
            };
        }

        return {
            title: blogItem.title,
            description: `Блог: ${blogItem.title}`,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Ошибка загрузки",
            description: "Произошла ошибка при загрузке страницы",
        };
    }
}

export default async function BlogPage({
                                           params,
                                           searchParams,
                                       }: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    try {
        // Ждем разрешения params и searchParams
        const {slug} = await params;
        const resolvedSearchParams = searchParams ? await searchParams : {};

        // Проверяем наличие slug
        if (!slug) {
            console.error("No slug provided");
            return notFound();
        }

        if (!blogData || !Array.isArray(blogData)) {
            console.error("blogData is not available");
            return notFound();
        }

        const fromHeader = resolvedSearchParams?.from === "header";

        // Ищем блог по slug
        const blogItem = blogData.find((item) => {
            const itemSlug = createSlug(item.title);
            return itemSlug === slug;
        });

        if (!blogItem) {
            console.log(`Blog item not found for slug: ${slug}`);
            return notFound();
        }

        console.log(`Found blog item: ${blogItem.title}`);

        return (
            <>
                <Bg/>
                <div className={`mt-[110px]`}>
                    <h1
                        className={`${styles.txtGradientRight} w-fit
                         max-w-[862px] text-center m-auto text-[28px] leading-[110%] mb-[20px]
                        md:text-[48px] md:mb-[40px]`}
                    >
                        {blogItem.title}
                    </h1>
                    <div className="w-full max-w-[1180px] h-auto min-h-lvh mx-auto px-[10px] mb-[100px] grid">
                        <BlogPageContent fromHeader={fromHeader} id={blogItem.id}/>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error("Error rendering blog page:", error);
        return notFound();
    }
}
