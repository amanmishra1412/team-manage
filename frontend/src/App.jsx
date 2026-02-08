import { useState } from "react";
import Login from "./components/Login";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Employee from "./pages/Employee";

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <Login onLogin={setRole} />;
  }

  if (role === "admin") return <Admin />;
  if (role === "manager") return <Manager />;
  if (role === "employee") return <Employee />;

  return null;
}

export default App;
