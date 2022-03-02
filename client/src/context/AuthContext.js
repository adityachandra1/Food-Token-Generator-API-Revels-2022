import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { TOKEN_ID } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const restoreCategory = async () => {
    const token = localStorage.getItem(TOKEN_ID);
    if (token) {
      try {
        const token = localStorage.getItem(TOKEN_ID);
        const res = await axios.get(`/admin/category/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          console.log("from 30");

          setCategory(res.data.data);
          setLoading(false);
          navigate(`/admin/${res.data.data.category}`);
        }
        // } else {
        //   // CHANGE THIS
        //   alert("couldnt set category on login");
        // }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    restoreCategory();
  }, []);

  const login = async (categoryId, password) => {
    try {
      const res = await axios.post("/admin/login", {
        categoryId,
        password,
      });
      if (!res.data.success) return res.data;

      localStorage.setItem(TOKEN_ID, res.data.data.token);
      restoreCategory();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      setCategory(null);
      localStorage.removeItem(TOKEN_ID);
    } catch (err) {
      throw err;
    }
  };

  const value = {
    category,
    logout,
    login,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
