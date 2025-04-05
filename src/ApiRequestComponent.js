import React, { useState } from 'react';

const ApiRequestComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // Array to hold chat history
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    const url = 'http://localhost:11434/api/generate';
    const data = {
      model: 'gemma3:1b',
      prompt: message,
      stream: false,
    };

    try {
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
      // Update chat history with the user's message and the API response
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', text: message },
        { type: 'api', text: result.response }, // Assuming result is a string or can be displayed directly
      ]);
      setMessage(''); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      // Optionally, add the error to chat history
      setChatHistory((prev) => [
        ...prev,
        { type: 'error', text: err.message },
      ]);
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
      <button onClick={sendRequest}>Send</button>

      <div>
        <h3>Chat History:</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {chatHistory.map((entry, index) => (
            <div key={index} style={{ color: entry.type === 'user' ? 'blue' : entry.type === 'api' ? 'green' : 'red' }}>
              <strong>{entry.type === 'user' ? 'You:' : entry.type === 'api' ? 'API:' : 'Error:'}</strong> {entry.text}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ApiRequestComponent; 