import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function RegistrationSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-card/50 border border-primary/20 backdrop-blur-md rounded-2xl p-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </motion.div>

                <h1 className="text-3xl font-pixel text-primary mb-4 glitch-text" data-text="SUCCESS">
                    SUCCESS
                </h1>

                <p className="font-mono text-muted-foreground mb-8">
                    Welcome to the labyrinth. Your registration for KodeKurrent 2.0 has been completed successfully. We have sent further details to your email address.
                </p>

                <Link href="/">
                    <Button className="w-full font-pixel bg-primary hover:bg-primary/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
                        <Home className="mr-2 h-4 w-4" />
                        RETURN TO BASE
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
