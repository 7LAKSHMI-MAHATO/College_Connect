import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/events",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Events response:", response.data);

        setEvents(response.data.events || response.data);
      } catch (error) {
        console.log(
          "Events error:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>College Events</h1>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div key={event._id}>
            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>
              Date:{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>

            <p>
              Location: {event.location}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Events;