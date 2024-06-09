import './SignUp.scss';


const SignUp = () => {
  return (
    <form className="signUp">
      <h2 className="signUp__title">Sign Up page</h2>
      <div className="signUp__field">
        <label className="signUp__label">Username</label>
        <input className="signUp__input" placeholder="Username" type="text" />
      </div>
      <div className="signUp__field">
        <label className="signUp__label">Name</label>
        <input className="signUp__input" placeholder="Name" type="text" />
      </div>
      <div className="signUp__field">
        <label className="signUp__label">Create a Password</label>
        <input className="signUp__input" placeholder="Password" type="password" />
      </div>
      <div className="signUp__field">
        <label className="signUp__label">Re-type Password</label>
        <input className="signUp__input" placeholder="Password" type="password" />
      </div>
      <div className="signUp__button-group">
        <button className="signUp__button">Sign up</button>
      </div>
    </form>
  )
}

export default SignUp;
