import React, { useState, useEffect } from "react";
import { homesListData } from "./homesListData";
import { Link } from "react-router-dom";
import "./HomesList.css"; // Reuse your existing styles
import axios from 'axios';


const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const userId = 'guest'; // Replace with actual userId if available
        const res = await axios.get(`http://localhost:5000/api/saved-properties/${userId}`);
        setSavedProperties(res.data);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSavedProperties();
  }, []);

  const removeFromSaved = (propertyId) => {
    const updatedSaved = savedProperties.filter(property => property.id !== propertyId);
    setSavedProperties(updatedSaved);
    
    // Update localStorage
    const updatedIds = updatedSaved.map(property => property.id);
    localStorage.setItem('propertyWishlist', JSON.stringify(updatedIds));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your saved properties...</p>
      </div>
    );
  }

  return (
    <div className="saved-properties-container">
      <div className="saved-header">
        <h1>Your Saved Properties</h1>
        <Link to="/" className="back-to-home">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>

      {savedProperties.length === 0 ? (
        <div className="empty-saved">
          <i className="far fa-heart"></i>
          <h2>No saved properties yet</h2>
          <p>Properties you save will appear here</p>
          <Link to="/" className="browse-properties-btn">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="saved-properties-grid">
          {savedProperties.map(property => (
            <div className="saved-property-card" key={property.id}>
              <div className="property-image-container">
                <img 
                  src={property.image} 
                  alt={property.address} 
                  className="property-image"
                />
                <button 
                  className="remove-saved-btn"
                  onClick={() => removeFromSaved(property.id)}
                  aria-label="Remove from saved"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="property-details">
                <h3>{property.price}</h3>
                <p className="property-address">{property.address}</p>
                <div className="property-features">
                  <span><i className="fas fa-bed"></i> {property.beds} Beds</span>
                  <span><i className="fas fa-bath"></i> {property.baths} Baths</span>
                  <span><i className="fas fa-ruler-combined"></i> {property.area} sq.ft</span>
                </div>
                <div className="property-actions">
                  <Link 
                    to={`/property/${property.id}`} 
                    className="view-details-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;