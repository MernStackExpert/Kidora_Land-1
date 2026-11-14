"use client";

import { motion } from "framer-motion";
import {
  Book,
  Tablet,
  Droplets,
  Layers,
  Gift,
  Ticket,
  ShieldCheck,
  Cable,
  ShoppingCart,
} from "lucide-react";

export default function Package() {
  const packageItems = [
    {
      id: "১",
      title: "Raha Intelligence Study Book",
      desc: "৪০০+ অডিও বাটন, বাংলা, ইংরেজি, আরবি শেখার সুযোগ",
      icon: <Book className="w-8 h-8 text-blue-600" />,
      color: "from-blue-50 to-blue-100/50 border-blue-200",
    },
    {
      id: "২",
      title: "LCD Writing Tablet",
      desc: "৮.৫ ইঞ্চি, বারবার লেখা যায়, চোখের জন্য নিরাপদ",
      icon: <Tablet className="w-8 h-8 text-pink-600" />,
      color: "from-pink-50 to-pink-100/50 border-pink-200",
    },
    {
      id: "৩",
      title: "Magic Water Book",
      desc: "জল দিয়ে রঙ করার মজা, বারবার ব্যবহার করা যায়",
      icon: <Droplets className="w-8 h-8 text-cyan-600" />,
      color: "from-cyan-50 to-cyan-100/50 border-cyan-200",
    },
    {
      id: "৪",
      title: "Flash Cards",
      desc: "প্রাণি, ফল, শরীরের অঙ্গ, পরিবার ইসলামিক কার্ড",
      icon: <Layers className="w-8 h-8 text-orange-600" />,
      color: "from-orange-50 to-orange-100/50 border-orange-200",
    },
    {
      id: "৫",
      title: "স্ক্র্যাচ কার্ড",
      desc: "ঘষলে আকর্ষণীয় পুরস্কার পাবেন",
      icon: <Gift className="w-8 h-8 text-purple-600" />,
      color: "from-purple-50 to-purple-100/50 border-purple-200",
    },
    {
      id: "৬",
      title: "লটারি কুপন",
      desc: "লটারি কুপন জমা দিন, জিতুন আকর্ষণীয় পুরস্কার",
      icon: <Ticket className="w-8 h-8 text-green-600" />,
      color: "from-green-50 to-green-100/50 border-green-200",
    },
    {
      id: "৭",
      title: "গ্যারান্টি কার্ড",
      desc: "পণ্যের গ্যারান্টি নিশ্চিত, নির্ভাবনায় ব্যবহার করুন",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-600" />,
      color: "from-yellow-50 to-yellow-100/50 border-yellow-300",
    },
    {
      id: "৮",
      title: "চার্জার ক্যাবল",
      desc: "দ্রুত চার্জ ও ডাটা ট্রান্সফার, টেকসই ও নিরাপদ",
      icon: <Cable className="w-8 h-8 text-slate-600" />,
      color: "from-slate-100 to-slate-200/50 border-slate-300",
    },
  ];

  const scrollToCheckout = () => {
    const section = document.getElementById("order-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-0 pb-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-lg md:text-xl font-bold shadow-lg shadow-red-500/30 mb-4">
            প্যাকেজে যা যা পাচ্ছেন
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full block md:hidden relative max-w-md mx-auto"
        >
          <img
            src="/pack.png"
            alt="Package Items"
            className="w-full h-auto drop-shadow-2xl"
          />
        </motion.div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {packageItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${item.color} border p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden cursor-pointer`}
            >
              <div className="absolute top-0 right-0 bg-white/60 px-3 py-1 rounded-bl-xl font-black text-slate-800 backdrop-blur-sm">
                পণ্য {item.id}
              </div>

              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                {item.title}
              </h3>

              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div
            className="relative group cursor-pointer"
            onClick={scrollToCheckout}
          >
            <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse"></span>
            <button className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xl font-bold py-4 px-12 rounded-full transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden min-w-[280px]">
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></span>
              <ShoppingCart className="w-6 h-6 animate-bounce" />
              <span>এখনই অর্ডার করুন</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
