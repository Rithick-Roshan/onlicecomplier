

function Login(){
    return(
    <> 
    <div class="login_conatiner">
        <div class="login">
            <h1 class="Login_header">Login</h1>
            <form action="" class="login_form">
                <div class="login_input">
                    <input type="email" placeholder="Enter Your Email" />
                </div>
                <div class="login_input">
                    <input type="password" placeholder="Enter Your Pass" />
                </div>
                <div class="login_button">
                    <button class="login_button" ><a href="www.google.com">Login</a></button>
                </div>
                <div class="login_par">
                    <p>OR</p>
                </div>
                <div class="login_button">
                    <button class="login_button" ><a href="www.google.com">Continue with Google</a></button>
                </div>
                <div class="login_button">
                    <button class="login_button" ><a href="www.google.com">Continue with Github</a></button>
                </div>
            </form>
        </div>
    </div>
 </>
    );
}

export default Login;