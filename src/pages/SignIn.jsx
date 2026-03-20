import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignIn() {
    const [, setLocation] = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
            const response = await fetch(`${baseUrl}/auth/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Login Successful", { description: "Welcome back to KodeKurrent!" });
                setLocation("/");
            } else {
                toast.error("Login Failed", { description: data.message || "Invalid credentials" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Network Error", { description: "Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
            <div className="w-full max-w-md bg-[#060608]/80 backdrop-blur-md border border-primary/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>

                <div className="relative z-10">
                    <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider text-center">SYSTEM LOGIN</h1>
                    <p className="font-mono text-muted-foreground text-sm text-center mb-8">
                        Authenticate to access the labyrinth.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-mono text-primary/80">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="commander@kodekurrent.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#030712]/50 border-primary/30 focus-visible:border-primary text-white h-12"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="password" className="font-mono text-primary/80">Passkey</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-[#030712]/50 border-primary/30 focus-visible:border-primary text-white h-12 pr-10"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 font-pixel tracking-widest bg-primary hover:bg-primary/80 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading ? "AUTHENTICATING..." : "INITIALIZE LOGIN"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-primary/20 pt-6">
                        <p className="font-mono text-sm text-muted-foreground">
                            New to the grid?{" "}
                            <Link href="/signup">
                                <span className="text-secondary hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-0.5">
                                    Register Here
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
