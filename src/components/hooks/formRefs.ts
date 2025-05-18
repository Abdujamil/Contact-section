import {useRef} from "react";

export const useFormRefs = () => {
    const contactInputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const checkboxContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return {
        contactInputRef,
        selectRef,
        checkboxContainerRef,
        fileInputRef,
        textareaRef,
    };
};
