import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../Contexts/TasksContext";
import TasksList from "../components/TasksList";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks, setTasks, handleAddTask, handleToggleTask } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      status: "جديدة",
    },
  });

  const onSubmit = async (data) => {
    await handleAddTask(data);
    setIsOpen(false);
    reset();
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">المهام</h1>
          <p className="text-sm text-gray-500">
            إدارة جميع المهام المرتبطة بالعملاء والمشاريع
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition self-start sm:self-auto"
        >
          + إضافة مهمة
        </button>
      </div>

      {/* Tasks List */}
      <TasksList tasks={tasks} toggleTask={handleToggleTask} />

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-10">لا توجد مهام</div>
      )}

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">
                إضافة مهمة جديدة
              </h3>
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
                  عنوان المهمة
                </label>
                <input
                  type="text"
                  {...register("title", { required: "عنوان المهمة مطلوب" })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  الحالة البدئية
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
                >
                  <option value="جديدة">جديدة</option>
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                  <option value="مكتملة">مكتملة</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  حفظ
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
      )}
    </div>
  );
};

export default Tasks;
