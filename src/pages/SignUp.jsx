import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignUp() {
    const [, setLocation] = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", rollNumber: "", password: "", confirmPassword: "" });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Validation Error", { description: "Passwords do not match." });
        }

        setLoading(true);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
            // Do not send confirmPassword to backend
            const { confirmPassword, ...submitData } = formData;
            const response = await fetch(`${baseUrl}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Registration Successful", { description: "Welcome to KodeKurrent!" });
                setLocation("/");
            } else {
                toast.error("Registration Failed", { description: data.message || "Could not create account" });
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Network Error", { description: "Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
            <div className="w-full max-w-md bg-[#060608]/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(46,213,115,0.15)] relative overflow-hidden group">
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>

                <div className="relative z-10">
                    <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider text-center">CREATE LINK</h1>
                    <p className="font-mono text-muted-foreground text-sm text-center mb-8">
                        Establish your presence on the grid.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="font-mono text-secondary/80">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                required
                                placeholder="Neo Anderson"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-mono text-secondary/80">Comm-Link (Email)</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                pattern=".*(@gmail\.com|@rgipt\.ac\.in|@hotmail\.com)$"
                                title="Email must end in @gmail.com, @rgipt.ac.in, or @hotmail.com"
                                placeholder="operator@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="font-mono text-secondary/80">Frequency (Phone Number)</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                pattern="\d{10}"
                                title="Please enter exactly 10 digits"
                                placeholder="1234567890"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rollNumber" className="font-mono text-secondary/80">Roll Number</Label>
                            <Input
                                id="rollNumber"
                                name="rollNumber"
                                required
                                placeholder="24EC3051"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="password" className="font-mono text-secondary/80">Encryption Key (Password)</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12 pr-10"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="confirmPassword" className="font-mono text-secondary/80">Verify Key (Confirm Password)</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-12 pr-10"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-4 font-pixel tracking-widest bg-secondary hover:bg-secondary/80 text-[#030712] transition-all shadow-[0_0_15px_rgba(46,213,115,0.4)]"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading ? "UPLOADING..." : "ESTABLISH CONNECTION"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-secondary/20 pt-6">
                        <p className="font-mono text-sm text-muted-foreground">
                            Already linked?{" "}
                            <Link href="/signin">
                                <span className="text-primary hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-0.5">
                                    Login Here
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
