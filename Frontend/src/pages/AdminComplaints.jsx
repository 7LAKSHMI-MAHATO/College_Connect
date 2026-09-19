import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import.meta.env.VITE_API_URL

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
    <div>

      <Link to="/admin">
        ← Back to Dashboard
      </Link>

      <h1>Manage Complaints</h1>

      {/* Status Filters */}

      <div>

        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("in-progress")}>
          In Progress
        </button>

        <button onClick={() => setFilter("resolved")}>
          Resolved
        </button>

      </div>

      <hr />

      {/* Complaints */}

      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        filteredComplaints.map((complaint) => (
          <div key={complaint._id}>

            <h2>{complaint.subject}</h2>

            <p>
              <strong>Student:</strong>{" "}
              {complaint.student?.name || "Unknown"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {complaint.student?.email || "Unknown"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {complaint.description}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(
                complaint.createdAt
              ).toLocaleString()}
            </p>

            <p>
              <strong>Current Status:</strong>{" "}
              {complaint.status}
            </p>

            <label>
              <strong>Update Status:</strong>{" "}
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

            <hr />

          </div>
        ))
      )}

    </div>
  );
}

export default AdminComplaints;