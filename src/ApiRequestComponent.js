import React, { useState } from 'react';

const LoadingDots = () => (
  <div className="loading-dots">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);

const ApiRequestComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // Array to hold chat history
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const url = 'http://localhost:11434/api/generate';
    const data = {
      model: 'gemma3:1b',
      prompt: message,
      stream: false,
    };

    try {
      // add  message and loading state immediately
      setChatHistory(prev => [
        ...prev,
        { type: 'user', text: message },
        { type: 'loading' }
      ]);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      
      // replace loading state with api response
      setChatHistory(prev => [
        ...prev.slice(0, -1), // remove loading dots
        { type: 'api', text: result.response }
      ]);
      
      setMessage('');
      setError(null);
    } catch (err) {
      setChatHistory(prev => [
        ...prev.slice(0, -1), // remove loading dots
        { type: 'error', text: err.message }
      ]);
      setError(err.message);
    } finally {
        // finally will clean the loading state after the promise resolves      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Send a Message to the AI Assistant</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendRequest} disabled={isLoading}>
        Send
      </button>

      <div>
        <h3>Chat History:</h3>
        <div className="chat-history-container">
          {chatHistory.map((entry, index) => (
            <div 
              key={index} 
              className={`chat-message ${entry.type}-message`}
            >
              {entry.type === 'loading' ? (
                <LoadingDots />
              ) : (
                <>
                  <strong>{entry.type === 'user' ? 'You:' : entry.type === 'api' ? 'AI:' : 'Error:'}</strong> {entry.text}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="error-container">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApiRequestComponent; 