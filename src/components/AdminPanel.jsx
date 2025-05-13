// AdminPanel.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { homesListData as initialHomesData, generateHomesData } from './homesListData';
import './AdminPanel.css';
import axios from "axios";

const AdminPanel = () => {
  // State management
  const [homesData, setHomesData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const initialFormData = useMemo(() => ({
    id: '',
    type: 'For Sale',
    price: '',
    address: '',
    beds: 2,
    baths: 1,
    area: '',
    description: '',
    image: ''
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Initialize data
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setHomesData([...initialHomesData]);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Login handler
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 300);
  }, [username, password]);

  // Logout handler
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    resetForm();
  }, []);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle image upload with size limit (2MB)
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImage(reader.result);
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentImage(null);
    setIsEditing(false);
    setError('');
  }, [initialFormData]);

  // Add new property
  const handleAddProperty = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const newId = homesData.length > 0 ? Math.max(...homesData.map(home => home.id)) + 1 : 1;
    const priceValue = formData.price ? parseInt(formData.price) : 0;
  
    const newProperty = {
      ...formData,
      id: newId,
      price: formData.type === 'For Rent' 
        ? `₹${priceValue}/month` 
        : `₹${priceValue}`,
      image: formData.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
  
    // Send data to backend API
    fetch('http://localhost:5000/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProperty),
    }).catch(err => console.error('Error saving property to backend:', err));
  
    setTimeout(() => {
      setHomesData(prev => [...prev, newProperty]);
      setSuccessMessage('Property added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      resetForm();
      setIsLoading(false);
    }, 300);
  }, [formData, homesData, resetForm]);
  

  // Edit property
  const handleEditProperty = useCallback((e) => {
  e.preventDefault();
  setIsLoading(true);

  const priceValue = formData.price ? parseInt(formData.price) : 0;
  const updatedProperty = {
    ...formData,
    price: formData.type === 'For Rent' 
      ? `₹${priceValue}/month` 
      : `₹${priceValue}`,
  };

  // Send update to backend
  fetch(`http://localhost:5000/api/properties/${formData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProperty),
  }).catch(err => console.error('Error updating property in backend:', err));

  setTimeout(() => {
    setHomesData(prev => prev.map(home => 
      home.id === parseInt(formData.id) ? {
        ...updatedProperty,
        image: formData.image || home.image
      } : home
    ));
    setSuccessMessage('Property updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    resetForm();
    setIsLoading(false);
  }, 300);
}, [formData, resetForm]);

  // Delete property
  const handleDeleteProperty = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setIsLoading(true);
      
      setTimeout(() => {
        setHomesData(prev => prev.filter(home => home.id !== id));
        setSuccessMessage('Property deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsLoading(false);
      }, 300);
    }
  }, []);

  // Start editing a property
  const startEditing = useCallback((home) => {
    const priceMatch = home.price.match(/\d+/);
    const priceValue = priceMatch ? priceMatch[0] : '';
    
    setFormData({
      id: home.id,
      type: home.type,
      price: priceValue,
      address: home.address,
      beds: home.beds,
      baths: home.baths,
      area: home.area,
      description: home.description,
      image: home.image
    });
    setCurrentImage(home.image);
    setIsEditing(true);
  }, []);

  // Generate sample data
  const generateSampleData = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newData = generateHomesData();
      setHomesData(newData);
      setSuccessMessage('Sample data generated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsLoading(false);
    }, 500);
  }, []);

  // Memoized property list to prevent unnecessary re-renders
  const propertyList = useMemo(() => (
    homesData.map(home => (
      <PropertyCard 
        key={home.id}
        home={home}
        onEdit={startEditing}
        onDelete={handleDeleteProperty}
      />
    ))
  ), [homesData, startEditing, handleDeleteProperty]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <header className="admin-header">
        <h1>Property Management Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          disabled={isLoading}
        >
          Logout
        </button>
      </header>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="admin-content">
        <div className="property-form-section">
          <h2>{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
          <form onSubmit={isEditing ? handleEditProperty : handleAddProperty}>
            <div className="form-row">
              <div className="form-group">
                <label>Property Type</label>
                <select 
                  name="type" 
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Commercial">Sold</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Price ({formData.type === 'For Rent' ? 'per month' : 'total'})</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder={formData.type === 'For Rent' ? 'e.g. 35000' : 'e.g. 7500000'}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 123 Green Park, Pune"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bedrooms</label>
                <input 
                  type="number" 
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                  min="1"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Bathrooms</label>
                <input 
                  type="number" 
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  required
                  min="1"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Area (sq.ft)</label>
                <input 
                  type="number" 
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  min="100"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group image-upload">
                <label>Property Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
                {currentImage && (
                  <div className="image-preview">
                    <img 
                      src={currentImage} 
                      alt="Property preview" 
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : isEditing ? 'Update Property' : 'Add Property'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="cancel-btn"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="property-list-section">
          <div className="section-header">
            <h2>All Properties ({homesData.length})</h2>
            {/* <button 
              onClick={generateSampleData} 
              className="generate-btn"
              disabled={isLoading}
            >
              Generate Sample Data
            </button> */}
          </div>
          
          {isLoading && homesData.length === 0 ? (
            <div className="loading-placeholder">
              <p>Loading properties...</p>
            </div>
          ) : homesData.length === 0 ? (
            <div className="empty-state">
              <p>No properties found. Add a new property or generate sample data.</p>
            </div>
          ) : (
            <div className="admin-property-list">
              {propertyList}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Separate component for Property Card to optimize rendering
const PropertyCard = React.memo(({ home, onEdit, onDelete }) => (
  <div className="admin-property-card">
    <div className="admin-property-image" style={{backgroundImage: `url(${home.image})`}}>
      <span className="admin-property-type">{home.type}</span>
    </div>
    <div className="admin-property-details">
      <h3>{home.price}</h3>
      <p className="admin-address">{home.address}</p>
      <div className="admin-specs">
        <span><i className="fas fa-bed"></i> {home.beds} Beds</span>
        <span><i className="fas fa-bath"></i> {home.baths} Baths</span>
        <span><i className="fas fa-vector-square"></i> {home.area} sq.ft</span>
      </div>
      <div className="admin-property-actions">
        <button onClick={() => onEdit(home)} className="edit-btn">
          <i className="fas fa-edit"></i> Edit
        </button>
        <button onClick={() => onDelete(home.id)} className="delete-btn">
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
));

export default AdminPanel;