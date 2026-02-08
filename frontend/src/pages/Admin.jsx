import "./Dashboard.css";

function Admin() {
  return (
    <div className="dashboard">
      <div className="dashboard-card admin">
        <h2>Admin Dashboard</h2>
        <p>System administration & control</p>

        <ul>
          <li>Add / Remove Managers</li>
          <li>Add / Remove Employees</li>
          <li>View all teams</li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;

