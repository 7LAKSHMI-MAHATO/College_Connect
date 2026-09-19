import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(
          "Admin dashboard response:",
          response.data
        );

        setDashboard(response.data);

      } catch (error) {
        console.log(
          "Admin dashboard error:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  if (!dashboard) {
    return <p>Unable to load admin dashboard.</p>;
  }

  return (
    <div>

      <h1>College Connect</h1>

      <h2>Admin Dashboard</h2>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <h3>Dashboard Statistics</h3>

      <p>Total Students: {dashboard.totalStudents}</p>

      <p>Total Notices: {dashboard.totalNotices}</p>

      <p>Total Complaints: {dashboard.totalComplaints}</p>

      <p>Pending Complaints: {dashboard.pendingComplaints}</p>

      <p>Total Events: {dashboard.totalEvents}</p>

      <p>Total Resources: {dashboard.totalResources}</p>

      <p>Total Requests: {dashboard.totalRequests}</p>

      <p>Pending Requests: {dashboard.pendingRequests}</p>

      <hr />

      <h3>Complaint Management</h3>

      <p>
        View and manage all student complaints.
      </p>

      <Link to="/admin/complaints">
        Manage Complaints
      </Link>

      <hr />

      <h3>Notice Management</h3>

      <p>
        View and manage all college notices.
      </p>

      <Link to="/admin/notices">
        Manage Notices
      </Link>

      <hr />

      <h3>Event Management</h3>

      <p>
        Create, edit and delete college events.
      </p>

      <Link to="/admin/events">
        Manage Events
      </Link>

      <hr />

<h3>Request Management</h3>

<p>
  View and manage student requests.
</p>

<Link to="/admin/requests">
  Manage Requests
</Link>

    </div>
  );
}

export default AdminDashboard;