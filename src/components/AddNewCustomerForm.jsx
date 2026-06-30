import React from "react";

const AddNewCustomerForm = ({
  setIsOpen,
  handleSubmit,
  register,
  errors,
  onSubmit,
  loading,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800">إضافة عميل جديد</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              الاسم
            </label>
            <input
              type="text"
              {...register("name", { required: "الاسم مطلوب" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              الهاتف
            </label>
            <input
              type="text"
              {...register("phone", { required: "رقم الهاتف مطلوب" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              المشروع
            </label>
            <input
              type="text"
              {...register("project", { required: "وصف المشروع مطلوب" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {errors.project && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.project.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              العنوان
            </label>
            <input
              type="text"
              {...register("address", { required: "عنوان العمل" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {errors.address && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.address.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              تاريخ البدأ في العمل
            </label>
            <input
              type="date"
              {...register("startDate", {
                required: "تاريخ البدأ في العمل",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            {errors.startDate && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            >
              <option value="نشط">نشط</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="منتهي">منتهي</option>
            </select>
          </div>
          <div className="flex gap-2 pt-2 justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              {loading ? "جاري اضافة العميل..." : "حفظ"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCustomerForm;
