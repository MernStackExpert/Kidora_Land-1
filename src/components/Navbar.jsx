"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Timer } from "lucide-react";

export default function Navbar() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time) => time.toString().padStart(2, "0");

  const scrollToCheckout = () => {
    const section = document.getElementById("order-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm z-50 h-20 md:h-24 flex items-center transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center cursor-pointer group w-[100px] md:w-auto"
        >
          <img
            src="/kido.png"
            alt="KidoraBazar Logo"
            className="h-8 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center bg-red-50 px-3 py-1.5 md:px-5 md:py-2 rounded-xl border border-red-100 shadow-inner"
        >
          <span className="text-[10px] md:text-xs font-bold text-red-500 mb-0.5 md:mb-1 uppercase tracking-wider flex items-center gap-1">
            <Timer size={12} className="animate-pulse" />
            অফার বাকি
          </span>
          <div className="flex items-center gap-1 md:gap-2 font-mono text-sm md:text-xl font-black text-red-600 tracking-tight">
            <div className="bg-white px-1.5 py-0.5 rounded shadow-sm">
              {formatTime(hours)}
            </div>
            <span>:</span>
            <div className="bg-white px-1.5 py-0.5 rounded shadow-sm">
              {formatTime(minutes)}
            </div>
            <span>:</span>
            <div className="bg-white px-1.5 py-0.5 rounded shadow-sm text-orange-500">
              {formatTime(seconds)}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={scrollToCheckout}
            className="group relative flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs md:text-base py-2.5 px-4 md:py-3 md:px-8 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></span>
            <Bell className="w-4 h-4 md:w-5 md:h-5 animate-bell-ring text-yellow-300 fill-yellow-300/30 shrink-0" />
            <span>অর্ডার করুন</span>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
