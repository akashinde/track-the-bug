import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../service/auth";

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
    console.log(form);
    createUser(form).then((data) => {
      if (data.message) {
        alert(data.message);
        localStorage.setItem("user", form.username);
        navigate("/dashboard");
      } else {
        alert(data.error);
      }
    }).catch((error) => alert(error));
  };

  return (
    <div className="container center-container flex-vertical ">
      <div className="login-title">
        <p>Register</p>
      </div>
      <div className="form-container">
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
          <button className="button" onClick={handleClick}>
            Register
          </button>
        </div>
      </div>

      <div className="register-container">
        Already a user? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
