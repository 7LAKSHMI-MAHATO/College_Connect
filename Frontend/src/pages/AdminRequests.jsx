import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Admin requests response:",
        response.data
      );

      setRequests(response.data.requests);

    } catch (error) {
      console.log(
        "Admin requests error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/requests/${id}/status`,
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
        "Update request status response:",
        response.data
      );

      alert("Request status updated successfully");

      fetchRequests();

    } catch (error) {
      console.log(
        "Update request status error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update request status"
      );
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter(
          (request) => request.status === filter
        );

  if (loading) {
    return <p>Loading requests...</p>;
  }

  
 return (
  <div className="content-page">

    <header className="content-header">

      <div>
        <p className="page-label">
          Administration
        </p>

        <h1>Manage Requests</h1>

        <p className="page-description">
          Review student requests and update their status.
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
            <h2>Filter Requests</h2>

            <p>
              View requests based on their current status.
            </p>
          </div>

        </div>


        <div className="request-filters">

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
              filter === "approved"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("approved")}
          >
            Approved
          </button>


          <button
            className={
              filter === "rejected"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </button>

        </div>

      </section>


      {/* Requests */}

      <section className="admin-requests-section">

        <div className="section-heading">

          <div>
            <h2>Student Requests</h2>

            <p>
              {filteredRequests.length} request
              {filteredRequests.length !== 1 ? "s" : ""} found.
            </p>
          </div>

        </div>


        {filteredRequests.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📩
            </div>

            <h3>
              No requests found
            </h3>

            <p>
              There are no requests matching the selected filter.
            </p>

          </div>

        ) : (

          <div className="admin-request-list">

            {filteredRequests.map((request) => (

              <div
                className="admin-request-card"
                key={request._id}
              >

                <div className="admin-request-icon">
                  📩
                </div>


                <div className="admin-request-content">

                  <div className="admin-request-top">

                    <div>

                      <h3>
                        {request.subject}
                      </h3>

                      <p className="admin-request-student">
                        👤{" "}
                        {request.student?.name || "Unknown"}
                        {" • "}
                        {request.student?.email || "Unknown"}
                      </p>

                    </div>


                    <span
                      className={`status-badge status-${request.status}`}
                    >
                      {request.status}
                    </span>

                  </div>


                  <p className="admin-request-description">
                    {request.description}
                  </p>


                  <p className="admin-request-date">
                    Submitted:{" "}
                    {new Date(
                      request.createdAt
                    ).toLocaleString()}
                  </p>


                  <div className="admin-request-control">

                    <label>
                      Update Status
                    </label>

                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(
                          request._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="approved">
                        Approved
                      </option>

                      <option value="rejected">
                        Rejected
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

export default AdminRequests;