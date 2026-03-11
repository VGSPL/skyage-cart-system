import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (

    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2 className="logo">Skyage Admin</h2>

         <nav>
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/products">Products</a>
          <a href="/orders">Orders</a>
          <a href="/customers">Customers</a>
          <a href="/settings">Settings</a>
        </nav> 

        

        <button className="logout" onClick={logout}>
          Logout
        </button>

      </div>

      {/* Main Area */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">

          <h1>Dashboard</h1>

          <div className="profile">
           
            <h2>👤 Welcome, {user?.first_name}! </h2>
            
          </div>

        </div>

        {/* Content */}
        <div className="content">

        </div>

      </div>

    </div>

  );
}





