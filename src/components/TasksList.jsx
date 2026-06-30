import React, { useEffect } from "react";
import { useTasks } from "../Contexts/TasksContext";

const TasksList = ({ tasks, toggleTask }) => {
  const { handleDeleteTask } = useTasks();

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            {/* Title */}
            <div>
              <h1 className="text-gray-800 font-medium">{task.title}</h1>
              <p className="text-xs text-gray-500">
                {new Date(task.created_at).toLocaleString("en-US", {
                  timeZone: "Africa/Cairo",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Status */}
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === "مكتملة"
                    ? "bg-green-100 text-green-600"
                    : task.status === "قيد التنفيذ"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                }`}
              >
                {task.status}
              </span>

              {/* Button */}
              <button
                onClick={() => toggleTask(task.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                تغيير الحالة
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-xs text-red-600 hover:underline"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
