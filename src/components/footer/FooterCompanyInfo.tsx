import React, {useState} from "react";
import CustomSelect from "./FooterCustomSelect";

const FooterCompanyInfo: React.FC = () => {

    const [selectedLanguage, setSelectedLanguage] = useState<string>("Россия");

    const languageOptions = [
        "Россия",
        "English",
        "Беларускі",
        "Қазақ тілі",
        "Кыргыз тили",
        "Հայերեն",
        "Azərbaycan dili",
    ];

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
        console.log("Выбранный язык:", language);
    };
    return (
        <div className={`md:w-auto w-full flex items-start md:items-center justify-between`}>
            <div className="mx-[10px] text-left flex flex-col items-start md:items-start h-[89px] justify-between">
                <p className="font-[300] font-[Roboto] text-[#adadad] text-[16px] leading-[110%]">ИНН 6000005874</p>
                <p className="text-[18px] leading-[110%]">ООО &quot;АУДИОСЕКТОР&quot;</p>
                <p className="font-[300] font-[Roboto] text-[#adadad] text-[16px] leading-[110%]">© 2025 Audiosector</p>
            </div>

                <CustomSelect
                    options={languageOptions}
                    selectedOption={selectedLanguage}
                    onSelect={handleLanguageSelect}
                    width="62px"
                    height="35px"
                    className="block md:hidden"
                />
        </div>
    )
};

export default FooterCompanyInfo;
