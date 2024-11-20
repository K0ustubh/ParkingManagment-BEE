import React from 'react'
import "../Styles/Login.css"

const Login = () => {
  return (
    <div>
      <form class="login">
  <h2>Welcome, User!</h2>
  <p>Please log in</p>
  <input type="text" placeholder="User Name" />
  <input type="password" placeholder="Password" />
  <input type="submit" value="Log In" />
  <div class="links">
    <a href="#">Forgot password</a>
    <a href="#">Register</a>
  </div>
</form>
    </div>
  )
}

export default Login