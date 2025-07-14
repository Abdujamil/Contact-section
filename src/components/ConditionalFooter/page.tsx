"use client";

import {usePathname} from "next/navigation";
import Footer from "@/app/footer";
import FooterMob from "@/components/footer/footerMob";

export default function ConditionalFooter() {
    const pathname = usePathname();
    const hideFooter = ["/auth/login", "/auth/register", "/auth/forgot-password"].includes(pathname);

    if (hideFooter) return null;

    return (
        <>
            <div className="hidden md:block">
                <Footer/>
            </div>
            <div className="md:hidden">
                <FooterMob/>
            </div>
        </>
    );
}
