"use client";
import {useScrollSpy} from "../useScrollSpy";

type AsideItem = {
    id: string;
    title: string;
};


export default function FaqAside({items}: { items: AsideItem[] }) {
    const sectionIds = items.map(item => item.id);
    const activeHash = useScrollSpy({sectionIds, offset: 100});

    return (
        <ul className="space-y-4 text-[#737373] font-bold text-sm">
            {items.map((item) => (
                <li key={item.id} className="group cursor-pointer">
                    <a
                        href={item.id}
                        className={`text-[16px] font-normal transition-colors duration-300 group-hover:text-[#4A738C]  ${
                            activeHash === item.id ? "text-[#4A738C]" : ""
                        }`}
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
}
