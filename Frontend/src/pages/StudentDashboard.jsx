import { Link } from "react-router-dom";
import "../App.css";

function StudentDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard-page">

      {/* =========================
          Top Header
      ========================= */}

      <header className="dashboard-header">

        <div>
          <h1>College Connect</h1>
          <p>Student Dashboard</p>
        </div>

        <button
          className="btn btn-danger logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* =========================
          Welcome Section
      ========================= */}

      <main className="dashboard-container">

        <section className="welcome-card">

          <div>
            <p className="welcome-label">Welcome back 👋</p>

            <h2>Your Campus, Connected.</h2>

            <p>
              Access college notices, complaints, events,
              resources, requests and your profile from one place.
            </p>
          </div>

        </section>


        {/* =========================
            Dashboard Modules
        ========================= */}

        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Quick Access</h2>
              <p>Manage your college activities from here.</p>
            </div>
          </div>


          <div className="dashboard-grid">

            {/* Notices */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📢
              </div>

              <div className="dashboard-card-content">
                <h3>Notices</h3>

                <p>
                  View important college announcements
                  and notices.
                </p>

                <Link
                  to="/notices"
                  className="dashboard-link"
                >
                  View Notices →
                </Link>
              </div>

            </div>


            {/* Complaints */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📝
              </div>

              <div className="dashboard-card-content">
                <h3>Complaints</h3>

                <p>
                  Submit complaints and track their
                  current status.
                </p>

                <Link
                  to="/complaints"
                  className="dashboard-link"
                >
                  View Complaints →
                </Link>
              </div>

            </div>


            {/* Events */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                🎉
              </div>

              <div className="dashboard-card-content">
                <h3>Events</h3>

                <p>
                  Discover upcoming college events
                  and activities.
                </p>

                <Link
                  to="/events"
                  className="dashboard-link"
                >
                  View Events →
                </Link>
              </div>

            </div>


            {/* Resources */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📚
              </div>

              <div className="dashboard-card-content">
                <h3>Resources</h3>

                <p>
                  Access study materials and useful
                  academic resources.
                </p>

                <Link
                  to="/resources"
                  className="dashboard-link"
                >
                  View Resources →
                </Link>
              </div>

            </div>


            {/* Requests */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                📄
              </div>

              <div className="dashboard-card-content">
                <h3>Requests</h3>

                <p>
                  Submit and track your college
                  service requests.
                </p>

                <Link
                  to="/requests"
                  className="dashboard-link"
                >
                  View Requests →
                </Link>
              </div>

            </div>


            {/* Profile */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                👤
              </div>

              <div className="dashboard-card-content">
                <h3>Profile</h3>

                <p>
                  View and update your personal
                  profile information.
                </p>

                <Link
                  to="/profile"
                  className="dashboard-link"
                >
                  View Profile →
                </Link>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;