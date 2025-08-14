import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CodeEditor from "./pages/CodeEditor";
import UserProfile from "./pages/UserProfile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/code' element={user ? <CodeEditor /> : <Navigate to='/login' />} />
        <Route 
              path='/profile' 
              element={user ? <UserProfile setUser={setUser} /> : <Navigate to='/login' />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
