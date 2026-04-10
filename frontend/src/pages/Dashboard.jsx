import {
    Users,
    FolderKanban,
    CheckSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Circle,
} from "lucide-react";

const stats = [
    {
        label: "Total Users",
        value: "142",
        change: "+12%",
        up: true,
        icon: Users,
        color: "#3b82f6",
    },
    {
        label: "Active Projects",
        value: "28",
        change: "+4%",
        up: true,
        icon: FolderKanban,
        color: "#8b5cf6",
    },
    {
        label: "Tasks Done",
        value: "1,284",
        change: "+18%",
        up: true,
        icon: CheckSquare,
        color: "#10b981",
    },
    {
        label: "Hours Logged",
        value: "3,420",
        change: "-3%",
        up: false,
        icon: TrendingUp,
        color: "#f59e0b",
    },
];

const recentActivity = [
    {
        user: "Sarah K.",
        action: "completed task",
        target: "API Integration",
        time: "2m ago",
        avatar: "S",
        color: "#10b981",
    },
    {
        user: "Marcus L.",
        action: "created project",
        target: "Mobile App v2",
        time: "15m ago",
        avatar: "M",
        color: "#3b82f6",
    },
    {
        user: "Priya S.",
        action: "assigned task to",
        target: "Dev Team",
        time: "1h ago",
        avatar: "P",
        color: "#8b5cf6",
    },
    {
        user: "James T.",
        action: "commented on",
        target: "Dashboard Design",
        time: "2h ago",
        avatar: "J",
        color: "#f59e0b",
    },
    {
        user: "Elena R.",
        action: "closed issue",
        target: "Auth Bug #42",
        time: "3h ago",
        avatar: "E",
        color: "#ef4444",
    },
];

const projects = [
    {
        name: "Dashboard Redesign",
        progress: 78,
        members: 4,
        status: "active",
        due: "Mar 15",
    },
    {
        name: "Mobile App v2",
        progress: 45,
        members: 6,
        status: "active",
        due: "Apr 2",
    },
    {
        name: "API Gateway",
        progress: 92,
        members: 3,
        status: "review",
        due: "Mar 10",
    },
    {
        name: "Analytics Engine",
        progress: 20,
        members: 5,
        status: "active",
        due: "May 1",
    },
];

const statusColor = {
    active: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6" },
    review: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    done: { bg: "rgba(16,185,129,0.15)", text: "#10b981" },
};

export default function Dashboard() {
    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Dashboard
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Tuesday, March 10, 2026
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map(
                    ({ label, value, change, up, icon: Icon, color }) => (
                        <div
                            key={label}
                            className="rounded-xl p-4 relative overflow-hidden"
                            style={{
                                background: "rgba(22, 27, 39, 0.8)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <div
                                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
                                style={{
                                    background: color,
                                    transform: "translate(30%, -30%)",
                                }}
                            />
                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ background: `${color}20` }}
                                >
                                    <Icon size={17} style={{ color }} />
                                </div>
                                <div
                                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                                        up
                                            ? "text-emerald-400 bg-emerald-400/10"
                                            : "text-red-400 bg-red-400/10"
                                    }`}
                                >
                                    {up ? (
                                        <ArrowUpRight size={12} />
                                    ) : (
                                        <ArrowDownRight size={12} />
                                    )}
                                    {change}
                                </div>
                            </div>
                            <p
                                className="text-2xl font-bold text-white"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {value}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {label}
                            </p>
                        </div>
                    ),
                )}
            </div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-5 gap-4">
                {/* Projects */}
                <div
                    className="lg:col-span-3 rounded-xl p-5"
                    style={{
                        background: "rgba(22, 27, 39, 0.8)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2
                            className="text-sm font-semibold text-white"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Active Projects
                        </h2>
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                            View all →
                        </button>
                    </div>
                    <div className="space-y-4">
                        {projects.map((p) => (
                            <div key={p.name} className="group">
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-sm font-medium text-slate-200"
                                            style={{
                                                fontFamily:
                                                    "'DM Sans', sans-serif",
                                            }}
                                        >
                                            {p.name}
                                        </span>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{
                                                background:
                                                    statusColor[p.status].bg,
                                                color: statusColor[p.status]
                                                    .text,
                                            }}
                                        >
                                            {p.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} /> {p.due}
                                        </span>
                                        <span className="font-medium text-slate-400">
                                            {p.progress}%
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="w-full h-1.5 rounded-full overflow-hidden"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${p.progress}%`,
                                            background:
                                                p.progress > 80
                                                    ? "linear-gradient(90deg, #10b981, #34d399)"
                                                    : "linear-gradient(90deg, #3b82f6, #6366f1)",
                                        }}
                                    />
                                </div>
                                <div className="flex mt-1.5">
                                    {Array.from({ length: p.members }).map(
                                        (_, i) => (
                                            <div
                                                key={i}
                                                className="w-5 h-5 rounded-full border-2 border-[#161b27] -ml-1 first:ml-0 flex items-center justify-center text-xs text-white font-medium"
                                                style={{
                                                    background: `hsl(${i * 60 + 200}, 70%, 45%)`,
                                                    fontSize: "8px",
                                                }}
                                            >
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                        ),
                                    )}
                                    <span className="ml-2 text-xs text-slate-600">
                                        {p.members} members
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity */}
                <div
                    className="lg:col-span-2 rounded-xl p-5"
                    style={{
                        background: "rgba(22, 27, 39, 0.8)",
                        border: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2
                            className="text-sm font-semibold text-white"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Recent Activity
                        </h2>
                        <div
                            className="w-2 h-2 rounded-full bg-emerald-400"
                            style={{ boxShadow: "0 0 6px #10b981" }}
                        />
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div
                                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                                    style={{
                                        background: a.color + "30",
                                        color: a.color,
                                    }}
                                >
                                    {a.avatar}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        <span className="text-white font-medium">
                                            {a.user}
                                        </span>{" "}
                                        {a.action}{" "}
                                        <span className="text-blue-400">
                                            {a.target}
                                        </span>
                                    </p>
                                    <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                                        <Clock size={10} /> {a.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Task summary bar */}
            <div
                className="rounded-xl p-5"
                style={{
                    background: "rgba(22, 27, 39, 0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-sm font-semibold text-white"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Task Overview
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total", count: 184, color: "#3b82f6" },
                        { label: "In Progress", count: 42, color: "#f59e0b" },
                        { label: "Completed", count: 127, color: "#10b981" },
                        { label: "Overdue", count: 15, color: "#ef4444" },
                    ].map(({ label, count, color }) => (
                        <div
                            key={label}
                            className="flex items-center gap-3 p-3 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                            <Circle
                                size={10}
                                fill={color}
                                stroke="none"
                                className="flex-shrink-0"
                            />
                            <div>
                                <p
                                    className="text-lg font-bold text-white leading-none"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        color,
                                    }}
                                >
                                    {count}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
