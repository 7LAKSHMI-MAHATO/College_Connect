function Register() {
  return (
    <div>
      <h1>College Connect</h1>

      <h2>Register</h2>

      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />
        </div>

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;