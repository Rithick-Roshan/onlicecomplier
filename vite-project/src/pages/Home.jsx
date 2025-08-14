import './Home.css';
import {Link} from "react-router-dom"

function Home(){
return(
    <>
        <div className="home_container " >
            <div className="home_headder">
                <h2>Code Compiler</h2>
                <div className="home_buttons">
                    <button className="home_login_button">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="home_login button">
                    <Link to="/signup">Signup</Link>
                    </button>
                    <button className="home_login button">
                    <Link to="/profile">profile</Link>
                    </button>
                </div>
            </div>
            <div className="home_about">
                <h1>Online Code Compiler</h1>
                <p>Code,Compile,and Run in Your Browser</p>
                <button> <Link to="/code">Start Coding</Link></button>
            </div>

            <div className="home_boxes">
                <div className="b1"><p>Multiple Languages</p></div>
                <div className="b1"><p>Real-time Compilation</p></div>
                <div className="b1"><p>Code Sharing</p></div>
            </div>
            <div className="home_con">
                <p>Popular languages</p>
            </div>
        </div>
    </>
)
}

export default Home;