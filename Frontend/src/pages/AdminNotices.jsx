import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/notices",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Admin notices response:",
        response.data
      );

      const data =
        response.data.notices || response.data;

      setNotices(data);

    } catch (error) {
      console.log(
        "Admin notices error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/notices",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Create notice response:",
        response.data
      );

      alert("Notice created successfully");

      setTitle("");
      setDescription("");

      fetchNotices();

    } catch (error) {
      console.log(
        "Create notice error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to create notice"
      );
    }
  };

  const handleEditClick = (notice) => {
    setEditingId(notice._id);
    setEditTitle(notice.title);
    setEditDescription(notice.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleDeleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:3000/api/notices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Delete notice response:",
        response.data
      );

      alert("Notice deleted successfully");

      fetchNotices();

    } catch (error) {
      console.log(
        "Delete notice error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete notice"
      );
    }
  };

  const handleUpdateNotice = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3000/api/notices/${editingId}`,
        {
          title: editTitle,
          description: editDescription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Update notice response:",
        response.data
      );

      alert("Notice updated successfully");

      setEditingId(null);
      setEditTitle("");
      setEditDescription("");

      fetchNotices();

    } catch (error) {
      console.log(
        "Update notice error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update notice"
      );
    }
  };

  if (loading) {
    return <p>Loading notices...</p>;
  }

  return (
    <div>

      <Link to="/admin">
        ← Back to Dashboard
      </Link>

      <h1>Manage Notices</h1>

      <hr />

      <h2>Create Notice</h2>

      <form onSubmit={handleCreateNotice}>

        <div>
          <label>Title</label>

          <br />

          <input
            type="text"
            placeholder="Enter notice title"
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
            placeholder="Enter notice description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Notice
        </button>

      </form>

      <hr />

      <h2>All Notices</h2>

      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div key={notice._id}>

            {editingId === notice._id ? (

              <form onSubmit={handleUpdateNotice}>

                <h3>Edit Notice</h3>

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

                <button type="submit">
                  Update Notice
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
                <h3>{notice.title}</h3>

                <p>
                  <strong>Description:</strong>{" "}
                  {notice.description}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(
                    notice.createdAt
                  ).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    handleEditClick(notice)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() =>
                    handleDeleteNotice(notice._id)
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

export default AdminNotices;