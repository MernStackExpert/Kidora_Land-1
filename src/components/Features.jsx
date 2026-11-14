"use client";

import { motion } from "framer-motion";
import { Volume2, BookOpen, Users, Truck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Volume2 className="w-6 h-6 md:w-8 md:h-8 text-red-500" />,
      title: "অডিও লার্নিং",
      desc: "৮০০ টিরও বেশি অডিও সাউন্ড বাটন। শুনে শুনে শিখবে শিশু।",
      color: "bg-red-50 border-red-100",
    },
    {
      icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />,
      title: "সব বিষয় এক বইয়ে",
      desc: "বাংলা, ইংরেজি, আরবি, নম্বর, ছড়া – সবকিছু এক জায়গায়।",
      color: "bg-yellow-50 border-yellow-100",
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
      title: "মা-বাবার সাথে শেখা",
      desc: "Parent-Child Interaction ডিজাইন করা হয়েছে।",
      color: "bg-green-50 border-green-100",
    },
    {
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
      title: "দ্রুত ডেলিভারি",
      desc: "সারা বাংলাদেশে নিরাপদ প্যাকেজিংয়ে পৌঁছে দেই।",
      color: "bg-blue-50 border-blue-100",
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
        >
          <h2 className="text-xl md:text-4xl font-extrabold text-slate-800 leading-snug md:leading-tight">
            রাহা ইন্টেলিজেন্স স্টাডি বুকের প্রতিটি পেজ ডিজাইন করা হয়েছে
            এমনভাবে, যা বাচ্চাদের{" "}
            <span className="text-blue-600">চিন্তাশক্তি বাড়াবে</span> এবং
            আনন্দের সাথে মোবাইল থেকে দূরে রাখবে।
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center group"
          >
            <div className="absolute inset-0 bg-blue-100 rounded-[2rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 -z-10 shadow-inner"></div>
            <img
              src="/cover-img.png"
              alt="Raha Intelligence Study Book Features"
              className="w-full max-w-sm md:max-w-lg rounded-2xl shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-105 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x600/e2e8f0/1e293b?text=Cover+Image";
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4 lg:mt-0">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-5 md:p-8 rounded-2xl border ${feature.color} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 cursor-pointer group`}
              >
                <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-sm mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
