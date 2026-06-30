import React from "react";
import { useLeads } from "../Contexts/LeadsContext";

const LeadsList = ({ lead, onEditClick }) => {
  const { handleDeleteLead } = useLeads();

  const statusColor = (status) => {
    switch (status) {
      case "جديد":
        return "bg-blue-100 text-blue-600";
      case "تم التواصل":
        return "bg-yellow-100 text-yellow-600";
      case "مهتم":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3 font-medium">{lead.name}</td>
      <td className="p-3 text-gray-600">{lead.phone}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-xs ${statusColor(lead.status)}`}
        >
          {lead.status}
        </span>
      </td>
      <td className="p-3 flex gap-2">
        <button
          onClick={() => onEditClick(lead)}
          className="text-blue-600 text-xs hover:underline"
        >
          تعديل
        </button>
        <button
          onClick={() => handleDeleteLead(lead.id)}
          className="text-red-500 text-xs hover:underline"
        >
          حذف
        </button>
      </td>
    </tr>
  );
};

export default LeadsList;
