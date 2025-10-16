// import React, {useEffect, useState, forwardRef} from 'react';
// import {useFormContext} from "react-hook-form";
// import styles from '../../../app/page.module.scss';
//
// interface AppInputProps {
//     title: string;
//     inputName: string;
//     type?: string;
//     required?: boolean;
//     disable?: boolean;
//     fail?: boolean;
//     mask?: string;
//     className?: string;
//     classNameTitle?: string;
//     value?: string;
//     onChange?: (value: string) => void;
//     onBlur?: (value: string) => void;
//     onFocus?: () => void;
//     defaultValue?: string;
//     autocomplete?: string,
//     showPasswordToggle?: boolean;
//     showPasswordExternally?: boolean;
// }
//
// const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
//                                                                   title,
//                                                                   disable,
//                                                                   fail,
//                                                                   inputName,
//                                                                   type = 'text',
//                                                                   required,
//                                                                   mask,
//                                                                   className,
//                                                                   classNameTitle,
//                                                                   value: propValue,
//                                                                   onChange,
//                                                                   onFocus,
//                                                                   defaultValue,
//                                                                   autocomplete,
//                                                                   showPasswordExternally = false,
//                                                                   onBlur
//                                                               }, ref) => {
//     const {register, formState: {errors, isSubmitted, submitCount}, setValue, watch} = useFormContext();
//     const [visibleError, setVisibleError] = useState(false);
//     const [internalValue, setInternalValue] = useState('');
//     const currentValue = propValue !== undefined ? propValue : internalValue;
//     const isActive = currentValue.trim().length > 0;
//
//     const [showPasswordInternal, setShowPasswordInternal] = useState(false);
//     const showPassword = showPasswordExternally ?? showPasswordInternal;
//
//     const isPasswordType = type === 'password';
//
//     const inputType = isPasswordType && showPassword ? 'text' : type;
//
//     const inputRef = React.useRef<HTMLInputElement>(null);
//
//     const formatPhoneNumber = (value: string) => {
//         let cleaned = value.replace(/\D/g, '');
//
//         if (cleaned[0] === '8') {
//             cleaned = '7' + cleaned.substring(1);
//         } else if (cleaned.length > 0 && cleaned[0] !== '7') {
//             cleaned = '7' + cleaned;
//         }
//
//         let formatted = cleaned.length > 0 ? '+7' : '';
//         if (cleaned.length > 1) formatted += ` (${cleaned.substring(1, 4)}`;
//         if (cleaned.length >= 5) formatted += `) ${cleaned.substring(4, 7)}`;
//         if (cleaned.length >= 8) formatted += `-${cleaned.substring(7, 9)}`;
//         if (cleaned.length >= 10) formatted += `-${cleaned.substring(9, 11)}`;
//
//         return formatted;
//     };
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         let value = e.target.value;
//
//         if (mask === 'phone') {
//             value = formatPhoneNumber(value);
//         }
//
//         setInternalValue(value);
//         setValue(inputName, value);
//         if (onChange) {
//             onChange(value);
//         }
//     };
//
//     const handleFocus = () => {
//         if (onFocus) {
//             onFocus();
//         }
//     };
//
//     const getAutocompleteName = (name: string): string => {
//         switch (name.toLowerCase()) {
//             case 'name':
//                 return 'name';
//             case 'connection':
//                 return type === 'tel' ? 'tel' : 'email';
//             case 'email':
//                 return 'email';
//             case 'phone':
//                 return 'tel';
//             case 'date':
//                 return 'bday';
//             default:
//                 return 'on';
//         }
//     };
//
//     const getPlaceholder = () => {
//         if (mask === 'date') {
//             return 'дд.мм.гггг';
//         }
//         return '';
//     };
//
//     useEffect(() => {
//         setVisibleError(false);
//         setTimeout(() => setVisibleError(true), 30);
//     }, [submitCount]);
//
//     useEffect(() => {
//         if (ref && typeof ref === 'function') {
//             ref(inputRef.current);
//         } else if (ref) {
//             (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
//         }
//     }, [ref]);
//
//     useEffect(() => {
//         const subscription = watch((value, {name}) => {
//             if (name === inputName && !value[inputName]) {
//                 setInternalValue('');
//             }
//         });
//         return () => subscription.unsubscribe();
//     }, [inputName, watch]);
//
//     useEffect(() => {
//         setValue(inputName, defaultValue || '')
//     }, [title])
//
//     useEffect(() => {
//         if (propValue !== undefined) {
//             setInternalValue(propValue);
//         }
//     }, [propValue]);
//
//     return (
//         <div
//             className={`relative w-full z-[2] max-h-[51px] ${disable && 'active:scale-[0.95]'} ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'} !transition-all !duration-300`}>
//             <label
//                 htmlFor={inputName}
//                 className={`field
//                 ${isPasswordType ? 'flex items-center justify-between' : ''}
//                 ${disable && 'pointer-events-none'}
//                 ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'}`}>
//
//                 <span className="sr-only">{title}</span>
//
//                 <input
//                     id={inputName}
//                     {...register(inputName, {required})}
//                     ref={(el) => {
//                         inputRef.current = el;
//                         register(inputName, {required}).ref(el);
//                     }}
//                     type={inputType}
//                     className={`field__input ${className} dark:text-[#adadad] ${fail && 'error !text-[red]'}
//                     ${isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]'} focus:!bg-[#20272A] active:bg-[#20272A]'}`}
//                     placeholder={getPlaceholder()}
//                     autoComplete={getAutocompleteName(inputName) || autocomplete}
//                     value={propValue !== undefined ? propValue : internalValue}
//                     onChange={handleChange}
//                     onBlur={(e) => {
//                         if (onBlur) onBlur(e.target.value);
//                         if (e.target.value) {
//                             e.target.value = e.target.value.trimEnd() + ' ';
//
//                             const selectableTypes = ['text', 'search', 'url', 'tel', 'password'];
//                             if (selectableTypes.includes(e.target.type)) {
//                                 e.target.setSelectionRange(e.target.value.length, e.target.value.length);
//                             }
//                         }
//                     }}
//                     onFocus={handleFocus}
//                     // aria-label={title}
//                     aria-labelledby={`${inputName}-label`}
//                 />
//                 <span
//                     className={`${styles.titleTop} !text-[18px] font-[Rubik] field__title ${errors[inputName] && '!text-[#FF3030]'} ${classNameTitle}`}>
//                   {title}
//                 </span>
//                 <span className={`${styles.titleBottom} font-[Rubik]  field__title-top ${classNameTitle}`}>
//                   {title}
//                 </span>
//
//                 {isPasswordType && (
//                     <button
//                         type="button"
//                         onClick={() => setShowPasswordInternal(!showPasswordInternal)}
//                         className="active:scale-[.95] flex items-center justify-center h-[51px] w-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px] bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300"
//                         aria-label={showPasswordInternal ? "Hide password" : "Show password"}
//                         tabIndex={-1}
//                     >
//                         {showPasswordInternal ? (
//                             <svg
//                                 className={`mt-[2px] ml-[3px]`}
//                                 shapeRendering="geometricPrecision"
//                                  width="24" height="24" viewBox="0 0 24 24" fill="none"
//                                  xmlns="http://www.w3.org/2000/svg">
//                                 <path
//                                     d="M2.21973 2.21983C2.09271 2.34682 2.01549 2.51517 2.00209 2.69428C1.98869 2.87339 2.04002 3.05136 2.14673 3.19583L2.21973 3.27983L6.25373 7.31483C4.28767 8.69435 2.88378 10.7354 2.29873 13.0648C2.25371 13.2566 2.28597 13.4584 2.38854 13.6267C2.4911 13.7949 2.65574 13.916 2.84687 13.9638C3.038 14.0116 3.24026 13.9823 3.40995 13.8822C3.57965 13.7821 3.70313 13.6192 3.75373 13.4288C4.27354 11.3612 5.55133 9.56449 7.33373 8.39483L9.14373 10.2048C8.42073 10.9603 8.02232 11.9689 8.03386 13.0146C8.04539 14.0602 8.46594 15.0598 9.20544 15.7991C9.94493 16.5385 10.9446 16.9589 11.9902 16.9702C13.0359 16.9816 14.0444 16.583 14.7997 15.8598L20.7187 21.7798C20.8526 21.914 21.0322 21.9926 21.2216 21.9997C21.411 22.0068 21.596 21.942 21.7396 21.8182C21.8831 21.6945 21.9744 21.5209 21.9953 21.3326C22.0161 21.1442 21.9648 20.9549 21.8517 20.8028L21.7787 20.7188L15.6657 14.6048L15.6667 14.6028L8.71673 7.65683L8.71873 7.65483L7.58573 6.52483L3.27973 2.21983C3.13911 2.07938 2.94848 2.00049 2.74973 2.00049C2.55098 2.00049 2.36036 2.07938 2.21973 2.21983ZM11.9997 5.49983C10.9997 5.49983 10.0297 5.64783 9.11073 5.92483L10.3477 7.16083C12.4873 6.73719 14.7078 7.15191 16.5502 8.31926C18.3926 9.4866 19.716 11.3173 20.2467 13.4328C20.2985 13.6218 20.4222 13.7829 20.5913 13.8818C20.7604 13.9808 20.9615 14.0096 21.1516 13.9622C21.3417 13.9148 21.5056 13.7948 21.6084 13.6281C21.7113 13.4613 21.7447 13.261 21.7017 13.0698C21.1599 10.907 19.9109 8.98733 18.153 7.61577C16.3952 6.2442 14.2294 5.49944 11.9997 5.49983ZM12.1947 9.00983L15.9957 12.8098C15.9466 11.8177 15.5303 10.8793 14.8278 10.1771C14.1253 9.47476 13.1868 9.05874 12.1947 9.00983Z"
//                                     fill="#878787"/>
//                             </svg>
//                         ) : (
//                             <svg
//                                 className={`mt-[2px] ml-[3px]`}
//                                 shapeRendering="geometricPrecision"
//                                  width="24" height="24"
//                                  viewBox="0 0 24 24" fill="none"
//                                  xmlns="http://www.w3.org/2000/svg">
//                                 <path
//                                     d="M12.0007 9.005C13.0615 9.005 14.079 9.42643 14.8291 10.1766C15.5792 10.9267 16.0007 11.9441 16.0007 13.005C16.0007 14.0659 15.5792 15.0833 14.8291 15.8334C14.079 16.5836 13.0615 17.005 12.0007 17.005C10.9398 17.005 9.92239 16.5836 9.17225 15.8334C8.4221 15.0833 8.00067 14.0659 8.00067 13.005C8.00067 11.9441 8.4221 10.9267 9.17225 10.1766C9.92239 9.42643 10.9398 9.005 12.0007 9.005ZM12.0007 5.5C16.6137 5.5 20.5967 8.65 21.7017 13.064C21.7501 13.2569 21.7198 13.4612 21.6176 13.6319C21.5154 13.8025 21.3496 13.9256 21.1567 13.974C20.9637 14.0224 20.7595 13.9922 20.5888 13.89C20.4181 13.7878 20.2951 13.6219 20.2467 13.429C19.7837 11.5925 18.7208 9.96306 17.2267 8.79913C15.7326 7.6352 13.8926 7.00338 11.9986 7.00384C10.1046 7.0043 8.26499 7.63702 6.7714 8.80167C5.27782 9.96632 4.21578 11.5962 3.75367 13.433C3.72984 13.5286 3.68741 13.6186 3.6288 13.6978C3.5702 13.777 3.49656 13.8439 3.41211 13.8946C3.32765 13.9454 3.23403 13.979 3.13658 13.9935C3.03914 14.0081 2.93978 14.0033 2.84417 13.9795C2.74857 13.9557 2.6586 13.9132 2.5794 13.8546C2.50019 13.796 2.43331 13.7224 2.38256 13.6379C2.33181 13.5535 2.2982 13.4599 2.28363 13.3624C2.26907 13.265 2.27384 13.1656 2.29767 13.07C2.83952 10.907 4.08872 8.98722 5.84678 7.61563C7.60484 6.24405 9.77087 5.49939 12.0007 5.5Z"
//                                     fill="#878787"/>
//                             </svg>
//                         )}
//                     </button>
//                 )}
//             </label>
//         </div>
//     );
// });
//
// AppInput.displayName = 'AppInput';
// export default AppInput;

