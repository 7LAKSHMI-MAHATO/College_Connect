import { useEffect, useState } from "react";
import axios from "axios";
import.meta.env.VITE_API_URL
function Requests() {
  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/requests/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Requests response:", response.data);

      setRequests(response.data.requests || response.data);
    } catch (error) {
      console.log(
        "Requests error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/requests`,
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

      alert("Request submitted successfully");

      setSubject("");
      setDescription("");

      fetchRequests();
    } catch (error) {
      console.log(
        "Submit request error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to submit request"
      );
    }
  };

  return (
    <div>
      <h1>Student Requests</h1>

      <h2>Submit a Request</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject</label>

          <input
            type="text"
            placeholder="Enter request subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            placeholder="Enter request details"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Submit Request
        </button>
      </form>

      <hr />

      <h2>My Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests submitted.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id}>
            <h3>{request.subject}</h3>

            <p>{request.description}</p>

            <p>
              Status: {request.status}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Requests;