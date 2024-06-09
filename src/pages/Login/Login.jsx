import './Login.scss';

const Login = () => {
    return (
        <form className="login">
            <h2 className="login__title">Login Page</h2>
            <div className="login__input-group">
                <label className="login__label">Username</label>
                <input className="login__input" placeholder="Username" type="text" />
            </div>
            <div className="login__input-group">
                <label className="login__label">Password</label>
                <input className="login__input" placeholder="Password" type="password" />
            </div>
            <div className="login__button-group">
                <button className="login__button">Login</button>
            </div>
        </form>
    );
}

export default Login;
