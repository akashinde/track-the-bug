import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    if (localStorage.getItem("user") != "") {
      navigate("/dashboard");
    }
  }, []);

  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    alert("Account Created");
    localStorage.setItem("user", form.username);
    navigate("/dashboard");
  };

  return (
    <div className="container center-container flex-vertical ">
      <div className="login-title">
        <p>Register</p>
      </div>
      <form className="form-container">
        <div className="input-container">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Id"
          />
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
        Already a user? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
