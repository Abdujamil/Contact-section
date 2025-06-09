import React from "react";
import Link from "next/link";
import { handleMouseLeave, handleMouseMove } from "@/components/Form/mouse";


interface CustomButtonProps {
  type?: "button" | "link" | "toggle";
  isActive?: boolean;
  label: string;
  onClick?: () => void;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  isActive = false,
  label,
  onClick,
  href,
  leftIcon,
  rightIcon,
}) => {
  const baseClasses = `group flex items-center justify-between w-[220px] h-[51px] rounded-[4px] cursor-pointer transition-all duration-150 ease-in px-4 ${
    isActive ? "text-[#3D9ED6]" : "text-[#878787]"
  }`;

  const content = (
    <>
      <div className="transition-all duration-150 ease-in">{leftIcon}</div>
      <span
        className={`text-[20px] transition-all duration-150 ease-in group-hover:text-[#ccc] ${
          isActive ? "!text-[#3D9ED6]" : ""
        }`}
      >
        {label}
      </span>
      <div className="transition-all duration-150 ease-in">{rightIcon}</div>
    </>
  );

  if (type === "link" && href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default CustomButton;
