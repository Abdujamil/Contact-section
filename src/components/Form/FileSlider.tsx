import React, {useRef} from "react";
import {getFileIcon} from "@/components/Form/getFileIcon";

const FileSlider = ({uploadedFiles}: { uploadedFiles: File[] }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sliderRef.current?.scrollBy({left: 150, behavior: "smooth"});
    };

    const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sliderRef.current?.scrollBy({left: -150, behavior: "smooth"});
    };

    return (
        <div
            className="absolute bottom-2 left-[1px] right-[1px] px-7 bg-[rgba(53,53,53,0.1)] shadow-[0_0_5px_rgba(0,0,0,0.6)] backdrop-blur-[2px]">
            <div className="relative">
                {/* Левая стрелка (опционально) */}
                {uploadedFiles.length > 2 && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-[-25px] top-1/2 -translate-y-1/2 z-10 p-2.5 cursor-pointer"
                    >
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.7451L1.24719 5.95076L0 7.20562L6.75281 14L8 12.7451ZM8 1.25486L6.75281 0L3.16208 3.74341L4.41015 4.99827L8 1.25486Z" fill="#ADADAD"/>
                        </svg>
                    </button>
                )}

                {/* Слайдер */}
                <div
                    ref={sliderRef}
                    className="flex gap-2 py-[15px] max-w-full overflow-hidden"
                >
                    {uploadedFiles.map((file, idx) => (
                        <div
                            key={idx}
                            className="!min-w-[149px] text-[#ccc] px-2 py-1 rounded text-sm overflow-y-auto flex items-center justify-start gap-2"
                        >
                            {getFileIcon(file.name)}
                            <span className={`text-sm text-ellipsis overflow-hidden line-clamp-1 break-all`}>{file.name}</span>
                        </div>
                    ))}
                </div>

                {/* Правая стрелка */}
                {uploadedFiles.length > 2 && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-[-25px] top-1/2 -translate-y-1/2 z-10 p-2.5  cursor-pointer"
                    >
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12.7451L6.75281 5.95076L8 7.20562L1.24719 14L0 12.7451ZM0 1.25486L1.24719 0L4.83792 3.74341L3.58985 4.99827L0 1.25486Z" fill="#ADADAD"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileSlider;
