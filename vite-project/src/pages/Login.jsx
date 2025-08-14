import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser({ id: res.data.userId, email });
      navigate("/code");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login_conatiner">
      <div className="login">
        <h1 className="Login_header">Login</h1>
        <form onSubmit={handleLogin} className="login_form">
          <div className="login_input">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="login_input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Pass"
            />
          </div>
          <div className="login_button">
            <button className="login_button" type="submit">Login</button>
          </div>
          <div className="login_par">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            <p>OR</p>
          </div>
          <div className="login_button">
            <button className="login_button" id="google"><a href="https://www.google.com">Continue with Google</a></button>
          </div>
          <div className="login_button" id="github">
            <button className="login_button" id="github"><a href="https://www.github.com">Continue with Github</a></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
