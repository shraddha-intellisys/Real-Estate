import React, { useState, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaHistory, FaCamera, FaSave, FaTimes, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  // State for user data and edit mode
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    joinedDate: 'January 2023',
    profilePhoto: null,
    // In a real app, this would be hashed and stored securely
    password: 'SecurePassword123' // Just for demo purposes
  });
  
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes
  const handleSave = () => {
    setUserData(tempData);
    setEditMode(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setTempData({ ...userData });
    setEditMode(false);
  };

  // Trigger file input click
  const handleAvatarClick = () => {
    if (editMode) {
      fileInputRef.current.click();
    }
  };

  // Handle password change submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setPasswordError('');
    
    // Validations
    if (!passwordData.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    
    if (passwordData.currentPassword !== userData.password) {
      setPasswordError("Current password is incorrect");
      return;
    }
    
    if (!passwordData.newPassword) {
      setPasswordError("New password is required");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }
    
    if (!/[a-z]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }
    
    if (!/[0-9]/.test(passwordData.newPassword)) {
      setPasswordError("Password must contain at least one number");
      return;
    }
    
    if (passwordData.newPassword === passwordData.currentPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    // If all validations pass, update the password
    setUserData(prev => ({
      ...prev,
      password: passwordData.newPassword
    }));
    
    // Reset form and close modal
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordModal(false);
    
    // Show success message
    alert("Password changed successfully!");
  };

  return (
    <div className="profile-container">
      {/* Password Change Modal */}
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="password-modal">
            <h3><FaLock /> Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input-container">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-container">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="profile-header">
        <div 
          className={`profile-avatar ${editMode ? 'editable' : ''}`} 
          onClick={handleAvatarClick}
        >
          {tempData.profilePhoto ? (
            <img src={tempData.profilePhoto} alt="Profile" />
          ) : (
            <FaUser size={60} />
          )}
          {editMode && <div className="avatar-overlay"><FaCamera size={24} /></div>}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
        
        {editMode ? (
          <div className="edit-name-fields">
            <input
              type="text"
              name="firstName"
              value={tempData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={tempData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>
        ) : (
          <h2>{userData.firstName} {userData.lastName}</h2>
        )}
        
        <p>Member since {userData.joinedDate}</p>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <FaEnvelope className="detail-icon" />
          <div>
            <h3>Email</h3>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={tempData.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
        </div>

        <div className="detail-item">
          <FaPhone className="detail-icon" />
          <div>
            <h3>Phone</h3>
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={tempData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            ) : (
              <p>{userData.phone || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="edit-profile-btn" 
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button 
                className="change-password-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-history">
        <h3><FaHistory className="history-icon" /> Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <FaHome className="activity-icon" />
            <div>
              <p>Viewed property at 123 Main St</p>
              <span>2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;