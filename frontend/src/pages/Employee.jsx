import "./Dashboard.css";

function Employee() {
  return (
    <div className="dashboard">
      <div className="dashboard-card employee">
        <h2>Employee Dashboard</h2>
        <p>Your daily tasks & updates</p>

        <ul>
          <li>View assigned tasks</li>
          <li>Update task status</li>
          <li>Submit work</li>
        </ul>
      </div>
    </div>
  );
}

export default Employee;




