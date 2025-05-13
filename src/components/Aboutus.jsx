import React, { useState } from 'react';
import './Aboutus.css';

const AboutUs = () => {
  // State for modal and listings visibility
  const [showModal, setShowModal] = useState(false);
  const [showListings, setShowListings] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'residential',
    message: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Data
  const stats = [
    { value: "5000+", label: "Properties Listed" },
    { value: "1200+", label: "Happy Clients" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Found my dream home within a week! The team understood exactly what I wanted.",
      author: "Neha K., Homebuyer",
      rating: 5
    },
    {
      id: 2,
      quote: "Their market insights helped me make a 30% ROI on my investment property.",
      author: "Rajesh M., Investor",
      rating: 5
    }
  ];

  const team = [
    {
      id: 1,
      name: "Gajanan",
      role: "Founder & CEO",
      expertise: "15+ years in real estate",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Priya",
      role: "Head of Sales",
      expertise: "Pune market specialist",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Amit",
      role: "Senior Advisor",
      expertise: "Kharadi area expert",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const featuredListings = [
    {
      id: 1,
      title: "Luxury Apartment in Kharadi",
      price: "₹1.2 Cr",
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "Apartment",
      location: "Kharadi",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Modern Villa in Viman Nagar",
      price: "₹2.5 Cr",
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "Villa",
      location: "Viman Nagar",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 3,
      title: "Cozy 2BHK in Wakad",
      price: "₹65 L",
      beds: 2,
      baths: 2,
      sqft: 1100,
      type: "Apartment",
      location: "Wakad",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send form data to the backend
      await fetch('http://localhost:5000/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error submitting consultation:', error);
    }
  
    // Continue with modal and popup logic
    console.log('Form submitted:', formData);
    setShowModal(false);
    setShowSuccessPopup(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: 'residential',
      message: ''
    });
  
    // Hide the success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };
  

  return (
    <div className="about-page">
      {/* Consultation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="consultation-modal">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>Book a Free Consultation</h2>
            <p>Fill out the form below and our expert will contact you within 24 hours</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select 
                  id="propertyType" 
                  name="propertyType" 
                  value={formData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land/Plot</option>
                  <option value="investment">Investment Property</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Requirements</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Submit Request</button>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your consultation request has been submitted successfully.</p>
            <p>We will contact you shortly.</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1> About Us</h1>
          <h1>Building Dreams, Creating Communities</h1>
          <p>Pune's most trusted real estate partner since 2010</p>
          <button 
           onClick={() => window.location.href = '/HomesList'}
           className="cta-button">Explore Properties
          </button>
        </div>
        <div className="hero-image">
          <div className="image-overlay"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p className="highlight">Founded in 2010, Masterplace Solutions began with a simple vision: to make real estate transactions transparent, efficient, and rewarding for everyone involved.</p>
          <p>What started as a small office in Kharadi has grown into Pune's premier property portal. We've helped over 1,200 families find their dream homes and assisted hundreds of investors in building profitable portfolios.</p>
        </div>
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Our office" />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop">
        <div className="prop-image">
          <img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Modern apartment" />
        </div>
        <div className="prop-content">
          <h2>Why Choose Us?</h2>
          <div className="prop-item">
            <div className="prop-icon">🏆</div>
            <div>
              <h3>Market Leaders</h3>
              <p>#1 rated real estate portal in Pune for 5 consecutive years</p>
            </div>
          </div>
          <div className="prop-item">
            <div className="prop-icon">🔍</div>
            <div>
              <h3>Curated Selection</h3>
              <p>Every property is personally verified by our team</p>
            </div>
          </div>
          <div className="prop-item">
            <div className="prop-icon">🤝</div>
            <div>
              <h3>End-to-End Service</h3>
              <p>From search to paperwork, we handle it all</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet The Experts</h2>
        <p className="subtitle">Our team combines decades of experience with genuine care for your needs</p>
        <div className="team-grid">
          {team.map(member => (
            <div className="team-card" key={member.id}>
              <div className="card-image">
                <img src={member.img} alt={member.name} />
                <div className="social-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="card-content">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="expertise">{member.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          {testimonials.map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote>"{testimonial.quote}"</blockquote>
              <cite>- {testimonial.author}</cite>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Ready to Find Your Perfect Property?</h2>
        <p>Schedule a free consultation with our experts today</p>
        <div className="cta-buttons">
          <button className="primary" onClick={() => setShowModal(true)}>Book Consultation</button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;