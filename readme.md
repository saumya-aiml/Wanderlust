# WanderLust 🏡

A full-stack travel accommodation listing web application where users can explore places to stay, create listings, and share reviews.

## 🌐 Live Demo

**Live Website:** [(https://wanderlust-tnoc.onrender.com/listings)]

## 📌 Project Overview

WanderLust is a travel listing platform inspired by vacation rental websites. It allows users to discover accommodations, view listing details, and share their experiences through reviews.

 Features

- User authentication and authorization
- Create, view, edit, and delete property listings
- Upload and display listing images
- Add and delete reviews
- Interactive maps using Mapbox
- Flash messages for success and error notifications
- Responsive user interface

 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Bootstrap, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** Passport.js
- **Maps:** Mapbox
- **Image Storage:** Cloudinary
- **Deployment:** Render
- **Version Control:** Git and GitHub

 Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/saumya-aiml/Wanderlust.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Wanderlust
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and configure the required environment variables, such as your MongoDB connection string, session secret, Mapbox token, and Cloudinary credentials, according to your application code.

5. Start the application using the start script defined in `package.json`, or run:

   ```bash
   node app.js
   ```

6. Open `http://localhost:8080` in your browser if your application is configured to use port 8080 locally.

 Environment Variables

Keep all API keys, database credentials, and session secrets private. Never commit your `.env` file to GitHub.

 Author

**Saumya Verma**

GitHub: [saumya-aiml](https://github.com/saumya-aiml)

---

If you find this project useful, feel free to explore the repository and share feedback.
