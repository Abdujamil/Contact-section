// src/components/Form/utils.ts
export const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => reject(reader.error);

        reader.readAsText(file);
    });
};
