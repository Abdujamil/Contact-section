// src/components/Form/validation.ts

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

export const validContact = (
    value: string,
    isEmail: boolean,
    isPhone: boolean
): boolean => {
    return (isEmail && emailRegex.test(value.trim())) 
    || (isPhone && phoneRegex.test(value.trim()));
};
