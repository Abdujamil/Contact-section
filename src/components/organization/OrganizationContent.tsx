import React from "react";
import styles from "@/app/page.module.scss";
import { OrganizationTab } from "@/components/organization/OrganizationPage";
import { organizationData } from "@/data/organization";
import ApiContent from "@/components/organization/OrganizationApiContent";
import WhereDoYouLoseContent from "./OrganizationWhereDoYouLoseContent";

interface OrganizationContentProps {
  activeTab: OrganizationTab;
}

const tabIdMap: Record<OrganizationTab, number> = {
  aboutCompany: 1,
  whereDoYouLose: 2,
  API: 3,
};

const OrganizationContent: React.FC<OrganizationContentProps> = ({ activeTab }) => {
  if (activeTab === "whereDoYouLose") {
    return (
      <div>
        <WhereDoYouLoseContent />
      </div>
    );
  }

  if (activeTab === "API") {
    return (
      <div>
        <ApiContent />
      </div>
    );
  }

  const currentData = organizationData.find(
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

export default OrganizationContent;
