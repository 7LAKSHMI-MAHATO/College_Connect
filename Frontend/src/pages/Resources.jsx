import { useEffect, useState } from "react";
import axios from "axios";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/resources`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Resources response:", response.data);

        setResources(response.data.resources || response.data);
      } catch (error) {
        console.log(
          "Resources error:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="loading-spinner"></div>
        <p>Loading resources...</p>
      </div>
    </div>
  );
}

  return (
  <div className="content-page">

    <header className="content-header">
      <div>
        <p className="page-label">Student Portal</p>

        <h1>Study Resources</h1>

        <p className="page-description">
          Access useful study materials and academic resources.
        </p>
      </div>
    </header>

    <main className="content-container">

      {resources.length === 0 ? (

        <div className="empty-state">
          <div className="empty-icon">📚</div>

          <h3>No resources available</h3>

          <p>
            There are currently no study resources available.
          </p>
        </div>

      ) : (

        <div className="resource-list">

          {resources.map((resource) => (

            <div
              className="resource-card"
              key={resource._id}
            >

              <div className="resource-icon">
                📚
              </div>

              <div className="resource-content">

                <div className="resource-top">

                  <h2>
                    {resource.title}
                  </h2>

                  <span className="resource-type">
                    {resource.type}
                  </span>

                </div>

                <p className="resource-description">
                  {resource.description}
                </p>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-link"
                >
                  Open Resource →
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  </div>
);}

export default Resources;