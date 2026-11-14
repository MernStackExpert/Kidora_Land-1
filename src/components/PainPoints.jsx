"use client";

import { motion } from "framer-motion";
import { Frown, Gamepad2, BookOpen } from "lucide-react";

export default function PainPoints() {
  const painPoints = [
    {
      icon: (
        <Frown className="w-10 h-10 md:w-12 md:h-12 text-orange-500 mb-2" />
      ),
      title: "পড়াশোনায় মনোযোগ নেই?",
    },
    {
      icon: (
        <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 text-slate-800 mb-2" />
      ),
      title: "কার্টুন ছাড়া কিছু বোঝে না?",
    },
    {
      icon: (
        <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-2" />
      ),
      title: "নতুন কিছু শেখার আগ্রহ কম?",
    },
  ];

  return (
    <section className="w-full bg-slate-50 pb-8 pt-4 md:pb-20 md:pt-10 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-3xl font-extrabold text-slate-800 mb-8 md:mb-14 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 leading-tight"
        >
          আপনার সন্তান কি সারাদিন মোবাইল নিয়ে পড়ে থাকে?
          <span className="text-blue-500 animate-pulse text-2xl md:text-3xl">
            📱
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group overflow-hidden rounded-2xl p-[2px] md:p-[3px] cursor-pointer bg-slate-200 shadow-sm md:shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#3b82f6_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ea580c_100%)] transition-colors duration-500" />

              <div className="relative bg-white h-full w-full rounded-[14px] p-5 md:p-10 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative group-hover:scale-110 md:group-hover:scale-125 group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform duration-500 ease-out z-20">
                  {point.icon}
                </div>

                <h3 className="relative text-base md:text-xl font-bold text-slate-700 mt-2 md:mt-4 z-20 group-hover:text-blue-900 transition-colors duration-300">
                  {point.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
