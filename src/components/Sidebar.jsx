import React from "react";
import { useAuth } from "../Contexts/Auth";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await logout();

      navigate("/");
    } catch (error) {
      console.error("حدث خطأ أثناء تسجيل الخروج:", error.message);
    }
  };

  return (
    <div
      className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4"
      dir="rtl"
    >
      <div className="space-y-4">
        <div className="text-xl font-bold border-b pb-3 mb-6">لوحة التحكم</div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:bg-gray-800 p-2 rounded">
            الرئيسية
          </Link>
          <Link to="/customers" className="hover:bg-gray-800 p-2 rounded">
            العملاء
          </Link>
          <Link to="/leads" className="hover:bg-gray-800 p-2 rounded">
            العملاء المحتملين
          </Link>
          <Link to="/tasks" className="hover:bg-gray-800 p-2 rounded">
            المهام
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogoutClick}
        className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white p-2 rounded transition text-right font-medium flex items-center justify-between"
      >
        <span>تسجيل الخروج</span>
        <span>&larr;</span>
      </button>
    </div>
  );
};

export default Sidebar;
