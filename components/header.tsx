"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

const navigationLinks = [
    { href: "/resume", label: "Resume Generator" },
    { href: "/roadmap", label: "Career Roadmap" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="border-b bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* App Name - Left */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Users className="mr-2 h-6 w-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">
                                CareerBuddy
                            </h1>
                        </Link>
                    </div>

                    {/* Navigation Links - Middle */}
                    <nav className="hidden items-center space-x-8 md:flex">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-blue-600",
                                    pathname === link.href
                                        ? "text-blue-600"
                                        : "text-gray-600",
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Guest Mode Indicator - Right */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1">
                            <span className="text-xs font-medium text-gray-600">
                                Guest Mode
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
