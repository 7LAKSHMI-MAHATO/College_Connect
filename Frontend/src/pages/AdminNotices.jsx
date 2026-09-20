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
        `${import.meta.env.VITE_API_URL}/api/notices`,
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
        `${import.meta.env.VITE_API_URL}/api/notices`,
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
        `${import.meta.env.VITE_API_URL}/api/notices/${id}`,
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
        `${import.meta.env.VITE_API_URL}/api/notices/${editingId}`,
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
  <div className="content-page">

    <header className="content-header">

      <div>
        <p className="page-label">
          Administration
        </p>

        <h1>Manage Notices</h1>

        <p className="page-description">
          Create, update, and manage important college notices.
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

      {/* Create Notice */}

      <section className="admin-form-card">

        <div className="section-heading">

          <div>
            <h2>Create Notice</h2>

            <p>
              Publish an important announcement for students.
            </p>
          </div>

        </div>


        <form
          className="admin-form"
          onSubmit={handleCreateNotice}
        >

          <div className="form-group">

            <label>Notice Title</label>

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


          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Enter notice description"
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
            Create Notice
          </button>

        </form>

      </section>


      {/* All Notices */}

      <section className="admin-notices-section">

        <div className="section-heading">

          <div>
            <h2>All Notices</h2>

            <p>
              {notices.length} notice
              {notices.length !== 1 ? "s" : ""} available.
            </p>
          </div>

        </div>


        {notices.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📢
            </div>

            <h3>
              No notices found
            </h3>

            <p>
              Create a notice to display it here.
            </p>

          </div>

        ) : (

          <div className="admin-notice-list">

            {notices.map((notice) => (

              <div
                className="admin-notice-card"
                key={notice._id}
              >

                {editingId === notice._id ? (

                  /* Edit Notice */

                  <form
                    className="admin-edit-form"
                    onSubmit={handleUpdateNotice}
                  >

                    <div className="admin-edit-header">

                      <div>
                        <p className="page-label">
                          Editing Notice
                        </p>

                        <h3>
                          {notice.title}
                        </h3>
                      </div>

                    </div>


                    <div className="form-group">

                      <label>Notice Title</label>

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


                    <div className="admin-edit-actions">

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Update Notice
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

                  /* Notice Display */

                  <>

                    <div className="admin-notice-top">

                      <div className="admin-notice-icon">
                        📢
                      </div>


                      <div className="admin-notice-title-area">

                        <h3>
                          {notice.title}
                        </h3>

                        <p>
                          Published notice
                        </p>

                      </div>

                    </div>


                    <p className="admin-notice-description">
                      {notice.description}
                    </p>


                    <p className="admin-notice-date">
                      Created:{" "}
                      {new Date(
                        notice.createdAt
                      ).toLocaleString()}
                    </p>


                    <div className="admin-notice-actions">

                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleEditClick(notice)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteNotice(notice._id)
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

export default AdminNotices;