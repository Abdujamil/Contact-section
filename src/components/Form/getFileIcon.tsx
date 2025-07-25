import {JSX} from "react";
import WordIcon from '@/../public/word-icon.svg';

import {
    // FaFilePdf,
    FaFileAlt,
    // FaFileWord,
    FaFileExcel,
    FaFileCode,
    FaFile,
} from "react-icons/fa";
import Image from "next/image";

export const getFileIcon = (filename: string): JSX.Element => {
    const ext = filename.split(".").pop()?.toLowerCase();

    switch (ext) {
        case "pdf":
            return (
                <svg className={`min-w-[32px]`} width="23" height="24" viewBox="0 0 23 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.42627 0.0478516H16.0552L22.0435 5.99707V22.5938C22.0435 23.3438 21.4351 23.9521 20.6851 23.9521H5.42627C4.67613 23.9521 4.06787 23.3439 4.06787 22.5938V1.40625C4.06787 0.656111 4.67613 0.0478516 5.42627 0.0478516Z"
                        fill="url(#paint0_linear_5138_3734)" stroke="url(#paint1_linear_5138_3734)"
                        strokeWidth="0.096"/>
                    <path d="M16.0981 0L22.0904 5.95313H17.5044C16.7277 5.95313 16.0981 5.32353 16.0981 4.54688V0Z"
                          fill="#BDBDBD"/>
                    <path d="M22.0908 10.3594L17.6556 5.95312H22.0908V10.3594Z" fill="#868686"/>
                    <path
                        d="M4.02002 12.8906C4.02002 12.5023 4.33482 12.1875 4.72314 12.1875H18.3683C18.7566 12.1875 19.0714 12.5023 19.0714 12.8906V20.4375C19.0714 20.8258 18.7566 21.1406 18.3683 21.1406H4.02002V12.8906Z"
                        fill="#868686"/>
                    <g filter="url(#filter0_ddddii_5138_3734)">
                        <rect x="1" y="11.25" width="18.0711" height="8.95313" rx="0.703124"
                              fill="url(#paint2_linear_5138_3734)"/>
                        <rect x="1.01172" y="11.2617" width="18.0477" height="8.92969" rx="0.691405"
                              stroke="url(#paint3_linear_5138_3734)" strokeWidth="0.0234375"/>
                    </g>
                    <g filter="url(#filter1_ddiiii_5138_3734)">
                        <path
                            d="M2.99869 18.4399V12.9424H4.77994C5.45494 12.9424 5.89494 12.9699 6.09994 13.0249C6.41494 13.1074 6.67869 13.2874 6.89119 13.5649C7.10369 13.8399 7.20994 14.1962 7.20994 14.6337C7.20994 14.9712 7.14869 15.2549 7.02619 15.4849C6.90369 15.7149 6.74744 15.8962 6.55744 16.0287C6.36994 16.1587 6.17869 16.2449 5.98369 16.2874C5.71869 16.3399 5.33494 16.3662 4.83244 16.3662H4.10869V18.4399H2.99869ZM4.10869 13.8724V15.4324H4.71619C5.15369 15.4324 5.44619 15.4037 5.59369 15.3462C5.74119 15.2887 5.85619 15.1987 5.93869 15.0762C6.02369 14.9537 6.06619 14.8112 6.06619 14.6487C6.06619 14.4487 6.00744 14.2837 5.88994 14.1537C5.77244 14.0237 5.62369 13.9424 5.44369 13.9099C5.31119 13.8849 5.04494 13.8724 4.64494 13.8724H4.10869ZM8.11744 12.9424H10.1462C10.6037 12.9424 10.9524 12.9774 11.1924 13.0474C11.5149 13.1424 11.7912 13.3112 12.0212 13.5537C12.2512 13.7962 12.4262 14.0937 12.5462 14.4462C12.6662 14.7962 12.7262 15.2287 12.7262 15.7437C12.7262 16.1962 12.6699 16.5862 12.5574 16.9137C12.4199 17.3137 12.2237 17.6374 11.9687 17.8849C11.7762 18.0724 11.5162 18.2187 11.1887 18.3237C10.9437 18.4012 10.6162 18.4399 10.2062 18.4399H8.11744V12.9424ZM9.22744 13.8724V17.5137H10.0562C10.3662 17.5137 10.5899 17.4962 10.7274 17.4612C10.9074 17.4162 11.0562 17.3399 11.1737 17.2324C11.2937 17.1249 11.3912 16.9487 11.4662 16.7037C11.5412 16.4562 11.5787 16.1199 11.5787 15.6949C11.5787 15.2699 11.5412 14.9437 11.4662 14.7162C11.3912 14.4887 11.2862 14.3112 11.1512 14.1837C11.0162 14.0562 10.8449 13.9699 10.6374 13.9249C10.4824 13.8899 10.1787 13.8724 9.72619 13.8724H9.22744ZM13.6787 18.4399V12.9424H17.4474V13.8724H14.7887V15.1737H17.0837V16.1037H14.7887V18.4399H13.6787Z"
                            fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_ddddii_5138_3734" x="0.859375" y="11.1094" width="18.3994" height="9.28125"
                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.0468749" dy="0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0703124"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0.9 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.0468749" dy="-0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"/>
                            <feBlend mode="normal" in2="effect1_dropShadow_5138_3734"
                                     result="effect2_dropShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.0468749" dy="-0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="effect2_dropShadow_5138_3734"
                                     result="effect3_dropShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.0468749" dy="0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="effect3_dropShadow_5138_3734"
                                     result="effect4_dropShadow_5138_3734"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_5138_3734"
                                     result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.0468749" dy="-0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0 0.682353 0 0 0 0.5 0"/>
                            <feBlend mode="normal" in2="shape" result="effect5_innerShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.0468749" dy="0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
                            <feBlend mode="normal" in2="effect5_innerShadow_5138_3734"
                                     result="effect6_innerShadow_5138_3734"/>
                        </filter>
                        <filter id="filter1_ddiiii_5138_3734" x="2.76416" y="12.708" width="14.9175" height="5.96631"
                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.0468749" dy="-0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0.5 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.0468749" dy="0.0468749"/>
                            <feGaussianBlur stdDeviation="0.0468749"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"/>
                            <feBlend mode="normal" in2="effect1_dropShadow_5138_3734"
                                     result="effect2_dropShadow_5138_3734"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5138_3734"
                                     result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.234375" dy="0.234375"/>
                            <feGaussianBlur stdDeviation="0.304687"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0.9 0"/>
                            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.234375" dy="-0.234375"/>
                            <feGaussianBlur stdDeviation="0.234375"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"/>
                            <feBlend mode="normal" in2="effect3_innerShadow_5138_3734"
                                     result="effect4_innerShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="0.234375" dy="-0.234375"/>
                            <feGaussianBlur stdDeviation="0.234375"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="effect4_innerShadow_5138_3734"
                                     result="effect5_innerShadow_5138_3734"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-0.234375" dy="0.234375"/>
                            <feGaussianBlur stdDeviation="0.234375"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix"
                                           values="0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0 0.85098 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="effect5_innerShadow_5138_3734"
                                     result="effect6_innerShadow_5138_3734"/>
                        </filter>
                        <linearGradient id="paint0_linear_5138_3734" x1="4.02002" y1="0" x2="27.0853" y2="17.3673"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset="1" stopColor="#C5C5C5"/>
                            <stop stopColor="#7C7C7C"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_5138_3734" x1="4.74333" y1="-8.44544e-08" x2="21.2203"
                                        y2="24.1009" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white"/>
                            <stop offset="1" stopColor="#747474"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_5138_3734" x1="1.26525" y1="11.25" x2="18.7577" y2="20.2963"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DD0212"/>
                            <stop offset="0.14" stopColor="#EF0012"/>
                            <stop offset="1" stopColor="#DF0011"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_5138_3734" x1="10.0356" y1="11.25" x2="15.3626" y2="20.2338"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F0F0F0"/>
                            <stop offset="1" stopColor="#7C7C7C"/>
                        </linearGradient>
                    </defs>
                </svg>
            );
        case "txt":
        case "text":
        case "log":
            return <FaFileAlt className="text-gray-400 w-[26px] h-[23px]"/>;
        case "doc":
        case "docx":
            return (
                // <svg className={`min-w-[32px]`} width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                //     <rect y="0.133545" width="26.25" height="23.7329" rx="2.25" fill="url(#pattern0_5138_3731)"/>
                //     <defs>
                //         <pattern className={`min-w-[32px]`} id="pattern0_5138_3731" patternContentUnits="objectBoundingBox" width="1" height="1">
                //             <use xlinkHref="#image0_5138_3731" transform="matrix(0.00527355 0 0 0.00595298 -0.469346 -0.614502)"/>
                //         </pattern>
                //         <image id="image0_5138_3731" width="375" height="375" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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"/>
                //     </defs>
                // </svg>

                <Image
                    src={WordIcon}
                    width={32}
                    height={32}
                    alt={`word icon`}
                />
            );
        case "csv":
        case "xls":
        case "xlsx":
            return <FaFileExcel className="min-w-[32px] w-[26px] h-[23px]"/>;
        case "json":
        case "xml":
        case "html":
            return <FaFileCode className="min-w-[32px] w-[26px] h-[23px]"/>;
        default:
            return <FaFile className="min-w-[32px] w-[26px] h-[23px]"/>;
    }
};

