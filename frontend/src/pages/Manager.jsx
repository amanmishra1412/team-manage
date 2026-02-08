import "./Dashboard.css";

function Manager() {
  return (
    <div className="dashboard">
      <div className="dashboard-card manager">
        <h2>Manager Dashboard</h2>
        <p>Team coordination & task tracking</p>

        <ul>
          <li>Assign tasks</li>
          <li>Track employee progress</li>
          <li>Review completed work</li>
        </ul>
      </div>
    </div>
  );
}

export default Manager;

