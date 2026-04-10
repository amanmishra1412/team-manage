import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ onLogout }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ background: "#0d0f17" }}
        >
            {/* Mobile overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar - desktop */}
            <div
                className="hidden md:flex flex-col h-full shrink-0"
                style={{ zIndex: 20 }}
            >
                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onLogout={onLogout}
                />
            </div>

            {/* Sidebar - mobile drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-50 flex flex-col md:hidden transition-transform duration-300 ${
                    mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ width: "240px" }}
            >
                <Sidebar
                    collapsed={false}
                    setCollapsed={() => {}}
                    onLogout={onLogout}
                />
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Mobile menu button inside navbar area */}
                <div
                    className="sticky top-0 z-30 flex items-center border-b border-white/5"
                    style={{
                        background: "rgba(13, 15, 23, 0.95)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <button
                        className="md:hidden shrink-0 w-14 h-14 flex items-center justify-center text-slate-400 hover:text-white"
                        onClick={() => setMobileSidebarOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex-1">
                        <Navbar onLogout={onLogout} />
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
