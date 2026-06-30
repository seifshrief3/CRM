import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";

const CustomersContext = createContext();

const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ADD CUSTOMER
  const handleAddCustomers = async (formData) => {
    try {
      setLoading(true);
      const { data: resData, error } = await supabase
        .from("Customers")
        .insert([formData])
        .select();
      if (error) throw error;
      if (resData) {
        setCustomers((prev) => [resData[0], ...prev]);
        return resData;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GET CUSTOMERS
  const handleGetCustomers = async () => {
    try {
      const { data, error } = await supabase.from("Customers").select("*");
      if (error) throw error;
      setCustomers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    handleGetCustomers();
  }, []);
  return (
    <CustomersContext.Provider
      value={{
        handleAddCustomers,
        customers,
        handleGetCustomers,
        setCustomers,
        loading,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;

export const useCustomers = () => useContext(CustomersContext);
