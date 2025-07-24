'use client'
import {readFileAsText} from "@/components/Form/utils";

// export const handleFileUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setText: React.Dispatch<React.SetStateAction<string>>,
//     setFiles: React.Dispatch<React.SetStateAction<File[]>>,
//     textareaRef: React.RefObject<HTMLTextAreaElement | null>
// ) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
//
//     const newFiles = Array.from(files);
//     setFiles(prev => [...prev, ...newFiles]);
//
//     // Расширенный список текстовых файлов
//     const textExtensions = ["txt", "text", "md", "csv", "json", "xml", "html", "log"];
//
//     for (const file of newFiles) {
//         const ext = file.name.split(".").pop()?.toLowerCase() || "";
//
//         try {
//             if (textExtensions.includes(ext)) {
//                 // Для текстовых файлов читаем содержимое
//                 const content = await readFileAsText(file);
//                 setText(prev => prev + "\n" + content);
//             } else {
//                 // Для всех остальных файлов (включая PDF, Word, Excel) просто добавляем маркер
//                 setText(prev => prev + `\n[Прикреплён файл: ${file.name}]`);
//             }
//         } catch (error) {
//             console.error("Ошибка при чтении файла:", file.name, error);
//             // В случае ошибки все равно добавляем маркер файла
//             setText(prev => prev + `\n[Прикреплён файл: ${file.name}]`);
//         }
//     }
//
//     // Очищаем input для возможности повторной загрузки того же файла
//     e.target.value = '';
//
//     if (textareaRef.current) {
//         textareaRef.current.focus();
//         textareaRef.current.setSelectionRange(
//             textareaRef.current.value.length,
//             textareaRef.current.value.length
//         );
//     }
// };

export const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setText: React.Dispatch<React.SetStateAction<string>>, // можно оставить, если где-то еще используется
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setFiles(prev => [...prev, ...newFiles]);

    for (const file of newFiles) {
        try {
            await readFileAsText(file); // читаем, если хочешь валидировать или анализировать
        } catch (error) {
            console.error("Ошибка при чтении файла:", file.name, error);
        }
    }

    // очищаем input, чтобы можно было снова загрузить тот же файл
    e.target.value = '';

    // фокус на textarea, если нужно
    if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
        );
    }
};
