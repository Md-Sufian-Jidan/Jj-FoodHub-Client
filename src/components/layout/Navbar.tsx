"use client";

import { ArrowUp, Loader2, Menu, UtensilsCrossed, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { CartButton } from "./CartButton";
import { ModeToggle } from "./ModeToggle";
import { ProfileDropdown } from "./ProfileDropdown";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Providers", href: "/providers" },
    // { name: "Offers", href: "/offers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isScrolled
                        ? "backdrop-blur-xl bg-white/60 dark:bg-[#0f172a]/60 border-b border-white/20 shadow-lg"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-[#D97757] flex items-center justify-center shadow-md">
                            <UtensilsCrossed size={18} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                            MealMate
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative text-sm font-semibold transition-all
                                    ${isActive
                                            ? "text-[#D97757]"
                                            : "text-gray-600 dark:text-gray-300 hover:text-[#D97757]"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                        {/* Dropdown Menu */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#D97757]">
                                More <ChevronDown size={16} />
                            </button>

                            <div className="absolute top-8 left-0 w-44 backdrop-blur-xl bg-white/70 dark:bg-[#0f172a]/80 border border-white/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <Link href="/about" className="block px-4 py-2 hover:bg-[#D97757]/10 rounded-lg">About</Link>
                                <Link href="/faq" className="block px-4 py-2 hover:bg-[#D97757]/10 rounded-lg">FAQ</Link>
                                <Link href="/support" className="block px-4 py-2 hover:bg-[#D97757]/10 rounded-lg">Support</Link>
                            </div>
                        </div>
                    </nav>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Glass container */}
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-lg bg-white/60 dark:bg-white/10 border border-white/20 shadow">
                            <CartButton />
                            <ModeToggle />
                        </div>

                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin text-[#D97757]" />
                        ) : session?.user ? (
                            <ProfileDropdown user={session?.user} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button className="bg-[#D97757] hover:bg-[#D97757]/90 text-white rounded-full px-5">
                                    <Link href="/register">Join</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="flex items-center gap-2 md:hidden">
                        <CartButton />

                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost">
                                    <Menu />
                                </Button>
                            </SheetTrigger>

                            <SheetContent className="bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-xl">
                                <SheetHeader>
                                    <SheetTitle>MealMate</SheetTitle>
                                    <SheetDescription>Explore delicious meals</SheetDescription>
                                </SheetHeader>

                                <div className="flex flex-col gap-4 mt-6">
                                    {navItems.map((item) => (
                                        <Link key={item.name} href={item.href}>
                                            {item.name}
                                        </Link>
                                    ))}

                                    <ModeToggle />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Scroll Top */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-[#D97757] text-white shadow-lg z-50 hover:bg-[#D97757]/90 transition"
                >
                    <ArrowUp />
                </button>
            )}
        </>
    );
}