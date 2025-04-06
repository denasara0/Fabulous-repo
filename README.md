# Smart Course Selector AI Agent

## Overview

The **Smart Course Selector AI Agent** is an AI-powered chatbot designed to help students choose the most suitable courses for an upcoming semester. The chatbot recommends courses based on a student's career goals, preferences, course prerequisites, credit requirements, and course availability.

This project is built using **React** for the frontend, **Django** for the backend, **MongoDB** for data storage, and uses the **Gemma** machine learning model to process user inputs and recommend courses.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Django
- **Database:** MongoDB
- **Chatbot Framework:** [react-chatbotify](https://github.com/tjtanjin/react-chatbotify)
- **Machine Learning Model:** LLaMA 3 1B

---

## Key Features

1. **Landing Page**:
   - A basic landing page built with React that serves as the introduction to the course selector tool. The landing page also provides basic information about the functionality of the chatbot

2. **AI Chatbot**:
   - Integrated **React-based conversational UI** using the [react-chatbotify](https://github.com/tjtanjin/react-chatbotify) framework.
   - Uses the **LLaMA 3 1B** machine learning model to process student inputs and provide relevant course recommendations based on the selected career goals, preferences, and available credits.

3. **Course Selection Flow**:
   - The chatbot interacts with users, asking for information such as:
     - Enrollment type (graduate/undergraduate, full-time/part-time)
     - Career goals (e.g., Data Scientist, UX Designer, Product Manager)
     - Course preferences (challenging or easier classes, grade distributions)
   - Based on the answers, the chatbot provides course recommendations, checks prerequisites, and ensures total credits are within the allowed limits.
   - Offers options to modify selections, view available time slots, and finalize the course selection.

---

## Progress So Far

### **Frontend:**
- Completed **Landing Page**.
- Integrated **React-based chatbot** using the [react-chatbotify](https://github.com/tjtanjin/react-chatbotify) framework.
- Combined chatbot with the landing page.

### **AI/ML Integration:**
- **LLaMA 3 1B** model selected for processing user input.
- **Model training** based on course data, professor information, and course credits. Due to time constraints, the bot is currently only trained for the undergraduate computer science major, and all concentrations.

### **Backend:**
- **Django Project Setup**:
  - Created a Django project (`course_selector`) and connected to **MongoDB** using **Djongo**.
  - Set up the backend to handle API requests for course filtering, career goal selection, and user session management.

- **Models Created:**
  - Course catalogs
  - Student preferences
  - Selected courses

## User Journey

1. **Ask for Enrollment Type**:
   - Are you a graduate or undergraduate student?
   - Are you full-time or part-time?
   - What is your major? What are your career goals?

2. **Career Goal Selection**:
   - Career options such as [Data Scientist], [UX Designer], and [Product Manager].

3. **Display Courses**:
   - Courses are recommended based on the selected career goal.

4. **Prerequisite Check**:
   - If prerequisites are met, proceed; if not, users are redirected to available courses.

5. **Time Slot Availability**:
   - Check for time slot clashes with already selected courses.

6. **Finalize Course Selection**:
   - Users can review their course selections and ensure they are within the credit limits.

---

## Remaining Tasks

While the core functionality is already in place, a few tasks are still pending to fine-tune the experience:

- **Complete API Endpoints**:
  - A couple of endpoints need further refinement for seamless integration between the frontend and backend. This will ensure smoother course selection and credit tracking.

- **Session Handling & Validation**:
  - Need to finalize how session management will work when users refresh or end their chat. This is a relatively minor task that will be added as we test the system.

These tasks are manageable and won't take much time to wrap up.

---

## Future Enhancements

We’ve made great progress with the AI chatbot and course selector features, and here are a few things we plan to improve or add down the line:

- **Expanded Course Catalog**: We can add more courses and career options to make the tool more comprehensive.
- **Real-time Course Availability**: Fetch live course data to check availability and adjust recommendations accordingly.
- **User Accounts**: Allow students to save and track their course selections for future semesters.
- **Advanced Chatbot Interaction**: Fine-tune the chatbot to better understand user preferences and provide more personalized course suggestions.

While these features would definitely enhance the app, the current version already provides the core functionality for selecting courses based on career goals and credit requirements.

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/denasara0/Fabulous-repo.git

2. Install frontend dependencies:

    cd Fabulous-repo
    npm install
3. Set up the backend (Django):
    cd course_selector
    python manage.py runserver
4. To run the app in development mode:
    npm start
    Open http://localhost:3000 in your browser.

