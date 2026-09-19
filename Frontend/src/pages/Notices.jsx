import { useEffect, useState } from "react";
import axios from "axios";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notices`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Notices response:", response.data);

        setNotices(response.data.notices || response.data);
      } catch (error) {
        console.log(
          "Notices error:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p>Loading notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">

      <header className="content-header">
        <div>
          <p className="page-label">Student Portal</p>

          <h1>College Notices</h1>

          <p className="page-description">
            Stay updated with important college announcements.
          </p>
        </div>
      </header>

      <main className="content-container">

        {notices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📢</div>
            <h3>No notices available</h3>
            <p>
              There are currently no college notices to display.
            </p>
          </div>
        ) : (
          <div className="notice-list">

            {notices.map((notice) => (
              <div
                className="notice-card"
                key={notice._id}
              >

                <div className="notice-icon">
                  📢
                </div>

                <div className="notice-content">

                  <div className="notice-top">

                    <h2>
                      {notice.title}
                    </h2>

                    <span className="notice-date">
                      {new Date(
                        notice.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <p>
                    {notice.description}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Notices;