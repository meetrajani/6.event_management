import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const url = "http://localhost:3001/posts";
  const navigate = useNavigate();

  const [Udata, setUdata] = useState({
    email: "",
    password: "",
  });

  const chang = (e) => {
    setUdata({ ...Udata, [e.target.name]: e.target.value });
  };

  const Submit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.get(url);
      const users = res.data;
      const foundUser = users.find(
        (user) => user.email === Udata.email && user.password === Udata.password
      );
  
      if (foundUser) {
        navigate("/home");
        console.log("Login successful!");
      } else {
        console.log("Incorrect email or password. Login failed!");
      }
    } catch (error) {
      console.log("Error fetching users:");
    }
  };
  

  return (
    <div className="body_login">
      <div className="container_login">
        <div className="drop">
          <div className="content">
            <h2>Sign in</h2>
            <form onSubmit={Submit}>
              <div className="inputBox">
                <input
                  type="text"
                  name="email"
                  onChange={chang}
                  placeholder="Email"
                  value={Udata.email}
                  required
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  onChange={chang}
                  placeholder="Password"
                  value={Udata.password}
                  required
                />
              </div>
              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
        <Link to={"/register"} className="btns signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;