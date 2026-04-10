import { useState } from "react";
import {
    Search,
    Plus,
    MoreHorizontal,
    Mail,
    Shield,
    User,
    ChevronUp,
    ChevronDown,
} from "lucide-react";

const usersData = [
    {
        id: 1,
        name: "Alex Morgan",
        email: "alex@teamflow.io",
        role: "Admin",
        department: "Engineering",
        status: "active",
        tasks: 24,
        joined: "Jan 2024",
    },
    {
        id: 2,
        name: "Sarah Kim",
        email: "sarah@teamflow.io",
        role: "Manager",
        department: "Design",
        status: "active",
        tasks: 18,
        joined: "Feb 2024",
    },
    {
        id: 3,
        name: "Marcus Lee",
        email: "marcus@teamflow.io",
        role: "Developer",
        department: "Engineering",
        status: "active",
        tasks: 31,
        joined: "Mar 2024",
    },
    {
        id: 4,
        name: "Priya Sharma",
        email: "priya@teamflow.io",
        role: "Designer",
        department: "Design",
        status: "away",
        tasks: 12,
        joined: "Jan 2024",
    },
    {
        id: 5,
        name: "James Turner",
        email: "james@teamflow.io",
        role: "Developer",
        department: "Backend",
        status: "active",
        tasks: 27,
        joined: "Apr 2024",
    },
    {
        id: 6,
        name: "Elena Rodriguez",
        email: "elena@teamflow.io",
        role: "QA Engineer",
        department: "QA",
        status: "inactive",
        tasks: 8,
        joined: "Feb 2024",
    },
    {
        id: 7,
        name: "David Chen",
        email: "david@teamflow.io",
        role: "DevOps",
        department: "Infrastructure",
        status: "active",
        tasks: 15,
        joined: "May 2024",
    },
    {
        id: 8,
        name: "Fatima Al-Hassan",
        email: "fatima@teamflow.io",
        role: "PM",
        department: "Product",
        status: "active",
        tasks: 22,
        joined: "Mar 2024",
    },
];

const statusStyle = {
    active: { label: "Active", bg: "rgba(16,185,129,0.12)", text: "#10b981" },
    away: { label: "Away", bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
    inactive: {
        label: "Inactive",
        bg: "rgba(100,116,139,0.12)",
        text: "#64748b",
    },
};

const avatarColors = [
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
    "#6366f1",
];

export default function Users() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ key: "name", dir: "asc" });
    const [filter, setFilter] = useState("all");

    const filtered = usersData
        .filter((u) => {
            const q = search.toLowerCase();
            const matchSearch =
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q);
            const matchFilter = filter === "all" || u.status === filter;
            return matchSearch && matchFilter;
        })
        .sort((a, b) => {
            const v = sort.dir === "asc" ? 1 : -1;
            return a[sort.key] > b[sort.key] ? v : -v;
        });

    const toggleSort = (key) => {
        setSort((s) => ({
            key,
            dir: s.key === key && s.dir === "asc" ? "desc" : "asc",
        }));
    };

    const SortIcon = ({ col }) =>
        sort.key === col ? (
            sort.dir === "asc" ? (
                <ChevronUp size={13} className="text-blue-400" />
            ) : (
                <ChevronDown size={13} className="text-blue-400" />
            )
        ) : (
            <ChevronUp
                size={13}
                className="text-slate-600 opacity-0 group-hover:opacity-100"
            />
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
                        Users
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {usersData.length} team members
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all self-start sm:self-auto"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        boxShadow: "0 4px 15px rgba(59,130,246,0.25)",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    <Plus size={16} /> Invite User
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg text-slate-300 placeholder-slate-600 outline-none"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "active", "away", "inactive"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all"
                            style={{
                                background:
                                    filter === s
                                        ? "rgba(59,130,246,0.15)"
                                        : "rgba(255,255,255,0.04)",
                                border:
                                    filter === s
                                        ? "1px solid rgba(59,130,246,0.3)"
                                        : "1px solid rgba(255,255,255,0.07)",
                                color: filter === s ? "#3b82f6" : "#94a3b8",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    background: "rgba(22, 27, 39, 0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr
                                style={{
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.05)",
                                }}
                            >
                                {[
                                    { key: "name", label: "User" },
                                    { key: "role", label: "Role" },
                                    { key: "department", label: "Department" },
                                    { key: "status", label: "Status" },
                                    { key: "tasks", label: "Tasks" },
                                    { key: "joined", label: "Joined" },
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        onClick={() => toggleSort(key)}
                                        className="group text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-300 transition-colors select-none"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        <div className="flex items-center gap-1">
                                            {label}
                                            <SortIcon col={key} />
                                        </div>
                                    </th>
                                ))}
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user, i) => {
                                const initials = user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("");
                                const color =
                                    avatarColors[i % avatarColors.length];
                                return (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-white/2 transition-colors group"
                                        style={{
                                            borderBottom:
                                                "1px solid rgba(255,255,255,0.03)",
                                        }}
                                    >
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                    style={{
                                                        background:
                                                            color + "30",
                                                        color,
                                                    }}
                                                >
                                                    {initials}
                                                </div>
                                                <div>
                                                    <p
                                                        className="text-sm font-medium text-white"
                                                        style={{
                                                            fontFamily:
                                                                "'DM Sans', sans-serif",
                                                        }}
                                                    >
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                {user.role === "Admin" ? (
                                                    <Shield
                                                        size={12}
                                                        className="text-blue-400"
                                                    />
                                                ) : (
                                                    <User
                                                        size={12}
                                                        className="text-slate-500"
                                                    />
                                                )}
                                                {user.role}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-slate-400">
                                            {user.department}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span
                                                className="text-xs px-2.5 py-1 rounded-full font-medium"
                                                style={{
                                                    background:
                                                        statusStyle[user.status]
                                                            .bg,
                                                    color: statusStyle[
                                                        user.status
                                                    ].text,
                                                }}
                                            >
                                                {statusStyle[user.status].label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs font-medium text-slate-300">
                                            {user.tasks}
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-slate-500">
                                            {user.joined}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                                                    <Mail size={14} />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="py-12 text-center text-slate-500 text-sm">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
}
