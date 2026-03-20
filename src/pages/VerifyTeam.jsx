import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function VerifyTeam() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Verifying your team invitation...");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    const authToken = localStorage.getItem("kk_token");
    if (!authToken) {
      // User is not logged in. Save token and redirect to signin.
      localStorage.setItem("pending_team_token", token);
      toast.info("Please login or create an account to accept your team invitation.");
      setLocation("/signin");
      return;
    }

    const verifyToken = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.ieeergipt.in';
        const res = await fetch(`${apiUrl}/kodekurrent/verify-team?token=${token}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        
        // Remove pending token if it existed
        localStorage.removeItem("pending_team_token");

        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Successfully joined the team!");
          toast.success("Team invitation accepted!");
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            setLocation("/dashboard");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to verify invitation.");
          toast.error(data.error || "Verification failed");
          // If error is about wrong account, they might want to re-login
          if (data.error && data.error.includes("log in as")) {
             // Add a wait before redirect
             setTimeout(() => {
                localStorage.removeItem("kk_token");
                localStorage.removeItem("kk_user");
                setLocation("/signin");
             }, 4000);
          }
        }
      } catch (err) {
        setStatus("error");
        setMessage("A network error occurred while verifying.");
      }
    };

    verifyToken();
  }, [setLocation]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
        
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Verifying...</h2>
            <p className="text-white/60">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-white/60 mb-6">{message}</p>
            <p className="text-sm font-mono text-emerald-500/80 animate-pulse">Redirecting to Dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-white/60 mb-8">{message}</p>
            <button
              onClick={() => setLocation("/dashboard")}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              Go to Dashboard
            </button>
          </>
        )}

      </div>
    </div>
  );
}
