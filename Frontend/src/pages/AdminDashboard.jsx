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
          `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
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

        setDashboard(response.data.stats);

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
  <div className="admin-page">

    <header className="admin-header">
      <div>
        <p className="page-label">Administration</p>

        <h1>College Connect</h1>

        <p className="page-description">
          Manage campus activities and student services.
        </p>
      </div>

      <button
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>

    <main className="admin-container">

      {/* Welcome */}

      <section className="admin-welcome">
        <div>
          <p className="welcome-label">
            Admin Panel 👋
          </p>

          <h2>Campus Management Overview</h2>

          <p>
            Monitor students, complaints, notices,
            events, resources and service requests
            from one place.
          </p>
        </div>
      </section>


      {/* Statistics */}

      <section className="admin-section">

        <div className="section-heading">
          <div>
            <h2>Dashboard Statistics</h2>

            <p>
              Current overview of campus activities.
            </p>
          </div>
        </div>

        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">👨‍🎓</div>

            <div>
              <p>Total Students</p>
              <h3>{dashboard.totalStudents}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📢</div>

            <div>
              <p>Total Notices</p>
              <h3>{dashboard.totalNotices}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📝</div>

            <div>
              <p>Total Complaints</p>
              <h3>{dashboard.totalComplaints}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">⏳</div>

            <div>
              <p>Pending Complaints</p>
              <h3>{dashboard.pendingComplaints}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">🎉</div>

            <div>
              <p>Total Events</p>
              <h3>{dashboard.totalEvents}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📚</div>

            <div>
              <p>Total Resources</p>
              <h3>{dashboard.totalResources}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📄</div>

            <div>
              <p>Total Requests</p>
              <h3>{dashboard.totalRequests}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">⏰</div>

            <div>
              <p>Pending Requests</p>
              <h3>{dashboard.pendingRequests}</h3>
            </div>
          </div>

        </div>

      </section>


      {/* Management */}

      <section className="admin-section">

        <div className="section-heading">
          <div>
            <h2>Management</h2>

            <p>
              Access and manage different campus modules.
            </p>
          </div>
        </div>

        <div className="admin-management-grid">

          <div className="admin-management-card">

            <div className="admin-management-icon">
              📝
            </div>

            <div>
              <h3>Complaints</h3>

              <p>
                View and update student complaints
                and their current status.
              </p>

              <Link
                to="/admin/complaints"
                className="dashboard-link"
              >
                Manage Complaints →
              </Link>
            </div>

          </div>


          <div className="admin-management-card">

            <div className="admin-management-icon">
              📢
            </div>

            <div>
              <h3>Notices</h3>

              <p>
                Create, update and delete college
                announcements.
              </p>

              <Link
                to="/admin/notices"
                className="dashboard-link"
              >
                Manage Notices →
              </Link>
            </div>

          </div>


          <div className="admin-management-card">

            <div className="admin-management-icon">
              🎉
            </div>

            <div>
              <h3>Events</h3>

              <p>
                Create, edit and delete college events.
              </p>

              <Link
                to="/admin/events"
                className="dashboard-link"
              >
                Manage Events →
              </Link>
            </div>

          </div>


          <div className="admin-management-card">

            <div className="admin-management-icon">
              📚
            </div>

            <div>
              <h3>Resources</h3>

              <p>
                Manage academic resources available
                to students.
              </p>

              <Link
                to="/admin/resources"
                className="dashboard-link"
              >
                Manage Resources →
              </Link>
            </div>

          </div>


          <div className="admin-management-card">

            <div className="admin-management-icon">
              📄
            </div>

            <div>
              <h3>Requests</h3>

              <p>
                View and manage student service requests.
              </p>

              <Link
                to="/admin/requests"
                className="dashboard-link"
              >
                Manage Requests →
              </Link>
            </div>

          </div>

        </div>

      </section>

    </main>

  </div>
);}

export default AdminDashboard;