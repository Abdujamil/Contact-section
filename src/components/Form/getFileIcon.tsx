import {JSX} from "react";

// const PdfIcon = () => (
//     <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
// <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
// <text x="7" y="17" fontSize="10" fill="#fff">PDF</text>
//     </svg>
// );
//
// const TxtIcon = () => (
//     <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
// <path d="M6 2h12v20H6z" />
// <text x="6" y="16" fontSize="10" fill="#fff">TXT</text>
//     </svg>
// );
//
// // И т.д.
// const WordIcon = () => (
//     <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
// <path d="M4 2h14l4 4v14a2 2 0 01-2 2H4z" />
// <text x="5" y="17" fontSize="10" fill="#fff">DOC</text>
//     </svg>
// );
//
// const DefaultIcon = () => (
//     <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
// <path d="M6 2h12v20H6z" />
//     </svg>
// );


import {
    FaFilePdf,
    FaFileAlt,
    FaFileWord,
    FaFileExcel,
    FaFileCode,
    FaFile,
} from "react-icons/fa";

export const getFileIcon = (filename: string): JSX.Element => {
    const ext = filename.split(".").pop()?.toLowerCase();

    switch (ext) {
        case "pdf":
            return <FaFilePdf className="text-red-500 w-[26px] h-[23px]"/>;
        case "txt":
        case "text":
        case "log":
            return <FaFileAlt className="text-gray-400 w-[26px] h-[23px]"/>;
        case "doc":
        case "docx":
            return <FaFileWord className="text-blue-500 w-[26px] h-[23px]"/>;
        case "csv":
        case "xls":
        case "xlsx":
            return <FaFileExcel className="text-green-500 w-[26px] h-[23px]"/>;
        case "json":
        case "xml":
        case "html":
            return <FaFileCode className="text-yellow-400 w-[26px] h-[23px]"/>;
        default:
            return <FaFile className="text-white w-[26px] h-[23px]"/>;
    }
};

