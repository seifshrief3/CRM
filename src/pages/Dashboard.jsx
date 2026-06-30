import React from "react";
import { useLeads } from "../Contexts/LeadsContext";
import { useCustomers } from "../Contexts/CustomersContext";
import { useTasks } from "../Contexts/TasksContext";

const Dashboard = () => {
  const { leads } = useLeads();
  const { customers } = useCustomers();
  const ongoingProjects = customers.filter(
    (customer) => customer.status === "قيد التنفيذ",
  );
  const { tasks } = useTasks();
  const cards = [
    { title: "العملاء المحتملين", value: leads.length, color: "blue" },
    { title: "العملاء الحاليين", value: customers.length, color: "green" },
    {
      title: "المشاريع الجارية",
      value: ongoingProjects.length,
      color: "yellow",
    },
    { title: "المهام ", value: tasks.length, color: "red" },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-sm text-gray-500">نظرة عامة على أداء الشركة</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">{card.title}</p>

            <h2 className="text-2xl font-bold mt-2 text-gray-800">
              {card.value}
            </h2>

            <div className={`mt-3 h-1 w-full rounded bg-${card.color}-500`} />
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">آخر العملاء المحتملين</h2>

        <div className="space-y-3">
          {leads.slice(0, 3).map((lead) => (
            <div
              key={lead.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.phone}</p>
              </div>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
