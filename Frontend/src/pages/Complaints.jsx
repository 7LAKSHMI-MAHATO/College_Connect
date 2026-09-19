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
        `${import.meta.env.VITE_API_URL}/api/complaints/my`,
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
        `${import.meta.env.VITE_API_URL}/api/complaints`,
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

      setSubject("");
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
  <div className="content-page">

    <header className="content-header">
      <div>
        <p className="page-label">Student Portal</p>

        <h1>Complaints</h1>

        <p className="page-description">
          Submit a complaint and track its current status.
        </p>
      </div>
    </header>

    <main className="content-container">

      <section className="complaint-form-card">

        <div className="section-heading">
          <div>
            <h2>Submit a Complaint</h2>
            <p>
              Tell us about an issue you are facing on campus.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              placeholder="Enter complaint subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
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

          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit Complaint
          </button>

        </form>

      </section>

      <section className="complaints-section">

        <div className="section-heading">
          <div>
            <h2>My Complaints</h2>
            <p>View the complaints you have submitted.</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <p>Loading complaints...</p>
          </div>

        ) : complaints.length === 0 ? (

          <div className="empty-state">
            <div className="empty-icon">📝</div>

            <h3>No complaints submitted</h3>

            <p>
              You have not submitted any complaints yet.
            </p>
          </div>

        ) : (

          <div className="complaint-list">

            {complaints.map((complaint) => (

              <div
                className="complaint-card"
                key={complaint._id}
              >

                <div className="complaint-icon">
                  📝
                </div>

                <div className="complaint-content">

                  <div className="complaint-top">

                    <h3>
                      {complaint.subject}
                    </h3>

                    <span
                      className={`status-badge status-${complaint.status?.toLowerCase()}`}
                    >
                      {complaint.status}
                    </span>

                  </div>

                  <p>
                    {complaint.description}
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

export default Complaints;