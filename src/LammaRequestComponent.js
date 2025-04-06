import React, { useState, useEffect, useRef } from 'react';

const LoadingDots = () => (
    <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
    </div>
);

const LammaRequestComponent = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStreamingResponse, setCurrentStreamingResponse] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const chatHistoryRef = useRef(null);

    // Scroll to bottom whenever chat history or streaming response changes
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, currentStreamingResponse]);

    // Add the streaming response to chat history when streaming ends
    useEffect(() => {
        if (!isStreaming && currentStreamingResponse) {
            setChatHistory(prev => [
                ...prev,
                { type: 'api', text: currentStreamingResponse }
            ]);
            setCurrentStreamingResponse('');
        }
    }, [isStreaming, currentStreamingResponse]);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        if (chatHistoryRef.current) {
            // Use setTimeout to ensure the DOM has updated before scrolling
            setTimeout(() => {
                chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            }, 0);
        }
    };

    const sendRequest = async () => {
        if (!message.trim()) return;

        setIsLoading(true);
        setError(null);

        // Add user message to chat history immediately
        setChatHistory(prev => [
            ...prev,
            { type: 'user', text: message }
        ]);

        // Clear the input field
        setMessage('');

        // Scroll to bottom after adding user message
        scrollToBottom();

        try {
            // Initialize streaming response
            setCurrentStreamingResponse('');
            setIsStreaming(true);

            // Create a new message object for ollama
            const ollamaMessage = { role: 'user', content: message };

            // Start streaming response using fetch
            const response = await fetch('https://14cf-173-230-56-29.ngrok-free.app/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gemma3',
                    messages: [ollamaMessage],
                    stream: true
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get the reader from the response body stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // Process the stream
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                // Decode the chunk and update the streaming response
                const chunk = decoder.decode(value, { stream: true });

                // Parse the chunk (each line is a JSON object)
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    try {
                        const data = JSON.parse(line);
                        if (data.message && data.message.content) {
                            setCurrentStreamingResponse(prev => prev + data.message.content);
                            // Scroll to bottom as new content streams in
                            scrollToBottom();
                        }
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                    }
                }
            }

        } catch (err) {
            setError(err.message);
            setChatHistory(prev => [
                ...prev,
                { type: 'error', text: err.message }
            ]);
            // Scroll to bottom after adding error message
            scrollToBottom();
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="llama-chat-container">
            <div className="chat-input-container">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="chat-input"
                />
                <div className="send-button-container">
                    <button onClick={sendRequest} disabled={isLoading} className="send-button">
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>

            {/* Loading indicator between input and chat history */}
            {isStreaming && (
                <div className="loading-indicator">
                    <span>AI is thinking</span>
                    <LoadingDots />
                </div>
            )}

            <div className="chat-history-wrapper">
                <h3>Chat History:</h3>
                <div className="chat-history-container" ref={chatHistoryRef}>
                    {chatHistory.map((entry, index) => (
                        <div
                            key={index}
                            className={`chat-message ${entry.type}-message`}
                        >
                            <strong>{entry.type === 'user' ? 'You:' : entry.type === 'api' ? 'Alyssa:' : 'Error:'}</strong> {entry.text}
                        </div>
                    ))}

                    {/* Show streaming response if available */}
                    {currentStreamingResponse && (
                        <div className="chat-message api-message streaming">
                            <strong>AI:</strong> {currentStreamingResponse}
                        </div>
                    )}
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

export default LammaRequestComponent;