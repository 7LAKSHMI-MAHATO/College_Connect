import { useEffect, useState } from "react";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Complaints response:", response.data);

      setComplaints(response.data.complaints || response.data);
    } catch (error) {
      console.log(
        "Complaints error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/complaints",
        {
          subject,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Complaint submitted successfully");

      setDescription("");
      setDescription("");

      fetchComplaints();
    } catch (error) {
      console.log(
        "Submit complaint error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to submit complaint"
      );
    }
  };

  return (
    <div>
      <h1>Complaints</h1>

      <h2>Submit a Complaint</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject</label>

          <input
            type="text"
            placeholder="Enter complaint subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            placeholder="Describe your complaint"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Submit Complaint
        </button>
      </form>

      <hr />

      <h2>My Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints submitted.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id}>
            <h3>{complaint.subject}</h3>

            <p>{complaint.description}</p>

            <p>
              Status: {complaint.status}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Complaints;