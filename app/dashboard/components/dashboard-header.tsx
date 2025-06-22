"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Home } from "lucide-react";
import { getCurrentUser } from "../utils";

export function DashboardHeader() {
    const router = useRouter();
    const [user] = useState(() => getCurrentUser());

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/");
    };

    const handleProfileClick = () => {
        router.push("/profile");
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <header className="bg-white border-b">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-900">Career Buddy</h1>
                    <nav className="hidden md:flex space-x-6">
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => router.push("/resume")}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <User className="h-4 w-4" />
                            <span>Resume Builder</span>
                        </button>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-medium flex items-center justify-center">
                                    {getInitials(user.name)}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-gray-700">
                                    {user.name}
                                </span>
                            </button>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="py-1">
                                    <button
                                        onClick={handleProfileClick}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </button>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => router.push("/")}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
} 