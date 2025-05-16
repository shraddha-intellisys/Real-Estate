import React, { useState } from 'react';
import { FaTimes, FaStar, FaRegStar, FaUpload } from 'react-icons/fa';

const CreateListingPopup = ({ onClose, currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'House',
    status: 'For Sale',
    label: '',
    price: '',
    pricePlaceholder: false,
    secondPrice: '',
    afterPrice: '',
    pricePrefix: '',
    bedrooms: '',
    rooms: '',
    bathrooms: '',
    areaSize: '',
    sizePostfix: 'sqft',
    landArea: '',
    landAreaPostfix: 'sqft',
    garages: '',
    garageSize: '',
    propertyId: '',
    yearBuilt: '',
    address: '',
    country: '',
    state: '',
    city: '',
    area: '',
    zipCode: '',
    features: [],
    additionalDetails: [{ title: '', value: '' }],
    subListings: [{
      title: '',
      bedrooms: '',
      bathrooms: '',
      propertySize: '',
      sizePostfix: '',
      price: '',
      pricePostfix: '',
      propertyType: '',
      availabilityDate: ''
    }],
    privateNote: '',
    images: [],
    featuredImage: null
  });

  const [step, setStep] = useState(1);
  const [draggedImage, setDraggedImage] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 50) {
      alert('You can upload a maximum of 50 images');
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isFeatured: false
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleDragStart = (e, index) => {
    setDraggedImage(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newImages = [...formData.images];
    const draggedItem = newImages[draggedImage];
    newImages.splice(draggedImage, 1);
    newImages.splice(index, 0, draggedItem);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const setFeaturedImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isFeatured: i === index
      })),
      featuredImage: index
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addAdditionalDetail = () => {
    setFormData(prev => ({
      ...prev,
      additionalDetails: [...prev.additionalDetails, { title: '', value: '' }]
    }));
  };

  const removeAdditionalDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalDetails: prev.additionalDetails.filter((_, i) => i !== index)
    }));
  };

  const handleAdditionalDetailChange = (index, field, value) => {
    const newDetails = [...formData.additionalDetails];
    newDetails[index][field] = value;
    setFormData(prev => ({ ...prev, additionalDetails: newDetails }));
  };

  const addSubListing = () => {
    setFormData(prev => ({
      ...prev,
      subListings: [...prev.subListings, {
        title: '',
        bedrooms: '',
        bathrooms: '',
        propertySize: '',
        sizePostfix: '',
        price: '',
        pricePostfix: '',
        propertyType: '',
        availabilityDate: ''
      }]
    }));
  };

  const removeSubListing = (index) => {
    setFormData(prev => ({
      ...prev,
      subListings: prev.subListings.filter((_, i) => i !== index)
    }));
  };

  const handleSubListingChange = (index, field, value) => {
    const newSubListings = [...formData.subListings];
    newSubListings[index][field] = value;
    setFormData(prev => ({ ...prev, subListings: newSubListings }));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend API
    console.log('Submitting listing:', formData);
    // Add your API call here
    alert('Listing submitted successfully!');
    onClose();
  };

  return (
    <div className="create-listing-popup">
      <div className="create-listing-overlay" onClick={onClose}></div>
      <div className="create-listing-content">
        <button className="close-popup" onClick={onClose}>
          <FaTimes />
        </button>
        
        <h2>Create New Property Listing</h2>
        
        <div className="create-listing-steps">
          <div className={`step ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
            <span>1</span> Description
          </div>
          <div className={`step ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
            <span>2</span> Media
          </div>
          <div className={`step ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>
            <span>3</span> Details
          </div>
          <div className={`step ${step === 4 ? 'active' : ''}`} onClick={() => setStep(4)}>
            <span>4</span> Location
          </div>
          <div className={`step ${step === 5 ? 'active' : ''}`} onClick={() => setStep(5)}>
            <span>5</span> Submit
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your property title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter property description"
                  rows="5"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Label</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    placeholder="e.g. Featured, Hot Offer"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Sale or Rent Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter the price"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="pricePlaceholder"
                    name="pricePlaceholder"
                    checked={formData.pricePlaceholder}
                    onChange={handleChange}
                  />
                  <label htmlFor="pricePlaceholder">Enable Price Placeholder</label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Second Price (Optional)</label>
                <input
                  type="number"
                  name="secondPrice"
                  value={formData.secondPrice}
                  onChange={handleChange}
                  placeholder="Enter the second price"
                />
              </div>
              
              <div className="form-group">
                <label>After The Price</label>
                <input
                  type="text"
                  name="afterPrice"
                  value={formData.afterPrice}
                  onChange={handleChange}
                  placeholder="Enter the after price (e.g. Monthly)"
                />
              </div>
              
              <div className="form-group">
                <label>Price Prefix</label>
                <input
                  type="text"
                  name="pricePrefix"
                  value={formData.pricePrefix}
                  onChange={handleChange}
                  placeholder="Enter the price prefix (e.g. Start from)"
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label>Media</label>
                <p>Drag and drop the images to customize the image gallery order.</p>
                <p>{formData.images.length} / 50</p>
                
                <div className="image-upload-container">
                  <label className="upload-btn">
                    <FaUpload /> Upload Images
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <p>Drag and drop the gallery images here (Minimum size 1440x900)</p>
                  <p>To mark an image as featured, click the star icon. If no image is marked as featured, the first image will be considered the featured image.</p>
                </div>
                
                <div className="image-gallery">
                  {formData.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`image-thumbnail ${image.isFeatured ? 'featured' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <img src={image.preview} alt={`Property ${index}`} />
                      <button 
                        type="button" 
                        className="feature-btn"
                        onClick={() => setFeaturedImage(index)}
                      >
                        {image.isFeatured ? <FaStar /> : <FaRegStar />}
                      </button>
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label>Details</label>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="Enter number of bedrooms"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Rooms</label>
                    <input
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      placeholder="Enter number of rooms"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="Enter number of bathrooms"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Area Size *</label>
                    <input
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleChange}
                      placeholder="Enter property area size"
                      required
                    />
                    <p className="hint">Only digits</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Size Postfix</label>
                    <input
                      type="text"
                      name="sizePostfix"
                      value={formData.sizePostfix}
                      onChange={handleChange}
                      placeholder="sqft"
                    />
                    <p className="hint">For example: Sq Ft</p>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Land Area</label>
                    <input
                      type="number"
                      name="landArea"
                      value={formData.landArea}
                      onChange={handleChange}
                      placeholder="Enter property Land Area"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Land Area Size Postfix</label>
                    <input
                      type="text"
                      name="landAreaPostfix"
                      value={formData.landAreaPostfix}
                      onChange={handleChange}
                      placeholder="sqft"
                    />
                    <p className="hint">For example: Sq Ft</p>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Garages</label>
                    <input
                      type="number"
                      name="garages"
                      value={formData.garages}
                      onChange={handleChange}
                      placeholder="Enter number of garages"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Garage Size</label>
                    <input
                      type="text"
                      name="garageSize"
                      value={formData.garageSize}
                      onChange={handleChange}
                      placeholder="For example: 200 Sq Ft"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Property ID</label>
                    <input
                      type="text"
                      name="propertyId"
                      value={formData.propertyId}
                      onChange={handleChange}
                      placeholder="Enter property ID"
                    />
                    <p className="hint">For example: HZ-01</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Year Built</label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      placeholder="Enter year built"
                    />
                    <p className="hint">Only digits</p>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Additional details</label>
                  <table className="additional-details-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.additionalDetails.map((detail, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              value={detail.title}
                              onChange={(e) => handleAdditionalDetailChange(index, 'title', e.target.value)}
                              placeholder="Eg: Equipment"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={detail.value}
                              onChange={(e) => handleAdditionalDetailChange(index, 'value', e.target.value)}
                              placeholder="Grill - Gas"
                            />
                          </td>
                          <td>
                            <button 
                              type="button"
                              className="remove-detail-btn"
                              onClick={() => removeAdditionalDetail(index)}
                            >
                              <FaTimes />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button 
                    type="button"
                    className="add-detail-btn"
                    onClick={addAdditionalDetail}
                  >
                    + Add Detail
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Features</label>
                  <div className="features-grid">
                    {['Air Conditioning', 'Gym', 'Lawn', 'Swimming Pool', 'WiFi', 'Window Coverings'].map(feature => (
                      <div key={feature} className="feature-checkbox">
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                        />
                        <label htmlFor={`feature-${feature}`}>{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Sub listings</label>
                  {formData.subListings.map((subListing, index) => (
                    <div key={index} className="sub-listing">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            value={subListing.title}
                            onChange={(e) => handleSubListingChange(index, 'title', e.target.value)}
                            placeholder="Enter the title"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Bedrooms</label>
                          <input
                            type="number"
                            value={subListing.bedrooms}
                            onChange={(e) => handleSubListingChange(index, 'bedrooms', e.target.value)}
                            placeholder="Enter the number of bedrooms"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Bathrooms</label>
                          <input
                            type="number"
                            value={subListing.bathrooms}
                            onChange={(e) => handleSubListingChange(index, 'bathrooms', e.target.value)}
                            placeholder="Enter the number of bathrooms"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Property Size</label>
                          <input
                            type="number"
                            value={subListing.propertySize}
                            onChange={(e) => handleSubListingChange(index, 'propertySize', e.target.value)}
                            placeholder="Enter the property size"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Size Postfix</label>
                          <input
                            type="text"
                            value={subListing.sizePostfix}
                            onChange={(e) => handleSubListingChange(index, 'sizePostfix', e.target.value)}
                            placeholder="Enter the property size postfix"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="number"
                            value={subListing.price}
                            onChange={(e) => handleSubListingChange(index, 'price', e.target.value)}
                            placeholder="Enter the price"
                          />
                          <p className="hint">Only digits</p>
                        </div>
                        
                        <div className="form-group">
                          <label>Price Postfix</label>
                          <input
                            type="text"
                            value={subListing.pricePostfix}
                            onChange={(e) => handleSubListingChange(index, 'pricePostfix', e.target.value)}
                            placeholder="Enter the price postfix"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Property Type</label>
                          <input
                            type="text"
                            value={subListing.propertyType}
                            onChange={(e) => handleSubListingChange(index, 'propertyType', e.target.value)}
                            placeholder="Enter the property type"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Availability Date</label>
                          <input
                            type="date"
                            value={subListing.availabilityDate}
                            onChange={(e) => handleSubListingChange(index, 'availabilityDate', e.target.value)}
                            placeholder="Enter the availability date"
                          />
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        className="remove-sub-listing-btn"
                        onClick={() => removeSubListing(index)}
                      >
                        Remove Sub Listing
                      </button>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    className="add-sub-listing-btn"
                    onClick={addSubListing}
                  >
                    + Add Sub Listing
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="form-step">
              <div className="form-group">
                <label>Location</label>
                
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your property address"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter the country"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>State/county</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter the State/county"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter the city"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Area</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Enter the area"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Zip/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter zip/postal code"
                  />
                </div>
              </div>
            </div>
          )}
          
          {step === 5 && (
            <div className="form-step">
              {!currentUser ? (
                <div className="form-group">
                  <h3>Do you have an account?</h3>
                  <p>If you don't have an account you can create one below by entering your email address. Your account details will be confirmed via email. Otherwise you can Login</p>
                  
                  <div className="form-group">
                    <label>Username*</label>
                    <input
                      type="text"
                      name="username"
                      value={newUser.username}
                      onChange={handleNewUserChange}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleNewUserChange}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleNewUserChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <h3>Review Your Listing</h3>
                  <p>Please review all the information before submitting your property listing.</p>
                  
                  <div className="form-group">
                    <label>Private Note</label>
                    <textarea
                      name="privateNote"
                      value={formData.privateNote}
                      onChange={handleChange}
                      placeholder="Write private note for this property, it will not display for public."
                      rows="5"
                    />
                  </div>
                </div>
              )}
              
              <div className="form-actions">
                {step > 1 && (
                  <button 
                    type="button"
                    className="prev-btn"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </button>
                )}
                
                {step < 5 ? (
                  <button 
                    type="button"
                    className="next-btn"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="submit-btn"
                  >
                    Submit Listing
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateListingPopup;