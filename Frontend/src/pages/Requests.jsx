import { useEffect, useState } from "react";
import axios from "axios";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/requests/my`,
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

if (loading) {
  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="loading-spinner"></div>
        <p>Loading requests...</p>
      </div>
    </div>
  );
}


  return (
  <div className="content-page">

    <header className="content-header">
      <div>
        <p className="page-label">Student Portal</p>

        <h1>Student Requests</h1>

        <p className="page-description">
          Submit and track your college service requests.
        </p>
      </div>
    </header>

    <main className="content-container">

      <section className="request-form-card">

        <div className="section-heading">
          <div>
            <h2>Submit a Request</h2>

            <p>
              Submit a request for a college service or support.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              placeholder="Enter request subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
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

          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit Request
          </button>

        </form>

      </section>

      <section className="requests-section">

        <div className="section-heading">
          <div>
            <h2>My Requests</h2>

            <p>
              View the requests you have submitted.
            </p>
          </div>
        </div>

        {requests.length === 0 ? (

          <div className="empty-state">
            <div className="empty-icon">📄</div>

            <h3>No requests submitted</h3>

            <p>
              You have not submitted any requests yet.
            </p>
          </div>

        ) : (

          <div className="request-list">

            {requests.map((request) => (

              <div
                className="request-card"
                key={request._id}
              >

                <div className="request-icon">
                  📄
                </div>

                <div className="request-content">

                  <div className="request-top">

                    <h3>
                      {request.subject}
                    </h3>

                    <span
                      className={`status-badge status-${request.status?.toLowerCase()}`}
                    >
                      {request.status}
                    </span>

                  </div>

                  <p>
                    {request.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  </div>
);}
export default Requests;