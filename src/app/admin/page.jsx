"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  PhoneCall,
  MapPin,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      try {
        const res = await axios.get(`/api/orders?t=${new Date().getTime()}`);
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        toast.error("ডেটা লোড করতে সমস্যা হয়েছে!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleStatusChange = async (id, newStatus) => {
    const loadingToast = toast.loading("আপডেট হচ্ছে...");
    try {
      await axios.patch(`/api/orders/${id}`, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order,
        ),
      );

      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      toast.success("স্ট্যাটাস আপডেট হয়েছে!", { id: loadingToast });
    } catch (error) {
      toast.error("আপডেট ব্যর্থ হয়েছে!", { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("আপনি কি নিশ্চিত যে এই অর্ডারটি ডিলিট করতে চান?"))
      return;

    const loadingToast = toast.loading("ডিলিট হচ্ছে...");
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder(null);
      }
      toast.success("অর্ডারটি ডিলিট হয়েছে!", { id: loadingToast });
    } catch (error) {
      toast.error("ডিলিট ব্যর্থ হয়েছে!", { id: loadingToast });
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "Hold":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <Toaster position="top-center" />

      <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-blue-400" />
            <h1 className="text-xl font-bold tracking-wide">
              KidoraBazar Admin
            </h1>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> লগআউট
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="অর্ডার আইডি, নাম বা ফোন নম্বর খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
              <Filter size={18} />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer"
            >
              <option value="All">সব স্ট্যাটাস</option>
              <option value="Pending">Pending</option>
              <option value="Hold">Hold</option>
              <option value="Approved">Approved</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="ml-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm shrink-0">
              মোট: {filteredOrders.length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100/50 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold">অর্ডার আইডি</th>
                <th className="p-4 font-bold">কাস্টমার</th>
                <th className="p-4 font-bold">অ্যামাউন্ট</th>
                <th className="p-4 font-bold">স্ট্যাটাস আপডেট</th>
                <th className="p-4 font-bold text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-500 font-medium"
                  >
                    কোনো অর্ডার পাওয়া যায়নি!
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-blue-600 mb-1">
                        {order.orderId}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar size={12} />
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">
                        {order.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {order.phone}
                      </div>
                    </td>
                    <td className="p-4 font-extrabold text-red-600">
                      ৳ {order.totalAmount}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer outline-none ${getStatusColor(order.status || "Pending")}`}
                      >
                        <option
                          value="Pending"
                          className="bg-white text-slate-800"
                        >
                          Pending
                        </option>
                        <option
                          value="Hold"
                          className="bg-white text-slate-800"
                        >
                          Hold
                        </option>
                        <option
                          value="Approved"
                          className="bg-white text-slate-800"
                        >
                          Approved
                        </option>
                        <option
                          value="Shipped"
                          className="bg-white text-slate-800"
                        >
                          Shipped
                        </option>
                        <option
                          value="Delivered"
                          className="bg-white text-slate-800"
                        >
                          Delivered
                        </option>
                        <option
                          value="Cancelled"
                          className="bg-white text-slate-800"
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                          title="বিস্তারিত দেখুন"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                          title="ডিলিট করুন"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">
                  অর্ডার বিস্তারিত ({selectedOrder.orderId})
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                      কাস্টমারের নাম
                    </p>
                    <p className="font-bold text-slate-800 text-lg">
                      {selectedOrder.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                      মোবাইল নাম্বার
                    </p>
                    <p className="font-bold text-blue-600 text-lg flex items-center gap-2">
                      <PhoneCall size={16} /> {selectedOrder.phone}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                      সম্পূর্ণ ঠিকানা
                    </p>
                    <p className="font-medium text-slate-700 flex items-start gap-2">
                      <MapPin
                        size={18}
                        className="text-red-500 shrink-0 mt-0.5"
                      />{" "}
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">
                    অর্ডারকৃত পণ্য
                  </h4>
                  <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                    <span className="font-medium text-slate-700">
                      Raha Intelligence Book (x{selectedOrder.mainQty})
                    </span>
                  </div>
                  {selectedOrder.includeAddon && (
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200">
                      <span className="font-medium text-orange-600">
                        ম্যাজিক খাতা (x{selectedOrder.addonQty})
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 mt-2 bg-red-50 px-4 rounded-xl border border-red-100">
                    <span className="font-bold text-red-800 text-lg">
                      সর্বমোট বিল
                    </span>
                    <span className="font-black text-red-600 text-2xl">
                      ৳ {selectedOrder.totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-4 mt-4 border-t border-slate-200">
                    <span className="font-bold text-slate-700">
                      অর্ডার স্ট্যাটাস:
                    </span>
                    <select
                      value={selectedOrder.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(selectedOrder._id, e.target.value)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider border cursor-pointer outline-none ${getStatusColor(selectedOrder.status || "Pending")}`}
                    >
                      <option
                        value="Pending"
                        className="bg-white text-slate-800"
                      >
                        Pending
                      </option>
                      <option value="Hold" className="bg-white text-slate-800">
                        Hold
                      </option>
                      <option
                        value="Approved"
                        className="bg-white text-slate-800"
                      >
                        Approved
                      </option>
                      <option
                        value="Shipped"
                        className="bg-white text-slate-800"
                      >
                        Shipped
                      </option>
                      <option
                        value="Delivered"
                        className="bg-white text-slate-800"
                      >
                        Delivered
                      </option>
                      <option
                        value="Cancelled"
                        className="bg-white text-slate-800"
                      >
                        Cancelled
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
