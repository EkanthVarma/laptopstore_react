import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  function isValidEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=]).{8,}$/;
    return passwordRegex.test(password);
  }

  // Levenshtein distance — counts how many edits apart two strings are
  function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  function checkDomainTypo(email) {
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "protonmail.com"
    ];

    const domain = email.split("@")[1];

    if (!domain) return null;

    for (const known of commonDomains) {

      if (domain === known) {
        return null;
      }

      const distance = levenshtein(domain, known);

      if (distance > 0 && distance <= 2) {
        return known;
      }
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const name = user.name.trim();
    const email = user.email.trim().toLowerCase();
    const password = user.password;

    if (name.length < 2) {
      alert("Name must be at least 2 characters");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const suggestedDomain = checkDomainTypo(email);

    if (suggestedDomain) {
      const localPart = email.split("@")[0];

      const proceed = window.confirm(
        `Did you mean ${localPart}@${suggestedDomain}? Click OK to use it, or Cancel to keep what you typed.`
      );

      if (proceed) {
        user.email = `${localPart}@${suggestedDomain}`;
      }
    }

    if (!isValidPassword(password)) {
      alert(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const finalEmail = suggestedDomain
      ? user.email
      : email;

    const existing = await api.get(
      `/users?email=${finalEmail}`
    );

    if (existing.data.length > 0) {
      alert("Email already registered");
      return;
    }

    await api.post("/users", {
      name,
      email: finalEmail,
      password
    });

    navigate("/login");
  }

  return (
<div className='auth-container'>
<div className='auth-card'>

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        minLength={2}
        value={user.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={user.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength={8}
        value={user.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
        minLength={8}
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
      />

      <p className="password-hint">
        Password must have 8+ characters, uppercase, lowercase, number & special character
      </p>

      <button className='submit-btn' >
        Register
      </button>

    </form>
</div></div>
  );
}

export default Register;