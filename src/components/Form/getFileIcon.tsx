import {JSX} from "react";

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
                <Image
                    className={`min-w-[32px] w-[26px] h-[23px]`}
                    src={'/word-icon.svg'}
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

