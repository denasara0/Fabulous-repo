## Inspiration
The inspiration behind Alyssa: AI-powered Course Advisor stems from the need to simplify and enhance the course selection process for students. With the growing complexity of university course catalogs, credit requirements, and career-focused academic pathways, students often struggle to make the right choices. Our goal was to create an intelligent assistant that could guide students through course selection based on their career aspirations, personal preferences, and academic needs. Alyssa is designed to be a one-stop solution, streamlining the process and making it more accessible, personalized, and data-driven.

## What it does
Alyssa helps students choose the most suitable courses for an upcoming semester. By interacting with the user, Alyssa gathers information about the student’s career goals, course preferences, enrollment type, and credit requirements. Based on this data, the AI then recommends courses, checks prerequisites, and ensures credit limits are met. The chatbot also allows students to modify their selections, view available time slots, and finalize their course choices, all while offering a user-friendly conversational interface.

To inform these recommendations, Alyssa leverages a variety of data sources: historical grade distributions, professor ratings, OCQ (student course evaluations), structured prerequisite data, and degree requirement mappings. These allow the AI to assess course difficulty, identify good professor matches, and ensure that suggested courses fulfill degree progress and eligibility requirements.

## How we built it
**Frontend:** React was used to develop the user interface.

**Backend:** Ollama was used to run a local `gemma3:4b` model that we provided custom training data to. The data we provided included:

- Class listings and structured prerequisites  
- All required classes and electives for each degree and specialization  
- Historical grade distribution data for CSCI/INFO courses  
- Rate My Professor-style feedback on clarity, helpfulness, and flexibility  
- Official Course Questionnaire (OCQ) student evaluations with insight into challenge level, teaching style, and learning expectations  

These datasets were scraped using custom Python and Node.js scripts from Indiana University’s course and evaluation portals. The data was processed into structured formats (e.g., JSON) and used both in training and during inference to support dynamic, accurate course advising.

The flexible `gemma3:4b` model allows Alyssa to utilize this information intelligently while conversing naturally in plain English.

**Project Management:** This project (both the frontend and backend) was developed using Node.js to build and host the React app, as well as to facilitate the packages used for API requests between the frontend and the backend.

**Machine Learning:** We used the `gemma3:4b` model for processing user input and recommending relevant courses based on user preferences and goals.

**API Endpoints:** The backend exposes several API endpoints to facilitate the course recommendation system, such as endpoints to filter courses, manage user sessions, and handle career options.

## Challenges we ran into
**Integration of the `gemma3:4b`:** One of the major challenges was integrating the model into the system for processing and interpreting user input. Ensuring that the model provided accurate and relevant course suggestions required substantial data preprocessing and training, especially to account for the variety of data types (numerical, textual, structural) such as OCQs, prerequisites, and degree audits.

**Session Management:** Managing user sessions in the context of an interactive chatbot posed a challenge, especially when users would return to the chat after a while. We had to ensure that session data was correctly maintained across interactions.

**Frontend-Backend Synchronization:** Ensuring smooth communication between the frontend React interface and the Ollama backend was a key challenge. We had to fine-tune API endpoints and ensure that the data flow was seamless for real-time recommendations.

**Limitations with training:** We needed to switch AI models and adjust prompts accordingly to ensure that the training process went smoothly. The process of gathering data (from grade distributions to professor feedback) and using it to train the bot proved far more challenging and time-consuming than anticipated but was also highly rewarding as a learning experience.

## Accomplishments that we're proud of
**Successful AI Integration:** We are particularly proud of how we integrated the `gemma3:4b` model into the chatbot, enabling it to provide highly relevant course recommendations based on user input.

**Chatbot Interaction:** The chatbot’s ability to handle complex user queries regarding course selections and career goals is a significant accomplishment. It gives users a more interactive, guided experience compared to traditional course catalog browsing.

**Chatbot Streaming:** Rather than waiting for the chatbot to generate the entire response before displaying, the chatbot backend API (Ollama) allows us to stream the response in real time as it is generated, and display it to the user. This reduces the amount of time the user is looking at a loading screen, and maximizes interactivity.

**Seamless Frontend-Backend Setup:** We were able to create a seamless connection between the React frontend and the Ollama backend, enabling real-time interaction with the course selection process.

## What we learned

**AI Model Integration:** We learned how to incorporate large-scale AI models (like `gemma3:4b`) into real-world applications and how to fine-tune them to perform specific tasks such as course recommendation.

**Chatbot Development:** Through working with the React and REST API framework, we learned how to build interactive, dynamic chatbots and improve user engagement through conversation.

**Backend-Frontend Communication:** We gained valuable experience in managing data synchronization between the frontend and backend, making sure that the app is responsive and efficient for users.

**Data-Driven Advising:** We also learned the importance of data cleanliness and contextual relevance. Parsing student evaluations, mapping prerequisites, and identifying course overlap all presented unique challenges that deepened our understanding of educational data systems.
