import React from 'react';
import styles from "@/app/page.module.scss";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

interface BlogCardProps {
    id: number;
    num: string;
    title: string;
    date: string;
    src: string | StaticImageData;
}


const BlogCard: React.FC<BlogCardProps> = ({id, num, title, date, src}) => {
    return (
        <Link href={`/blogPage/${id}`}>
            <div
            className={`${styles.card} group w-full h-[348px] border border-[#353535] hover:border-[#CCCCCC] rounded-[8px] overflow-hidden`}
            style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
            }}>
            <div className={`!w-full h-[171px] rounded-tl-[8px] rounded-tr-[8px] relative`}>
                <Image
                    src={src}
                    alt={`Картинка ${num}`}
                    width={260}
                    height={171}
                    loading="eager"
                    className={`min-h-[171px] rounded-tl-[8px] rounded-tr-[8px] object-cover !select-none !pointer-events-auto relative top-[-2] group-hover:scale-105 transition-transform duration-100 ease-in`}
                />
            </div>

            <div className={`${styles.cardBody} py-[20px] px-[15px]`}>
                <h3 className={`${styles.cardTitle} text-[19.5px] text-[#CCCCCC] leading-[120%] mb-6 group-hover:text-[#3D9ED6] transition-all duration-100 ease-in`}>
                    {title}
                </h3>

                <div className={`${styles.cardBody} w-full flex  items-end justify-between`}>
                    <p className={`${styles.cardBodyDate} text-[#737373] text-[16px] leading-[13px]`}>{date}</p>
                    
                    <div>
                        <p className={`${styles.cardBodyDate} text-[#737373] text-[16px] leading-[13px]`}>Автор</p>
                    </div>

                </div>
            </div>
        </div>
</Link>
        
    );
};

export default BlogCard;