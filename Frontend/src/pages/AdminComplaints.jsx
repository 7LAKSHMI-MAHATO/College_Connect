import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/complaints`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Admin complaints response:",
        response.data
      );

      const data =
        response.data.complaints || response.data;

      setComplaints(data);
      setFilteredComplaints(data);

    } catch (error) {
      console.log(
        "Admin complaints error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints
  useEffect(() => {
    if (filter === "all") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter(
          (complaint) => complaint.status === filter
        )
      );
    }
  }, [filter, complaints]);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/complaints/${id}/status`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Complaint status response:",
        response.data
      );

      alert("Complaint status updated successfully");

      fetchComplaints();

    } catch (error) {
      console.log(
        "Update complaint status error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update complaint status"
      );
    }
  };

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  return (
  <div className="content-page">

    <header className="content-header">

      <div>
        <p className="page-label">
          Administration
        </p>

        <h1>Manage Complaints</h1>

        <p className="page-description">
          Review student complaints and update their status.
        </p>
      </div>

      <Link
        to="/admin"
        className="btn btn-secondary"
      >
        ← Dashboard
      </Link>

    </header>


    <main className="content-container">

      {/* Filters */}

      <section className="admin-filter-card">

        <div className="section-heading">
          <div>
            <h2>Filter Complaints</h2>

            <p>
              View complaints based on their current status.
            </p>
          </div>
        </div>

        <div className="complaint-filters">

          <button
            className={
              filter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "pending"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={
              filter === "in-progress"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </button>

          <button
            className={
              filter === "resolved"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </button>

        </div>

      </section>


      {/* Complaint List */}

      <section className="admin-complaints-section">

        <div className="section-heading">
          <div>
            <h2>Student Complaints</h2>

            <p>
              {filteredComplaints.length} complaint
              {filteredComplaints.length !== 1 ? "s" : ""} found.
            </p>
          </div>
        </div>


        {filteredComplaints.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📝
            </div>

            <h3>
              No complaints found
            </h3>

            <p>
              There are no complaints matching the selected filter.
            </p>

          </div>

        ) : (

          <div className="admin-complaint-list">

            {filteredComplaints.map((complaint) => (

              <div
                className="admin-complaint-card"
                key={complaint._id}
              >

                <div className="admin-complaint-icon">
                  📝
                </div>


                <div className="admin-complaint-content">

                  <div className="admin-complaint-top">

                    <div>
                      <h3>
                        {complaint.subject}
                      </h3>

                      <p className="admin-complaint-student">
                        👤{" "}
                        {complaint.student?.name || "Unknown"}
                        {" • "}
                        {complaint.student?.email || "Unknown"}
                      </p>
                    </div>

                    <span
                      className={`status-badge status-${complaint.status}`}
                    >
                      {complaint.status}
                    </span>

                  </div>


                  <p className="admin-complaint-description">
                    {complaint.description}
                  </p>


                  <p className="admin-complaint-date">
                    Submitted:{" "}
                    {new Date(
                      complaint.createdAt
                    ).toLocaleString()}
                  </p>


                  <div className="admin-status-control">

                    <label>
                      Update Status
                    </label>

                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  </div>
);
}

export default AdminComplaints;