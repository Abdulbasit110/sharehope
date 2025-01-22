# ShareHope Frontend

## Project Overview
The ShareHope Frontend is a responsive web application built using React.js and Tailwind CSS. It provides an intuitive user interface for donors, NGOs, and administrators to interact with the ShareHope platform. The application is designed to enhance user engagement, streamline donation workflows, and manage partnerships effectively.

---

## Features
- **User-Friendly Interface:** Clean and responsive design.
- **Donor Dashboard:** Track donations, manage disposals, and claim rewards.
- **NGO Dashboard:** Manage donation requests and update profiles.
- **Admin Dashboard:** Oversee user accounts, NGOs, donations, and disposals.
- **Authentication:** Secure login and registration.
- **API Integration:** Seamless communication with the ShareHope backend.

---

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** or **yarn** (package manager)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdulbasit110/sharehope
   cd sharehope
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_CLOUDINARY_URL=your-cloudinary-url
   REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Folder Structure
```
.
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable components
│   ├── pages/          # Application pages (e.g., Home, Dashboard)
│   ├── services/       # API calls and integrations
│   ├── store/          # Global state management (e.g., Zustand)
│   ├── styles/         # Custom styles and Tailwind CSS configuration
│   ├── utils/          # Helper functions
│   ├── App.js          # Main application component
│   └── index.js        # Entry point
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
└── tailwind.config.js  # Tailwind CSS configuration
```

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

### Deploying with Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Link the project:
   ```bash
   netlify init
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

---

## Usage

### Running Tests
1. Install testing dependencies:
   ```bash
   npm install --save-dev @testing-library/react jest
   ```

2. Run tests:
   ```bash
   npm test
   ```

### Linting and Formatting
Ensure code quality with ESLint and Prettier:
```bash
npm run lint
npm run format
```

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and open a pull request.

---

## Contact
For any questions or support, contact:
- **Email:** abdulbasit4408944@gmail.com
- **GitHub:** [GitHub Profile](https://github.com/abdulbasit110)



Thank you for using **ShareHope** and supporting a sustainable future!

