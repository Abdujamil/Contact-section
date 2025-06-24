import React from "react";
import styles from "@/app/page.module.scss";
import { PolicyTab } from "@/components/policy/PolicyPage";
import { policyData } from "@/data/policy";
import PolicyOfferContent from "@/components/policy/PolicyOfferContent";
import PolicyLicenseContent from "./PolicyLicenseContent";

interface PolicyContentProps {
  activeTab: PolicyTab;
}

const tabIdMap: Record<PolicyTab, number> = {
  policy: 1,
  offer: 2,
  license: 3,
};

const PolicyContent: React.FC<PolicyContentProps> = ({ activeTab }) => {
  if (activeTab === "offer") {
    return (
      <div>
        <PolicyOfferContent />
      </div>
    );
  }

  if (activeTab === "license") {
    return (
      <div>
        <PolicyLicenseContent />
      </div>
    );
  }

  const currentData = policyData.find(
    (item) => item.id === tabIdMap[activeTab]
  );

  if (!currentData) return <div>Контент не найден</div>;

  return (
      <>
        <div>
          <div
              className={`${styles.BlogPageContent} mb-[40px] text-[18px] leading-relaxed whitespace-pre-line p-[30px] border border-[#353535] rounded-[6px]`}
          >
            {currentData.fullAnswer}
          </div>

        </div>
      </>
  );
};

export default PolicyContent;
