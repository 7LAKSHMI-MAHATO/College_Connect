import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import.meta.env.VITE_API_URL

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
        "${import.meta.env.VITE_API_URL}/api/resources",
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
    <div>

      <Link to="/admin">
        ← Back to Dashboard
      </Link>

      <h1>Manage Resources</h1>

      <hr />

      <h2>Create Resource</h2>

<form onSubmit={handleCreateResource}>

  <div>
    <label>Title</label>

    <br />

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

  <br />

  <div>
    <label>Description</label>

    <br />

    <textarea
      placeholder="Enter resource description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
      required
    />
  </div>

  <br />

  <div>
    <label>Type</label>

    <br />

    <select
      value={type}
      onChange={(e) =>
        setType(e.target.value)
      }
    >
      <option value="notes">Notes</option>
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

  <br />

  <div>
    <label>URL</label>

    <br />

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

  <br />

  <button type="submit">
    Create Resource
  </button>

</form>

<hr />

      <h2>All Resources</h2>

      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        resources.map((resource) => (
  <div key={resource._id}>

    {editingId === resource._id ? (

      <form onSubmit={handleUpdateResource}>

        <h3>Edit Resource</h3>

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
          <label>Type</label>

          <br />

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

        <br />

        <div>
          <label>URL</label>

          <br />

          <input
            type="url"
            value={editUrl}
            onChange={(e) =>
              setEditUrl(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          Update Resource
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
        <h3>{resource.title}</h3>

        <p>
          <strong>Description:</strong>{" "}
          {resource.description}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {resource.type}
        </p>

        <p>
          <strong>URL:</strong>{" "}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resource
          </a>
        </p>

        <button
          onClick={() =>
            handleEditClick(resource)
          }
        >
          Edit
        </button>

        {" "}

<button
  onClick={() =>
    handleDeleteResource(resource._id)
  }
>
  Delete
</button>

      </>

    )}

    <hr />

  </div>
)))}
</div>);
}


export default AdminResources;