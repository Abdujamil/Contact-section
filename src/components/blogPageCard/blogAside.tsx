"use client";
import {useScrollSpy} from "../useScrollSpy";
import React from 'react'

type AsideItem = {
    id: string;
    title: string;
};

export default function BlogAside({items}: { items: AsideItem[] }) {
    const sectionIds = items.map(item => item.id);
    console.log("SectionIds", sectionIds);
    const activeHash = useScrollSpy({sectionIds, offset: 100});

    return (
        <ul className="space-y-4 text-[#737373] font-bold text-sm">
            {items.map((item) => (
                <li key={item.id} className="group cursor-pointer">
                    <a
                        href={item.id}
                        className={`text-[16px] font-normal transition-colors duration-300 group-hover:text-[#3D9ED6]  ${
                            activeHash === item.id ? "text-[#3D9ED6]" : ""
                        }`}
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
}
