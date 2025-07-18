 import React from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 import 'bootstrap/dist/css/bootstrap.min.css';
 
 // Components
 import Login from './components/Login';
 import Register from './components/Register';
 import Dashboard from './components/Dashboard';
 import Navbar from './components/Navbar';
 
 function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
 
   // Check auth status on app load
   useEffect(() => {
     const checkAuth = async () => {
       try {
         const token = localStorage.getItem('token');
         if (token) {
           // Verify token with backend
           await axios.get('/api/auth/verify', {
             headers: { Authorization: `Bearer ${token}` }
           });
           setIsAuthenticated(true);
         }
       } catch (error) {
         console.error('Auth check failed', error);
         localStorage.removeItem('token');
       } finally {
         setLoading(false);
       }
     };
 
     checkAuth();
   }, []);
 
   const handleLogin = (token) => {
     localStorage.setItem('token', token);
     setIsAuthenticated(true);
   };
 
   const handleLogout = () => {
     localStorage.removeItem('token');
     setIsAuthenticated(false);
   };
 
   if (loading) {
     return <div className="text-center mt-5">Loading...</div>;
   }
 
   return (
     <Router>
       <div className="App">
         <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
         
         <div className="container mt-4">
           <Routes>
             <Route 
               path="/login" 
               element={
                 !isAuthenticated ? (
                   <Login onLogin={handleLogin} />
                 ) : (
                   <Navigate to="/dashboard" />
                 )
               } 
             />
             <Route 
               path="/register" 
               element={
                 !isAuthenticated ? (
                   <Register />
                 ) : (
                   <Navigate to="/dashboard" />
                 )
               } 
             />
             <Route 
               path="/dashboard" 
               element={
                 isAuthenticated ? (
                   <Dashboard />
                 ) : (
                   <Navigate to="/login" />
                 )
               } 
             />
             <Route 
               path="/" 
               element={
                 isAuthenticated ? (
                   <Navigate to="/dashboard" />
                 ) : (
                   <Navigate to="/login" />
                 )
               } 
             />
           </Routes>
         </div>
       </div>
     </Router>
   );
 }
 
 export default App;
