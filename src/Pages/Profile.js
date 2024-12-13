import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    phone: "",
    socialLinks: {
      linkedin: "",
      github: "",
    },
    profilePicture: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setEditedUser({
        ...storedUser,
        socialLinks: storedUser.socialLinks || { linkedin: "", github: "" },
      });
    } else {
      const defaultUser = {
        name: "John Doe",
        username: "johndoe",
        bio: "Lorem ipsum dolor sit amet.",
        email: "johndoe@example.com",
        phone: "(123) 456-7890",
        socialLinks: { linkedin: "johndoe", github: "johndoe" },
        profilePicture: "default-profile.jpg",
      };
      setUser(defaultUser);
      setEditedUser(defaultUser);
    }
  }, []);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "linkedin" || name === "github") {
      setEditedUser((prevState) => ({
        ...prevState,
        socialLinks: { ...prevState.socialLinks, [name]: value },
      }));
    } else {
      setEditedUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('user', JSON.stringify(editedUser));
    setIsEditing(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setEditedUser((prevState) => ({
          ...prevState,
          profilePicture: imageUrl,
        }));

        const storedUser = JSON.parse(localStorage.getItem('user')) || {};
        storedUser.profilePicture = imageUrl;
        localStorage.setItem('user', JSON.stringify(storedUser));
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Selected file is not an image");
    }
  };

  const getSocialLink = (platform, username) => {
    return username ? `https://www.${platform}.com/in/${username}` : '#';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-pic">
          <img
            src={editedUser.profilePicture || "default-profile.jpg"}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>

        {isEditing && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="choose-file-button">
              Choose File
            </label>
          </div>
        )}

        <div className="profile-info">
          <h1>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
              />
            ) : (
              user.name
            )}
          </h1>
          <p>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
              />
            ) : (
              `@${user.username || "Username"}` // Fallback if username is missing
            )}
          </p>
          <div className="edit-buttons">
            <button onClick={handleEditClick}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && <button onClick={handleSave}>Save Changes</button>}
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="about-me-section">
          <h2>About Me</h2>
          {isEditing ? (
            <textarea
              name="bio"
              value={editedUser.bio}
              onChange={handleChange}
              placeholder="Write something about yourself..."
            />
          ) : (
            <p>{user.bio}</p>
          )}
        </div>

        <div className="contact-section">
          <h2>Contact</h2>
          <div className="contact-item">
            <label>Email: </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>
          <div className="contact-item">
            <label>Phone: </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>
        </div>

        <div className="social-links-section">
          <h2>Social Links</h2>
          <div className="social-link-item">
            <label>LinkedIn: </label>
            {isEditing ? (
              <input
                type="text"
                name="linkedin"
                value={editedUser.socialLinks.linkedin || ""}
                onChange={handleChange}
                placeholder="LinkedIn profile"
              />
            ) : (
              <a
                href={getSocialLink("linkedin", user.socialLinks.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.socialLinks.linkedin || "Not provided"}
              </a>
            )}
          </div>
          <div className="social-link-item">
            <label>GitHub: </label>
            {isEditing ? (
              <input
                type="text"
                name="github"
                value={editedUser.socialLinks.github || ""}
                onChange={handleChange}
                placeholder="GitHub username"
              />
            ) : (
              <a
                href={getSocialLink("github", user.socialLinks.github)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.socialLinks.github || "Not provided"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
