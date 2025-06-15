import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/auth";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("user") !== "" && localStorage.getItem("user") !== null) {
      navigate("/dashboard");
    }
  }, []);

  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    loginUser(form).then((data) => {
      if (data.message) {
        alert(data.message);
        localStorage.setItem("user", data.user.username);
        navigate("/dashboard");
      } else {
        alert(data.error);
      }
    }).catch((error) => alert(error));
  };

  const handleDemoLogin = () => {
    setForm({ username: "demo", password: "demo" });
    localStorage.setItem("user", "demo");
    navigate("/dashboard");
  };

  return (
    <div className="container center-container flex-vertical ">
      <div className="login-title">
        <p>Welcome</p>
      </div>
      <div className="form-container">
        <div className="input-container">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="center-container flex-vertical">
          <button className="button" onClick={handleClick}>
            Sign in
          </button>
        </div>
      </div>
      <div className="register-container">
        Don't have account?
        <Link to="/register">Register</Link>
      </div>
      <div className="register-container">
        Here for demo?
        <button className="button-link" onClick={handleDemoLogin}>Login as demo</button>
      </div>
    </div>
  );
};

export default Login;
