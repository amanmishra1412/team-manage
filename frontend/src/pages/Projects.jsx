import { useState } from "react";
import {
    Plus,
    Search,
    Users,
    Calendar,
    MoreHorizontal,
    FolderKanban,
    Layers,
} from "lucide-react";

const projects = [
    {
        id: 1,
        name: "Dashboard Redesign",
        desc: "Modernize the admin UI with new design system",
        progress: 78,
        status: "active",
        priority: "high",
        members: 4,
        tasks: { done: 28, total: 36 },
        due: "Mar 15, 2026",
        color: "#3b82f6",
        tag: "Design",
    },
    {
        id: 2,
        name: "Mobile App v2",
        desc: "Cross-platform mobile app for iOS and Android",
        progress: 45,
        status: "active",
        priority: "high",
        members: 6,
        tasks: { done: 18, total: 40 },
        due: "Apr 2, 2026",
        color: "#8b5cf6",
        tag: "Mobile",
    },
    {
        id: 3,
        name: "API Gateway",
        desc: "Centralized API gateway with rate limiting and auth",
        progress: 92,
        status: "review",
        priority: "medium",
        members: 3,
        tasks: { done: 33, total: 36 },
        due: "Mar 10, 2026",
        color: "#10b981",
        tag: "Backend",
    },
    {
        id: 4,
        name: "Analytics Engine",
        desc: "Real-time analytics pipeline with ML insights",
        progress: 20,
        status: "active",
        priority: "low",
        members: 5,
        tasks: { done: 8, total: 40 },
        due: "May 1, 2026",
        color: "#f59e0b",
        tag: "Data",
    },
    {
        id: 5,
        name: "Security Audit",
        desc: "Comprehensive security review and penetration testing",
        progress: 60,
        status: "review",
        priority: "high",
        members: 2,
        tasks: { done: 12, total: 20 },
        due: "Mar 20, 2026",
        color: "#ef4444",
        tag: "Security",
    },
    {
        id: 6,
        name: "Onboarding Flow",
        desc: "Redesign user onboarding with guided tours",
        progress: 35,
        status: "active",
        priority: "medium",
        members: 3,
        tasks: { done: 7, total: 20 },
        due: "Apr 15, 2026",
        color: "#06b6d4",
        tag: "UX",
    },
];

const statusStyle = {
    active: { label: "Active", bg: "rgba(59,130,246,0.12)", text: "#3b82f6" },
    review: {
        label: "In Review",
        bg: "rgba(245,158,11,0.12)",
        text: "#f59e0b",
    },
    done: { label: "Done", bg: "rgba(16,185,129,0.12)", text: "#10b981" },
};

const priorityStyle = {
    high: { label: "High", color: "#ef4444" },
    medium: { label: "Medium", color: "#f59e0b" },
    low: { label: "Low", color: "#10b981" },
};

const avatarColors = [
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
];

export default function Projects() {
    const [search, setSearch] = useState("");
    const [view, setView] = useState("grid");

    const filtered = projects.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.tag.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Projects
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {projects.length} projects
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white self-start sm:self-auto"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        boxShadow: "0 4px 15px rgba(59,130,246,0.25)",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    <Plus size={16} /> New Project
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg text-slate-300 placeholder-slate-600 outline-none"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    />
                </div>
                <div
                    className="flex rounded-lg overflow-hidden p-0.5"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    {["grid", "list"].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className="px-3 py-1.5 rounded text-xs font-medium capitalize transition-all"
                            style={{
                                background:
                                    view === v
                                        ? "rgba(59,130,246,0.2)"
                                        : "transparent",
                                color: view === v ? "#3b82f6" : "#64748b",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {v === "grid" ? (
                                <Layers size={14} />
                            ) : (
                                <FolderKanban size={14} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid view */}
            {view === "grid" ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((p) => (
                        <div
                            key={p.id}
                            className="rounded-xl p-5 group hover:-translate-y-px transition-all duration-200 cursor-pointer relative overflow-hidden"
                            style={{
                                background: "rgba(22, 27, 39, 0.8)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* Glow */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)`,
                                }}
                            />

                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: p.color + "20" }}
                                >
                                    <FolderKanban
                                        size={18}
                                        style={{ color: p.color }}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                        style={{
                                            background:
                                                statusStyle[p.status].bg,
                                            color: statusStyle[p.status].text,
                                        }}
                                    >
                                        {statusStyle[p.status].label}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-500 hover:text-white transition-all">
                                        <MoreHorizontal size={15} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-1">
                                <div className="flex items-center gap-2">
                                    <h3
                                        className="text-sm font-semibold text-white"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        {p.name}
                                    </h3>
                                    <span
                                        className="text-xs px-1.5 py-0.5 rounded text-slate-500"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        {p.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    {p.desc}
                                </p>
                            </div>

                            <div className="mt-4 mb-3">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-xs text-slate-500">
                                        Progress
                                    </span>
                                    <span
                                        className="text-xs font-medium"
                                        style={{ color: p.color }}
                                    >
                                        {p.progress}%
                                    </span>
                                </div>
                                <div
                                    className="w-full h-1.5 rounded-full"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${p.progress}%`,
                                            background: p.color,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <div className="flex -space-x-1">
                                    {Array.from({
                                        length: Math.min(p.members, 4),
                                    }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-6 rounded-full border-2 border-[#161b27] flex items-center justify-center text-white"
                                            style={{
                                                background: avatarColors[i],
                                                fontSize: "8px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                    {p.members > 4 && (
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-[#161b27] flex items-center justify-center text-xs text-slate-400"
                                            style={{ background: "#1f2937" }}
                                        >
                                            +{p.members - 4}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Users size={11} /> {p.members}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} />{" "}
                                        {p.due.split(",")[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* List view */
                <div
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: "rgba(22, 27, 39, 0.8)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors group"
                            style={{
                                borderBottom:
                                    i < filtered.length - 1
                                        ? "1px solid rgba(255,255,255,0.04)"
                                        : "none",
                            }}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: p.color + "20" }}
                            >
                                <FolderKanban
                                    size={15}
                                    style={{ color: p.color }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p
                                        className="text-sm font-medium text-white truncate"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        {p.name}
                                    </p>
                                    <span
                                        className="text-xs px-1.5 py-0.5 rounded text-slate-500"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.05)",
                                        }}
                                    >
                                        {p.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                    {p.desc}
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-6 shrink-0">
                                <div className="w-24">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-slate-500">
                                            {p.progress}%
                                        </span>
                                    </div>
                                    <div
                                        className="w-full h-1.5 rounded-full"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${p.progress}%`,
                                                background: p.color,
                                            }}
                                        />
                                    </div>
                                </div>
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                        background: statusStyle[p.status].bg,
                                        color: statusStyle[p.status].text,
                                    }}
                                >
                                    {statusStyle[p.status].label}
                                </span>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <Calendar size={11} />
                                    {p.due.split(",")[0]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
