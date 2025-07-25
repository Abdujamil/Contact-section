import React from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import {handleMouseLeave, handleMouseMove} from "@/components/Form/mouse";
import {PolicyTab} from "@/components/policy/PolicyPage";

interface TabData {
    id: PolicyTab;
    label: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    viewBox: string;
}

interface PolicyTabButtonProps {
    tab: TabData;
    isActive: boolean;
    onClick: () => void;
}

const PolicyTabButton: React.FC<PolicyTabButtonProps> = ({
                                                             tab,
                                                             isActive,
                                                             onClick,
                                                         }) => {
    return (
        <div className="relative !w-[220px] m-auto md:m-0 !overflow-hidden">
            <button
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`${styles["btn"]} ${HeaderStyles["login-button"]} ${styles["customBtn"]} ${
                    tab.id === "policy" ? styles["contact-btn"] : styles["requisite-btn"]
                } ${styles["requisite-btn"]} border !border-[#353535] cursor-pointer !w-[220px] m-auto md:m-0 !h-[51px] !rounded-[4px] group flex items-center !justify-between transition-all !duration-[.13s] ease-in`}
                style={{
                    color: isActive ? "#3D9ED6" : "#adadad",
                }}
            >
        <span
            className={`w-[95px] text-[20px] text-left !transition-all !duration-[.13s] !ease-in !group-hover:text-[#ccc] ${
                isActive ? "!text-[#3D9ED6]" : "text-[#878787]"
            }`}
        >
          {tab.label}
        </span>

                <svg
                    className={`${styles.sendIconLeft2} transition-all !duration-[.13s] ease-in`}
                    width="25"
                    height="28"
                    viewBox={tab.viewBox}
                    fill="#adadad"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {React.cloneElement(tab.icon, {
                        fill: "#adadad",
                    })}
                </svg>

                <svg
                    className={`${styles.sendIconRight2} transition-all !duration-[.13s] ease-in`}
                    width="25"
                    height="28"
                    viewBox={tab.viewBox}
                    fill="#adadad"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {React.cloneElement(tab.icon, {
                        fill: "#adadad",
                    })}
                </svg>
            </button>
            <div className={styles.highlight}/>
        </div>
    );
};

export default PolicyTabButton;
