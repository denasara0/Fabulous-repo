import React, { useState } from 'react';
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
  const [chatbotVisible, setChatbotVisible] = useState(false); // Manage chatbot visibility

  const handleChatbotToggle = () => {
    setChatbotVisible(!chatbotVisible); // Toggle chatbot visibility
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h2>Welcome to your AI-assisted counselor</h2>
        <button className="cta-button" onClick={handleChatbotToggle}>
          Let's chat
        </button>
      </div>

      {/* Conditionally render the chatbot popup */}
      {chatbotVisible && <Chatbot closeChatbot={handleChatbotToggle} />}
    </section>
  );
};

// Chatbot Component (Placeholder)
const Chatbot = ({ closeChatbot }) => {
  return (
    <div className="chatbot">
      <div className="chatbot-header">
        Chatbot (Placeholder)
        {/* Exit button */}
        <button className="close-button" onClick={closeChatbot}>X</button>
      </div>
      <div className="chatbot-body">
        <p>Chatbot content will appear here...</p>
      </div>
      <div className="chatbot-footer">
        <button>Start Chat</button>
      </div>
    </div>
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
