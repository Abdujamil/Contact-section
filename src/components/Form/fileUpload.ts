// src/components/Form/fileUpload.ts
'use client'
// import {useState} from "react";
import {readFileAsText} from "@/components/Form/utils";

// export const handleFileUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setText: React.Dispatch<React.SetStateAction<string>>,
//     textareaRef: React.RefObject<HTMLTextAreaElement | null>
// ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//
//     try {
//         const content = await readFileAsText(file);
//         setText(prev => prev + content);
//
//         if (textareaRef.current) {
//             textareaRef.current.focus();
//             textareaRef.current.setSelectionRange(
//                 textareaRef.current.value.length,
//                 textareaRef.current.value.length
//             );
//         }
//     } catch (error) {
//         console.error("Ошибка при чтении файла:", error);
//     }
// };

export const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setFiles(prev => [...prev, ...newFiles]);

    const textExtensions = ["txt", "text", "md", "csv", "json", "xml", "html", "log"];

    for (const file of newFiles) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "";

        try {
            if (textExtensions.includes(ext)) {
                const content = await readFileAsText(file);
                setText(prev => prev + "\n" + content);
            } else {
                // Просто вставим название файла в textarea как маркер
                setText(prev => prev + `\n[Прикреплён файл: ${file.name}]`);
            }
        } catch (error) {
            console.error("Ошибка при чтении файла:", file.name, error);
        }
    }

    if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
        );
    }
};


