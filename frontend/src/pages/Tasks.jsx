import { useState } from "react";
import {
    Plus,
    Search,
    CheckCircle2,
    Circle,
    Clock,
    Flag,
    User,
    MoreHorizontal,
    Filter,
} from "lucide-react";

const tasksData = [
    {
        id: 1,
        title: "Implement OAuth2 authentication",
        project: "API Gateway",
        assignee: "Marcus L.",
        priority: "high",
        status: "in-progress",
        due: "Mar 12",
        tags: ["backend", "auth"],
    },
    {
        id: 2,
        title: "Design onboarding screens",
        project: "Onboarding Flow",
        assignee: "Priya S.",
        priority: "high",
        status: "todo",
        due: "Mar 14",
        tags: ["design", "ux"],
    },
    {
        id: 3,
        title: "Write unit tests for API endpoints",
        project: "API Gateway",
        assignee: "Elena R.",
        priority: "medium",
        status: "todo",
        due: "Mar 15",
        tags: ["testing"],
    },
    {
        id: 4,
        title: "Set up CI/CD pipeline",
        project: "Mobile App v2",
        assignee: "David C.",
        priority: "high",
        status: "done",
        due: "Mar 8",
        tags: ["devops"],
    },
    {
        id: 5,
        title: "Update dashboard analytics charts",
        project: "Dashboard Redesign",
        assignee: "Alex M.",
        priority: "medium",
        status: "in-progress",
        due: "Mar 16",
        tags: ["frontend"],
    },
    {
        id: 6,
        title: "Conduct security penetration test",
        project: "Security Audit",
        assignee: "James T.",
        priority: "high",
        status: "in-progress",
        due: "Mar 18",
        tags: ["security"],
    },
    {
        id: 7,
        title: "Optimize database queries",
        project: "Analytics Engine",
        assignee: "Marcus L.",
        priority: "low",
        status: "todo",
        due: "Mar 22",
        tags: ["backend", "perf"],
    },
    {
        id: 8,
        title: "Create component library docs",
        project: "Dashboard Redesign",
        assignee: "Sarah K.",
        priority: "low",
        status: "done",
        due: "Mar 7",
        tags: ["docs", "design"],
    },
    {
        id: 9,
        title: "Mobile push notification flow",
        project: "Mobile App v2",
        assignee: "Priya S.",
        priority: "medium",
        status: "todo",
        due: "Mar 25",
        tags: ["mobile"],
    },
    {
        id: 10,
        title: "Review and merge PRs",
        project: "API Gateway",
        assignee: "Alex M.",
        priority: "medium",
        status: "done",
        due: "Mar 9",
        tags: ["review"],
    },
];

