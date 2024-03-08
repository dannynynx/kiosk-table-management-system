import './LogIn.css';

const LogIn = () => {
    return (
        <>
            <body>
                <div className='container'>
                    <form className='login-form'> 
                        <h2 className='login-main-text'><b>Blue Zebra</b></h2>
                        <p className='login-main-text'>Staff Login</p>
                        <p className='input-label'>USERNAME</p>
                        <input type='text' className='login-text-inputs' id='username'></input>
                        <p className='input-label'>PASSWORD</p>
                        <input type='password' className='login-text-inputs' id='password'></input>
                        <input type='button' className='login-button' value='Login' id='login-submit'></input>
                    </form>
                </div>
            </body>
        </>
    );
};

export default LogIn;