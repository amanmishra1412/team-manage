import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CheckSquare,
    ClipboardList,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Zap,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Users", icon: Users, path: "/users" },
    { label: "Projects", icon: FolderKanban, path: "/projects" },
    { label: "Tasks", icon: CheckSquare, path: "/tasks" },
    { label: "My Tasks", icon: ClipboardList, path: "/my-tasks" },
    { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ collapsed, setCollapsed, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <aside
            className={`relative flex flex-col h-full transition-all duration-300 ease-in-out ${
                collapsed ? "w-16" : "w-60"
            }`}
            style={{
                background: "linear-gradient(180deg, #0f1117 0%, #131720 100%)",
            }}
        >
            {/* Top glow line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #3b82f6, transparent)",
                }}
            />

            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
                <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    }}
                >
                    <Zap size={16} className="text-white" />
                </div>
                {!collapsed && (
                    <span
                        className="text-white font-bold text-lg tracking-tight truncate"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        TeamFlow
                    </span>
                )}
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-14 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
                style={{ background: "#1a1f2e" }}
            >
                {collapsed ? (
                    <ChevronRight size={12} />
                ) : (
                    <ChevronLeft size={12} />
                )}
            </button>

            {/* Nav */}
            <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
                {!collapsed && (
                    <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Menu
                    </p>
                )}
                {navItems.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative overflow-hidden ${
                                isActive
                                    ? "text-white"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.08))",
                                            border: "1px solid rgba(59,130,246,0.2)",
                                        }}
                                    />
                                )}
                                <Icon
                                    size={18}
                                    className={`flex-shrink-0 relative z-10 transition-colors ${
                                        isActive ? "text-blue-400" : ""
                                    }`}
                                />
                                {!collapsed && (
                                    <span
                                        className="text-sm font-medium relative z-10 truncate"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        {label}
                                    </span>
                                )}
                                {isActive && !collapsed && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 relative z-10" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User & Logout */}
            <div className="border-t border-white/5 p-3 space-y-1">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                >
                    <LogOut size={18} className="flex-shrink-0" />
                    {!collapsed && (
                        <span
                            className="text-sm font-medium"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Logout
                        </span>
                    )}
                </button>
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-2 mt-2">
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            }}
                        >
                            A
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">
                                Alex Morgan
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                Admin
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
