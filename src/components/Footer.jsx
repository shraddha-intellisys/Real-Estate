import React, { useState } from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaTimes, FaCheck } from 'react-icons/fa';

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an actual API call to your backend
      // await axios.post('/api/subscribe', { email });
      
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      setEmailError('Subscription failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Top Section - Newsletter & Quick Links */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest property listings and real estate news</p>
            
            {isSubscribed ? (
              <div className="subscription-success">
                <FaCheck className="success-icon" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailError ? 'error' : ''}
                  />
                  <button 
                    type="submit" 
                    className="subscribe-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'} <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                {emailError && <div className="error-message">{emailError}</div>}
              </form>
            )}
            
            <div className="social-links">
              <a href="https://www.facebook.com/masterplace" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF/>
              </a>
              <a href="https://twitter.com/masterplace" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter/>
              </a>
              <a href="https://www.instagram.com/masterplace" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram/>
              </a>
              <a href="https://www.linkedin.com/company/masterplace" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn/>
              </a>
              <a href="https://www.youtube.com/c/masterplace" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube/>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="links-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/homeslist">Properties</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><button onClick={togglePrivacyPolicy} className="privacy-link">Privacy Policy</button></li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Services</h4>
              <ul>
                <li>Buy Property</li>
                <li>Sell Property</li>
                <li>Rent Property</li>
                <li>Property Valuation</li>
                <li>Home Loans</li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Contact</h4>
              <ul className="contact-info">
                <li><FaMapMarkerAlt /> Kharadi, Pune, MH 411014</li>
                <li><a href="tel:+919970017701"><FaPhoneAlt /> +91 9970017701</a></li>
                <li><a href="mailto:info@masterplace.in"><FaEnvelope /> info@masterplace.in</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Masterplace Solutions. All rights reserved.
          </div>
         
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fas fa-rupee-sign"></i>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="privacy-modal">
          <div className="privacy-modal-content">
            <div className="privacy-modal-header">
              <h2>Privacy Policy for Masterplace Solutions</h2>
              <button onClick={togglePrivacyPolicy} className="close-modal">
                <FaTimes />
              </button>
            </div>
            <div className="privacy-modal-body">
              <p>At Masterplace Solutions, we are committed to protecting the privacy and confidentiality of our users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you interact with our real estate portal. By accessing or using our services, you agree to the terms of this Privacy Policy.</p>

              <h3>1. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details when you create an account, inquire about a property, or communicate with us.</li>
                <li><strong>Property Listings:</strong> Details you provide when listing a property, such as location, property type, size, price, and images.</li>
                <li><strong>Usage Data:</strong> Information related to your interactions with our website, including pages viewed, search queries, and other usage metrics, to enhance your experience.</li>
                <li><strong>Cookies:</strong> We use cookies and similar technologies to track user activity, preferences, and performance on our site.</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>The information we collect is used for:</p>
              <ul>
                <li><strong>Providing Services:</strong> To connect property seekers with real estate listings, facilitate communication between buyers and sellers, and enhance the overall user experience.</li>
                <li><strong>Improving Our Platform:</strong> To understand user behavior, improve our website functionality, and provide relevant property recommendations.</li>
                <li><strong>Communication:</strong> To respond to inquiries, send notifications about new listings or updates, and provide customer support.</li>
                <li><strong>Marketing:</strong> With your consent, we may send promotional offers, newsletters, or other marketing communications related to real estate opportunities.</li>
              </ul>

              <h3>3. Sharing Your Information</h3>
              <p>We may share your information in the following instances:</p>
              <ul>
                <li><strong>With Third-Party Service Providers:</strong> To perform services on our behalf, such as hosting, analytics, or marketing.</li>
                <li><strong>With Property Owners and Agents:</strong> When you inquire about a property, we may share your contact information with the relevant owners or agents to facilitate communication.</li>
                <li><strong>Legal Obligations:</strong> When required by law, regulation, or legal process, we may disclose your information to authorities.</li>
                <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, please note that no method of transmission over the internet or electronic storage is entirely secure.</p>

              <h3>5. Your Rights</h3>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> You can request access to the personal data we hold about you.</li>
                <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You may request that we delete your personal information, subject to legal obligations.</li>
                <li><strong>Opt-Out:</strong> You can unsubscribe from marketing communications at any time by following the opt-out instructions included in the emails.</li>
              </ul>

              <h3>6. Third-Party Links</h3>
              <p>Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites, and we encourage you to review their privacy policies before providing any personal information.</p>

              <h3>7. Children's Privacy</h3>
              <p>Our services are not intended for children under the age of 18. We do not knowingly collect personal information from individuals under 18. If we become aware that a child's information has been collected, we will take steps to delete it.</p>

              <h3>8. Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on our website, and we encourage you to review it periodically.</p>

              <h3>9. Contact Us</h3>
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <p>
                Masterplace Solutions<br />
                Kharadi, Pune<br />
                Email: info@masterplace.in<br />
                Phone: +91 9970017701
              </p>

              <p>By using our platform, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;