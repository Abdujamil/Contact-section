"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  editorName?: string;
  editorId?: number;
  blogTitle?: string;
}

export default function Breadcrumbs({
  editorName,
  editorId,
  blogTitle,
}: BreadcrumbsProps) {
  //   const pathname = usePathname();

  return (
    <nav className="absolute top-[75px] left-[30px] text-sm text-[#999] mb-4">
      <ul className="flex gap-2 flex-wrap">
        <li>
          <Link href="/" className="hover:underline text-[#3D9ED6]">
            Главная
          </Link>
        </li>
        {editorName && editorId && (
          <>
            <li className={`flex items-center justify-center`}>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 0.917969L5.33333 5.0013L1.25 9.08464"
                  stroke="#CCCCCC"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
            <li>
              <Link
                href={`/editors`}
                className="hover:underline text-[#3D9ED6]"
              >
                Редакторы
              </Link>
            </li>
            <li className={`flex items-center justify-center`}>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 0.917969L5.33333 5.0013L1.25 9.08464"
                  stroke="#CCCCCC"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
            <li>
              <Link
                href={`/editorPage/${editorId}`}
                className="hover:underline text-[#3D9ED6]"
              >
                {editorName}
              </Link>
            </li>
          </>
        )}
        {blogTitle && (
          <>
            <li className={`flex items-center justify-center`}>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 0.917969L5.33333 5.0013L1.25 9.08464"
                  stroke="#CCCCCC"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </li>
            <li className="text-white">{blogTitle}</li>
          </>
        )}
      </ul>
    </nav>
  );
}
