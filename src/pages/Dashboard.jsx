import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2, Users, Bell, IdCard, Trophy, LogOut, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function getAuthHeaders() {
    const token = localStorage.getItem("kk_token");
    return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Dashboard() {
    const [, setLocation] = useLocation();
    const [loading, setLoading] = useState(true);
    const [dashData, setDashData] = useState(null);
    const [activeTab, setActiveTab] = useState("announcements");

    useEffect(() => {
        const token = localStorage.getItem("kk_token");
        if (!token) {
            setLocation("/signin");
            return;
        }
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await fetch(`${API_BASE}/kodekurrent/dashboard`, {
                headers: getAuthHeaders(),
            });
            if (res.status === 401) {
                localStorage.removeItem("kk_token");
                localStorage.removeItem("kk_user");
                setLocation("/signin");
                return;
            }
            const data = await res.json();
            if (data.success) setDashData(data);
            else toast.error("Failed to load dashboard.");
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("kk_token");
        localStorage.removeItem("kk_user");
        setLocation("/signin");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (!dashData) return null;

    const { user, team, announcements } = dashData;

    const tabs = [
        { id: "announcements", label: "Announcements", icon: Bell },
        { id: "team", label: "My Team", icon: Users },
        { id: "id_card", label: "ID Card", icon: IdCard },
    ];

    return (
        <div className="min-h-screen relative z-10 px-4 py-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-pixel text-2xl text-secondary tracking-widest">KODEKURRENT 2.0</h1>
                        <p className="font-mono text-muted-foreground text-sm mt-1">Hackathon Command Center</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-red-400 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>

                {/* User Profile Card */}
                <div className="bg-[#060608]/80 backdrop-blur-md border border-secondary/20 rounded-2xl p-6 mb-6 flex items-center gap-6">
                    <div className="relative">
                        {user.profile_image_url ? (
                            <img src={user.profile_image_url} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-secondary/50" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                                <span className="font-pixel text-secondary text-xl">{user.full_name?.[0]?.toUpperCase()}</span>
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#060608]"></div>
                    </div>
                    <div className="flex-1">
                        <h2 className="font-pixel text-white text-lg">{user.full_name}</h2>
                        <p className="font-mono text-secondary/70 text-sm">@{user.username}</p>
                        <div className="flex gap-4 mt-2">
                            <span className="font-mono text-xs text-muted-foreground">{user.email}</span>
                            <span className="font-mono text-xs text-muted-foreground">{user.roll_no}</span>
                            <span className="font-mono text-xs text-muted-foreground">{user.year} • {user.branch}</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <span className={`font-mono text-xs px-3 py-1 rounded-full border ${user.membership_type === "ieee_member" ? "border-secondary text-secondary bg-secondary/10" : "border-muted-foreground text-muted-foreground"}`}>
                            {user.membership_type === "ieee_member" ? "IEEE Member" : "Non-Member"}
                        </span>
                    </div>
                </div>

                {/* Team Status Banner */}
                {!team && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div>
                            <p className="font-mono text-yellow-400 text-sm font-bold">⚡ You haven't registered a team yet!</p>
                            <p className="font-mono text-muted-foreground text-xs mt-1">Form your hackathon team (2–4 members) to participate.</p>
                        </div>
                        <Button onClick={() => setLocation("/register-team")} className="font-pixel text-xs bg-yellow-500 hover:bg-yellow-400 text-black">
                            Register Team <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-secondary/20 pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 font-mono text-sm transition-all border-b-2 -mb-px ${activeTab === tab.id ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-white"}`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Announcements Tab */}
                {activeTab === "announcements" && (
                    <div className="space-y-4">
                        {announcements.length === 0 ? (
                            <div className="text-center py-16 font-mono text-muted-foreground">
                                <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                <p>No announcements yet. Stay tuned!</p>
                            </div>
                        ) : announcements.map((a, i) => (
                            <div key={i} className="bg-[#060608]/80 backdrop-blur-md border border-secondary/20 rounded-xl p-5 hover:border-secondary/40 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-pixel text-white text-sm mb-2">{a.heading}</h3>
                                        <p className="font-mono text-muted-foreground text-sm leading-relaxed">{a.body}</p>
                                    </div>
                                    {a.image_url && (
                                        <img src={a.image_url} alt="" className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                                    )}
                                </div>
                                <p className="font-mono text-xs text-secondary/50 mt-3">{formatDate(a.created_at)}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Team Tab */}
                {activeTab === "team" && (
                    <div>
                        {!team ? (
                            <div className="text-center py-16">
                                <Users className="h-12 w-12 mx-auto mb-4 text-secondary/30" />
                                <p className="font-mono text-muted-foreground mb-4">No team registered yet.</p>
                                <Button onClick={() => setLocation("/register-team")} className="font-pixel bg-secondary hover:bg-secondary/80 text-black">
                                    Register Your Team
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-[#060608]/80 backdrop-blur-md border border-secondary/20 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="font-pixel text-secondary text-xl">{team.team_name}</h2>
                                        <p className="font-mono text-muted-foreground text-sm mt-1">
                                            {team.members.length} members — {team.members.every(m => m.status === 'Verified') ? "✅ Verified" : "⏳ Pending Verification"}
                                        </p>
                                    </div>
                                    {team.submission_url && (
                                        <a href={team.submission_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-mono text-sm text-secondary hover:underline">
                                            View Submission <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {team.members.map((m, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-secondary/5 rounded-lg p-3 border border-secondary/10">
                                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-pixel text-secondary text-xs">
                                                {m.full_name?.[0]?.toUpperCase() || m.email[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-mono text-sm text-white">{m.full_name || "Waiting to join..."}</p>
                                                <p className="font-mono text-xs text-muted-foreground">{m.email}</p>
                                            </div>
                                            {m.status === "Pending" ? (
                                                <span className="ml-auto font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">Pending</span>
                                            ) : m.user?.toString() === team.team_lead?.toString() ? (
                                                <span className="ml-auto font-mono text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Lead</span>
                                            ) : (
                                                <span className="ml-auto font-mono text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Verified</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ID Card Tab */}
                {activeTab === "id_card" && (
                    <div className="flex flex-col items-center py-8">
                        <div className="w-80 bg-gradient-to-br from-[#0a0a14] to-[#0d1a14] border border-secondary/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(46,213,115,0.2)] relative overflow-hidden">
                            {/* Decorative grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(46,213,115,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(46,213,115,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 border-b border-secondary/20 pb-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <Trophy className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-pixel text-secondary text-xs tracking-widest">KODEKURRENT 2.0</p>
                                        <p className="font-mono text-muted-foreground text-xs">IEEE RG-IPT</p>
                                    </div>
                                </div>
                                {user.profile_image_url && (
                                    <img src={user.profile_image_url} alt="Profile" className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-secondary/50 mb-4" />
                                )}
                                <h3 className="font-pixel text-white text-center text-sm mb-1">{user.full_name}</h3>
                                <p className="font-mono text-secondary/70 text-center text-xs mb-4">@{user.username}</p>
                                <div className="space-y-1 text-xs font-mono">
                                    <div className="flex justify-between"><span className="text-muted-foreground">Roll No</span><span className="text-white">{user.roll_no}</span></div>
                                    <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="text-white">{user.branch}</span></div>
                                    <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="text-white">{user.year}</span></div>
                                    {team && <div className="flex justify-between"><span className="text-muted-foreground">Team</span><span className="text-secondary">{team.team_name}</span></div>}
                                </div>
                                <div className="mt-4 pt-4 border-t border-secondary/20 text-center">
                                    <p className="font-mono text-xs text-muted-foreground">ID Card generation coming soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
