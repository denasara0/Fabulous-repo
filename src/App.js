import React, { useEffect, useState } from 'react';
import './App.scss';

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
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    // Trigger the blinking effect after the sliding-in text animation completes (2 seconds)
    const timer = setTimeout(() => {
      setBlink(true);
    }, 2000); // Delay the blink until after the slide-in animation finishes

    // Optionally, reset the blink after the animation runs once
    const resetTimer = setTimeout(() => {
      setBlink(false);
    }, 3000); // Blink duration (1 second)

    // Clean up the timers on unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h2>Welcome to your AI-assisted counselor</h2>
        <button className={`cta-button ${blink ? 'blink' : ''}`}>
          Let's chat
        </button>
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
