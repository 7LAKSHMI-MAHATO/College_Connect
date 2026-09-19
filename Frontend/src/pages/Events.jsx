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
          `${import.meta.env.VITE_API_URL}/api/events`,
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
  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    </div>
  );
}
  return (
  <div className="content-page">

    <header className="content-header">
      <div>
        <p className="page-label">Student Portal</p>

        <h1>College Events</h1>

        <p className="page-description">
          Discover upcoming college events and activities.
        </p>
      </div>
    </header>

    <main className="content-container">

      {events.length === 0 ? (

        <div className="empty-state">
          <div className="empty-icon">🎉</div>

          <h3>No events available</h3>

          <p>
            There are currently no upcoming college events.
          </p>
        </div>

      ) : (

        <div className="event-list">

          {events.map((event) => (

            <div
              className="event-card"
              key={event._id}
            >

              <div className="event-icon">
                🎉
              </div>

              <div className="event-content">

                <div className="event-top">

                  <h2>
                    {event.title}
                  </h2>

                  <span className="event-date">
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </span>

                </div>

                <p className="event-description">
                  {event.description}
                </p>

                <p className="event-location">
                  📍 {event.location}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  </div>
);}

export default Events;