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
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 7V9H16V7H13ZM7.03233 15L8.47092 13.5692L3.89081 9.01287H10V6.98815H3.89081L8.47092 2.43177L7.03233 1L0 8L0.717771 8.71538L1.43656 9.43177L7.03233 15Z" fill="#ADADAD"/>
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
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 9V7H0V9H3ZM8.96767 1L7.52908 2.43076L12.1092 6.98713H6V9.01185H12.1092L7.52908 13.5682L8.96767 15L16 8L15.2822 7.28462L14.5634 6.56823L8.96767 1Z"
                                fill="#ADADAD"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileSlider;
