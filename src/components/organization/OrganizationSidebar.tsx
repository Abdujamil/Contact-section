import React from "react";
import styles from "@/app/page.module.scss";
import {OrganizationTab} from "@/components/organization/OrganizationPage";
import OrganizationTabButton from "@/components/organization/OrganizationTabButton";
import BlogAside from "../blogPageCard/blogAside";
import {organizationData} from "@/data/organization";

interface OrganizationSidebarProps {
    activeTab: OrganizationTab;
    setActiveTab: (tab: OrganizationTab) => void;
}

const tabIdMap: Record<OrganizationTab, number> = {
    aboutCompany: 1,
    whereDoYouLose: 2,
    API: 3,
};

const OrganizationSidebar: React.FC<OrganizationSidebarProps> = ({
                                                               activeTab,
                                                               setActiveTab,
                                                           }) => {
    const currentBlogItem = organizationData.find(
        (item) => item.id === tabIdMap[activeTab]
    );

    const tabs = [
        {
            id: "aboutCompany" as OrganizationTab,
            label: "О компании",
            icon: (
                <svg width="27" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M10 0V8.125C10 8.62228 10.1975 9.09919 10.5492 9.45083C10.9008 9.80246 11.3777 10 11.875 10H20V22.5C20 23.163 19.7366 23.7989 19.2678 24.2678C18.7989 24.7366 18.163 25 17.5 25H2.5C1.83696 25 1.20107 24.7366 0.732233 24.2678C0.263392 23.7989 0 23.163 0 22.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H10ZM9.9875 16.25H8.75C8.41848 16.25 8.10054 16.3817 7.86612 16.6161C7.6317 16.8505 7.5 17.1685 7.5 17.5C7.5 17.8315 7.6317 18.1495 7.86612 18.3839C8.10054 18.6183 8.41848 18.75 8.75 18.75V19.9875C8.75 20.685 9.315 21.25 10.0125 21.25H10.625C10.9002 21.25 11.1676 21.1592 11.3859 20.9917C11.6042 20.8242 11.7611 20.5893 11.8324 20.3235C11.9036 20.0577 11.8851 19.7759 11.7798 19.5217C11.6745 19.2675 11.4883 19.0551 11.25 18.9175V17.5125C11.25 17.3467 11.2173 17.1825 11.1539 17.0294C11.0905 16.8762 10.9975 16.737 10.8802 16.6198C10.763 16.5025 10.6238 16.4095 10.4706 16.3461C10.3175 16.2827 10.1533 16.25 9.9875 16.25ZM10 12.5C9.66848 12.5 9.35054 12.6317 9.11612 12.8661C8.8817 13.1005 8.75 13.4185 8.75 13.75C8.75 14.0815 8.8817 14.3995 9.11612 14.6339C9.35054 14.8683 9.66848 15 10 15C10.3315 15 10.6495 14.8683 10.8839 14.6339C11.1183 14.3995 11.25 14.0815 11.25 13.75C11.25 13.4185 11.1183 13.1005 10.8839 12.8661C10.6495 12.6317 10.3315 12.5 10 12.5ZM12.5 0.05375C12.9736 0.154194 13.4078 0.389989 13.75 0.7325L19.2675 6.25C19.61 6.59216 19.8458 7.0264 19.9463 7.5H12.5V0.05375Z"
                          fill="#adadad"/>
                </svg>
            ),
            viewBox: "0 0 25 28",
        },
        {
            id: "whereDoYouLose" as OrganizationTab,
            label: "Где вы теряете",
            icon: (
                <svg width="27" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.93586 10.4931L4.41654 16.1644H1.57398L1.10933 10.4931V2.41096H4.93586V10.4931ZM1 20C1 18.8493 1.79264 18.0274 3.02259 18.0274C4.19789 18.0274 4.99052 18.8493 4.99052 20C4.99052 21.2329 4.19789 22 3.02259 22C1.79264 22 1 21.2329 1 20Z"
                        fill="#adadad"/>
                    <path
                        d="M14.6203 2C19.1028 2 22 4.16438 22 7.56164C22 13.1781 15.5769 11.8904 15.5769 16.1644H12.1877C12.1877 9.72603 18.0915 11.3699 18.0915 8.08219C18.0915 6.60274 16.6702 5.67123 14.5383 5.67123C12.3243 5.67123 10.7391 7.12329 10.7391 9.23288H6.91254C6.91254 4.65753 10.0284 2 14.6203 2ZM11.9144 20C11.9144 18.8493 12.707 18.0274 13.8823 18.0274C15.1122 18.0274 15.9049 18.8493 15.9049 20C15.9049 21.2329 15.1122 22 13.8823 22C12.707 22 11.9144 21.2329 11.9144 20Z"
                        fill="#adadad"/>
                </svg>
            ),
            viewBox: "0 0 24 29",
        },
        {
            id: "API" as OrganizationTab,
            label: "API",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.1818 12L12 14.1818L9.81818 12L12 9.81818L14.1818 12ZM12 5.45455L14.3127 7.76727L17.04 5.04L12 0L6.96 5.04L9.68727 7.76727L12 5.45455ZM5.45455 12L7.76727 9.68727L5.04 6.96L0 12L5.04 17.04L7.76727 14.3127L5.45455 12ZM18.5455 12L16.2327 14.3127L18.96 17.04L24 12L18.96 6.96L16.2327 9.68727L18.5455 12ZM12 18.5455L9.68727 16.2327L6.96 18.96L12 24L17.04 18.96L14.3127 16.2327L12 18.5455Z"
                        fill="#adadad"/>
                </svg>
            ),
            viewBox: "0 0 24 27",
        },
    ];

    return (
        <aside className="sticky top-[80px] h-fit z-[10] w-[260px]">
            <div
                className={`${styles.btns} ${styles.licenseBtns} mb-[20px] flex flex-col items-start justify-start w-full max-w-[260px] p-[20px] gap-[12px] bg-[rgba(0, 0, 0, 0.07)] border border-[#353535] rounded-[6px]`}
            >
                {tabs.map((tab) => (
                    <OrganizationTabButton
                        key={tab.id}
                        tab={tab}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            <div className={`mb-25`}>
                <BlogAside items={currentBlogItem?.aside ?? []}/>
            </div>
        </aside>
    );
};

export default OrganizationSidebar;
