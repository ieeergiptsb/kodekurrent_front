import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function TeamRegistration() {
    const [, setLocation] = useLocation();
    const [loading, setLoading] = useState(false);
    const [teamName, setTeamName] = useState("");
    // Start with 1 empty member email (lead is auto-included, so they need at least 1 more)
    const [memberEmails, setMemberEmails] = useState([""]);

    const addMember = () => {
        if (memberEmails.length >= 3) {
            toast.error("Max 4 members total (including yourself).");
            return;
        }
        setMemberEmails([...memberEmails, ""]);
    };

    const removeMember = (index) => {
        if (memberEmails.length <= 1) {
            toast.error("You need at least 1 other team member.");
            return;
        }
        setMemberEmails(memberEmails.filter((_, i) => i !== index));
    };

    const updateEmail = (index, value) => {
        const updated = [...memberEmails];
        updated[index] = value;
        setMemberEmails(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validEmails = memberEmails.map(e => e.trim()).filter(Boolean);
        if (validEmails.length < 1) {
            return toast.error("Add at least 1 teammate email (you are auto-included as lead).");
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("kk_token");
            const res = await fetch(`${API_BASE}/kodekurrent/register-team`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ team_name: teamName.trim(), member_emails: validEmails }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Invitations Sent!", { description: "Your teammates need to verify their emails." });
                setLocation("/dashboard");
            } else {
                toast.error("Team Registration Failed", { description: data.error || "Please try again." });
            }
        } catch {
            toast.error("Network Error", { description: "Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
            <div className="w-full max-w-lg bg-[#060608]/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(46,213,115,0.15)] relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-40"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                            <Users className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                            <h1 className="font-pixel text-2xl text-white tracking-wider">FORM YOUR SQUAD</h1>
                            <p className="font-mono text-muted-foreground text-xs">Register your hackathon team (2–4 members)</p>
                        </div>
                    </div>

                    <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3 mb-6">
                        <p className="font-mono text-xs text-secondary/80">
                            💡 You are auto-included as <strong>Team Lead</strong>. Enter your teammates' registered emails below.
                            All members must have an account on ieeergipt.in or Kodekurrent.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="team_name" className="font-mono text-secondary/80">Team Name</Label>
                            <Input
                                id="team_name"
                                required
                                placeholder="Team Quantum, The Debuggers..."
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="font-mono text-secondary/80">Teammate Emails</Label>
                            {memberEmails.map((email, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input
                                        type="email"
                                        required
                                        placeholder={`teammate${idx + 1}@gmail.com`}
                                        value={email}
                                        onChange={(e) => updateEmail(idx, e.target.value)}
                                        className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11 flex-1"
                                    />
                                    {memberEmails.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMember(idx)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {memberEmails.length < 3 && (
                                <button
                                    type="button"
                                    onClick={addMember}
                                    className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-secondary/30 rounded-lg font-mono text-sm text-secondary/60 hover:border-secondary hover:text-secondary transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Another Member
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <div className={`flex-1 h-1 rounded-full ${1 <= memberEmails.length + 1 ? "bg-secondary" : "bg-secondary/20"}`}></div>
                            <span className="font-mono text-xs text-secondary">{memberEmails.length + 1}/4 members</span>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 font-pixel tracking-widest bg-secondary hover:bg-secondary/80 text-[#030712] transition-all shadow-[0_0_15px_rgba(46,213,115,0.4)]"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading ? "ASSEMBLING..." : "LOCK IN SQUAD →"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
