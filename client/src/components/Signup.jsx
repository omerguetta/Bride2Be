import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    coupleType: "BrideAndGroom", // ברירת מחדל
    role: "Bride", // ברירת מחדל
    fullName: "",
    email: "",
    phone: "",
    username: "",
    weddingDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while registering. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="login-register">
      <form className="form" onSubmit={handleRegister}>
        <h1>Register</h1>
        {/* בחירה של סוג הזוג */}
        <div className="couple-type">
          <button
            type="button"
            className={`couple-button ${
              formData.coupleType === "BrideAndGroom" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, coupleType: "BrideAndGroom" })}
          >
            👰🤵
          </button>
          <button
            type="button"
            className={`couple-button ${
              formData.coupleType === "BrideAndBride" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, coupleType: "BrideAndBride" })}
          >
            👰👰
          </button>
          <button
            type="button"
            className={`couple-button ${
              formData.coupleType === "GroomAndGroom" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, coupleType: "GroomAndGroom" })}
          >
            🤵🤵
          </button>
        </div>

        {/* שם מלא */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        {/* בחירת תפקיד */}
        <div className="role-container">
  <h2>I'm the:</h2>
  <div className="role-selection">
    <input
      type="radio"
      id="bride"
      name="role"
      value="Bride"
      checked={formData.role === "Bride"}
      onChange={handleChange}
    />
    <label htmlFor="bride" className="role-label">
      <div className="icon bride-icon">👰</div>
      Bride
    </label>

    <input
      type="radio"
      id="groom"
      name="role"
      value="Groom"
      checked={formData.role === "Groom"}
      onChange={handleChange}
    />
    <label htmlFor="groom" className="role-label">
      <div className="icon groom-icon">🤵</div>
      Groom
    </label>

    <input
      type="radio"
      id="other"
      name="role"
      value="Other"
      checked={formData.role === "Other"}
      onChange={handleChange}
    />
    <label htmlFor="other" className="role-label">
      <div className="icon other-icon">👤</div>
      Other
    </label>
  </div>
</div>

        {/* אימייל, טלפון, שם משתמש ותאריך */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="weddingDate"
          placeholder="Wedding Date"
          value={formData.weddingDate}
          onChange={handleChange}
          required
        />

        {/* כפתור הרשמה */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
