const SignUp = () => {

  return (
    <form>
      <h2>Sign Up page</h2>
      <div>
        <label>Username</label>
      </div>
      <input placeholder="Username" type="text" />
      <div>
        <label>Name</label>
      </div>
      <input placeholder="Name" type="text" />
      <div>
        <label>Create a Password</label>
      </div>
      <input placeholder="Password" type="password" />
      <div>
        <label>Re-type Password</label>
      </div>
      <input placeholder="Password" type="password" />

      <div>
        <button>Signup</button>
      </div>
    </form>
  )
}

export default SignUp;