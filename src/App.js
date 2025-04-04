import React from 'react';
import './App.scss'; // Import your SCSS for styling

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MyCompany</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#footer">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

// Hero Component (the header block part)
const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h2>Welcome to your AI assisted counselor</h2>
        <button className="cta-button">Let's chat</button>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  return (
    <section id="features" className="features">
      <h2>How can I help?</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Course Selection</h3>
          <p>Pick from a menu of pre-selected relevant courses</p>
        </div>
        <div className="feature-item">
          <h3>Career Coaching</h3>
          <p>Get customized course suggestions based on your career aspirations</p>
        </div>
        <div className="feature-item">
          <h3>Prerequisite Scanning</h3>
          <p>Tell our chatbot what courses you completed, and we will select appropriately matched
            classes for you
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <p>2025 Indiana University Course Catalog</p>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default App;
