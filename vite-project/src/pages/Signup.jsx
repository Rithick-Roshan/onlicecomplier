import {useState} from "react";
import axios from "axios";
function Signup(){
   const [value,setValue] = useState({
         email:"",
         password:"",
   });
//    console.log(value);
   async function sign(){
    try{
        const response = await axios.post("http://localhost:5000/login",{
            email:value.email,
            password:value.password
        });
         console.log(response);
    }
    catch(err){
        console.log(err);
    }
   }
    return(
    <> 
    <div className="login_conatiner">
        <div className="login">
            <h1 className="Login_header">Signup</h1>
            <form action='' onSubmit={(e) => { e.preventDefault(); sign(); }}  className="login_form">
                <div className="login_input">
                    <input type="email" onChange={(e)=>setValue({...value,email:e.target.value})} placeholder="Enter Your Email" />
                </div>
                <div className="login_input">
                    <input type="password" onChange={(e)=>setValue({...value,password:e.target.value})} placeholder="Password" />
                </div>
                {/* <div class="login_input">
                    <input type="password" placeholder="Confirm Pass" />
                </div> */}
                <div className="login_button">
                    <button  className="login_button" ><a>Sigup</a></button>
                </div>
                {/* <div class="login_par">
                    <p>OR</p>
                </div>
                <div class="login_button">
                    <button class="login_button" id="google"><a href="www.google.com">Continue with Google</a></button>
                </div>
                <div class="login_button" id="github">
                    <button class="login_button" id="github" ><a href="www.google.com">Continue with Github</a></button>
                </div> */}
            </form>
        </div>
    </div>
 </>
    );
}

export default Signup;