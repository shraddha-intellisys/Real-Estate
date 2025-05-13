import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./HomesList.css";
import { homesListData } from "./homesListData";
import axios from "axios";

const HomesList = () => {
  const [quickViewHomeData, setQuickViewHomeData] = useState(null);
  const [detailsHomeData, setDetailsHomeData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('All Homes');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('address');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [areaRange, setAreaRange] = useState([0, 10000]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [homes, setHomes] = useState([]);

  const homesPerPage = 15;

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setHomes(response.data); // This is the new dynamic data
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };
    fetchHomes();
  }, []);

  const recentlyAddedHomes = useMemo(() => {
    return homes.filter(home => home.type !== 'Commercial');
  }, [homes]);
  
  const soldProperties = useMemo(() => {
    return homes.filter(home => home.type === 'Commercial'); // assuming "Sold" is marked as Commercial
  }, [homes]);
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('propertyWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('propertyWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((homeId) => {
    setWishlist(prev => {
      if (prev.includes(homeId)) {
        return prev.filter(id => id !== homeId);
      } else {
        return [...prev, homeId];
      }
    });
  }, []);

  const showQuickView = useCallback((home) => {
    setQuickViewHomeData(home);
  }, []);

  const hideQuickView = useCallback(() => {
    setQuickViewHomeData(null);
  }, []);

  const showDetails = useCallback((home) => {
    setDetailsHomeData(home);
  }, []);

  const hideDetails = useCallback(() => {
    setDetailsHomeData(null);
    setShowScheduleForm(false);
    setShowSuccessPopup(false);
  }, []);

  const changeFilter = useCallback((filter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  }, []);

  const handleContactAgent = () => {
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleScheduleVisit = () => {
    setShowScheduleForm(true);
    setShowSuccessPopup(false);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post("http://localhost:5000/api/scheduleVisit", {
        propertyId: detailsHomeData.id,
        ...scheduleData
      });
    } catch (error) {
      console.error("Schedule API Error:", error);
    }
  
    setShowSuccessPopup(true);
    setScheduleData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
  
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };
  

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = newValue;
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  const handleBedroomsChange = (e) => {
    setBedrooms(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleAreaRangeChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...areaRange];
    newRange[index] = newValue;
    setAreaRange(newRange);
    setCurrentPage(1);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSearchType('address');
    setPriceRange([0, 50000000]);
    setBedrooms(0);
    setAreaRange([0, 10000]);
    setCurrentPage(1);
  };

  // Extract price value from price string (handles both sale and rent prices)
  const getPriceValue = (priceStr) => {
    if (priceStr.includes('/')) {
      return parseInt(priceStr.replace(/[^0-9]/g, ''));
    }
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
  };

  const filteredHomes = useMemo(() => {
    return homesListData.filter(home => {
      // Filter by category
      if (currentFilter !== 'All Homes' && home.type !== currentFilter) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        if (searchType === 'id') {
          if (home.id.toString() !== searchTerm.toString()) {
            return false;
          }
        } else if (searchType === 'address') {
          if (!home.address.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }
        }
      }

      // Filter by price range
      const homePrice = getPriceValue(home.price);
      if (homePrice < priceRange[0] || homePrice > priceRange[1]) {
        return false;
      }

      // Filter by bedrooms
      if (bedrooms > 0 && home.beds < bedrooms) {
        return false;
      }

      // Filter by area (sq.ft)
      if (home.area < areaRange[0] || home.area > areaRange[1]) {
        return false;
      }

      return true;
    });
  }, [currentFilter, searchTerm, searchType, priceRange, bedrooms, areaRange]);

  const totalPages = Math.ceil(filteredHomes.length / homesPerPage);
  const displayedHomes = useMemo(() => {
    const startIndex = (currentPage - 1) * homesPerPage;
    return filteredHomes.slice(startIndex, startIndex + homesPerPage);
  }, [filteredHomes, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price).replace('₹', '₹');
  };

  return (
    <section className="homes-section">
      <div className="homes-container">
        <div className="header-section">
          <h2>Premium Homes Collection</h2>
          <p className="section-subheading">Explore our 10,000+ properties</p>
          <p className="section-description">
            Find your dream home from our extensive portfolio of luxury residences, 
            apartments, and villas tailored to your preferences.
          </p>
        </div>

        <h3>Recently Added Properties</h3>
<div className="homes-grid">
  {recentlyAddedHomes.map(home => (
    <HomeCard
      key={home.id}
      home={home}
      onQuickView={showQuickView}
      onViewDetails={showDetails}
      isInWishlist={wishlist.includes(home.id)}
      onToggleWishlist={toggleWishlist}
    />
  ))}
</div>

<h3>Sold Properties</h3>
<div className="homes-grid">
  {soldProperties.map(home => (
    <HomeCard
      key={home.id}
      home={home}
      onQuickView={showQuickView}
      onViewDetails={showDetails}
      isInWishlist={wishlist.includes(home.id)}
      onToggleWishlist={toggleWishlist}
    />
  ))}
</div>





        <div className="filter-options">
          {['All Homes', 'For Sale', 'For Rent', 'Luxury'].map(filter => (
            <button
              key={filter}
              className={`option-btn ${currentFilter === filter ? 'selected' : ''}`}
              onClick={() => changeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <select 
              value={searchType} 
              onChange={handleSearchTypeChange}
              className="search-type-select"
            >
              <option value="address">Search by Address</option>
              <option value="id">Search by ID</option>
            </select>
            <input
              type={searchType === 'id' ? 'number' : 'text'}
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={searchType === 'id' ? 'Enter property ID' : 'Enter address or location'}
              className="search-input"
            />
            <button 
              onClick={toggleAdvancedFilters}
              className="advanced-filter-btn"
            >
              {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
            </button>
          </div>

          {showAdvancedFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Price Range:</label>
                <div className="price-range-inputs">
                  <span>{formatPrice(priceRange[0])}</span>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="price-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="price-slider"
                  />
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label>Minimum Bedrooms:</label>
                  <select 
                    value={bedrooms} 
                    onChange={handleBedroomsChange}
                    className="bedrooms-select"
                  >
                    <option value="0">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Area Range (sq.ft):</label>
                  <div className="price-range-inputs">
                    <span>{areaRange[0]} sq.ft</span>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={areaRange[0]}
                      onChange={(e) => handleAreaRangeChange(e, 0)}
                      className="price-slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={areaRange[1]}
                      onChange={(e) => handleAreaRangeChange(e, 1)}
                      className="price-slider"
                    />
                    <span>{areaRange[1]} sq.ft</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={resetFilters}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            </div>
          )}

          <div className="results-count">
            Showing {displayedHomes.length} of {filteredHomes.length} properties
          </div>
        </div>

        <div className="homes-grid">
          {displayedHomes.length > 0 ? (
            displayedHomes.map(home => (
              <HomeCard 
                key={home.id} 
                home={home} 
                onQuickView={showQuickView}
                onViewDetails={showDetails}
                isInWishlist={wishlist.includes(home.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <div className="no-homes-message">
              <p>No homes match your search criteria.</p>
              <button 
                onClick={resetFilters}
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={currentPage === pageNum ? 'active' : ''}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        )}

        {quickViewHomeData && (
          <QuickViewModal 
            home={quickViewHomeData} 
            onClose={hideQuickView}
            onContactAgent={handleContactAgent}
            onScheduleVisit={handleScheduleVisit}
          />
        )}

        {detailsHomeData && (
          <DetailsModal 
            home={detailsHomeData} 
            onClose={hideDetails}
            onContactAgent={handleContactAgent}
            onScheduleVisit={handleScheduleVisit}
            showScheduleForm={showScheduleForm}
            scheduleData={scheduleData}
            onScheduleChange={handleScheduleChange}
            onScheduleSubmit={handleScheduleSubmit}
            onCancelSchedule={() => setShowScheduleForm(false)}
            showSuccessPopup={showSuccessPopup}
          />
        )}
      </div>
    </section>
  );
};

const HomeCard = React.memo(({ home, onQuickView, onViewDetails, isInWishlist, onToggleWishlist }) => {
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist(home.id);
  };

  return (
    <div className="home-card">
      <div className={`home-tag ${home.type.replace(/\s+/g, '-').toLowerCase()}`}>{home.type}</div>
      <button 
        className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <i className={`fas fa-heart ${isInWishlist ? 'solid' : 'regular'}`}></i>
      </button>
      <div 
        className="home-photo" 
        style={{
          backgroundImage: `url(${home.image})`,
          backgroundColor: '#f5f5f5'
        }}
        onClick={() => onQuickView(home)}
      >
        <div className="photo-overlay"></div>
        <button className="preview-btn">
          <i className="fas fa-expand"></i> Quick Preview
        </button>
      </div>
      <div className="home-info">
        <h3>{home.price}</h3>
        <p className="location">{home.address}</p>
        <div className="specs">
          <span><i className="fas fa-bed"></i> {home.beds} Beds</span>
          <span><i className="fas fa-bath"></i> {home.baths} Baths</span>
          <span><i className="fas fa-vector-square"></i> {home.area} sq.ft</span>
        </div>
        <button className="details-btn" onClick={(e) => {
          e.stopPropagation();
          onViewDetails(home);
        }}>
          View Details
        </button>
      </div>
    </div>
  );
});

const QuickViewModal = React.memo(({ home, onClose, onContactAgent, onScheduleVisit }) => (
  <div className="preview-modal">
    <div className="modal-backdrop" onClick={onClose}></div>
    <div className="modal-container">
      <button className="modal-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <div className="modal-photo" style={{backgroundImage: `url(${home.image})`}}></div>
      <div className="modal-info">
        <h3>{home.price}</h3>
        <p className="modal-location">{home.address}</p>
        <div className="modal-specs">
          <span><i className="fas fa-bed"></i> {home.beds} Beds</span>
          <span><i className="fas fa-bath"></i> {home.baths} Baths</span>
          <span><i className="fas fa-vector-square"></i> {home.area} sq.ft</span>
        </div>
        <p className="modal-description">{home.description}</p>
        <div className="action-buttons">
          <button className="contact-btn" 
          onClick={() => alert('Connecting you with our agents')}>
            <i className="fas fa-phone-alt"></i> Contact Agent
          </button>
          
        </div>
      </div>
    </div>
  </div>
));

const DetailsModal = ({ 
  home, 
  onClose, 
  onContactAgent, 
  onScheduleVisit,
  showScheduleForm,
  scheduleData,
  onScheduleChange,
  onScheduleSubmit,
  onCancelSchedule,
  showSuccessPopup
}) => {
  const features = [
    'Central AC',
    'Hardwood Floors',
    'Gourmet Kitchen',
    'Walk-in Closets',
    'Smart Home Features',
    'Energy Efficient',
    'Home Office',
    'Open Floor Plan'
  ].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div className="details-modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="details-modal-container">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        {showScheduleForm ? (
          <div className="schedule-form-container">
            <h3>Schedule a Visit for {home.address}</h3>
            
            {showSuccessPopup && (
              <div className="success-popup-form">
                <div className="success-content">
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>Your visit request has been submitted successfully.</p>
                  <p>We will contact you shortly to confirm your appointment.</p>
                </div>
              </div>
            )}
            
            {!showSuccessPopup && (
              <form onSubmit={onScheduleSubmit}>
                <div className="form-group">
                  <label>Property ID</label>
                  <input 
                    type="text" 
                    value={home.id}
                    readOnly
                    className="read-only-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Property Address</label>
                  <input 
                    type="text" 
                    value={home.address}
                    readOnly
                    className="read-only-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Full Name*</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={scheduleData.name} 
                    onChange={onScheduleChange} 
                    required 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email*</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={scheduleData.email} 
                    onChange={onScheduleChange} 
                    required 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number*</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={scheduleData.phone} 
                    onChange={onScheduleChange} 
                    required 
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Visit Date*</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={scheduleData.date} 
                      onChange={onScheduleChange} 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time*</label>
                    <input 
                      type="time" 
                      name="time" 
                      value={scheduleData.time} 
                      onChange={onScheduleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea 
                    name="message" 
                    value={scheduleData.message} 
                    onChange={onScheduleChange} 
                    placeholder="Any special requirements or questions"
                    rows="3"
                  />
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="cancel-btn" onClick={onCancelSchedule}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Confirm Visit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            <div className="details-modal-header">
              <h3>{home.price}</h3>
              <p className="details-modal-location">{home.address}</p>
              <div className={`details-modal-tag ${home.type.replace(/\s+/g, '-').toLowerCase()}`}>
                {home.type}
              </div>
            </div>
            
            <div className="details-modal-content">
              <div className="details-modal-gallery">
                <div className="details-main-image" style={{backgroundImage: `url(${home.image})`}}></div>
                <div className="details-thumbnails">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="details-thumbnail" 
                      style={{backgroundImage: `url(${home.image})`}}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="details-modal-body">
                <div className="details-section">
                  <h4>Property Details</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <i className="fas fa-bed"></i>
                      <span>{home.beds} Bedrooms</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-bath"></i>
                      <span>{home.baths} Bathrooms</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-ruler-combined"></i>
                      <span>{home.area} sq.ft</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-building"></i>
                      <span>{home.type}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Built: {Math.floor(Math.random() * 20) + 2000}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-layer-group"></i>
                      <span>{Math.floor(Math.random() * 5) + 1} Floors</span>
                    </div>
                  </div>
                </div>
                
                <div className="description-section">
                  <h4>Description</h4>
                  <p>{home.description}</p>
                  <p>This beautiful property features modern amenities, spacious living areas, and is located in a prime location. The home has been well-maintained and offers plenty of natural light throughout.</p>
                </div>
                
                <div className="features-section">
                  <h4>Key Features</h4>
                  <ul className="features-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="details-modal-footer">
              <button className="details-contact-btn" onClick={() => alert('Connecting you with our agents')}>
                <i className="fas fa-phone-alt"></i> Contact Agent
              </button>
              <button className="details-schedule-btn" onClick={onScheduleVisit}>
                <i className="fas fa-calendar-alt"></i> Schedule Visit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomesList;