# AI Resume Analyzer

An intelligent, AI-powered web application that helps candidates prepare for job interviews by analyzing their resumes against specific job descriptions. The app provides match scores, technical questions, and behavioral questions tailored to the candidate's profile.

## 🚀 Features
- **Authentication**: Secure user registration and login using JWT stored in HTTP-only cookies.
- **AI Resume Analysis**: Upload a PDF resume and job description to get a comprehensive interview preparation report powered by Google Gemini AI.
- **Credit/Token System**: Users consume tokens for each resume analysis. 
- **Payment Integration**: Seamless token purchasing via Razorpay integration.
- **Report Management**: Save, view, and delete past interview prep reports.
- **Modern UI**: Fully responsive, animated, and beautifully designed frontend using React, Tailwind CSS, and Framer Motion.

## 🔄 Application Flow

### 1. Authentication Flow
- User registers/logs in via the frontend.
- Backend validates credentials, generates a JSON Web Token (JWT), and sets it as an HTTP-only cookie.
- The frontend `AuthContext` verifies the session on load by hitting a `/getme` endpoint.

### 2. Resume Analysis Flow
- **Input**: User navigates to the interview setup page, uploads their Resume (PDF), and pastes a Job Description.
- **Validation**: Backend checks if the user has at least `1 token` available. If not, the request is rejected with a prompt to buy more.
- **Processing**: 
  - `multer` handles the file upload in memory.
  - `pdf-parse` extracts the text content from the PDF.
  - The text, along with the job description, is sent to the **Google Gemini AI** via a structured prompt to generate a JSON response containing match scores and tailored interview questions.
- **Completion**: 1 token is deducted from the user's account, the report is saved to MongoDB, and the frontend redirects the user to the Report View.

### 3. Payment Flow (Razorpay)
- User navigates to the Pricing page when out of tokens.
- User selects a plan (Basic, Pro, Super). Frontend requests an order creation from the backend.
- Backend uses the Razorpay SDK to create an order and returns the `order_id`.
- Frontend opens the Razorpay checkout widget.
- Upon successful payment, Razorpay returns a payment signature.
- Frontend sends the signature to the backend's `/verify-payment` route.
- Backend verifies the signature using `crypto` HMAC-SHA256. If valid, the purchased tokens are added to the user's database record.

## 📦 Dependencies Used

### Frontend (Client)
- **Framework**: React (v19) + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios (configured with `withCredentials: true` for cookie support)

### Backend (Server)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose (ODM)
- **Authentication**: JsonWebToken (JWT), Bcrypt (Password Hashing)
- **File Handling**: Multer (Multipart/form-data), PDF-Parse (PDF text extraction)
- **AI Integration**: `@google/genai` (Google Gemini 3.5 Flash Lite)
- **Payments**: Razorpay Node SDK
- **Utilities**: Cookie-Parser, Cors, Dotenv

## 🛠️ Environment Variables Setup

Create a `.env` file in the **server** directory with the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
RAZORPAY_API_KEY=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Create a `.env` file in the **client** directory:
```env
VITE_BACKEND_URL=http://localhost:5000/api
```

## 💻 How to Run Locally

1. **Clone the repository**
2. **Install dependencies**:
   - Open a terminal in the `client` folder and run `npm install`
   - Open a terminal in the `server` folder and run `npm install`
3. **Start the development servers**:
   - In the `server` folder, run `npm run dev` (starts on port 5000)
   - In the `client` folder, run `npm run dev` (starts on port 5173)
4. **Access the app**: Open `http://localhost:5173` in your browser.
