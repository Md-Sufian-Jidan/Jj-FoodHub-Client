import { AppSidebar } from "@/components/layout/app-sidebar";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { ROLES } from "@/constants/role";
import { userService } from "@/services/user.service";
import { Metadata } from "next";
import Link from "next/link";
export const dynamic = "auto";
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Dashboard | MealMate - Fresh Multi-Vendor Food Delivery Platform",
    description:
        "Manage your orders, profile, and account settings as an admin, customer, or provider on MealMate platform.",
    keywords: [
        "dashboard",
        "admin dashboard",
        "customer dashboard",
        "provider dashboard",
        "mealmate dashboard",
    ],
    authors: [{
        name: "Md Abu Sufian Jidan",
        url: "https://mdabusufianjidan.vercel.app"
    }],
    openGraph: {
        title: "Dashboard | MealMate - Fresh Food Delivered Fast",
        description:
            "Manage your orders, profile, and account settings.",
        url: "https://mealmate-lemon.vercel.app/dashboard",
        siteName: "MealMate",
        type: "website",
        images: [
            {
                url: "https://i.ibb.co/99pqNzY5/mealmate.png",
                width: 1200,
                height: 630,
                alt: "MealMate Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dashboard | MealMate - Food Delivery Platform",
        description:
            "Manage your orders, profile, and account settings.",
        images: ["https://i.ibb.co/99pqNzY5/mealmate.png"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        }
    },
    metadataBase: new URL("https://mealmate-lemon.vercel.app"),
};

export default async function DashboardLayout({
    admin,
    customer,
    provider,
}: {
    admin: React.ReactNode;
    customer: React.ReactNode;
    provider: React.ReactNode;
}) {
    const { data } = await userService.getSession();
    return (
        <SidebarProvider>
            <AppSidebar userRole={data?.user?.role} userName={data?.user?.name} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/">MealMate</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {data?.user?.role === ROLES.ADMIN
                                        ? "Admin Dashboard"
                                        : data?.user?.role === ROLES.CUSTOMER
                                            ? "Dashboard"
                                            : "Provider Dashboard"}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto">
                        <ProfileDropdown user={data?.user} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {data?.user?.role === ROLES.ADMIN
                        ? admin
                        : data?.user?.role === ROLES.CUSTOMER
                            ? customer
                            : provider}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}