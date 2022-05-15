import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("user") != "") {
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
    if (form.username === "akashinde" && form.password === "asd") {
      alert("Authenticated");
      localStorage.setItem("user", form.username);
      navigate("/dashboard");
    }
  };

  return (
    <div className="container center-container flex-vertical ">
      <div className="login-title">
        <p>Welcome</p>
      </div>
      <form className="form-container">
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
          <button type="submit" className="button" onClick={handleClick}>
            Sign in
          </button>
        </div>
      </form>
      <div className="register-container">
        Don't have account?
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;
