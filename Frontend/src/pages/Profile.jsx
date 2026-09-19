import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Profile response:", response.data);

      const data = response.data.profile || response.data;

      setProfile(data);

      setDepartment(data.department || "");
      setSemester(data.semester || "");
      setBio(data.bio || "");
      setSkills(data.skills?.join(", ") || "");

    } catch (error) {
      console.log(
        "Profile error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          department,
          semester: Number(semester),
          bio,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "")
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Update profile response:",
        response.data
      );

      alert("Profile updated successfully");

      fetchProfile();

    } catch (error) {
      console.log(
        "Update profile error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    }
  };

  // Upload Profile Image
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("profileImage", image);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Profile image response:",
        response.data
      );

      alert("Profile image updated successfully");

      setImage(null);

      fetchProfile();

    } catch (error) {
      console.log(
        "Profile image upload error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to upload profile image"
      );
    }
  };
if (loading) {
  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    </div>
  );
}

if (!profile) {
  return (
    <div className="loading-page">
      <div className="empty-state">
        <div className="empty-icon">👤</div>
        <h3>Profile not found</h3>
        <p>Unable to load your profile information.</p>
      </div>
    </div>
  );
}

  return (
  <div className="content-page">

    <header className="content-header">
      <div>
        <p className="page-label">Student Portal</p>

        <h1>My Profile</h1>

        <p className="page-description">
          View and update your personal profile information.
        </p>
      </div>
    </header>

    <main className="content-container">

      {/* Profile Overview */}

      <section className="profile-card">

        <div className="profile-image-section">

          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              👤
            </div>
          )}

          <div>
            <h2>{profile.name || "Student"}</h2>

            <p>
              {profile.email || "No email available"}
            </p>
          </div>

        </div>

      </section>


      {/* Profile Image Upload */}

      <section className="profile-section-card">

        <div className="section-heading">
          <div>
            <h2>Profile Image</h2>

            <p>
              Upload a new profile picture.
            </p>
          </div>
        </div>

        <form onSubmit={handleImageUpload}>

          <div className="form-group">
            <label>Select Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Upload Profile Image
          </button>

        </form>

      </section>


      {/* Edit Profile */}

      <section className="profile-section-card">

        <div className="section-heading">
          <div>
            <h2>Edit Profile</h2>

            <p>
              Update your academic and personal information.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate}>

          <div className="form-group">
            <label>Department</label>

            <input
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Semester</label>

            <input
              type="number"
              placeholder="Enter semester"
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Bio</label>

            <textarea
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Skills</label>

            <input
              type="text"
              placeholder="Example: Java, React, MongoDB"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
            />

            <small className="form-hint">
              Separate multiple skills with commas.
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Profile
          </button>

        </form>

      </section>


      {/* Profile Information */}

      <section className="profile-section-card">

        <div className="section-heading">
          <div>
            <h2>Profile Information</h2>

            <p>
              Your currently saved profile details.
            </p>
          </div>
        </div>

        <div className="profile-info-list">

          <div className="profile-info-item">
            <span>Department</span>

            <strong>
              {profile.department || "Not added"}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>Semester</span>

            <strong>
              {profile.semester || "Not added"}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>Bio</span>

            <strong>
              {profile.bio || "Not added"}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>Skills</span>

            <strong>
              {profile.skills?.length
                ? profile.skills.join(", ")
                : "No skills added"}
            </strong>
          </div>

        </div>

      </section>

    </main>

  </div>
);}

export default Profile;