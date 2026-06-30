import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCustomers } from "../Contexts/CustomersContext";
import SelectedCustomer from "../components/SelectedCustomer";
import AddNewCustomerForm from "../components/AddNewCustomerForm";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { handleAddCustomers, customers, setCustomers, loading } =
    useCustomers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      project: "",
      address: "",
      startDate: "",
      status: "نشط",
    },
  });

  const onSubmit = async (data) => {
    await handleAddCustomers(data);
    setIsOpen(false);
    reset();
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase().trim();

    return (
      String(c.name || "")
        .toLowerCase()
        .includes(q) ||
      String(c.phone || "")
        .toString()
        .toLowerCase()
        .includes(q) ||
      String(c.project || "")
        .toLowerCase()
        .includes(q)
    );
  });

  const statusColor = (status) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-600";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-600";
      case "منتهي":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">العملاء</h1>
          <p className="text-sm text-gray-500">
            إدارة العملاء والمشاريع المنفذة
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition self-start sm:self-auto"
        >
          + إضافة عميل
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="ابحث باسم العميل أو رقم الهاتف أو المشروع..."
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
              <th className="p-3 text-right">المشروع</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{customer.name}</td>
                <td className="p-3 text-gray-600">{customer.phone}</td>
                <td className="p-3 text-gray-600">{customer.project}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${statusColor(
                      customer.status,
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="text-blue-600 text-xs hover:underline"
                >
                  عرض
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-10">لا توجد نتائج</div>
      )}

      {/* Modal Form */}
      {isOpen && (
        <AddNewCustomerForm
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          loading={loading}
          onSubmit={onSubmit}
        />
      )}
      {/* Details Modal */}
      {selectedCustomer && (
        <SelectedCustomer
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
    </div>
  );
};

export default Customers;