const priorityStyle = {
    high: { color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
    medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    low: { color: "#10b981", bg: "rgba(16,185,129,0.12)" },
};

const columns = [
    { id: "todo", label: "To Do", color: "#64748b" },
    { id: "in-progress", label: "In Progress", color: "#3b82f6" },
    { id: "done", label: "Done", color: "#10b981" },
];

export default function Tasks({ myTasks }) {
    const [search, setSearch] = useState("");
    const [view, setView] = useState("board");
    const [tasks, setTasks] = useState(tasksData);

    const displayTasks = tasks.filter((t) => {
        const q = search.toLowerCase();
        const match =
            t.title.toLowerCase().includes(q) ||
            t.project.toLowerCase().includes(q);
        const mine = !myTasks || t.assignee.startsWith("Alex");
        return match && mine;
    });

    const toggleDone = (id) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: t.status === "done" ? "todo" : "done" }
                    : t,
            ),
        );
    };

    const TaskCard = ({ task }) => (
        <div
            className="rounded-xl p-4 mb-3 group cursor-pointer hover:translate-y-px transition-all duration-150 relative"
            style={{
                background: "rgba(22,27,39,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <div className="flex items-start gap-2 mb-2">
                <button
                    onClick={() => toggleDone(task.id)}
                    className="mt-0.5 shrink-0"
                >
                    {task.status === "done" ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                        <Circle
                            size={16}
                            className="text-slate-600 hover:text-blue-400 transition-colors"
                        />
                    )}
                </button>
                <p
                    className={`text-sm leading-relaxed flex-1 ${task.status === "done" ? "line-through text-slate-500" : "text-slate-200"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {task.title}
                </p>
                <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-all">
                    <MoreHorizontal size={14} />
                </button>
            </div>

            <div className="ml-6">
                <p className="text-xs text-slate-600 mb-2">{task.project}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded text-slate-500"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{
                                background: "#3b82f6",
                                fontSize: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            {task.assignee[0]}
                        </div>
                        <span className="text-xs text-slate-600">
                            {task.assignee}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                                background: priorityStyle[task.priority].bg,
                                color: priorityStyle[task.priority].color,
                            }}
                        >
                            {task.priority}
                        </span>
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                            <Clock size={10} /> {task.due}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const TaskRow = ({ task }) => (
        <tr
            className="hover:bg-white/2 transition-colors group"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
        >
            <td className="px-4 py-3">
                <button onClick={() => toggleDone(task.id)}>
                    {task.status === "done" ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                        <Circle
                            size={16}
                            className="text-slate-600 hover:text-blue-400 transition-colors"
                        />
                    )}
                </button>
            </td>
            <td className="px-4 py-3">
                <p
                    className={`text-sm ${task.status === "done" ? "line-through text-slate-500" : "text-slate-200"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {task.title}
                </p>
            </td>
            <td className="px-4 py-3 text-xs text-slate-500">{task.project}</td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <User size={11} /> {task.assignee}
                </div>
            </td>
            <td className="px-4 py-3">
                <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                        background: priorityStyle[task.priority].bg,
                        color: priorityStyle[task.priority].color,
                    }}
                >
                    {task.priority}
                </span>
            </td>
            <td className="px-4 py-3 text-xs text-slate-500 flex items-center gap-1">
                <Clock size={11} /> {task.due}
            </td>
            <td className="px-4 py-3">
                <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-all">
                    <MoreHorizontal size={14} />
                </button>
            </td>
        </tr>
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
                        {myTasks ? "My Tasks" : "Tasks"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {displayTasks.length} tasks
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
                    <Plus size={16} /> New Task
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
                        placeholder="Search tasks..."
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
                    {["board", "list"].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className="px-4 py-1.5 rounded text-xs font-medium capitalize transition-all"
                            style={{
                                background:
                                    view === v
                                        ? "rgba(59,130,246,0.2)"
                                        : "transparent",
                                color: view === v ? "#3b82f6" : "#64748b",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            {/* Board view */}
            {view === "board" ? (
                <div className="grid md:grid-cols-3 gap-4">
                    {columns.map((col) => {
                        const colTasks = displayTasks.filter(
                            (t) => t.status === col.id,
                        );
                        return (
                            <div key={col.id}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: col.color }}
                                    />
                                    <h3
                                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        {col.label}
                                    </h3>
                                    <span
                                        className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium text-slate-400"
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        {colTasks.length}
                                    </span>
                                </div>
                                <div
                                    className="min-h-24 rounded-xl p-2"
                                    style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px dashed rgba(255,255,255,0.06)",
                                    }}
                                >
                                    {colTasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                    {colTasks.length === 0 && (
                                        <p className="text-xs text-slate-700 text-center py-6">
                                            No tasks
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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
                                        "",
                                        "Task",
                                        "Project",
                                        "Assignee",
                                        "Priority",
                                        "Due",
                                        "",
                                    ].map((h, i) => (
                                        <th
                                            key={i}
                                            className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                            style={{
                                                fontFamily:
                                                    "'DM Sans', sans-serif",
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {displayTasks.map((task) => (
                                    <TaskRow key={task.id} task={task} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