import React, {useEffect, useState, forwardRef} from 'react';
import {useFormContext} from "react-hook-form";
import styles from '../../../app/page.module.scss';

interface AppInputProps {
    title: string;
    inputName: string;
    type?: string;
    required?: boolean;
    disable?: boolean;
    fail?: boolean;
    mask?: string;
    className?: string;
    classNameTitle?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: () => void;
    defaultValue?: string;
    autocomplete?: string,
    showPasswordToggle?: boolean;
    showPasswordExternally?: boolean;
    isValid?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({
                                                                  title,
                                                                  disable,
                                                                  fail,
                                                                  inputName,
                                                                  type = 'text',
                                                                  required,
                                                                  mask,
                                                                  className,
                                                                  classNameTitle,
                                                                  value: propValue,
                                                                  onChange,
                                                                  onFocus,
                                                                  defaultValue,
                                                                  autocomplete,
                                                                  showPasswordExternally,
                                                                  onBlur,
                                                                  isValid
                                                              }, ref) => {
    const {register, formState: {errors, isSubmitted, submitCount}, setValue, watch} = useFormContext();
    const [visibleError, setVisibleError] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    const currentValue = propValue !== undefined ? propValue : internalValue;
    const isActive = currentValue.trim().length > 0;
    const [isFocused, setIsFocused] = useState(false);

    const [showPasswordInternal, setShowPasswordInternal] = useState(false);

    // Если showPasswordExternally передан, используем его, иначе внутреннее состояние
    const showPassword = showPasswordExternally !== undefined ? showPasswordExternally : showPasswordInternal;

    const isPasswordType = type === 'password';

    // Когда showPassword = true, показываем текст, иначе исходный тип
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const inputRef = React.useRef<HTMLInputElement>(null);

    const formatPhoneNumber = (value: string) => {
        let cleaned = value.replace(/\D/g, '');

        if (cleaned[0] === '8') {
            cleaned = '7' + cleaned.substring(1);
        } else if (cleaned.length > 0 && cleaned[0] !== '7') {
            cleaned = '7' + cleaned;
        }

        let formatted = cleaned.length > 0 ? '+7' : '';
        if (cleaned.length > 1) formatted += ` (${cleaned.substring(1, 4)}`;
        if (cleaned.length >= 5) formatted += `) ${cleaned.substring(4, 7)}`;
        if (cleaned.length >= 8) formatted += `-${cleaned.substring(7, 9)}`;
        if (cleaned.length >= 10) formatted += `-${cleaned.substring(9, 11)}`;

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (mask === 'phone') {
            value = formatPhoneNumber(value);
        }

        setInternalValue(value);
        setValue(inputName, value);
        if (onChange) {
            onChange(value);
        }
    };

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const getAutocompleteName = (name: string): string => {
        switch (name.toLowerCase()) {
            case 'name':
                return 'name';
            case 'connection':
                return type === 'tel' ? 'tel' : 'email';
            case 'email':
                return 'email';
            case 'phone':
                return 'tel';
            case 'date':
                return 'bday';
            default:
                return 'on';
        }
    };

    const getPlaceholder = () => {
        if (mask === 'date') {
            return 'дд.мм.гггг';
        }
        return '';
    };

    useEffect(() => {
        setVisibleError(false);
        setTimeout(() => setVisibleError(true), 30);
    }, [submitCount]);

    useEffect(() => {
        if (ref && typeof ref === 'function') {
            ref(inputRef.current);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
        }
    }, [ref]);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === inputName && !value[inputName]) {
                setInternalValue('');
            }
        });
        return () => subscription.unsubscribe();
    }, [inputName, watch]);

    useEffect(() => {
        setValue(inputName, defaultValue || '')
    }, [title])

    useEffect(() => {
        if (propValue !== undefined) {
            setInternalValue(propValue);
        }
    }, [propValue]);

    return (
        <div
            className={`relative w-full z-[2] max-h-[51px] ${disable && 'active:scale-[0.95]'} ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'} !transition-all !duration-300`}>
            <label
                htmlFor={inputName}
                className={`field 
                ${isPasswordType ? 'flex items-center justify-between' : ''} 
                ${disable && 'pointer-events-none'} 
                ${visibleError && (errors[inputName] || fail) && isSubmitted && 'bounce'}`}>

                <span className="sr-only">{title}</span>

                {/*<input*/}
                {/*    id={inputName}*/}
                {/*    {...register(inputName, {required})}*/}
                {/*    ref={(el) => {*/}
                {/*        inputRef.current = el;*/}
                {/*        register(inputName, {required}).ref(el);*/}
                {/*    }}*/}
                {/*    type={inputType}*/}
                {/*    className={`field__input ${className} dark:text-[#adadad] */}
                {/*    ${isFocused && isValid ? '!border-[#34C759]' : ''}*/}
                {/*    ${fail && 'error !text-[red]'}*/}
                {/*    ${isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]'} */}
                {/*    focus:!bg-[#20272A] active:bg-[#20272A]'}`}*/}

                {/*    placeholder={getPlaceholder()}*/}
                {/*    autoComplete={getAutocompleteName(inputName) || autocomplete}*/}
                {/*    value={propValue !== undefined ? propValue : internalValue}*/}
                {/*    onChange={handleChange}*/}
                {/*    onBlur={(e) => {*/}
                {/*        if (onBlur) onBlur(e.target.value);*/}
                {/*        if (e.target.value) {*/}
                {/*            e.target.value = e.target.value.trimEnd() + ' ';*/}

                {/*            const selectableTypes = ['text', 'search', 'url', 'tel', 'password'];*/}
                {/*            if (selectableTypes.includes(e.target.type)) {*/}
                {/*                e.target.setSelectionRange(e.target.value.length, e.target.value.length);*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    onFocus={() => {*/}
                {/*        setIsFocused(true);*/}
                {/*        handleFocus();*/}
                {/*    }}*/}
                {/*    aria-labelledby={`${inputName}-label`}*/}
                {/*/>*/}

                <input
                    id={inputName}
                    {...register(inputName, { required })}
                    ref={(el) => {
                        inputRef.current = el;
                        register(inputName, { required }).ref(el);
                    }}
                    type={inputType}
                    className={`field__input ${className} dark:text-[#adadad] 
                    ${isFocused && isValid ? '!border-[#34C759]' : ''}
                    ${fail && 'error !text-[red]'}
                    ${isActive ? '!bg-[#20272A] border-[#353535]' : '!bg-[#101010]'} 
                    focus:!bg-[#20272A] active:bg-[#20272A]'}`}
                    placeholder={getPlaceholder()}
                    autoComplete={getAutocompleteName(inputName) || autocomplete}
                    value={propValue !== undefined ? propValue : internalValue}
                    onChange={handleChange}
                    onBlur={(e) => {
                        setIsFocused(false);
                        if (onBlur) onBlur(e.target.value);
                        if (e.target.value) {
                            e.target.value = e.target.value.trimEnd() + ' ';
                            const selectableTypes = ['text', 'search', 'url', 'tel', 'password'];
                            if (selectableTypes.includes(e.target.type)) {
                                e.target.setSelectionRange(e.target.value.length, e.target.value.length);
                            }
                        }
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        handleFocus();
                    }}
                    aria-labelledby={`${inputName}-label`}
                />
                <span
                    className={`${styles.titleTop} !text-[18px] !font-[Roboto] !font-[300] field__title ${errors[inputName] && '!text-[#FF3030]'} ${classNameTitle}`}>
                  {title}
                </span>
                <span className={`${styles.titleBottom} !font-[Roboto] !font-[300]  field__title-top ${classNameTitle}`}>
                  {title}
                </span>

                {isPasswordType && (
                    <button
                        type="button"
                        onClick={() => setShowPasswordInternal(!showPasswordInternal)}
                        className="active:scale-[.95] flex items-center justify-center h-[51px] w-[51px] z-10 cursor-pointer border border-[#353535] rounded-[4px] bg-[#101010] hover:bg-[#20272A] hover:border-[#737373] transition-colors duration-300"
                        aria-label={showPasswordInternal ? "Hide password" : "Show password"}
                        tabIndex={-1}
                    >
                        {showPasswordInternal ? (
                            <svg
                                className={`mt-[2px] ml-[3px]`}
                                shapeRendering="geometricPrecision"
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.21973 2.21983C2.09271 2.34682 2.01549 2.51517 2.00209 2.69428C1.98869 2.87339 2.04002 3.05136 2.14673 3.19583L2.21973 3.27983L6.25373 7.31483C4.28767 8.69435 2.88378 10.7354 2.29873 13.0648C2.25371 13.2566 2.28597 13.4584 2.38854 13.6267C2.4911 13.7949 2.65574 13.916 2.84687 13.9638C3.038 14.0116 3.24026 13.9823 3.40995 13.8822C3.57965 13.7821 3.70313 13.6192 3.75373 13.4288C4.27354 11.3612 5.55133 9.56449 7.33373 8.39483L9.14373 10.2048C8.42073 10.9603 8.02232 11.9689 8.03386 13.0146C8.04539 14.0602 8.46594 15.0598 9.20544 15.7991C9.94493 16.5385 10.9446 16.9589 11.9902 16.9702C13.0359 16.9816 14.0444 16.583 14.7997 15.8598L20.7187 21.7798C20.8526 21.914 21.0322 21.9926 21.2216 21.9997C21.411 22.0068 21.596 21.942 21.7396 21.8182C21.8831 21.6945 21.9744 21.5209 21.9953 21.3326C22.0161 21.1442 21.9648 20.9549 21.8517 20.8028L21.7787 20.7188L15.6657 14.6048L15.6667 14.6028L8.71673 7.65683L8.71873 7.65483L7.58573 6.52483L3.27973 2.21983C3.13911 2.07938 2.94848 2.00049 2.74973 2.00049C2.55098 2.00049 2.36036 2.07938 2.21973 2.21983ZM11.9997 5.49983C10.9997 5.49983 10.0297 5.64783 9.11073 5.92483L10.3477 7.16083C12.4873 6.73719 14.7078 7.15191 16.5502 8.31926C18.3926 9.4866 19.716 11.3173 20.2467 13.4328C20.2985 13.6218 20.4222 13.7829 20.5913 13.8818C20.7604 13.9808 20.9615 14.0096 21.1516 13.9622C21.3417 13.9148 21.5056 13.7948 21.6084 13.6281C21.7113 13.4613 21.7447 13.261 21.7017 13.0698C21.1599 10.907 19.9109 8.98733 18.153 7.61577C16.3952 6.2442 14.2294 5.49944 11.9997 5.49983ZM12.1947 9.00983L15.9957 12.8098C15.9466 11.8177 15.5303 10.8793 14.8278 10.1771C14.1253 9.47476 13.1868 9.05874 12.1947 9.00983Z"
                                    fill="#878787"/>
                            </svg>
                        ) : (
                            <svg
                                className={`mt-[2px] ml-[3px]`}
                                shapeRendering="geometricPrecision"
                                width="24" height="24"
                                viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.0007 9.005C13.0615 9.005 14.079 9.42643 14.8291 10.1766C15.5792 10.9267 16.0007 11.9441 16.0007 13.005C16.0007 14.0659 15.5792 15.0833 14.8291 15.8334C14.079 16.5836 13.0615 17.005 12.0007 17.005C10.9398 17.005 9.92239 16.5836 9.17225 15.8334C8.4221 15.0833 8.00067 14.0659 8.00067 13.005C8.00067 11.9441 8.4221 10.9267 9.17225 10.1766C9.92239 9.42643 10.9398 9.005 12.0007 9.005ZM12.0007 5.5C16.6137 5.5 20.5967 8.65 21.7017 13.064C21.7501 13.2569 21.7198 13.4612 21.6176 13.6319C21.5154 13.8025 21.3496 13.9256 21.1567 13.974C20.9637 14.0224 20.7595 13.9922 20.5888 13.89C20.4181 13.7878 20.2951 13.6219 20.2467 13.429C19.7837 11.5925 18.7208 9.96306 17.2267 8.79913C15.7326 7.6352 13.8926 7.00338 11.9986 7.00384C10.1046 7.0043 8.26499 7.63702 6.7714 8.80167C5.27782 9.96632 4.21578 11.5962 3.75367 13.433C3.72984 13.5286 3.68741 13.6186 3.6288 13.6978C3.5702 13.777 3.49656 13.8439 3.41211 13.8946C3.32765 13.9454 3.23403 13.979 3.13658 13.9935C3.03914 14.0081 2.93978 14.0033 2.84417 13.9795C2.74857 13.9557 2.6586 13.9132 2.5794 13.8546C2.50019 13.796 2.43331 13.7224 2.38256 13.6379C2.33181 13.5535 2.2982 13.4599 2.28363 13.3624C2.26907 13.265 2.27384 13.1656 2.29767 13.07C2.83952 10.907 4.08872 8.98722 5.84678 7.61563C7.60484 6.24405 9.77087 5.49939 12.0007 5.5Z"
                                    fill="#878787"/>
                            </svg>
                        )}
                    </button>
                )}
            </label>
        </div>
    );
});

AppInput.displayName = 'AppInput';
export default AppInput;