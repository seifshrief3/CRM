import { useAuth } from "../Contexts/Auth";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm">
      {/* Left: menu button (mobile) */}
      <button className="md:hidden text-2xl" onClick={onMenuClick}>
        ☰
      </button>

      {/* Title */}
      <h1 className="font-semibold text-gray-800">لوحة التحكم</h1>

      {/* User */}
      <div className="text-sm text-gray-600 hidden sm:block">
        {user?.email || "مستخدم"}
      </div>
    </div>
  );
}
