import React from "react";
import styles from "@/app/page.module.scss";
import HeaderStyles from "@/components/header/Header.module.css";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";
import { PolicyTab } from "@/components/policy/PolicyPage";

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

const PolicyTabButton: React.FC<PolicyTabButtonProps> = ({ tab, isActive, onClick }) => {
  return (
    <div className="relative !w-[220px] !overflow-hidden">
      <button
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${styles["btn"]} ${HeaderStyles["login-button"]} ${
          tab.id === "policy" ? styles["contact-btn"] : styles["requisite-btn"]
        } cursor-pointer !w-[220px] !h-[51px] !rounded-[4px] group flex items-center !justify-between transition-all !duration-[.15s] ease-in`}
        style={{
          color: isActive ? "#3D9ED6" : "#ccc",
        }}
      >
        <svg
          className={`${styles.sendIconLeft} transition-all !duration-[.15s] ease-in`}
          width="25"
          height="28"
          viewBox={tab.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {React.cloneElement(tab.icon as React.ReactElement, {
            fill: isActive ? "#ccc" : "#737373",
          })}
        </svg>
        
        <span
          className={`text-[20px] !transition-all !duration-[.15s] !ease-in !group-hover:text-[#ccc] ${
            isActive ? "!text-[#3D9ED6]" : "text-[#878787]"
          }`}
        >
          {tab.label}
        </span>
        
        <svg
          className={`${styles.sendIconRight} transition-all !duration-[.15s] ease-in`}
          width="25"
          height="28"
          viewBox={tab.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {React.cloneElement(tab.icon as React.ReactElement, {
            fill: isActive ? "#ccc" : "#737373",
          })}
        </svg>
      </button>
      <div className={styles.highlight} />
    </div>
  );
};

export default PolicyTabButton;