import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';

import './reset.css';
import Landing from './components/Landing';
import Admin from './components/admin/Admin';
import { Toaster } from 'react-hot-toast';
import AuthProvider, { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SuperAdmin from './components/admin/SuperAdmin';
import axios from 'axios';
const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_baseUrl;
  // console.log = console.warn = console.error = () => {};
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            exact
            path="/admin/:category"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin/SUPERADMIN"
            element={
              <PrivateRoute>
                <SuperAdmin />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
