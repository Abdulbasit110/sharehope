# ShareHope Backend

## Project Overview
ShareHope is a backend service built with Express.js, designed to enable seamless donation and disposal of items. The backend provides APIs for user authentication, NGO management, donations, disposals, brand partnerships, and voucher systems. This project aims to simplify sustainable practices and foster community-driven efforts through a robust backend architecture.

---

## Features
- **User Authentication:** Secure signup, login, and authentication.
- **NGO Management:** Add, update, and manage NGOs.
- **Donations:** API to handle item donations.
- **Disposals:** Manage eco-friendly disposal of items.
- **Brands and Vouchers:** Partner brand management and voucher distribution.
- **CORS Support:** Allowing frontend communication with specified origins.

---

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB** (Local or Cloud-based)
- **Vercel CLI** (if deploying with Vercel)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ahmed-Abbasi-Official/sharehope/tree/backend
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   ACCEES_TOKEN_SECRET
    ACCEES_TOKEN_EXPIRY=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    CORS_ORIGIN=*
    MONGODB_URI
    PORT=4000
    OWNER_EMAIL
    OWNER_EMAIL_SECRET
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Test the application:
   The backend will be running at `http://localhost:4000`.

---

## Deployment

### Deploying with Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Link the project:
   ```bash
   vercel
   ```

3. Configure Vercel settings:
   ```bash
   vercel env add
   ```
   Add the same environment variables from your `.env` file.

4. Deploy:
   ```bash
   vercel deploy
   ```

---

## Folder Structure
```
.
├── db/                  # MongoDB connection setup
├── routes/              # API route definitions
├── controllers/         # API logic and controllers
├── middlewares/         # Authentication and other middleware
├── models/              # Mongoose models
├── utils/               # Helper functions
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
├── vercel.json          # Vercel deployment configuration
└── index.js             # Entry point
```

## Contributing
Feel free to contribute to this project by creating a pull request or submitting an issue on the GitHub repository.

---

## Contact
For any questions or support, contact:
- **Email:** abdulbasit4408944@gmail.com
- **GitHub:** [GitHub Profile](https://github.com/abdulbasit110)

---

Thank you for supporting **ShareHope** and contributing to a more sustainable future!

