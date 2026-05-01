import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Zap,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    AlertCircle,
    User,
    Phone,
    Mail,
    Briefcase,
    Lock,
    Globe,
    CheckCircle2,
} from "lucide-react";

export default function Register({ onRegister }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        workspace: "",
        password: "",
        confirmPw: "",
        terms: false,
    });

    const navigate = useNavigate();

    const set = (field) => (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        setError("");
    };

    const workspaceSlug = form.workspace
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const passwordStrength = () => {
        const pw = form.password;
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strengthMeta = [
        { label: "", color: "" },
        { label: "Weak", color: "#ef4444" },
        { label: "Fair", color: "#f97316" },
        { label: "Good", color: "#eab308" },
        { label: "Strong", color: "#22c55e" },
    ];

    const goStep2 = () => {
        if (!form.firstName.trim() || !form.lastName.trim()) {
            return setError("Please enter your full name.");
        }
        if (!form.phone.trim())
            return setError("Please enter your phone number.");
        if (!form.email.trim() || !form.email.includes("@"))
            return setError("Please enter a valid email address.");
        setError("");
        setStep(2);
    };

    const handleSubmit = async () => {
        if (!form.workspace.trim())
            return setError("Please enter a workspace name.");
        if (!form.password || form.password.length < 6)
            return setError("Password must be at least 6 characters.");
        if (form.password !== form.confirmPw)
            return setError("Passwords do not match.");
        if (!form.terms)
            return setError("Please accept the Terms of Service to continue.");

        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setDone(true);
        setTimeout(() => {
            if (onRegister) onRegister();
            navigate("/dashboard");
        }, 2800);
    };

    const strength = passwordStrength();
    const meta = strengthMeta[strength];

    const inputStyle = {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'DM Sans', sans-serif",
    };

    const focusStyle = (e) =>
        (e.target.style.border = "1px solid rgba(59,130,246,0.5)");
    const blurStyle = (e) =>
        (e.target.style.border = "1px solid rgba(255,255,255,0.08)");

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                background:
                    "linear-gradient(135deg, #0a0c14 0%, #0f1320 50%, #0a0c14 100%)",
            }}
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow blobs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #3b82f6, transparent)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #8b5cf6, transparent)",
                }}
            />

            <div className="relative w-full max-w-sm">
                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: "rgba(22, 27, 39, 0.9)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(20px)",
                        boxShadow:
                            "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-7">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            }}
                        >
                            <Zap size={20} className="text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-xl font-bold text-white leading-none"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                TeamFlow
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Team Management
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-5">
                        <h2
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {done
                                ? "You're all set! 🎉"
                                : "Create your account"}
                        </h2>
                        {!done && (
                            <p className="text-sm text-slate-500 mt-1">
                                Set up your workspace in seconds
                            </p>
                        )}
                    </div>

                    {/* Step Indicator */}
                    {!done && (
                        <div className="flex items-center gap-2 mb-5">
                            {[
                                { n: 1, label: "Personal" },
                                { n: 2, label: "Workspace" },
                            ].map(({ n, label }, i) => (
                                <div
                                    key={n}
                                    className="flex items-center gap-2"
                                >
                                    {i > 0 && (
                                        <div
                                            className="flex-1 h-px"
                                            style={{
                                                width: 36,
                                                background:
                                                    step > i
                                                        ? "rgba(59,130,246,0.4)"
                                                        : "rgba(255,255,255,0.06)",
                                            }}
                                        />
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                            style={{
                                                background:
                                                    step > n
                                                        ? "rgba(34,197,94,0.15)"
                                                        : step === n
                                                          ? "rgba(59,130,246,0.15)"
                                                          : "rgba(255,255,255,0.04)",
                                                border:
                                                    step > n
                                                        ? "1.5px solid rgba(34,197,94,0.4)"
                                                        : step === n
                                                          ? "1.5px solid rgba(59,130,246,0.5)"
                                                          : "1.5px solid rgba(255,255,255,0.08)",
                                                color:
                                                    step > n
                                                        ? "#22c55e"
                                                        : step === n
                                                          ? "#3b82f6"
                                                          : "#475569",
                                            }}
                                        >
                                            {step > n ? "✓" : n}
                                        </div>
                                        <span
                                            className="text-xs font-semibold"
                                            style={{
                                                color:
                                                    step === n
                                                        ? "#3b82f6"
                                                        : step > n
                                                          ? "#22c55e"
                                                          : "#475569",
                                            }}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20">
                            <AlertCircle size={15} />
                            {error}
                        </div>
                    )}

                    {/* ── STEP 1 ── */}
                    {step === 1 && !done && (
                        <div className="space-y-3">
                            {/* Name row */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <User
                                            size={13}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                        />
                                        <input
                                            type="text"
                                            value={form.firstName}
                                            onChange={set("firstName")}
                                            placeholder="Alex"
                                            className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                            style={inputStyle}
                                            onFocus={focusStyle}
                                            onBlur={blurStyle}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <User
                                            size={13}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                        />
                                        <input
                                            type="text"
                                            value={form.lastName}
                                            onChange={set("lastName")}
                                            placeholder="Johnson"
                                            className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                            style={inputStyle}
                                            onFocus={focusStyle}
                                            onBlur={blurStyle}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone
                                        size={13}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                    />
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={set("phone")}
                                        placeholder="+91 98765 43210"
                                        className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focusStyle}
                                        onBlur={blurStyle}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={13}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                    />
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={set("email")}
                                        placeholder="alex@company.io"
                                        className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focusStyle}
                                        onBlur={blurStyle}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={goStep2}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white transition-all mt-1"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #3b82f6, #6366f1)",
                                    fontFamily: "'DM Sans', sans-serif",
                                    boxShadow:
                                        "0 4px 20px rgba(59,130,246,0.3)",
                                }}
                            >
                                Continue <ArrowRight size={15} />
                            </button>
                        </div>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && !done && (
                        <div className="space-y-3">
                            {/* Workspace name */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Workspace Name
                                </label>
                                <div className="relative">
                                    <Briefcase
                                        size={13}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                    />
                                    <input
                                        type="text"
                                        value={form.workspace}
                                        onChange={set("workspace")}
                                        placeholder="Acme Corp"
                                        className="w-full pl-8 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focusStyle}
                                        onBlur={blurStyle}
                                    />
                                </div>
                                {/* Slug preview */}
                                <div className="flex items-center gap-1 mt-1.5">
                                    <Globe
                                        size={10}
                                        className="text-slate-600"
                                    />
                                    <span className="text-xs text-slate-600">
                                        teamflow.io/
                                        <span className="text-blue-400 font-semibold">
                                            {workspaceSlug || "your-workspace"}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={13}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                    />
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={form.password}
                                        onChange={set("password")}
                                        placeholder="••••••••"
                                        className="w-full pl-8 pr-10 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focusStyle}
                                        onBlur={blurStyle}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPw ? (
                                            <EyeOff size={15} />
                                        ) : (
                                            <Eye size={15} />
                                        )}
                                    </button>
                                </div>
                                {/* Strength bars */}
                                {form.password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="h-0.5 flex-1 rounded-full transition-all duration-300"
                                                    style={{
                                                        background:
                                                            i <= strength
                                                                ? meta.color
                                                                : "rgba(255,255,255,0.07)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <p
                                            className="text-xs font-medium"
                                            style={{ color: meta.color }}
                                        >
                                            {meta.label}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={13}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                                    />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={form.confirmPw}
                                        onChange={set("confirmPw")}
                                        placeholder="••••••••"
                                        className="w-full pl-8 pr-10 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                        style={inputStyle}
                                        onFocus={focusStyle}
                                        onBlur={blurStyle}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showConfirm ? (
                                            <EyeOff size={15} />
                                        ) : (
                                            <Eye size={15} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                                <input
                                    type="checkbox"
                                    checked={form.terms}
                                    onChange={set("terms")}
                                    className="w-3.5 h-3.5 mt-0.5 rounded accent-blue-500 flex-shrink-0"
                                />
                                <span className="text-xs text-slate-500 leading-relaxed">
                                    I agree to the{" "}
                                    <button
                                        type="button"
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Terms of Service
                                    </button>{" "}
                                    and{" "}
                                    <button
                                        type="button"
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
                                style={{
                                    background: loading
                                        ? "rgba(59,130,246,0.4)"
                                        : "linear-gradient(135deg, #3b82f6, #6366f1)",
                                    fontFamily: "'DM Sans', sans-serif",
                                    boxShadow: loading
                                        ? "none"
                                        : "0 4px 20px rgba(59,130,246,0.3)",
                                }}
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Create Workspace{" "}
                                        <ArrowRight size={15} />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep(1);
                                    setError("");
                                }}
                                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <ArrowLeft size={13} /> Back to personal info
                            </button>
                        </div>
                    )}

                    {/* ── SUCCESS ── */}
                    {done && (
                        <div className="text-center py-4">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                                style={{
                                    background: "rgba(34,197,94,0.1)",
                                    border: "1.5px solid rgba(34,197,94,0.3)",
                                }}
                            >
                                <CheckCircle2
                                    size={30}
                                    className="text-green-400"
                                />
                            </div>
                            <h3
                                className="text-xl font-bold text-white mb-2"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Workspace created!
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                <span className="text-white font-semibold">
                                    {workspaceSlug || form.workspace}
                                </span>{" "}
                                is ready.
                                <br />
                                Redirecting you to the dashboard…
                            </p>
                            {/* Progress bar */}
                            <div
                                className="mt-5 h-0.5 rounded-full overflow-hidden"
                                style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-[2500ms] ease-linear"
                                    style={{
                                        width: "100%",
                                        background:
                                            "linear-gradient(90deg, #3b82f6, #6366f1)",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    {!done && (
                        <p className="text-center text-xs text-slate-600 mt-5">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                            >
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
