import './Home.css';

function Home(){
return(
    <>
        <div className="home_container " >
            <div className="home_headder">
                <h2>Code Compiler</h2>
                <div className="home_buttons">
                    <button className="home_login_button">
                        Login
                    </button>
                    <button className="home_login button">
                        Singup
                    </button>
                </div>
            </div>
            <div className="home_about">
                <h1>Online Code Compiler</h1>
                <p>Code,Compile,and Run in Your Browser</p>
                <button>Start Coding</button>
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