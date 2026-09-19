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
          "${import.meta.env.VITE_API_URL}/api/notices",
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
    return <p>Loading notices...</p>;
  }

  return (
    <div>
      <h1>College Notices</h1>

      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        notices.map((notice) => (
          <div key={notice._id}>
            <h2>{notice.title}</h2>

            <p>{notice.description}</p>

            <p>
              Date:{" "}
              {new Date(notice.createdAt).toLocaleDateString()}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Notices;