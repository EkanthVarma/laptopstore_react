import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      alert("Please enter both email and password");
      return;
    }

    const response = await api.get("/users", {
      params: {
        email: cleanEmail,
        password: password
      }
    });

    if (response.data.length > 0) {

      localStorage.setItem(
        "user",
        JSON.stringify(response.data[0])
      );

      navigate("/");
      window.location.reload();

    } else {

      alert("Invalid Credentials");

    }
  }

  return (
<div className='auth-container'>
<div className='auth-card'>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className='submit-btn'>
        Login
      </button>

    </form>
</div>
</div>
  );
}

export default Login;