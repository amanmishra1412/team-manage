import { useState } from "react";
import {
    Search,
    Bell,
    ChevronDown,
    X,
    Check,
    Settings,
    User,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../services/auth";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const notifications = [
    {
        id: 1,
        text: "Sarah completed 'API Integration' task",
        time: "2m ago",
        read: false,
        type: "task",
    },
    {
        id: 2,
        text: "New member joined Project Alpha",
        time: "1h ago",
        read: false,
        type: "project",
    },
    {
        id: 3,
        text: "Deploy pipeline succeeded",
        time: "3h ago",
        read: true,
        type: "system",
    },
    {
        id: 4,
        text: "Marcus left a comment on your task",
        time: "5h ago",
        read: true,
        type: "comment",
    },
];

export default function Navbar({ onLogout }) {
    const { user } = useAuth();

    const [showNotifs, setShowNotifs] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [search, setSearch] = useState("");
    const [notifs, setNotifs] = useState(notifications);
    const navigate = useNavigate();

    const unread = notifs.filter((n) => !n.read).length;

    const markAllRead = () =>
        setNotifs(notifs.map((n) => ({ ...n, read: true })));

    const handleLogout = async () => {
        try {
            onLogout();
            const res = await logoutHandler();
            toast.success(res.msg);
            localStorage.clear();
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.msg || "Something Went Wrong");
        }
    };

    return (
        <header
            className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 h-14 border-b border-white/5"
            style={{
                background: "rgba(13, 15, 23, 0.95)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search anything..."
                        className="w-full pl-9 pr-9 py-2 text-sm rounded-lg text-slate-300 placeholder-slate-500 outline-none transition-all"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onFocus={(e) =>
                            (e.target.style.border =
                                "1px solid rgba(59,130,246,0.4)")
                        }
                        onBlur={(e) =>
                            (e.target.style.border =
                                "1px solid rgba(255,255,255,0.07)")
                        }
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            <X size={13} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotifs(!showNotifs);
                            setShowProfile(false);
                        }}
                        className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Bell size={18} />
                        {unread > 0 && (
                            <span
                                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"
                                style={{
                                    boxShadow: "0 0 6px rgba(59,130,246,0.8)",
                                }}
                            />
                        )}
                    </button>

                    {showNotifs && (
                        <div
                            className="absolute right-0 top-12 w-80 rounded-xl shadow-2xl overflow-hidden"
                            style={{
                                background: "#161b27",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                            }}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-sm font-semibold text-white"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        Notifications
                                    </span>
                                    {unread > 0 && (
                                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                                            {unread}
                                        </span>
                                    )}
                                </div>
                                {unread > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        <Check size={11} /> Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                                {notifs.map((n) => (
                                    <div
                                        key={n.id}
                                        className="px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer flex gap-3"
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                                n.read
                                                    ? "bg-slate-600"
                                                    : "bg-blue-400"
                                            }`}
                                        />
                                        <div>
                                            <p className="text-xs text-slate-300 leading-relaxed">
                                                {n.text}
                                            </p>
                                            <p className="text-xs text-slate-600 mt-1">
                                                {n.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-5 bg-white/10" />

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowNotifs(false);
                        }}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            }}
                        >
                            A
                        </div>
                        <div className="hidden md:block text-left">
                            <p
                                className="text-xs font-medium text-white leading-tight"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {user.username}
                            </p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                        <ChevronDown
                            size={14}
                            className="text-slate-500 hidden md:block"
                        />
                    </button>

                    {showProfile && (
                        <div
                            className="absolute right-0 top-12 w-52 rounded-xl shadow-2xl overflow-hidden"
                            style={{
                                background: "#161b27",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                            }}
                        >
                            <div className="p-3 border-b border-white/5">
                                <p
                                    className="text-sm font-semibold text-white"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    Alex Morgan
                                </p>
                                <p className="text-xs text-slate-500">
                                    alex@teamflow.io
                                </p>
                            </div>
                            {[
                                { icon: User, label: "Profile" },
                                { icon: Settings, label: "Settings" },
                            ].map(({ icon: Icon, label }) => (
                                <button
                                    key={label}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    <Icon size={15} />
                                    {label}
                                </button>
                            ))}
                            <div className="border-t border-white/5">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                >
                                    <LogOut size={15} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {(showNotifs || showProfile) && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => {
                        setShowNotifs(false);
                        setShowProfile(false);
                    }}
                />
            )}
        </header>
    );
}
