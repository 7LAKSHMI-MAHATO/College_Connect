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
        "${import.meta.env.VITE_API_URL}/api/profile",
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
        "${import.meta.env.VITE_API_URL}/api/profile",
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
        "${import.meta.env.VITE_API_URL}/api/profile/image",
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
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found.</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      {/* Profile Image Upload */}

      <form onSubmit={handleImageUpload}>

        <div>
          <label>Profile Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />
        </div>

        <button type="submit">
          Upload Profile Image
        </button>

      </form>

      <hr />

      {/* Edit Profile */}

      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate}>

        <div>
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

        <div>
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

        <div>
          <label>Bio</label>

          <textarea
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />
        </div>

        <div>
          <label>Skills</label>

          <input
            type="text"
            placeholder="Example: Java, React, MongoDB"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Update Profile
        </button>

      </form>

      <hr />

      {/* Profile Information */}

      <h2>Profile Information</h2>

      {profile.profileImage && (
        <div>
          <img
            src={profile.profileImage}
            alt="Profile"
            width="150"
          />
        </div>
      )}

      <p>
        <strong>Department:</strong>{" "}
        {profile.department || "Not added"}
      </p>

      <p>
        <strong>Semester:</strong>{" "}
        {profile.semester || "Not added"}
      </p>

      <p>
        <strong>Bio:</strong>{" "}
        {profile.bio || "Not added"}
      </p>

      <p>
        <strong>Skills:</strong>{" "}
        {profile.skills?.length
          ? profile.skills.join(", ")
          : "No skills added"}
      </p>

    </div>
  );
}

export default Profile;