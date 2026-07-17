import { useEffect, useState } from "react";
import { api } from "../api/axios.js";
import Loader from "../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import "./css/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
 
  const getProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users/current-user");

      setUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const updateProfile = async () => {
    try {
      const response = await api.patch(
        "/users/update-account-details",
        formData,
      );

      toast.success(response.data.message);

      setUser(response.data.data);

      setIsEditing(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const changePassword = async () => {
     if (!passwordData.oldPassword || !passwordData.newPassword) {
  return toast.error("All fields are required");
}

if (passwordData.newPassword.length < 6) {
  return toast.error(
    "New password must be at least 6 characters"
  );
}
  try {
    const response = await api.patch(
      "/users/change-password",
      passwordData
    );

    toast.success(response.data.message);

    setPasswordData({
      oldPassword: "",
      newPassword: "",
    });

    setShowPasswordForm(false);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};
const handlePasswordChange = (e) => {
  const { name, value } = e.target;

  setPasswordData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <h2>User not found</h2>;
  }
  return (
    <div className="profile-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Profile"
      />

      {isEditing ? (
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      ) : (
        <h2>{user.fullName}</h2>
      )}
      {isEditing ? (
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      ) : (
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      )}
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      {isEditing ? (
        <button onClick={updateProfile}>Save Changes</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      )}
      {isEditing && (
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({
              fullName: user.fullName,
              email: user.email,
            });
          }}
        >
          Cancel
        </button>
      )}
      <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
  {showPasswordForm ? "Close" : "Change Password"}
</button>
{showPasswordForm && (
  <div className="password-form">
    <input
      type="password"
      name="oldPassword"
      placeholder="Current Password"
      value={passwordData.oldPassword}
      onChange={handlePasswordChange}
    />

    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      value={passwordData.newPassword}
      onChange={handlePasswordChange}
    />

    <button className="btn-update-password" onClick={changePassword}>
      Update Password
    </button>
  </div>
)}
    </div>
  );
};

export default Profile;
