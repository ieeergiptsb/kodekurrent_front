import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RegistrationModal({ children }) {
    const [, setLocation] = useLocation();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        rollNumber: "",
        college: "",
        teamName: "",
        branch: "",
        otherBranch: "",
        year: "",
        course: "",
        members: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMemberChange = (index, e) => {
        const newMembers = [...formData.members];
        newMembers[index][e.target.name] = e.target.value;
        setFormData({ ...formData, members: newMembers });
    };

    const addMember = () => {
        if (formData.members.length < 3) {
            setFormData({
                ...formData,
                members: [...formData.members, { name: "", email: "", phone: "", rollNumber: "", branch: "", otherBranch: "", year: "", course: "" }]
            });
        }
    };

    const removeMember = (index) => {
        const newMembers = [...formData.members];
        newMembers.splice(index, 1);
        setFormData({ ...formData, members: newMembers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submissionData = { ...formData };
            if (submissionData.branch === "Other") {
                submissionData.branch = submissionData.otherBranch;
            }
            submissionData.members = submissionData.members.map(m => {
                if (m.branch === "Other") {
                    return { ...m, branch: m.otherBranch };
                }
                return m;
            });

            // Connect to the new backend endpoint
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (response.ok) {
                setOpen(false);
                setFormData({ name: "", email: "", phone: "", rollNumber: "", college: "", teamName: "", branch: "", otherBranch: "", year: "", course: "", members: [] }); // Reset
                setLocation("/registration-success");
            } else if (response.status === 401 || response.status === 403) {
                toast.error("Session Expired", { description: "Please login again to continue." });
                localStorage.removeItem("token");
                setOpen(false);
                setLocation("/signin");
            } else {
                toast.error("Registration Failed", {
                    description: data.message || "An error occurred during registration. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Registration Failed", {
                description: "Could not connect to the server. Is it running?",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] flex flex-col bg-card border-primary/20 backdrop-blur-md p-0">
                {!localStorage.getItem("token") ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">

                        <h2 className="font-pixel text-2xl text-primary tracking-widest leading-relaxed">ACCESS DENIED</h2>
                        <p className="font-mono text-muted-foreground max-w-sm mb-4">You must establish a connection (Login) before entering the labyrinth to register your squad.</p>
                        <Button onClick={() => { setOpen(false); setLocation('/signin'); }} className="bg-primary hover:bg-primary/80 text-white font-pixel px-8 py-6 h-auto tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                            PROCEED TO LOGIN
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="p-6 pb-2">
                            <DialogHeader>
                                <DialogTitle className="font-pixel text-primary text-xl">Join KodeKurrent</DialogTitle>
                                <DialogDescription className="font-mono text-muted-foreground text-sm">
                                    Enter your details below to register for the hackathon.
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="teamName" className="font-mono text-primary">Team Name</Label>
                                        <Input
                                            id="teamName"
                                            name="teamName"
                                            placeholder="The Syntax Errors"
                                            value={formData.teamName}
                                            onChange={handleChange}
                                            required
                                            className="bg-background border-primary/20 focus-visible:ring-primary"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="college" className="font-mono text-primary">Institution</Label>
                                        <Input
                                            id="college"
                                            name="college"
                                            placeholder="Rajiv Gandhi Institute of Petroleum and Technology"
                                            value={formData.college}
                                            onChange={handleChange}
                                            required
                                            className="bg-background border-primary/20 focus-visible:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-border">
                                    <h3 className="font-pixel text-sm text-secondary">Team Lead (You)</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="font-mono">Full Name</Label>
                                            <Input id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="bg-background border-primary/20" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email" className="font-mono">Email Address</Label>
                                            <Input id="email" name="email" type="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} required pattern=".*(@gmail\.com|@rgipt\.ac\.in|@hotmail\.com)$" title="Email must end in @gmail.com, @rgipt.ac.in, or @hotmail.com" className="bg-background border-primary/20" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="font-mono">Phone Number</Label>
                                            <Input id="phone" name="phone" type="tel" placeholder="9876543210" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" className="bg-background border-primary/20" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="rollNumber" className="font-mono">Roll Number</Label>
                                            <Input id="rollNumber" name="rollNumber" placeholder="24EC3051" value={formData.rollNumber} onChange={handleChange} required className="bg-background border-primary/20" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="course" className="font-mono">Course</Label>
                                            <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })} required>
                                                <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                    <SelectValue placeholder="Select Course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                                                    <SelectItem value="IDD">IDD</SelectItem>
                                                    <SelectItem value="M.Tech">M.Tech</SelectItem>
                                                    <SelectItem value="PhD">PhD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="year" className="font-mono">Year</Label>
                                            <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })} required>
                                                <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1st Year">1st Year</SelectItem>
                                                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                                                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                                                    <SelectItem value="4th Year">4th Year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="branch" className="font-mono">Branch</Label>
                                            <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })} required>
                                                <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                    <SelectValue placeholder="Select Branch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                                                    <SelectItem value="Computer Science and Design Engineering">Computer Science and Design Engineering</SelectItem>
                                                    <SelectItem value=" IDD Computer Science and Engineering"> IDD Computer Science and Engineering</SelectItem>
                                                    <SelectItem value="Electronics Engineering">Electronics Engineering</SelectItem>
                                                    <SelectItem value="Electrical Engineering (EV)">Electrical Engineering (EV)</SelectItem>
                                                    <SelectItem value="Information Technology">Information Technology Engineering</SelectItem>
                                                    <SelectItem value="Mathematics and Computing">Mathematics and Computing Engineering</SelectItem>
                                                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                                    <SelectItem value="Petroleum Engineering">Petroleum Engineering</SelectItem>
                                                    <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                                                    <SelectItem value="Chemical Engineering(Renewable)">Chemical Engineering(Renewable Energy )</SelectItem>
                                                    <SelectItem value="Chemical Engineering(Petrochemical and Polymer)">Chemical Engineering(Petrochemical and Polymer)</SelectItem>
                                                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                                    <SelectItem value="Other">Other...</SelectItem>

                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {formData.branch === "Other" && (
                                        <div className="grid gap-2 mt-2">
                                            <Label htmlFor="otherBranch" className="font-mono text-primary">Specify Branch</Label>
                                            <Input
                                                id="otherBranch"
                                                name="otherBranch"
                                                placeholder="Type your branch..."
                                                value={formData.otherBranch}
                                                onChange={handleChange}
                                                required
                                                className="bg-background border-primary/20 focus-visible:ring-primary"
                                            />
                                        </div>
                                    )}
                                </div>

                                {formData.members.map((member, index) => (
                                    <div key={index} className="space-y-4 pt-4 mt-2 border-t border-border relative">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-pixel text-sm text-muted-foreground">Teammate {index + 2}</h3>
                                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeMember(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Full Name</Label>
                                                <Input name="name" placeholder="Your Name" value={member.name} onChange={(e) => handleMemberChange(index, e)} required className="bg-background border-primary/20" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Email Address</Label>
                                                <Input name="email" type="email" placeholder="@gmail.com" value={member.email} onChange={(e) => handleMemberChange(index, e)} required pattern=".*(@gmail\.com|@rgipt\.ac\.in|@hotmail\.com)$" title="Email must end in @gmail.com, @rgipt.ac.in, or @hotmail.com" className="bg-background border-primary/20" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Phone Number</Label>
                                                <Input name="phone" type="tel" placeholder="9876543210" value={member.phone} onChange={(e) => handleMemberChange(index, e)} required pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" className="bg-background border-primary/20" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Roll Number</Label>
                                                <Input name="rollNumber" placeholder="24EC3051" value={member.rollNumber} onChange={(e) => handleMemberChange(index, e)} required className="bg-background border-primary/20" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Course</Label>
                                                <Select value={member.course} onValueChange={(val) => handleMemberChange(index, { target: { name: 'course', value: val } })} required>
                                                    <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                        <SelectValue placeholder="Select Course" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="B.Tech">B.Tech</SelectItem>
                                                        <SelectItem value="IDD">IDD</SelectItem>
                                                        <SelectItem value="M.Tech">M.Tech</SelectItem>
                                                        <SelectItem value="PhD">PhD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Year</Label>
                                                <Select value={member.year} onValueChange={(val) => handleMemberChange(index, { target: { name: 'year', value: val } })} required>
                                                    <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                        <SelectValue placeholder="Select Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1st Year">1st Year</SelectItem>
                                                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                                                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                                                        <SelectItem value="4th Year">4th Year</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="font-mono">Branch</Label>
                                                <Select value={member.branch} onValueChange={(val) => handleMemberChange(index, { target: { name: 'branch', value: val } })} required>
                                                    <SelectTrigger className="bg-background border-primary/20 text-foreground">
                                                        <SelectValue placeholder="Select Branch" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                                                        <SelectItem value="Computer Science and Design Engineering">Computer Science and Design Engineering</SelectItem>
                                                        <SelectItem value="Electronics Engineering">Electronics Engineering</SelectItem>
                                                        <SelectItem value="Electrical Engineering (EV)">Electrical Engineering (EV)</SelectItem>
                                                        <SelectItem value="Information Technology">Information Technology Engineering</SelectItem>
                                                        <SelectItem value="Mathematics and Computing">Mathematics and Computing Engineering</SelectItem>
                                                        <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                                        <SelectItem value="Petroleum Engineering">Petroleum Engineering</SelectItem>
                                                        <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                                                        <SelectItem value="Chemical Engineering(Renewable)">Chemical Engineering(Renewable Energy )</SelectItem>
                                                        <SelectItem value="Chemical Engineering(Petrochemical and Polymer)">Chemical Engineering(Petrochemical and Polymer)</SelectItem>
                                                        <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                                        <SelectItem value="IDD CSE">IDD CSE</SelectItem>
                                                        <SelectItem value="Other">Other...</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        {member.branch === "Other" && (
                                            <div className="grid gap-2 mt-2">
                                                <Label className="font-mono text-primary">Specify Branch</Label>
                                                <Input
                                                    name="otherBranch"
                                                    placeholder="Type your branch..."
                                                    value={member.otherBranch}
                                                    onChange={(e) => handleMemberChange(index, e)}
                                                    required
                                                    className="bg-background border-primary/20 focus-visible:ring-primary"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {formData.members.length < 3 && (
                                    <Button type="button" variant="outline" onClick={addMember} className="w-full mt-2 font-mono border-dashed border-2 border-primary/30 text-primary hover:bg-primary/10">
                                        <Plus className="mr-2 h-4 w-4" /> Add Teammate
                                    </Button>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full font-pixel mt-6 bg-primary hover:bg-primary/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all sticky bottom-0 z-10"
                                >
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {loading ? "REGISTERING..." : "ENTER THE LABYRINTH"}
                                </Button>
                            </form>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
