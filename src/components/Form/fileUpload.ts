'use client'

// export const handleFileUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setText: React.Dispatch<React.SetStateAction<string>>, // можно оставить, если где-то еще используется
//     setFiles: React.Dispatch<React.SetStateAction<File[]>>,
//     textareaRef: React.RefObject<HTMLTextAreaElement | null>
// ) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
//
//     const newFiles = Array.from(files);
//     setFiles(prev => [...prev, ...newFiles]);
//
//     for (const file of newFiles) {
//         try {
//             await readFileAsText(file); // читаем, если хочешь валидировать или анализировать
//         } catch (error) {
//             console.error("Ошибка при чтении файла:", file.name, error);
//         }
//     }
//
//     // очищаем input, чтобы можно было снова загрузить тот же файл
//     e.target.value = '';
//
//     // фокус на textarea, если нужно
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
    setText: React.Dispatch<React.SetStateAction<string>>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    setFiles(prev => {
        const total = prev.length + newFiles.length;
        if (total > 2) {
            const allowed = 2 - prev.length;
            if (allowed <= 0) {
                // Превышен лимит — не добавляем ничего
                return prev;
            }
            return [...prev, ...newFiles.slice(0, allowed)];
        }
        return [...prev, ...newFiles];
    });

    // Очищаем input
    e.target.value = '';

    if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
        );
    }
};
