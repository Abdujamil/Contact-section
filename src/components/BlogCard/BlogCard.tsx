import React from "react";
import styles from "@/app/page.module.scss";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { createSlug } from "@/components/utils/createSlug";

interface BlogCardProps {
  id: number;
  editorId: number;
  num: string;
  title: string;
  date: string;
  src: string | StaticImageData;
}

const BlogCard: React.FC<BlogCardProps> = ({ editorId, num, title, date, src }) => {
  const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/blogPage/${id}`);
  // };

  const handleCardClick = () => {
    const slug = createSlug(title);
    console.log("Original title:", title);
    console.log("Generated slug:", slug);
    console.log("Final URL:", `/blogPage/${slug}`);

    if (!slug) {
      console.error("Slug is empty for title:", title);
      return;
    }

    router.push(`/blogPage/${slug}`);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/editorPage/${editorId}`);
  };

  return (
    <div
      className={`${styles.card} ${styles.shadowcards} group w-full max-w-[260px] m-auto h-[348px] border border-[#353535] hover:border-[#CCCCCC] rounded-[8px] overflow-hidden cursor-pointer`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      onClick={handleCardClick}
    >
      <div>
        <div
          className={`!w-full max-w-[260px] h-[171px] rounded-tl-[8px] rounded-tr-[8px] relative`}
        >
          <Image
            src={src}
            alt={`image ${num}`}
            width={260}
            height={171}
            loading="eager"
            draggable={false}
            className={`!w-full min-h-[171px] rounded-tl-[8px] rounded-tr-[8px] object-cover !select-none !pointer-events-auto relative top-[-2] group-hover:scale-105 transition-transform duration-100 ease-in`}
          />
        </div>

        <div className={`${styles.cardBody} py-[20px] px-[15px]`}>
          <h2
            className={`${styles.cardTitle} line-clamp-3 text-[19.5px] !text-[#adadad] leading-[120%] mb-[52px] `}
          >
            {title}
          </h2>

          <div
            className={`${styles.cardBody} w-full flex  items-end justify-between`}
          >
            <p
              className={`${styles.cardBodyDate}  flex items-center gap-[4px] text-[#adadad] text-[14px] leading-[13px]`}
            >
              {date}
            </p>

            <div>
              <button
                onClick={handleAuthorClick}
                className={`${styles.cardBodyDate} flex items-center gap-[4px] text-[#adadad] text-[14px] leading-[13px] hover:text-[#ccc] transition-colors duration-100 ease-in bg-transparent border-none cursor-pointer`}
              >
                Автор
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
