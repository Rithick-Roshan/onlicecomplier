import {useState} from "react";

function Signup(){
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");

    return(
    <> 
    <div className="login_conatiner">
        <div className="login">
            <h1 className="Login_header">Signup</h1>
            <form action="" className="login_form">
                <div className="login_input">
                    <input type="email" placeholder="Enter Your Email" />
                </div>
                <div class="login_input">
                    <input type="password" placeholder="Enter Your Pass" />
                </div>
                <div class="login_button">
                    <button class="login_button" ><a href="www.google.com">Sigup</a></button>
                </div>
                <div class="login_par">
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