import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const url = "http://localhost:3001/posts";

  const [Udata, setUdata] = useState([]);

  const chang = (e) => {
    setUdata({ ...Udata, [e.target.name]: e.target.value });
  };

  const Submit = () => {
    axios.post(url).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className='body_login'>
      <div className="container_login">
        <div className="drop">
          <div className="content">
            <h2>Singn up</h2>
            <form>
              <div className="inputBox">
                <input type="text" name="username" onChange={chang} placeholder="Username" required />
              </div>
              <div className="inputBox">
                <input type="Email" name="email" onChange={chang} placeholder="Email" required />
              </div>
              <div className="inputBox">
                <input type="password" name="password" onChange={chang} placeholder="Password" required />
              </div>
              <div className="inputBox">
                <input type="submit" onClick={Submit} defaultValue="Login" />
              </div>
            </form>
          </div>
        </div>
        <Link to="/" className="btns signup">
          Signup
        </Link>
      </div>
    </div>
  )
}

export default Register
