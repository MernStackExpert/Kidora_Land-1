"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle, ShieldCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username || !password) {
      setError("ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন");
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result.error) {
      setError("ভুল ইউজারনেম বা পাসওয়ার্ড!");
      toast.error("লগইন ব্যর্থ হয়েছে!");
      setIsLoading(false);
    } else {
      toast.success("লগইন সফল হয়েছে!");
      router.push("/admin"); // লগইন সফল হলে মেইন ড্যাশবোর্ডে নিয়ে যাবে
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Background Animated Elements */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-red-600/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50"
          >
            <ShieldCheck className="text-white w-8 h-8" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            অ্যাডমিন প্যানেল
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            লগইন করে ড্যাশবোর্ডে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-xl mb-6 flex items-center gap-2"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ইউজারনেম"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`relative w-full overflow-hidden rounded-xl mt-4 ${isLoading ? "cursor-not-allowed opacity-90" : "cursor-pointer group"}`}
          >
            {!isLoading && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-[shine_2s_linear_infinite]" />
            )}
            <div
              className={`relative flex items-center justify-center gap-2 text-white py-4 px-6 rounded-xl transition-all duration-300 font-bold ${isLoading ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/40"}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>লগইন করুন</span>
              )}
            </div>
          </button>
        </form>
      </motion.div>
    </main>
  );
}
