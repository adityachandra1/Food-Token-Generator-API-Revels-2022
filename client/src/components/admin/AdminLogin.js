import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Loading from "../Loading";
const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [categoryId, setId] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!auth.loading) {
      if (auth.category) {
        navigate(`/admin/${auth.category.categoryId}`);
      }
    }
  }, [auth.loading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...", { position: "bottom-center" });

    if (categoryId === "" || password === "") {
      toast.error("All fields are required*", {
        position: "bottom-center",
        id: toastId,
      });
      return;
    }

    try {
      const res = await auth.login(categoryId, password);
      if (res.success) {
        toast.success(res.message, { position: "bottom-center", id: toastId });
        //console.log(res.data.category);
        //navigate(`/admin/sdd`);
      } else {
        toast.error(res.message, { position: "bottom-center", id: toastId });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        id: toastId,
      });
    }
  };
  if (auth.loading) {
    return <Loading />;
  }
  return (
    <div className="login-page">
      <h2>REVELS '22</h2>
      <h3 style={{ color: "white", textAlign: "center", margin: "1rem" }}>
        ADMIN LOGIN PAGE
      </h3>
      <form className="login-form">
        <div className="row">
          <div className="user-box login">
            <input
              type="text"
              name=""
              required
              value={categoryId}
              onChange={(e) => setId(e.target.value)}
            />
            <label>Category ID</label>
          </div>
        </div>
        <div className="row">
          <div className="user-box login">
            <input
              type="password"
              name=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
        </div>
        <center>
          <button className="btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </center>
      </form>
    </div>
  );
};

export default Login;
