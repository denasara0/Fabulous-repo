import React, { useState, useEffect } from 'react';
import './App.scss';
import LammaRequestComponent from './LammaRequestComponent';

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://i.ibb.co/DytGX4Q/logo-banner-1536x758-Photoroom.png" alt="Alyssa Course Selection Chatbot" className="logo-image" />
      </div>
      <nav>
        <ul>
          <li><a href="#hero">Home</a></li>
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
        <h2>Meet Alyssa, Your New AI-assisted Course Advisor</h2>
        <div className="hero-logo">
          <img src="https://i.ibb.co/JRdkh1mL/Chat-GPT-Image-Apr-6-2025-02-14-59-PM-Photoroom.png" alt="Alyssa Logo" className="hero-logo-image" />
        </div>
        <button className="cta-button" onClick={handleChatbotToggle}>
          Chat with Alyssa
        </button>
      </div>

      {/* Conditionally render the chatbot popup */}
      {chatbotVisible && <Chatbot closeChatbot={handleChatbotToggle} />}
    </section>
  );
};

// Chatbot Component (with draggable and resizable functionality)
const Chatbot = ({ closeChatbot }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [chatbotPosition, setChatbotPosition] = useState({ top: 100, left: 100 });
  const [chatbotSize, setChatbotSize] = useState({ width: 400, height: 600 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle dragging start
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Handle dragging move
  const handleDragMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setChatbotPosition({
        top: chatbotPosition.top + dy,
        left: chatbotPosition.left + dx,
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle dragging end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle resizing
  const handleResize = (e, direction) => {
    e.stopPropagation(); // Prevent dragging while resizing
    const mouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      if (direction === 'right') {
        const dx = (moveEvent.clientX - e.clientX) * 0.5; // Added 0.5x scaling factor
        setChatbotSize(prev => ({
          ...prev,
          width: Math.min(Math.max(prev.width + dx, 300), window.innerWidth - chatbotPosition.left - 20) // Min width 300px, max is window width - margin
        }));
      } else if (direction === 'bottom') {
        const dy = (moveEvent.clientY - e.clientY) * 0.5; // Added 0.5x scaling factor
        setChatbotSize(prev => ({
          ...prev,
          height: Math.min(Math.max(prev.height + dy, 200), window.innerHeight - chatbotPosition.top - 20) // Min height 200px, max is window height - margin
        }));
      }
    };

    const mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, dragStart, chatbotPosition]);

  return (
    <div
      className="chatbot"
      style={{
        top: `${chatbotPosition.top}px`,
        left: `${chatbotPosition.left}px`,
        width: `${chatbotSize.width}px`,
        height: `${chatbotSize.height}px`,
      }}
      onMouseDown={handleDragStart}
    >
      <div className="chatbot-header">
        Alyssa - Course Advisor
        {/* Exit button */}
        <button className="close-button" onClick={closeChatbot}>X</button>
      </div>
      <div className="chatbot-body">
        <LammaRequestComponent />
      </div>
      <div className="chatbot-footer">
      </div>
      {/* Resizing handles */}
      <div
        className="resize-handle resize-right"
        onMouseDown={(e) => handleResize(e, 'right')}
      />
      <div
        className="resize-handle resize-bottom"
        onMouseDown={(e) => handleResize(e, 'bottom')}
      />
    </div>
  );
};

// Features Component
const Features = () => {
  return (
    <section id="features" className="features">
      <h2>How can I assist you?</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Course Selection</h3>
          <p>Our Dynamic AI will help you select courses based on level, preferences, goals, your major, and more</p>
        </div>
        <div className="feature-item">
          <h3>Career Coaching</h3>
          <p>Get customized course suggestions based on your career aspirations coupled with the ability to meet you where you are in your learning journey</p>
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
