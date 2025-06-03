// import React from "react";
// import styles from "@/app/page.module.scss";
// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";

// interface BlogCardProps {
//   id: number;
//   num: string;
//   title: string;
//   date: string;
//   src: string | StaticImageData;
// }

// const BlogCard: React.FC<BlogCardProps> = ({ id, num, title, date, src }) => {
//   return (
//     <div className={`${styles.card} group w-full h-[348px] border border-[#353535] hover:border-[#CCCCCC] rounded-[8px] overflow-hidden active:scale-[0.95] transition-transform ease-in duration-200`}
//           style={{
//             willChange: "transform",
//             transform: "translateZ(0)",
//             backfaceVisibility: "hidden",
//             WebkitBackfaceVisibility: "hidden",
//           }}>
//       <Link className={`scroll-mt-24`} href={`/blogPage/${id}`}>
//         <div>
//           <div
//             className={`!w-full min-w-[260px] h-[171px] rounded-tl-[8px] rounded-tr-[8px] relative`}
//           >
//             <Image
//               src={src}
//               alt={`Картинка ${num}`}
//               width={260}
//               height={171}
//               loading="eager"
//               draggable={false}
//               className={`min-h-[171px] rounded-tl-[8px] rounded-tr-[8px] object-cover !select-none !pointer-events-auto relative top-[-2] group-hover:scale-105 transition-transform duration-100 ease-in`}
//             />
//           </div>

//           <div className={`${styles.cardBody} py-[20px] px-[15px]`}>
//             <h3
//               className={`${styles.cardTitle} text-[19.5px] text-[#CCCCCC] leading-[120%] mb-[52px] group-hover:text-[#3D9ED6]`}
//             >
//               {title}
//             </h3>

//             <div
//               className={`${styles.cardBody} w-full flex  items-end justify-between`}
//             >
//               <p
//                 className={`${styles.cardBodyDate}  flex items-center gap-[4px] text-[#737373] text-[14px] leading-[13px]`}
//               >
//                 <Image
//                   src="/mingcute_calendar-fill.svg"
//                   alt="calendar-icon"
//                   width={14}
//                   height={14}
//                 />
//                 {date}
//               </p>

//               <div>
//                 <Link
//                   href={`/`}
//                   className={`${styles.cardBodyDate} flex items-center gap-[4px]  text-[#737373] text-[14px] leading-[13px] hover:text-[#ccc] transition-colors duration-100 ease-in`}
//                 >
//                   <svg
//                     width="14"
//                     height="15"
//                     viewBox="0 0 14 15"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M11.6359 6.97124L11.1073 7.49979L10.0238 6.41626L10.5523 5.88771C10.6067 5.83445 10.6797 5.80461 10.7558 5.80461C10.8319 5.80461 10.905 5.83445 10.9593 5.88771L11.6359 6.56426C11.7469 6.67525 11.7469 6.86024 11.6359 6.97124ZM6.50892 9.92584L9.71193 6.72282L10.7955 7.80635L7.59773 11.0146H6.50892V9.92584ZM6.50892 7.3148C4.17273 7.3148 2.28052 8.2609 2.28052 9.429V10.4861H5.45182V9.48714L7.56602 7.37294C7.21718 7.33065 6.86305 7.3148 6.50892 7.3148ZM6.50892 2.0293C5.9482 2.0293 5.41044 2.25204 5.01395 2.64853C4.61746 3.04502 4.39472 3.58278 4.39472 4.1435C4.39472 4.70422 4.61746 5.24197 5.01395 5.63846C5.41044 6.03495 5.9482 6.2577 6.50892 6.2577C7.06964 6.2577 7.60739 6.03495 8.00388 5.63846C8.40037 5.24197 8.62312 4.70422 8.62312 4.1435C8.62312 3.58278 8.40037 3.04502 8.00388 2.64853C7.60739 2.25204 7.06964 2.0293 6.50892 2.0293Z"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   Автор
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default BlogCard;

