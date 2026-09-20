import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [type, setType] = useState("notes");
const [url, setUrl] = useState("");

const [editingId, setEditingId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editType, setEditType] = useState("notes");
const [editUrl, setEditUrl] = useState("");

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

      console.log(
        "Admin resources response:",
        response.data
      );

      const data =
        response.data.resources || response.data;

      setResources(data);

    } catch (error) {
      console.log(
        "Admin resources error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/resources`,
      {
        title,
        description,
        type,
        url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "Create resource response:",
      response.data
    );

    alert("Resource created successfully");

    setTitle("");
    setDescription("");
    setType("notes");
    setUrl("");

    fetchResources();

  } catch (error) {
    console.log(
      "Create resource error:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to create resource"
    );
  }
};


const handleEditClick = (resource) => {
  setEditingId(resource._id);
  setEditTitle(resource.title);
  setEditDescription(resource.description);
  setEditType(resource.type);
  setEditUrl(resource.url);
};

const handleCancelEdit = () => {
  setEditingId(null);
  setEditTitle("");
  setEditDescription("");
  setEditType("notes");
  setEditUrl("");
};

const handleUpdateResource = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/resources/${editingId}`,
      {
        title: editTitle,
        description: editDescription,
        type: editType,
        url: editUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "Update resource response:",
      response.data
    );

    alert("Resource updated successfully");

    handleCancelEdit();

    fetchResources();

  } catch (error) {
    console.log(
      "Update resource error:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to update resource"
    );
  }
};

const handleDeleteResource = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resource?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/resources/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "Delete resource response:",
      response.data
    );

    alert("Resource deleted successfully");

    fetchResources();

  } catch (error) {
    console.log(
      "Delete resource error:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to delete resource"
    );
  }
};


  useEffect(() => {
    fetchResources();
  }, []);

  if (loading) {
    return <p>Loading resources...</p>;
  }

  return (
  <div className="content-page">

    <header className="content-header">

      <div>
        <p className="page-label">
          Administration
        </p>

        <h1>Manage Resources</h1>

        <p className="page-description">
          Create, update, and manage learning resources for students.
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

      {/* Create Resource */}

      <section className="admin-form-card">

        <div className="section-heading">

          <div>
            <h2>Create Resource</h2>

            <p>
              Add study materials, notes, links, and previous-year questions.
            </p>
          </div>

        </div>


        <form
          className="admin-form"
          onSubmit={handleCreateResource}
        >

          <div className="form-group">

            <label>Resource Title</label>

            <input
              type="text"
              placeholder="Enter resource title"
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
              placeholder="Enter resource description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

          </div>


          <div className="admin-form-row">

            <div className="form-group">

              <label>Resource Type</label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
              >

                <option value="notes">
                  Notes
                </option>

                <option value="study-material">
                  Study Material
                </option>

                <option value="previous-year-question">
                  Previous Year Question
                </option>

                <option value="link">
                  Link
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>Resource URL</label>

              <input
                type="url"
                placeholder="Enter resource URL"
                value={url}
                onChange={(e) =>
                  setUrl(e.target.value)
                }
                required
              />

            </div>

          </div>


          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Resource
          </button>

        </form>

      </section>


      {/* All Resources */}

      <section className="admin-resources-section">

        <div className="section-heading">

          <div>

            <h2>All Resources</h2>

            <p>
              {resources.length} resource
              {resources.length !== 1 ? "s" : ""} available.
            </p>

          </div>

        </div>


        {resources.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📚
            </div>

            <h3>
              No resources found
            </h3>

            <p>
              Create a resource to display it here.
            </p>

          </div>

        ) : (

          <div className="admin-resource-list">

            {resources.map((resource) => (

              <div
                className="admin-resource-card"
                key={resource._id}
              >

                {editingId === resource._id ? (

                  /* Edit Resource */

                  <form
                    className="admin-edit-form"
                    onSubmit={handleUpdateResource}
                  >

                    <div className="admin-edit-header">

                      <div>

                        <p className="page-label">
                          Editing Resource
                        </p>

                        <h3>
                          {resource.title}
                        </h3>

                      </div>

                    </div>


                    <div className="form-group">

                      <label>Resource Title</label>

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

                        <label>Resource Type</label>

                        <select
                          value={editType}
                          onChange={(e) =>
                            setEditType(e.target.value)
                          }
                        >

                          <option value="notes">
                            Notes
                          </option>

                          <option value="study-material">
                            Study Material
                          </option>

                          <option value="previous-year-question">
                            Previous Year Question
                          </option>

                          <option value="link">
                            Link
                          </option>

                        </select>

                      </div>


                      <div className="form-group">

                        <label>Resource URL</label>

                        <input
                          type="url"
                          value={editUrl}
                          onChange={(e) =>
                            setEditUrl(e.target.value)
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
                        Update Resource
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

                  /* Resource Display */

                  <>

                    <div className="admin-resource-top">

                      <div className="admin-resource-icon">
                        📚
                      </div>


                      <div className="admin-resource-title-area">

                        <h3>
                          {resource.title}
                        </h3>

                        <span className="resource-type-badge">
                          {resource.type}
                        </span>

                      </div>

                    </div>


                    <p className="admin-resource-description">
                      {resource.description}
                    </p>


                    <div className="admin-resource-url">

                      <span>
                        Resource Link
                      </span>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Resource →
                      </a>

                    </div>


                    <div className="admin-resource-actions">

                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleEditClick(resource)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteResource(resource._id)
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
);}
  


export default AdminResources;