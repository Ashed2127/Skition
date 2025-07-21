 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { AuthProvider } from './context/AuthContext';
 import Navbar from './components/Navbar';
 import Login from './components/Auth/Login';
 import Register from './components/Auth/Register';
 import Dashboard from './components/Dashboard';
 import PrivateRoute from './components/PrivateRoute';
 import 'bootstrap/dist/css/bootstrap.min.css';
 
 function App() {
   return (
     <Router>
       <AuthProvider>
         <Navbar />
         <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/dashboard" element={
             <PrivateRoute>
               <Dashboard />
             </PrivateRoute>
           } />
           <Route path="/" element={
             <div className="container mt-5">
               <h1>Home Page</h1>
             </div>
           } />
         </Routes>
       </AuthProvider>
     </Router>
   );
 }
 
 export default App;
