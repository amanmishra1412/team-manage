import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    onLogin(role);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Team Management</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User ID" required />
          <input type="password" placeholder="Password" required />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
