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
        // Здесь можно добавить логику для смены языка
        console.log("Выбранный язык:", language);
    };
    return (
        <div className={`w-full flex items-end justify-between `}>
            <div className="mx-[10px] text-center flex flex-col items-start md:items-center h-[89px] justify-between">
                <p className="font-[400] text-[#adadad] text-[16px] leading-[110%]">ИНН 6000005874</p>
                <p className="text-[18px] leading-[110%]">ООО &quot;АУДИОСЕКТОР&quot;</p>
                <p className="font-[400] text-[#adadad] text-[16px] leading-[110%]">© 2025 Audiosector</p>
            </div>

                <CustomSelect
                    options={languageOptions}
                    selectedOption={selectedLanguage}
                    onSelect={handleLanguageSelect}
                    placeholder="Выберите язык"
                    width="62px"
                    height="35px"
                    className="block md:hidden"
                />
        </div>
    )
};

export default FooterCompanyInfo;
