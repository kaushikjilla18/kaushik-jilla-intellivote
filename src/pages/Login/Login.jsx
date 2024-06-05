const Login = () => {
    return (
        <form>
            <h2>Login Page</h2>
            <div>
                <label>Username</label>
            </div>
            <input placeholder="Username" type="text" />
            <div>
                <label>Password</label>
            </div>
            <input placeholder="Password" type="password" />

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login;