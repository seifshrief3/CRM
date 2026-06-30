import React from "react";

const SelectedCustomer = ({ selectedCustomer, setSelectedCustomer }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800">تفاصيل العميل</h3>

          <button
            onClick={() => setSelectedCustomer(null)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">الاسم</span>
            <span className="font-medium">{selectedCustomer.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">الهاتف</span>
            <span>{selectedCustomer.phone}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">المشروع</span>
            <span>{selectedCustomer.project}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">العنوان</span>
            <span>{selectedCustomer.address}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">تاريخ البداية</span>
            <span>{selectedCustomer.startDate}</span>
          </div>

          <div className="flex justify-between pb-2">
            <span className="text-gray-500">الحالة</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                selectedCustomer.status === "نشط"
                  ? "bg-green-100 text-green-600"
                  : selectedCustomer.status === "قيد التنفيذ"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedCustomer.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex justify-end">
          <button
            onClick={() => setSelectedCustomer(null)}
            className="bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCustomer;
