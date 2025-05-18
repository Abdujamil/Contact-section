// src/components/Form/fileUpload.ts
import {readFileAsText} from "@/components/Form/utils";

export const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setText: React.Dispatch<React.SetStateAction<string>>,
    textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        const content = await readFileAsText(file);
        setText(prev => prev + content);

        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            );
        }
    } catch (error) {
        console.error("Ошибка при чтении файла:", error);
    }
};
