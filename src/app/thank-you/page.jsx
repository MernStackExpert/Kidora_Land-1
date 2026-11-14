"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  PackageCheck,
  PhoneCall,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  const [orderId, setOrderId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrderId("KIDO-" + Math.floor(100000 + Math.random() * 900000));
    setMounted(true);
  }, []);

  const particles = Array.from({ length: 20 });

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              backgroundColor: [
                "#ef4444",
                "#3b82f6",
                "#eab308",
                "#22c55e",
                "#a855f7",
              ][Math.floor(Math.random() * 5)],
              width: Math.random() * 20 + 10 + "px",
              height: Math.random() * 20 + 10 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -500],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-14 text-center overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner"
        >
          <CheckCircle className="text-green-500 w-14 h-14" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4"
        >
          ধন্যবাদ!{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
            অর্ডারটি সফল হয়েছে
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg text-slate-600 mb-10 max-w-md mx-auto"
        >
          খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনাকে কল করে ডেলিভারি কনফার্ম করবেন।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-10"
        >
          <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
            আপনার অর্ডার আইডি
          </div>
          <div className="text-2xl md:text-3xl font-black text-slate-800 tracking-widest">
            {orderId}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col items-center gap-2">
              <PhoneCall className="text-blue-500 w-6 h-6" />
              <span className="text-xs font-bold text-slate-600">
                কল কনফার্মেশন
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <PackageCheck className="text-orange-500 w-6 h-6" />
              <span className="text-xs font-bold text-slate-600">
                নিরাপদ প্যাকিং
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="text-green-500 w-6 h-6" />
              <span className="text-xs font-bold text-slate-600">
                দ্রুত ডেলিভারি
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <Link href="/">
            <button className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/30 overflow-hidden w-full sm:w-auto">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>হোম পেজে ফিরে যান</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
