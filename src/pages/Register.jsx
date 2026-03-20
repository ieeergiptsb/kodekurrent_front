import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Upload, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const BRANCHES = ["CSE", "CSD", "IDD CSE", "Electronics", "EV", "MnC", "IT", "Mechanical", "Chemical", "Petroleum", "Civil", "Biotech", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
const MEMBERSHIP_TYPES = [
    { value: "non_member", label: "Non-Member" },
    { value: "ieee_member", label: "IEEE Member" },
];

export default function Register() {
    const [, setLocation] = useLocation();
    const [step, setStep] = useState(1); // 1 = form, 2 = OTP
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [profileFile, setProfileFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        email: "",
        phone_number: "",
        college: "RGIPT",
        branch: "CSE",
        year: "1st Year",
        roll_no: "",
        password: "",
        confirmPassword: "",
        membership_type: "non_member",
        membership_code: "",
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 1 * 1024 * 1024) {
            toast.error("File too large", { description: "Profile picture must be under 1MB." });
            return;
        }
        setProfileFile(file);
        setProfilePreview(URL.createObjectURL(file));
    };

    // Step 1: Initiate registration (sends OTP email)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (!profileFile) {
            return toast.error("Profile picture is required");
        }
        setLoading(true);

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (key !== "confirmPassword") payload.append(key, val);
            });
            payload.append("profile_picture", profileFile);

            const response = await fetch(`${API_BASE}/auth/register/initiate`, {
                method: "POST",
                body: payload, // multipart
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setRegisteredEmail(data.email);
                setStep(2);
                toast.success("OTP Sent!", { description: "Check your email for the verification code." });
            } else {
                toast.error("Registration Failed", { description: data.error || "Could not create account." });
            }
        } catch (error) {
            console.error("Register Error:", error);
            toast.error("Network Error", { description: "Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleOtpVerify = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            return toast.error("Enter a valid 6-digit OTP.");
        }
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/auth/register/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: registeredEmail, otp_code: otp }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("kk_token", data.access_token);
                localStorage.setItem("kk_user", JSON.stringify(data.user));
                toast.success("Registration Complete!", { description: "Now register your hackathon team." });
                setLocation("/register-team");
            } else {
                toast.error("Verification Failed", { description: data.error || "Invalid or expired OTP." });
            }
        } catch (error) {
            console.error("OTP Error:", error);
            toast.error("Network Error", { description: "Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await fetch(`${API_BASE}/auth/otp/resend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: registeredEmail, otp_type: "registration" }),
            });
            toast.success("OTP Resent!", { description: "Check your email." });
        } catch {
            toast.error("Failed to resend OTP.");
        }
    };

    const cardClass = "w-full max-w-2xl bg-[#060608]/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(46,213,115,0.15)] relative overflow-hidden";

    return (
        <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
            <div className={cardClass}>
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-8 relative z-10">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all ${step >= s ? "bg-secondary text-[#030712]" : "bg-secondary/20 text-secondary/50"}`}>
                                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                            </div>
                            <span className={`font-mono text-xs ${step >= s ? "text-secondary" : "text-muted-foreground"}`}>
                                {s === 1 ? "Details" : "Verify OTP"}
                            </span>
                            {s < 2 && <div className={`w-12 h-0.5 ${step > s ? "bg-secondary" : "bg-secondary/20"}`}></div>}
                        </div>
                    ))}
                </div>

                <div className="relative z-10">
                    {step === 1 ? (
                        <>
                            <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider text-center">CREATE LINK</h1>
                            <p className="font-mono text-muted-foreground text-sm text-center mb-8">Register with your ieeergipt.in credentials.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name" className="font-mono text-secondary/80">Full Name</Label>
                                        <Input id="full_name" name="full_name" required placeholder="Neo Anderson" value={formData.full_name} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="font-mono text-secondary/80">Username</Label>
                                        <Input id="username" name="username" required placeholder="neo_matrix" value={formData.username} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-mono text-secondary/80">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="operator@gmail.com" value={formData.email} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number" className="font-mono text-secondary/80">Phone</Label>
                                        <Input id="phone_number" name="phone_number" type="tel" required pattern="\d{10}" title="10 digits" placeholder="9876543210" value={formData.phone_number} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="roll_no" className="font-mono text-secondary/80">Roll Number</Label>
                                        <Input id="roll_no" name="roll_no" required placeholder="24IT3056" value={formData.roll_no} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="college" className="font-mono text-secondary/80">College</Label>
                                    <Input id="college" name="college" required placeholder="RGIPT" value={formData.college} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="branch" className="font-mono text-secondary/80">Branch</Label>
                                        <select id="branch" name="branch" value={formData.branch} onChange={handleChange} className="w-full h-11 rounded-md bg-[#030712]/50 border border-secondary/30 text-white px-3 font-mono text-sm focus:outline-none focus:border-secondary">
                                            {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year" className="font-mono text-secondary/80">Year</Label>
                                        <select id="year" name="year" value={formData.year} onChange={handleChange} className="w-full h-11 rounded-md bg-[#030712]/50 border border-secondary/30 text-white px-3 font-mono text-sm focus:outline-none focus:border-secondary">
                                            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-mono text-secondary/80">Membership Type</Label>
                                    <div className="flex gap-4">
                                        {MEMBERSHIP_TYPES.map((m) => (
                                            <label key={m.value} className={`flex-1 cursor-pointer rounded-lg border p-3 text-center font-mono text-sm transition-all ${formData.membership_type === m.value ? "border-secondary bg-secondary/10 text-secondary" : "border-secondary/30 text-muted-foreground hover:border-secondary/60"}`}>
                                                <input type="radio" name="membership_type" value={m.value} className="hidden" checked={formData.membership_type === m.value} onChange={handleChange} />
                                                {m.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {formData.membership_type === "ieee_member" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="membership_code" className="font-mono text-secondary/80">IEEE Membership Code (optional)</Label>
                                        <Input id="membership_code" name="membership_code" placeholder="IEEE-XXXX" value={formData.membership_code} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11" />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 relative">
                                        <Label htmlFor="password" className="font-mono text-secondary/80">Password</Label>
                                        <div className="relative">
                                            <Input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={6} placeholder="••••••••" value={formData.password} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11 pr-10" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 relative">
                                        <Label htmlFor="confirmPassword" className="font-mono text-secondary/80">Confirm Password</Label>
                                        <div className="relative">
                                            <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-11 pr-10" />
                                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Picture */}
                                <div className="space-y-2">
                                    <Label className="font-mono text-secondary/80">Profile Picture <span className="text-red-400">*</span></Label>
                                    <label htmlFor="profile_picture" className="flex items-center gap-3 cursor-pointer rounded-lg border border-dashed border-secondary/40 p-4 hover:border-secondary transition-colors">
                                        {profilePreview ? (
                                            <img src={profilePreview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                                <Upload className="h-5 w-5 text-secondary/60" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-mono text-sm text-white">{profileFile ? profileFile.name : "Choose a photo"}</p>
                                            <p className="font-mono text-xs text-muted-foreground">JPG, PNG, WebP — max 1MB</p>
                                        </div>
                                        <input id="profile_picture" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>

                                <Button type="submit" disabled={loading} className="w-full h-12 mt-2 font-pixel tracking-widest bg-secondary hover:bg-secondary/80 text-[#030712] transition-all shadow-[0_0_15px_rgba(46,213,115,0.4)]">
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {loading ? "UPLOADING..." : "ESTABLISH CONNECTION"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center border-t border-secondary/20 pt-4">
                                <p className="font-mono text-sm text-muted-foreground">
                                    Already linked?{" "}
                                    <Link href="/signin">
                                        <span className="text-primary hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-0.5">Login Here</span>
                                    </Link>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="font-pixel text-3xl text-white mb-2 tracking-wider text-center">VERIFY OTP</h1>
                            <p className="font-mono text-muted-foreground text-sm text-center mb-2">
                                A 6-digit code was sent to:
                            </p>
                            <p className="font-mono text-secondary text-sm text-center mb-8">{registeredEmail}</p>

                            <form onSubmit={handleOtpVerify} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="otp" className="font-mono text-secondary/80">OTP Code</Label>
                                    <Input
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        required
                                        maxLength={6}
                                        placeholder="______"
                                        className="bg-[#030712]/50 border-secondary/30 focus-visible:border-secondary text-white h-14 text-center tracking-[0.5em] text-xl font-mono"
                                    />
                                </div>

                                <Button type="submit" disabled={loading} className="w-full h-12 font-pixel tracking-widest bg-secondary hover:bg-secondary/80 text-[#030712] transition-all shadow-[0_0_15px_rgba(46,213,115,0.4)]">
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {loading ? "VERIFYING..." : "VERIFY & PROCEED"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <button onClick={handleResendOtp} className="font-mono text-sm text-muted-foreground hover:text-secondary transition-colors">
                                    Didn't receive? Resend OTP
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
