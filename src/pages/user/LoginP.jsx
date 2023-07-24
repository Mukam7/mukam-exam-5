



import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Cookies from "js-cookie";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import { request } from "../../server/request";
import { Spin } from "antd";


const LoginP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let {
        data: { token, expire, role },
      } = await request.post("auth/login", user);
      setIsAuthenticated(true);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      Cookies.set(EXPIRE_DATE, expire);
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="RegisterFlex">
        <section className="loginpage">
          <h1>Login</h1>
          {loading ? (
            <Spin size="large" 
              style={{
                fontSize: "50px",
                color: "blue",
                fontWeight: "bold",
              }}
            />
          ) : (
            <form onSubmit={submit}>
              <input
                type="text"
                onChange={handleChange}
                value={user.username}
                placeholder="Username"
                name="username"
              />
           
   
              <input
                type="text"
                onChange={handleChange}
                value={user.password}
                placeholder="Password"
                name="password"
              />
             
              <button className="button" type="submit">
                Login
              </button>
            </form>
          )}
        </section>
      </div>
    </section>
  );
};

export default LoginP;
