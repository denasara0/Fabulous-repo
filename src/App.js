import React, { useState, useEffect } from 'react';
import './App.scss';
import ApiRequestComponent from './ApiRequestComponent';

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
    const resizeSensitivity = 0.01; // Lower value for less sensitivity
    const mouseMove = (moveEvent) => {
      if (direction === 'right') {
        // Change the width based on mouse movement and sensitivity factor
        setChatbotSize((prev) => ({
          ...prev,
          width: Math.max(prev.width + (moveEvent.clientX - e.clientX) * resizeSensitivity, 100), // Minimum width is 100px
        }));
      } else if (direction === 'bottom') {
        // Change the height based on mouse movement and sensitivity factor
        setChatbotSize((prev) => ({
          ...prev,
          height: Math.max(prev.height + (moveEvent.clientY - e.clientY) * resizeSensitivity, 100), // Minimum height is 100px
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
        AI Assistant
        {/* Exit button */}
        <button className="close-button" onClick={closeChatbot}>X</button>
      </div>
      <div className="chatbot-body">
        {<ApiRequestComponent />}
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
