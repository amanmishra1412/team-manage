import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        onLogin();
        navigate("/dashboard");
    };

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
                className="absolute inset-0 opacity-20"
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
                {/* Card */}
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
                    <div className="flex items-center gap-3 mb-8">
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

                    <div className="mb-6">
                        <h2
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Welcome back
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Sign in to your workspace
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg mb-5 text-sm text-red-400 bg-red-500/10 border border-red-500/20">
                            <AlertCircle size={15} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@company.io"
                                className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                                onFocus={(e) =>
                                    (e.target.style.border =
                                        "1px solid rgba(59,130,246,0.5)")
                                }
                                onBlur={(e) =>
                                    (e.target.style.border =
                                        "1px solid rgba(255,255,255,0.08)")
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 pr-11 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}
                                    onFocus={(e) =>
                                        (e.target.style.border =
                                            "1px solid rgba(59,130,246,0.5)")
                                    }
                                    onBlur={(e) =>
                                        (e.target.style.border =
                                            "1px solid rgba(255,255,255,0.08)")
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPw ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded accent-blue-500"
                                />
                                <span className="text-xs text-slate-500">
                                    Remember me
                                </span>
                            </label>
                            <button
                                type="button"
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white transition-all mt-2 disabled:opacity-60"
                            style={{
                                background: loading
                                    ? "rgba(59,130,246,0.5)"
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
                                    Sign in <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-600 mt-5">
                        Don't have an account?
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