import React from "react";
import styles from "@/app/page.module.scss";
import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSlug } from "@/components/utils/createSlug"; 

interface BlogCardProps {
  id: number;
  num: string;
  title: string;
  date: string;
  src: string | StaticImageData;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, num, title, date, src }) => {
  const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/blogPage/${id}`);
  // };

  const handleCardClick = () => {
    const slug = createSlug(title);
    console.log('Original title:', title);
    console.log('Generated slug:', slug);
    console.log('Final URL:', `/blogPage/${slug}`);
    
    if (!slug) {
      console.error('Slug is empty for title:', title);
      return;
    }
    
    router.push(`/blogPage/${slug}`);
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/');
  };

  return (
    <div 
      className={`${styles.card} group w-full h-[348px] border border-[#353535] hover:border-[#CCCCCC] rounded-[8px] overflow-hidden active:scale-[0.95] transition-transform ease-in duration-200 cursor-pointer`}
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
          className={`!w-full min-w-[260px] h-[171px] rounded-tl-[8px] rounded-tr-[8px] relative`}
        >
          <Image
            src={src}
            alt={`Картинка ${num}`}
            width={260}
            height={171}
            loading="eager"
            draggable={false}
            className={`min-h-[171px] rounded-tl-[8px] rounded-tr-[8px] object-cover !select-none !pointer-events-auto relative top-[-2] group-hover:scale-105 transition-transform duration-100 ease-in`}
          />
        </div>

        <div className={`${styles.cardBody} py-[20px] px-[15px]`}>
          <h3
            className={`${styles.cardTitle} text-[19.5px] text-[#CCCCCC] leading-[120%] mb-[52px] group-hover:text-[#3D9ED6]`}
          >
            {title}
          </h3>

          <div
            className={`${styles.cardBody} w-full flex  items-end justify-between`}
          >
            <p
              className={`${styles.cardBodyDate}  flex items-center gap-[4px] text-[#737373] text-[14px] leading-[13px]`}
            >
              <Image
                src="/mingcute_calendar-fill.svg"
                alt="calendar-icon"
                width={14}
                height={14}
              />
              {date}
            </p>

            <div>
              <button
                onClick={handleAuthorClick}
                className={`${styles.cardBodyDate} flex items-center gap-[4px] text-[#737373] text-[14px] leading-[13px] hover:text-[#ccc] transition-colors duration-100 ease-in bg-transparent border-none cursor-pointer`}
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6359 6.97124L11.1073 7.49979L10.0238 6.41626L10.5523 5.88771C10.6067 5.83445 10.6797 5.80461 10.7558 5.80461C10.8319 5.80461 10.905 5.83445 10.9593 5.88771L11.6359 6.56426C11.7469 6.67525 11.7469 6.86024 11.6359 6.97124ZM6.50892 9.92584L9.71193 6.72282L10.7955 7.80635L7.59773 11.0146H6.50892V9.92584ZM6.50892 7.3148C4.17273 7.3148 2.28052 8.2609 2.28052 9.429V10.4861H5.45182V9.48714L7.56602 7.37294C7.21718 7.33065 6.86305 7.3148 6.50892 7.3148ZM6.50892 2.0293C5.9482 2.0293 5.41044 2.25204 5.01395 2.64853C4.61746 3.04502 4.39472 3.58278 4.39472 4.1435C4.39472 4.70422 4.61746 5.24197 5.01395 5.63846C5.41044 6.03495 5.9482 6.2577 6.50892 6.2577C7.06964 6.2577 7.60739 6.03495 8.00388 5.63846C8.40037 5.24197 8.62312 4.70422 8.62312 4.1435C8.62312 3.58278 8.40037 3.04502 8.00388 2.64853C7.60739 2.25204 7.06964 2.0293 6.50892 2.0293Z"
                    fill="currentColor"
                  />
                </svg>
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