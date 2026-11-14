"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import {
  User,
  Phone,
  MapPin,
  Lock,
  CheckSquare,
  Square,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
  const router = useRouter();

  const [includeAddon, setIncludeAddon] = useState(false);
  const [mainQty, setMainQty] = useState(1);
  const [addonQty, setAddonQty] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const basePrice = 999;
  const shipping = 130;
  const addonPrice = 149;
  const addonOriginalPrice = 200;

  const subTotal =
    basePrice * mainQty + (includeAddon ? addonPrice * addonQty : 0);
  const totalAmount = subTotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const increaseMainQty = (e) => {
    e.stopPropagation();
    setMainQty(mainQty + 1);
  };

  const decreaseMainQty = (e) => {
    e.stopPropagation();
    if (mainQty > 1) setMainQty(mainQty - 1);
  };

  const increaseAddonQty = (e) => {
    e.stopPropagation();
    setAddonQty(addonQty + 1);
  };

  const decreaseAddonQty = (e) => {
    e.stopPropagation();
    if (addonQty > 1) setAddonQty(addonQty - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async () => {
    const newErrors = {
      name: formData.name.trim() === "",
      phone: formData.phone.trim() === "",
      address: formData.address.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.address) {
      toast.error("অনুগ্রহ করে লাল মার্ক করা ফিল্ডগুলো পূরণ করুন!");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("অর্ডার প্রসেস হচ্ছে...");

    try {
      const response = await axios.post("/api/order", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        mainQty,
        addonQty,
        includeAddon,
        totalAmount,
      });

      if (response.data.success) {
        toast.success("অর্ডার সফল হয়েছে!", { id: loadingToast });
        router.push(`/thank-you?orderId=${response.data.orderId}`);
      }
    } catch (error) {
      toast.error("অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-slate-50 py-16 px-4" id="order-section">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            অর্ডার করতে নিচের ফর্মটি{" "}
            <span className="text-blue-600">পূরণ করুন</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Your Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl border-2 border-blue-500 bg-blue-50/30">
              <div className="mt-1">
                <CheckSquare className="text-blue-600" size={24} />
              </div>
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img
                  src="/main.png"
                  alt="Main Product"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/150x150/e2e8f0/1e293b?text=Main+Book")
                  }
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2">
                  Raha Intelligence Book
                </h4>

                <div className="flex items-center gap-3 bg-white w-fit rounded-lg border border-slate-200 p-1 mb-2 shadow-sm">
                  <button
                    onClick={decreaseMainQty}
                    className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded hover:bg-slate-200 transition text-slate-700"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-bold text-slate-800 text-sm">
                    {mainQty}
                  </span>
                  <button
                    onClick={increaseMainQty}
                    className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded hover:bg-slate-200 transition text-slate-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="font-extrabold text-blue-600 text-lg">
                  ৳ {basePrice * mainQty}
                </div>
              </div>
            </div>

            <div
              onClick={() => setIncludeAddon(!includeAddon)}
              className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${includeAddon ? "border-orange-500 bg-orange-50/50 shadow-md shadow-orange-100" : "border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50"}`}
            >
              <div
                className={`mt-1 transition-colors duration-300 ${includeAddon ? "text-orange-600" : "text-slate-300 group-hover:text-orange-400"}`}
              >
                {includeAddon ? (
                  <CheckSquare size={24} />
                ) : (
                  <Square size={24} />
                )}
              </div>
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img
                  src="/khata.png"
                  alt="Magic Khata"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://placehold.co/150x150/e2e8f0/1e293b?text=Magic+Khata")
                  }
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-base leading-tight mb-1">
                  বাংলা ম্যাজিক খাতা
                </h4>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                  বারবার লেখা ও মোছার সুবিধা। হাতের লেখা সুন্দর করার জন্য দারুণ
                  একটি খাতা।
                </p>

                {includeAddon && (
                  <div className="flex items-center gap-3 bg-white w-fit rounded-lg border border-slate-200 p-1 mb-2 shadow-sm">
                    <button
                      onClick={decreaseAddonQty}
                      className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded hover:bg-slate-200 transition text-slate-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800 text-sm">
                      {addonQty}
                    </span>
                    <button
                      onClick={increaseAddonQty}
                      className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded hover:bg-slate-200 transition text-slate-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="font-extrabold text-red-600 text-lg">
                    ৳ {addonPrice * addonQty}
                  </span>
                  <span className="line-through text-slate-400 text-sm font-medium">
                    ৳ {addonOriginalPrice * addonQty}
                  </span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    ৫১ টাকা ছাড়!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-8 border-t border-slate-100">
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <User className="text-blue-500" />
              বিলিংস ডিটেইলস
            </h3>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <label className="block text-slate-700 font-bold mb-2 ml-1">
                  আপনার নাম <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div
                    className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.name ? "text-red-500" : "text-slate-400 group-focus-within:text-blue-500"}`}
                  >
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 outline-none transition-all duration-300 font-medium placeholder-slate-400 ${errors.name ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"}`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-500 text-sm mt-2 ml-1 font-medium">
                      <AlertCircle size={14} /> নাম পূরণ করা আবশ্যক
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-slate-700 font-bold mb-2 ml-1">
                  মোবাইল নাম্বার <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div
                    className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.phone ? "text-red-500" : "text-slate-400 group-focus-within:text-blue-500"}`}
                  >
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="আপনার সচল মোবাইল নাম্বার দিন"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 outline-none transition-all duration-300 font-medium placeholder-slate-400 ${errors.phone ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"}`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-red-500 text-sm mt-2 ml-1 font-medium">
                      <AlertCircle size={14} /> মোবাইল নাম্বার আবশ্যক
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-slate-700 font-bold mb-2 ml-1">
                  আপনার ঠিকানা <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div
                    className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.address ? "text-red-500" : "text-slate-400 group-focus-within:text-blue-500"}`}
                  >
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="বাসা নং, রাস্তা, এলাকা, থানা, জেলা"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 outline-none transition-all duration-300 font-medium placeholder-slate-400 ${errors.address ? "border-red-500 focus:ring-red-500 bg-red-50" : "border-slate-200 focus:ring-blue-500 focus:border-transparent"}`}
                  />
                  {errors.address && (
                    <div className="flex items-center gap-1 text-red-500 text-sm mt-2 ml-1 font-medium">
                      <AlertCircle size={14} /> সঠিক ঠিকানা আবশ্যক
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-slate-100 overflow-hidden sticky top-28"
            >
              <div className="bg-slate-900 px-6 py-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" />
                  অর্ডার সামারি
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-slate-700 pb-4 border-b border-dashed border-slate-200">
                  <span className="font-bold">
                    Raha Intelligence Book (x{mainQty})
                  </span>
                  <span className="font-bold">৳ {basePrice * mainQty}</span>
                </div>

                {includeAddon && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between items-center text-orange-600 pb-4 border-b border-dashed border-slate-200 overflow-hidden"
                  >
                    <span className="font-bold text-sm pr-4">
                      বাংলা ম্যাজিক খাতা (x{addonQty})
                    </span>
                    <span className="font-bold shrink-0">
                      ৳ {addonPrice * addonQty}
                    </span>
                  </motion.div>
                )}

                <div className="flex justify-between items-center text-slate-600 pt-2">
                  <span className="font-medium">সাবটোটাল</span>
                  <span className="font-bold text-slate-800">৳ {subTotal}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600 pb-4 border-b border-slate-200">
                  <span className="font-medium">সারা বাংলাদেশ ডেলিভারি</span>
                  <span className="font-bold text-slate-800">৳ {shipping}</span>
                </div>

                <div className="pt-2 pb-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-bold text-slate-800">
                      সর্বমোট
                    </span>
                    <motion.span
                      key={totalAmount}
                      initial={{ scale: 1.2, color: "#16a34a" }}
                      animate={{ scale: 1, color: "#ef4444" }}
                      className="text-3xl font-black text-red-600"
                    >
                      ৳ {totalAmount}
                    </motion.span>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-start gap-3 border border-emerald-100 mb-6">
                  <ShieldCheck className="shrink-0 mt-0.5" size={20} />
                  <p className="text-sm font-semibold leading-snug">
                    ক্যাশ অন ডেলিভারি। প্রোডাক্ট হাতে পেয়ে টাকা পেমেন্ট করুন।
                  </p>
                </div>

                <button
                  onClick={handleOrderSubmit}
                  disabled={isSubmitting}
                  className={`relative w-full group overflow-hidden rounded-xl transition-all duration-300 ${isSubmitting ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}
                >
                  {!isSubmitting && (
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-[length:200%_100%] animate-[shine_2s_linear_infinite]" />
                  )}
                  <div
                    className={`relative flex items-center justify-center gap-3 text-white py-4 px-6 rounded-xl transition-all duration-300 font-bold text-xl shadow-lg ${isSubmitting ? "bg-slate-600 shadow-none" : "bg-red-600 hover:bg-red-700 shadow-red-500/40"}`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Lock size={20} className="animate-pulse" />
                    )}
                    <span>
                      {isSubmitting
                        ? "প্রসেস হচ্ছে..."
                        : `অর্ডার কনফার্ম করুন ৳ ${totalAmount}`}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
