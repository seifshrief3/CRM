import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          تسجيل الدخول
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          نظام إدارة شركة
        </p>

        {serverError && (
          <div className="p-3 bg-red-100 text-red-600 text-sm rounded-lg mb-4 text-center font-medium">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: "البريد الإلكتروني مطلوب" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "كلمة المرور مطلوبة" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 font-medium"
          >
            {isSubmitting ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
