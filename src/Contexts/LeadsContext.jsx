import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";

const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("Leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      setLeads(data);
    } catch (err) {
      console.error("Error fetching leads:", err.message);
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (formData) => {
    try {
      setLoading(true);
      const { data: resData, error } = await supabase
        .from("Leads")
        .insert([formData])
        .select();

      if (error) throw error;

      if (resData) {
        setLeads((prev) => [resData[0], ...prev]);
        return resData;
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة العميل الحركي:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = async (id, updatedData) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Leads")
        .update(updatedData)
        .eq("id", id)
        .select();

      if (error) throw error;

      if (data) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? data[0] : lead)),
        );
        return data;
      }
    } catch (error) {
      console.error("خطأ أثناء تعديل العميل:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      const { error } = await supabase.from("Leads").delete().eq("id", id);

      if (error) throw error;

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("خطاء في حذف العميل الحركي:", error.message);
    }
  };

  useEffect(() => {
    handleGetLeads();
  }, []);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        setLeads,
        handleAddLead,
        handleUpdateLead,
        loading,
        handleDeleteLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export default LeadsProvider;

export const useLeads = () => useContext(LeadsContext);
