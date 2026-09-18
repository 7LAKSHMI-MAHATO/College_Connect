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
          "http://localhost:3000/api/resources",
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
    return <p>Loading resources...</p>;
  }

  return (
    <div>
      <h1>Study Resources</h1>

      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        resources.map((resource) => (
          <div key={resource._id}>
            <h2>{resource.title}</h2>

            <p>{resource.description}</p>

            <p>
              Type: {resource.type}
            </p>

            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
            >
              Open Resource
            </a>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Resources;