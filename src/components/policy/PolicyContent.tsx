import React from "react";
import styles from "@/app/page.module.scss";
import { PolicyTab } from "@/components/policy/PolicyPage";

interface PolicyContentProps {
  activeTab: PolicyTab;
}

const contentMap: Record<PolicyTab, string> = {
  policy: "Контент политики конфиденциальности",
  offer: "Контент публичной оферты",
  license: "Контент лицензии",
};

const PolicyContent: React.FC<PolicyContentProps> = ({ activeTab }) => {
  return (
    <div
      className={`${styles.BlogPageContent} text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
    >
      {contentMap[activeTab]}
    </div>
  );
};

export default PolicyContent;
