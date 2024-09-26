<h1 align="center"><b>StudyBuddy</b></h1>

<h4 align="center"><b>Your personal guide to class documents and past assignments</b></h4>
<h4 align="center"><a href="https://devpost.com/software/studybuddy-t6bldn">Made in 24 hours as part of the 2023 UF AI Days Hackathon</a></h4>

<p align="center">
<a href="https://github.com/jackschedel/StudyBuddy/blob/main/LICENSE" target="_blank">
<img src="https://img.shields.io/github/license/jackschedel/StudyBuddy?style=flat-square" alt="licence" />
</a>
<a href="https://github.com/jackschedel/StudyBuddy/issues" target="_blank">
<img src="https://img.shields.io/github/issues/jackschedel/StudyBuddy?style=flat-square" alt="issues"/>
</a>
<a href="https://github.com/jackschedel/StudyBuddy/pulls" target="_blank">
<img src="https://img.shields.io/github/issues-pr/jackschedel/StudyBuddy?style=flat-square" alt="pull-requests"/>
</a>

## 📚👩🎓 StudyBuddy: A Personalized Tutoring App

Meet StudyBuddy, your personal guide to your academic success. This innovative platform is designed to provide targeted assistance and personalized tutoring based on your class documents and past assignments. Whether you need help with specific questions, wish to grasp the main points of an assignment, or simply want to refresh your knowledge before an exam, StudyBuddy is your ultimate academic companion. By accessing your course documents, StudyBuddy provides context-sensitive guidance and support, boosting your understanding and performance in your courses.

<p align="center">
    <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/625/266/datas/original.png" alt="landing" width=800 />
</p>

## 💡 Inspiration

Our primary inspiration for StudyBuddy sprouted from the evolving world of User Interface (UI) design. We found a growing trend towards users querying AI for information rather than browsing through traditional UIs. This, coupled with the desire to create a robust platform that could evolve and expand over time, led to the genesis of StudyBuddy. We envisioned a platform that could revolutionize the way students interact with their course materials and assignments, making learning more personal and effective.

## 🛠️ How we built it

StudyBuddy was brought to life using a combination of cutting-edge technologies. The front end was crafted using TypeScript and React, providing an intuitive and user-friendly interface. For the backend, we utilized a Flask app to make API calls for the Canvas API, OpenAI API, and Documents Loaders/Transformers. The Langchain library was instrumental for the LLM Prompt engineering and chaining, enabling us to create a dynamic and responsive tutoring system. This blend of technologies allowed us to create a platform that is both powerful and adaptable.

## 🔨 Built With

- TypeScript
- TailwindCSS
- React
- Flask
- Langchain


Installation Instructions

To run StudyBuddy locally, follow the steps below:

Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 14.x or higher) and npm for the front end. You can download them from here.
Python 3.x for the back end (Flask app) and pip for installing Python dependencies. Download Python from here.
Step-by-Step Installation
Clone the Repository: Clone the StudyBuddy repository to your local machine:

Navigate to the backend folder:

Install the required Python dependencies:

Navigate to the frontend folder:

Start the development server:

Access the Application: Once both the back end and front end are running, open your browser and visit:

http://localhost:3000

Usage Examples

StudyBuddy can help you analyze documents and assignments. Below are some examples of how to interact with the app:

Example 1: Analyze Assignment Documents
You can upload an assignment document (PDF or Word) to StudyBuddy. It will provide context-sensitive guidance based on the content of the document.

To analyze a document via the back end:

curl -X POST "http://localhost:5000/api/analyze" -F "file=@assignment.pdf"

Example 2: Ask a Question
Use the built-in chat feature to ask StudyBuddy questions about your documents. For instance:

"What are the main points of my assignment?"

StudyBuddy will provide a summary or explanations based on the document's content.