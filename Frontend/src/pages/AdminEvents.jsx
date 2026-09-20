import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");

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

      console.log(
        "Admin events response:",
        response.data
      );

      const data =
        response.data.events || response.data;

      setEvents(data);

    } catch (error) {
      console.log(
        "Admin events error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          title,
          description,
          date,
          location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Create event response:",
        response.data
      );

      alert("Event created successfully");

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");

      fetchEvents();

    } catch (error) {
      console.log(
        "Create event error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to create event"
      );
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event._id);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditDate(
      new Date(event.date)
        .toISOString()
        .slice(0, 16)
    );
    setEditLocation(event.location);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDate("");
    setEditLocation("");
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${editingId}`,
        {
          title: editTitle,
          description: editDescription,
          date: editDate,
          location: editLocation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Update event response:",
        response.data
      );

      alert("Event updated successfully");

      handleCancelEdit();

      fetchEvents();

    } catch (error) {
      console.log(
        "Update event error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update event"
      );
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Delete event response:",
        response.data
      );

      alert("Event deleted successfully");

      fetchEvents();

    } catch (error) {
      console.log(
        "Delete event error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete event"
      );
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }


return (
  <div className="content-page">

    <header className="content-header">

      <div>
        <p className="page-label">
          Administration
        </p>

        <h1>Manage Events</h1>

        <p className="page-description">
          Create, update, and manage college events.
        </p>
      </div>

      <Link
        to="/admin"
        className="btn btn-secondary"
      >
        ← Dashboard
      </Link>

    </header>


    <main className="content-container">

      {/* Create Event */}

      <section className="admin-form-card">

        <div className="section-heading">

          <div>
            <h2>Create Event</h2>

            <p>
              Add a new event for students to view.
            </p>
          </div>

        </div>


        <form
          className="admin-form"
          onSubmit={handleCreateEvent}
        >

          <div className="form-group">
            <label>Event Title</label>

            <input
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />
          </div>


          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter event description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>


          <div className="admin-form-row">

            <div className="form-group">
              <label>Date and Time</label>

              <input
                type="datetime-local"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
              />
            </div>


            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                required
              />
            </div>

          </div>


          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Event
          </button>

        </form>

      </section>


      {/* All Events */}

      <section className="admin-events-section">

        <div className="section-heading">

          <div>
            <h2>All Events</h2>

            <p>
              {events.length} event
              {events.length !== 1 ? "s" : ""} available.
            </p>
          </div>

        </div>


        {events.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📅
            </div>

            <h3>
              No events found
            </h3>

            <p>
              Create an event to display it here.
            </p>

          </div>

        ) : (

          <div className="admin-event-list">

            {events.map((event) => (

              <div
                className="admin-event-card"
                key={event._id}
              >

                {editingId === event._id ? (

                  /* Edit Event */

                  <form
                    className="admin-edit-form"
                    onSubmit={handleUpdateEvent}
                  >

                    <div className="admin-edit-header">

                      <div>
                        <p className="page-label">
                          Editing Event
                        </p>

                        <h3>
                          {event.title}
                        </h3>
                      </div>

                    </div>


                    <div className="form-group">
                      <label>Event Title</label>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        required
                      />
                    </div>


                    <div className="form-group">
                      <label>Description</label>

                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        required
                      />
                    </div>


                    <div className="admin-form-row">

                      <div className="form-group">
                        <label>Date and Time</label>

                        <input
                          type="datetime-local"
                          value={editDate}
                          onChange={(e) =>
                            setEditDate(e.target.value)
                          }
                          required
                        />
                      </div>


                      <div className="form-group">
                        <label>Location</label>

                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) =>
                            setEditLocation(e.target.value)
                          }
                          required
                        />
                      </div>

                    </div>


                    <div className="admin-edit-actions">

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Update Event
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                ) : (

                  /* Event Display */

                  <>

                    <div className="admin-event-top">

                      <div className="admin-event-icon">
                        📅
                      </div>


                      <div className="admin-event-title-area">

                        <h3>
                          {event.title}
                        </h3>

                        <p>
                          📍 {event.location}
                        </p>

                      </div>

                    </div>


                    <p className="admin-event-description">
                      {event.description}
                    </p>


                    <div className="admin-event-details">

                      <div>
                        <span>📅 Date & Time</span>

                        <strong>
                          {new Date(
                            event.date
                          ).toLocaleString()}
                        </strong>
                      </div>


                      <div>
                        <span>📍 Location</span>

                        <strong>
                          {event.location}
                        </strong>
                      </div>

                    </div>


                    <div className="admin-event-actions">

                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleEditClick(event)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteEvent(event._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </>

                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  </div>
);
  
}

export default AdminEvents;