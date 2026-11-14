"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  const scrollToCheckout = () => {
    const section = document.getElementById("order-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 to-slate-100 pt-0 pb-16 md:pt-10 md:pb-24 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 -right-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-5 py-2 rounded-full text-sm md:text-base font-bold mb-8 shadow-lg shadow-blue-900/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
            বাচ্চাদের জন্য স্পেশাল অফার!
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            মোবাইল আসক্তি কমান, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              ব্রেইন পাওয়ার বাড়ান!
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl font-medium leading-relaxed">
            “রাহা ইন্টেলিজেন্স স্টাডি বুক” – খেলতে খেলতে শিখবে, মেধা বিকাশ হবে।
            মোবাইল থেকে দূরে রাখার সেরা উপায়।
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  ৳৯৯৯
                </span>
                <span className="text-lg text-slate-500 line-through font-medium">
                  ৳১৫০০
                </span>
              </div>

              <div className="relative group cursor-pointer" onClick={scrollToCheckout}>
                <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></span>
                <button className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xl font-bold py-4 px-12 rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden min-w-[280px]">
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></span>
                  <ShoppingCart className="w-6 h-6 animate-bounce" />
                  <span>অর্ডার করুন</span>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden lg:flex items-center text-orange-500 text-5xl ml-4"
            >
              <span className="animate-bounce-x">→</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex lg:hidden items-center text-orange-500 text-5xl mt-2"
            >
              <span className="animate-bounce">↓</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full flex justify-center mt-10 lg:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-blue-50 rounded-[3rem] transform rotate-3 scale-105 -z-10 shadow-inner"></div>
          <div className="relative group cursor-pointer" onClick={scrollToCheckout}>
            <img
              src="hero.png"
              alt="Product Combo"
              className="w-full max-w-lg rounded-3xl shadow-2xl object-cover border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x600/e2e8f0/1e293b?text=Combo+Package+Image";
              }}
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce">
              <div className="text-center">
                <span className="block text-sm font-bold text-slate-500">
                  সেভ করুন
                </span>
                <span className="block text-2xl font-extrabold text-orange-500">
                  ৳৫০১
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}