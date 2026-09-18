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
        "http://localhost:3000/api/requests",
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
        `http://localhost:3000/api/requests/${id}/status`,
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
    <div>

      <Link to="/admin">
        ← Back to Dashboard
      </Link>

      <h1>Manage Requests</h1>

      <hr />

      <h2>Filter Requests</h2>

      <button onClick={() => setFilter("all")}>
        All
      </button>

      {" "}

      <button onClick={() => setFilter("pending")}>
        Pending
      </button>

      {" "}

      <button onClick={() => setFilter("approved")}>
        Approved
      </button>

      {" "}

      <button onClick={() => setFilter("rejected")}>
        Rejected
      </button>

      <hr />

      <h2>Student Requests</h2>

      {filteredRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        filteredRequests.map((request) => (
          <div key={request._id}>

            <h3>{request.subject}</h3>

            <p>
              <strong>Student:</strong>{" "}
              {request.student?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {request.student?.email}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {request.description}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(
                request.createdAt
              ).toLocaleString()}
            </p>

            <p>
              <strong>Current Status:</strong>{" "}
              {request.status}
            </p>

            <label>
              <strong>Change Status:</strong>
            </label>

            {" "}

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

            <hr />

          </div>
        ))
      )}

    </div>
  );
}

export default AdminRequests;