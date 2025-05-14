import React, { useState } from "react";
import "./HomePage.css";
import vid1 from '../assets/video_1.mp4';
import vid2 from '../assets/video_2.mp4';
import vid3 from '../assets/video_3.mp4';
import vid4 from '../assets/video_4.mp4';

const HomePage = () => {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('All Properties');
  const [quickViewData, setQuickViewData] = useState(null);
  
  

  const navigateToHomesList = (filter) => {
    navigate('/HomesList', { state: { initialFilter: filter } });
  };

  // Initial properties data
  const initialProperties = [
    {
      id: 1,
      type: "For Sale",
      price: "₹75,00,000",
      address: "123 Green Park, Pune",
      beds: 3,
      baths: 2,
      area: 1800,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      type: "For Rent",
      price: "₹35,000/month",
      address: "456 Marine Drive, Mumbai",
      beds: 2,
      baths: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      type: "For Sale",
      price: "₹1,20,00,000",
      address: "789 Whitefield, Bangalore",
      beds: 4,
      baths: 3,
      area: 2500,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

     // Testimonials data
  const allTestimonials = [
    {
      id: 1,
      rating: "★★★★★",
      quote: "Our agent went above and beyond to find our dream home in a competitive market. The entire process was seamless and stress-free!",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      name: "Sarah Johnson",
      location: "Homeowner in Beverly Hills"
    },
    {
      id: 2,
      rating: "★★★★★",
      quote: "Sold our property 15% above asking price in just 3 days! The marketing strategy was brilliant and the negotiations were handled perfectly.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Michael Chen",
      location: "Seller in Downtown LA"
    },
    {
      id: 3,
      rating: "★★★★☆",
      quote: "As first-time buyers, we were nervous, but our agent educated us and found properties within our budget that matched all our needs.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Jessica Martinez",
      location: "First-Time Buyer"
    },
    {
      id: 4,
      rating: "★★★★★",
      quote: "The team helped us relocate from another city and made the transition so smooth. They understood exactly what we were looking for.",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      name: "Rajesh Kumar",
      location: "Relocating to Bangalore"
    },
    {
      id: 5,
      rating: "★★★★★",
      quote: "After a bad experience with another agency, this team restored our faith in real estate professionals. Transparent and incredibly skilled.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      name: "Priya Sharma",
      location: "Seller in Mumbai"
    },
    {
      id: 6,
      rating: "★★★★★",
      quote: "We got a great deal on our investment property thanks to our agent's market knowledge. The property has already appreciated 15% in value.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "Amit Patel",
      location: "Investor in Pune"
    }
  ];

  const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  const loadMoreTestimonials = () => {
    setVisibleTestimonials(prev => Math.min(prev + 3, allTestimonials.length));
  };


  // Additional properties to load
  const moreProperties = [
    {
      id: 4,
      type: "For Rent",
      price: "₹45,000/month",
      address: "101 Koramangala, Bangalore",
      beds: 3,
      baths: 2,
      area: 1500,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      type: "For Sale",
      price: "₹95,00,000",
      address: "202 Baner Road, Pune",
      beds: 3,
      baths: 3,
      area: 2000,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      type: "For Rent",
      price: "₹28,000/month",
      address: "303 Andheri East, Mumbai",
      beds: 2,
      baths: 1,
      area: 1000,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // For Sale properties data
  const forSaleProperties = [
    {
      id: 7,
      price: "₹85,00,000",
      address: "Luxury Villa, Koregaon Park",
      beds: 4,
      baths: 3,
      area: 2800,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "New Listing",
      daysOnMarket: 2,
      type: "Villa"
    },
    {
      id: 8,
      price: "₹1,20,00,000",
      address: "Modern Apartment, Baner",
      beds: 3,
      baths: 2,
      area: 2100,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "Trending",
      daysOnMarket: 7,
      type: "Apartment"
    },
    {
      id: 9,
      price: "₹62,00,000",
      address: "Cozy Home, Kothrud",
      beds: 2,
      baths: 2,
      area: 1500,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      daysOnMarket: 3,
      type: "House"
    }
  ];

  const [properties, setProperties] = useState(initialProperties);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    setProperties([...properties, ...moreProperties]);
    setHasMore(false);
  };

  // const handleFilterClick = (filter) => {
  //   setActiveFilter(filter);
  // };

  // const handleQuickView = (property) => {
  //   setQuickViewData(property);
  // };

  // const closeQuickView = () => {
  //   setQuickViewData(null);
  // };

  // const handleEnquire = (propertyId) => {
  //   alert(`Enquiry sent for property ID: ${propertyId}`);
  // };
  
  

  return (
    <>
      <div className="hero-section1">
        <div className="hero-content1">
          <h1>Find Your Dream Home in India</h1>
          <p>PUNE • MUMBAI • DELHI • BANGALORE • HYDERABAD</p>
          {/* <div className="filters">
            <select><option>Property Type</option></select>
            <select><option>All Cities</option></select>
            <select><option>Bedrooms</option></select>
            <select><option>Max. Price</option></select>
            <button className="search-btn" onClick={() => alert('Search functionality would go here')}>
              Search
            </button>
          </div> */}
          <div className="status-buttons">
            <button 
              className="status all-status"
              onClick={() => window.location.href = '/HomesList'}
            >
              ALL STATUS
            </button>
            {/* <button 
              className="status for-rent"
              onClick={() => window.location.href = '/HomesList'}
            >
              FOR RENT
            </button>
            <button 
              className="status for-sell"
              onClick={() => window.location.href = '/HomesList'}
            >
              FOR SELL
            </button> */}
          </div>
        </div>
      </div>

      {/* Featured Homes Section */}
      <section className="featured-homes1">
        <div className="featured-container1">
          <div className="sectionn-header1">
            <h2>Featured Homes</h2>
            <p className="subtitle">Our new homes for sale and rent</p>
            <p className="description">
              Search homes for sale in your local area by price, amenities, or other features. 
              We'll show you the sales history and provide helpful advice.
            </p>
          </div>
          
          <div className="property-cards1">
            {properties.map(property => (
              <div className="property-card2" key={property.id}>
                <div className="property-badge1">{property.type}</div>
                <div 
                  className="property-image1" 
                  style={{backgroundImage: `url(${property.image})`}}
                  onClick={() => handleQuickView(property)}
                >
                  <div className="image-overlay"></div>
                  {/* <button className="quick-view-btn">
                    <i className="fas fa-expand"></i> Quick View
                  </button> */}
                </div>
                <div className="property-details1">
                  <h3>{property.price}</h3>
                  <p className="address">{property.address}</p>
                  <div className="featuress">
                    <span><i className="fas fa-bed"></i> {property.beds} Beds</span>
                    <span><i className="fas fa-bath"></i> {property.baths} Baths</span>
                    <span><i className="fas fa-vector-square"></i> {property.area} sq.ft</span>
                  </div>
                  {/* <button 
                    className="view-btn"
                    onClick={() => handleEnquire(property.id)}
                  >
                    View Details
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modern Minimalist Services Section */}
       <section className="services-modern">
        <div className="modern-container">
          <div className="modern-header">
            <h2>Simplifying Real Estate</h2>
            <p className="modern-subtitle">
              Home buying can be stressful. We make it effortless.
            </p>
          </div>
          
          <div className="modern-cards">
            {/* Card 1 - Expert Agents */}
            <div className="modern-card">
              <div className="modern-card-inner">
                <div className="modern-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/1995/1995542.png" alt="Expert Agents" />
                </div>
                <div className="modern-content">
                  <h3>Expert Agents</h3>
                  <p>
                    Certified professionals with local market expertise to guide 
                    your property journey.
                  </p>
                  <div className="modern-stats">
                    <span>500+</span>
                    <span>Trusted Partners</span>
                  </div>
                </div>
              </div>
              <div className="modern-cta">
                <button 
                  className="modern-btn"
                  onClick={() => document.getElementById('teamModal').classList.add('active')}
                >
                  Meet Our Team <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 2 - Seamless Process */}
            <div className="modern-card">
              <div className="modern-card-inner">
                <div className="modern-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/3058/3058971.png" alt="Seamless Process" />
                </div>
                <div className="modern-content">
                  <h3>Seamless Process</h3>
                  <p>
                    Our streamlined approach saves you time and reduces paperwork 
                    by 60%.
                  </p>
                  <div className="modern-stats">
                    <span>7 Days</span>
                    <span>Average Closing</span>
                  </div>
                </div>
              </div>
              <div className="modern-cta">
                <button 
                  className="modern-btn"
                  onClick={() => document.getElementById('processModal').classList.add('active')}
                >
                  How It Works <span>→</span>
                </button>
              </div>
            </div>

            {/* Card 3 - Smart Matching */}
            <div className="modern-card">
              <div className="modern-card-inner">
                <div className="modern-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/3058/3058032.png" alt="Smart Matching" />
                </div>
                <div className="modern-content">
                  <h3>Smart Matching</h3>
                  <p>
                    AI-powered recommendations to find properties that truly 
                    match your needs.
                  </p>
                  <div className="modern-stats">
                    <span>92%</span>
                    <span>Match Accuracy</span>
                  </div>
                </div>
              </div>
              <div className="modern-cta">
                <button 
                  className="modern-btn"
                  onClick={() => document.getElementById('toolModal').classList.add('active')}
                >
                  Try Our Tool <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Modal */}
        <div className="modern-modal" id="teamModal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => document.getElementById('teamModal').classList.remove('active')}>
              &times;
            </button>
            <h3>Our Expert Team</h3>
            <div className="modal-grid">
              <div className="team-member">
                <div className="member-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/women/44.jpg)'}}></div>
                <h4>Sarah Johnson</h4>
                <p>Senior Agent, 12 years experience</p>
                <div className="member-specialty">Residential Properties</div>
              </div>
              <div className="team-member">
                <div className="member-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)'}}></div>
                <h4>Michael Chen</h4>
                <p>Commercial Specialist</p>
                <div className="member-specialty">Commercial Real Estate</div>
              </div>
              <div className="team-member">
                <div className="member-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/women/68.jpg)'}}></div>
                <h4>Lisa Rodriguez</h4>
                <p>Buyer's Agent</p>
                <div className="member-specialty">First-Time Homebuyers</div>
              </div>
              <div className="team-member">
                <div className="member-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/women/44.jpg)'}}></div>
                <h4>Sarah Johnson</h4>
                <p>Senior Agent, 12 years experience</p>
                <div className="member-specialty">Residential Properties</div>
              </div>
            </div>
            <button className="modal-action-btn" onClick={() => window.location.href='/contact'}>
              Contact Our Team
            </button>
          </div>
        </div>

        {/* Process Modal */}
        <div className="modern-modal" id="processModal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => document.getElementById('processModal').classList.remove('active')}>
              &times;
            </button>
            <h3>Our Seamless Process</h3>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Initial Consultation</h4>
                  <p>We'll discuss your needs, budget, and preferences to create a personalized plan.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Property Matching</h4>
                  <p>Our system will curate properties that match your criteria perfectly.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Virtual Tours</h4>
                  <p>View properties remotely with our immersive 3D tours before visiting.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Paperwork Simplified</h4>
                  <p>Our digital platform handles 90% of paperwork electronically.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h4>Closing & Move-In</h4>
                  <p>We coordinate all final details for a stress-free transition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Modal */}
        <div className="modern-modal" id="toolModal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => document.getElementById('toolModal').classList.remove('active')}>
              &times;
            </button>
            <h3>Find Your Perfect Home</h3>
            <p className="modal-subtitle">Answer a few questions and our AI will match you with ideal properties</p>
            
            <div className="tool-container">
              <div className="tool-question active">
                <h4>What type of property are you looking for?</h4>
                <div className="tool-options">
                  <button className="tool-option">Single Family Home</button>
                  <button className="tool-option">Condo/Apartment</button>
                  <button className="tool-option">Townhouse</button>
                  <button className="tool-option">Commercial</button>
                </div>
              </div>
              
              {/* <div className="tool-progress">
                <div className="progress-bar" style={{width: '33%'}}></div>
                <span>1 of 3 questions</span>
              </div>
               */}
             <button 
                className="modal-action-btn" 
                  onClick={(e) => {
                 // Create a popup element
                 const popup = document.createElement('div');
                popup.style.position = 'fixed';
                popup.style.top = '50%';
               popup.style.left = '50%';
              popup.style.transform = 'translate(-50%, -50%)';
               popup.style.backgroundColor = 'white';
                popup.style.padding = '20px';
                popup.style.borderRadius = '8px';
                popup.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                popup.style.zIndex = '1000';
               popup.style.textAlign = 'center';

            // Popup content
            popup.innerHTML = `
           <p>In a real implementation, this would lead to the full matching tool</p>
           <button 
           style="padding: 5px 15px; margin-top: 10px; cursor: pointer;"
             onclick="this.parentElement.remove()"
              >
              OK
              </button>
                `;

    // Append to body and remove on outside click (optional)
    document.body.appendChild(popup);
    popup.addEventListener('click', (event) => {
      if (event.target === popup) popup.remove();
    });
           }}
            >
        Continue to Full Tool
      </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="advertisement-section">
        <div className="ad-container">
          <div className="ad-content">
            <h2>Interested in selling your home?</h2>
            <p className="ad-text">
              Buy or sell your home with our expert agents. House valuations, inspections, 
              negotiations and other premium services are included in our comprehensive packages.
            </p>
            <div className="ad-features">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Free property valuation</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Professional photography</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Dedicated agent support</span>
              </div>
            </div>
            <button 
              className="ad-contact-btn"
              onClick={() => window.location.href = '/contact'}
            >
              Contact us <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="ad-image">
            <img 
              src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Beautiful home for sale" 
            />
            <div className="image-overlay1">
              <span>Let us handle the hard work</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Cities - Video Section */}
      <section className="shorts-section">
        <div className="shorts-container">
          <div className="shorts-header">
            <h2>Explore Cities</h2>
            <p className="shorts-subtitle">Discover India's real estate through local eyes</p>
          </div>
          
          <div className="shorts-description">
            <p>Find your dream neighborhood and explore it with your home purchase advisor. We're here to help you find the perfect home.</p>
          </div>

          <div className="shorts-video-grid">
            {/* Mumbai Short */}
            <div className="short-video-card" data-aos="fade-up">
              <div className="video-wrapper">
                <video 
                  poster="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-3585-large.png" 
                  loop 
                  muted 
                  playsInline
                  autoPlay
                >
                  <source src={vid1} type="video/mp4" />
                </video>
                <div className="video-overlay">
                  <div className="city-tag">Mumbai</div>
                  {/* <button className="play-pause-btn">
                    <i className="fas fa-play"></i>
                  </button> */}
                </div>
              </div>
              <div className="video-stats">
                <span><i className="fas fa-eye"></i> 24.5k</span>
                <span><i className="fas fa-heart"></i> 1.2k</span>
              </div>
            </div>

            {/* Delhi Short */}
            <div className="short-video-card" data-aos="fade-up" data-aos-delay="100">
              <div className="video-wrapper">
                <video 
                 
                  loop 
                  muted 
                  playsInline
                  autoPlay
                >
                  <source src={vid2} type="video/mp4" />
                </video>
                <div className="video-overlay">
                  <div className="city-tag">Delhi</div>
                  {/* <button className="play-pause-btn"> */}
                    {/* <i className="fas fa-play"></i> */}
                  {/* </button> */}
                </div>
              </div>
              <div className="video-stats">
                <span><i className="fas fa-eye"></i> 18.3k</span>
                <span><i className="fas fa-heart"></i> 892</span>
              </div>
            </div>

            {/* Bangalore Short */}
            <div className="short-video-card" data-aos="fade-up" data-aos-delay="200">
              <div className="video-wrapper">
                <video 
                  poster="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-modern-city-with-high-buildings-3587-large.png" 
                  loop 
                  muted 
                  playsInline
                  autoPlay
                >
                  <source src= {vid3} type="video/mp4" />
                </video>
                <div className="video-overlay">
                  <div className="city-tag">Bangalore</div>
                  {/* <button className="play-pause-btn">
                    <i className="fas fa-play"></i>
                  </button> */}
                </div>
              </div>
              <div className="video-stats">
                <span><i className="fas fa-eye"></i> 21.7k</span>
                <span><i className="fas fa-heart"></i> 1.1k</span>
              </div>
            </div>

            {/* Hyderabad Short */}
            <div className="short-video-card" data-aos="fade-up" data-aos-delay="300">
              <div className="video-wrapper">
                <video 
                  poster="https://assets.mixkit.co/videos/preview/mixkit-city-with-a-river-and-a-bridge-3586-large.png" 
                  loop 
                  muted 
                  playsInline
                  autoPlay
                >
                  <source src= {vid4} type="video/mp4" />
                </video>
                <div className="video-overlay">
                  <div className="city-tag">Hyderabad</div>
                  {/* <button className="play-pause-btn">
                    <i className="fas fa-play"></i>
                  </button> */}
                </div>
              </div>
              <div className="video-stats">
                <span><i className="fas fa-eye"></i> 15.9k</span>
                <span><i className="fas fa-heart"></i> 745</span>
              </div>
            </div>
          </div>

          <div className="shorts-cta">
            {/* <button 
              className="shorts-btn"
              onClick={() => alert('Showing more city guides')}
            >
              <i className="fas fa-compass"></i> Explore More Cities
            </button> */}
          </div>
        </div>
      </section>

      {/* For Sale Properties Section */}
      <section className="for-sale-sectionn1">
        <div className="salecontainerr">
          <div className="sectionn-headerr" data-aos="fade-up">
            <h2 className="gradient-textt">For Sale</h2>
            <p className="subtitlee">Latest properties in Pune</p>
            <p className="descriptionn">
              Search homes for sale in your local area by price, amenities, or other features. 
              We'll show you the sales history and provide helpful advice.
            </p>
          </div>

          <div className="property-gridd">
            {forSaleProperties.map((property) => (
              <div className="property-cardd" key={property.id} data-aos="flip-left">
                {property.status && (
                  <div className={`property-badgee ${property.status === 'Trending' ? 'trending' : ''}`}>
                    {property.status}
                  </div>
                )}
                <div 
                  className="property-imagee" 
                  style={{backgroundImage: `url(${property.image})`}}
                  onClick={() => handleQuickView(property)}
                >
                  <div className="image-overlay"></div>
                  {/* <button className="quick-view-btn">
                    <i className="fas fa-expand"></i> Quick View
                  </button> */}
                </div>
                <div className="property-detailss">
                  <h3>{property.price}</h3>
                  <p className="addresss">{property.address}</p>
                  <div className="featuress">
                    <span><i className="fas fa-bed"></i> {property.beds} Beds</span>
                    <span><i className="fas fa-bath"></i> {property.baths} Baths</span>
                    <span><i className="fas fa-vector-square"></i> {property.area} sq.ft</span>
                  </div>
                  <div className="property-footerr">
                    <span className="days-on-market">
                      <i className="fas fa-clock"></i> Listed {property.daysOnMarket} days ago
                    </span>
                    <button 
        className="enquire-btn"
      onClick={() => alert('Call us at: +1 234 567 8900')}
        >
        Enquire Now
        </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-container" data-aos="zoom-in">
            <div className="cta-card">
              <div className="cta-content">
                <h3>Can't find what you're looking for?</h3>
                <p>Our property experts can help you find your dream home</p>
               
              <button 
              className="ad-contact-btn"
              onClick={() => alert('Connecting you with our agents')}
            >
               <i className="fas fa-headset"></i> Contact Our Agent
            </button>
              </div>
              <div className="cta-image">
                <img src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Real Estate Agent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonialss-section">
        <div className="testimonialss-overlay"></div>
        <div className="coontainer">
          <div className="sectionn-header">
            <h2 className="sectionn-title">What Our Customers Are Saying</h2>
            <p className="sectionn-description">
              Buy or sell your home with our elite agents. Our team is knowledgeable, professional, and dedicated to your complete satisfaction!
            </p>
          </div>

          <div className="testimonialss-carousel">
            {allTestimonials.slice(0, visibleTestimonials).map(testimonial => (
              <div className="testimonial-cardd" key={testimonial.id}>
                <div className="cardd-inner">
                  <div className="clientt-rating">
                    {testimonial.rating}
                  </div>
                  <blockquote className="clientt-quote">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="clientt-info">
                    <div className="clientt-avatar">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div className="clientt-details">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleTestimonials < allTestimonials.length && (
            <div className="testimonials-cta">
              <button className="cta-button" onClick={loadMoreTestimonials}>
                Read More Success Stories
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default HomePage;