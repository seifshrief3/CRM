import { createContext, useContext, useState } from "react";
import { supabase } from "../../supabase";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ADD TASK
  const handleAddTask = async (formData) => {
    try {
      setLoading(true);
      const { data: resData, error } = await supabase
        .from("Tasks")
        .insert([formData])
        .select();

      if (error) throw error;
      if (resData) {
        setTasks((prev) => [resData[0], ...prev]);
        return resData;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // GET TASKS
  const handleGetTasks = async () => {
    try {
      const { data, error } = await supabase.from("Tasks").select("*");
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // TOGGLE TASK
  const handleToggleTask = async (id) => {
    try {
      const { data, error } = await supabase
        .from("Tasks")
        .update({ status: "مكتملة" })
        .eq("id", id);
      if (error) throw error;
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: "مكتملة" } : task,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      const { data, error } = await supabase
        .from("Tasks")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useState(() => {
    handleGetTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        handleAddTask,
        tasks,
        loading,
        error,
        setTasks,
        setLoading,
        setError,
        handleToggleTask,
        handleDeleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

export const useTasks = () => useContext(TasksContext);
