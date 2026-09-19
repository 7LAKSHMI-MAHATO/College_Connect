import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import.meta.env.VITE_API_URL

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
        "${import.meta.env.VITE_API_URL}/api/events",
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
    <div>

      <Link to="/admin">
        ← Back to Dashboard
      </Link>

      <h1>Manage Events</h1>

      <hr />

      <h2>Create Event</h2>

      <form onSubmit={handleCreateEvent}>

        <div>
          <label>Title</label>

          <br />

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

        <br />

        <div>
          <label>Description</label>

          <br />

          <textarea
            placeholder="Enter event description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Date</label>

          <br />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Location</label>

          <br />

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

        <br />

        <button type="submit">
          Create Event
        </button>

      </form>

      <hr />

      <h2>All Events</h2>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id}>

            {editingId === event._id ? (

              <form onSubmit={handleUpdateEvent}>

                <h3>Edit Event</h3>

                <div>
                  <label>Title</label>

                  <br />

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Description</label>

                  <br />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Date</label>

                  <br />

                  <input
                    type="datetime-local"
                    value={editDate}
                    onChange={(e) =>
                      setEditDate(e.target.value)
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Location</label>

                  <br />

                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) =>
                      setEditLocation(e.target.value)
                    }
                    required
                  />
                </div>

                <br />

                <button type="submit">
                  Update Event
                </button>

                {" "}

                <button
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>

              </form>

            ) : (

              <>
                <h3>{event.title}</h3>

                <p>
                  <strong>Description:</strong>{" "}
                  {event.description}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    event.date
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {event.location}
                </p>

                <button
                  onClick={() =>
                    handleEditClick(event)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() =>
                    handleDeleteEvent(event._id)
                  }
                >
                  Delete
                </button>
              </>

            )}

            <hr />

          </div>
        ))
      )}

    </div>
  );
}

export default AdminEvents;