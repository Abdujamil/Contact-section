import {useState} from "react";

export const useFormStates = () => {
    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailSuccessful, setEmailSuccessful] = useState(false);
    const [selectError, setSelectError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [failCheck, setFailCheck] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [contactValue, setContactValue] = useState("");

    return {
        isPhone, setIsPhone,
        isEmail, setIsEmail,
        emailError, setEmailError,
        emailSuccessful, setEmailSuccessful,
        selectError, setSelectError,
        isSubmitted, setIsSubmitted,
        failCheck, setFailCheck,
        visibleError, setVisibleError,
        countdown, setCountdown,
        contactValue, setContactValue,
    };
};
