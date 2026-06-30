import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLeads } from "../Contexts/LeadsContext";
import LeadsList from "../components/LeadsList";

const Leads = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null); // لمعرفة هل بنعدل ولا بنضيف جديد
  const [serverError, setServerError] = useState(null);

  const { handleAddLead, handleUpdateLead, handleGetLeads, leads } = useLeads();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      status: "جديد",
    },
  });

  useEffect(() => {
    if (editingLead) {
      setValue("name", editingLead.name);
      setValue("phone", editingLead.phone);
      setValue("status", editingLead.status);
    } else {
      reset({ name: "", phone: "", status: "جديد" });
    }
  }, [editingLead, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      setServerError("");
      if (editingLead) {
        // لو في حالة تعديل
        await handleUpdateLead(editingLead.id, data);
      } else {
        // لو في حالة إضافة جديد
        await handleAddLead(data);
      }
      handleCloseModal();
    } catch (error) {
      setServerError(error.message || "حدث خطأ أثناء الحفظ");
    }
  };

  const handleEditClick = (lead) => {
    setEditingLead(lead);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingLead(null);
    reset();
  };

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase().trim();

    return (
      String(lead.name || "")
        .toLowerCase()
        .includes(q) ||
      String(lead.phone || "")
        .toString()
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            العملاء المحتملين
          </h1>
          <p className="text-sm text-gray-500">
            إدارة وتتبع جميع العملاء المحتملين
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition self-start sm:self-auto"
        >
          + إضافة عميل محتمل
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">الهاتف</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <LeadsList
                key={lead.id}
                lead={lead}
                onEditClick={handleEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          لا يوجد عملاء محتملين
        </div>
      )}

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">
                {editingLead ? "تعديل بيانات العميل" : "إضافة عميل محتمل جديد"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
            </div>

            {serverError && (
              <div className="text-red-500 text-xs bg-red-50 p-2 rounded">
                {serverError}
              </div>
            )}

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
                  الحالة
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
                >
                  <option value="جديد">جديد</option>
                  <option value="تم التواصل">تم التواصل</option>
                  <option value="مهتم">مهتم</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
