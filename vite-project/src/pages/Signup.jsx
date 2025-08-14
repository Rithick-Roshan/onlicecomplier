import axios from "axios";
import {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import '../App.css';
function Signup()
{
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [cmppassword,setCmpPassword]=useState("");
   const navigate = useNavigate();

   async function handleSignup(e) {
     e.preventDefault();
 
     if (password !== cmppassword) {
       alert("Confirm password does not match!");
       return;
     }
 
     try {
       const res = await axios.post("http://localhost:5000/signup",
         { email, password }
        );
        console.log(res);
        alert(res.data.message);
        navigate("/login");
     } catch (error) {
       alert(error.response?.data?.message || "Signup failed");
     }
   }
   console.log(email,password);
   console.log(cmppassword)
    return(
    <> 
    <div className="login_conatiner">
        <div className="login">
            <h1 className="Login_header">Signup</h1>
            <form action="" onSubmit={handleSignup}  className="login_form">
                <div className="login_input">
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email" />
                </div>
                <div class="login_input">
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div class="login_input">
                    <input type="password" value={cmppassword} onChange={(e)=>setCmpPassword(e.target.value)} placeholder="Confirm Pass" />
                </div>
                <div class="login_button">
                    <button class="login_button" >Signup</button>
                </div>
                <div class="login_par">
                <p>Already have an account? <Link to="/login">Login</Link></p>
                    <p>OR</p>
                </div>
                <div class="login_button">
                    <button class="login_button" id="google"><a href="www.google.com">Continue with Google</a></button>
                </div>
                <div class="login_button" id="github">
                    <button class="login_button" id="github" ><a href="www.google.com">Continue with Github</a></button>
                </div>
            </form>
        </div>
    </div>
 </>
    );
}

export default Signup;