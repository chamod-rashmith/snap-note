# CornellNotes+ (Snap Note)

**CornellNotes+** is an AI-powered, modern study platform designed for students, particularly those in STEM fields (Mathematics and Physics). It integrates the proven **Cornell Note-taking System** with advanced digital tools like AI-driven note generation, LaTeX support, real-time cloud synchronization, and a curated marketplace for sharing knowledge.

## 🚀 Key Features

### 🤖 AI-Powered Note Generation
*   **Instant Cornell Notes:** Generate comprehensive, structured Cornell notes on any topic in seconds using **Google Gemini 2.5 Flash**.
*   **Smart Formatting:** Automatically formats content into Cue, Note, and Summary sections.
*   **Math & Science Ready:** AI natively understands and generates complex LaTeX equations, scientific notation, and formulas.

### 📝 Smart Editor
*   **Cornell Methodology:** Specialized layout with distinct **Cue**, **Note**, and **Summary** sections to encourage active recall.
*   **Math & Physics Ready:** Built-in **LaTeX** support using [KaTeX](https://katex.org/). Write complex formulas effortlessly (e.g., `$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$`).
*   **Print & Export:** Export your notes to professional PDF formats with optimized 30/70 splits using built-in `react-to-print` support.
*   **Glassmorphism UI:** A beautiful, modern interface designed to reduce eye strain and improve focus.

### 🛒 Curated Marketplace
*   **High-Quality Content:** Access a library of verified, high-quality notes published by administrators.
*   **Discover:** Search for notes by topic or course code.
*   **Public Access:** Notes marked as public are accessible even to unauthenticated users.

### 📚 Dashboard (My Library)
*   **Cloud Storage:** All notes are securely stored in the cloud (Firebase Firestore) for real-time access across all devices.
*   **Personalized Organization:** Keep your study materials organized and easily accessible.

---

## 🛠 Tech Stack

### Frontend
*   **Framework:** [Next.js 16.1](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Math Rendering:** [KaTeX](https://katex.org/)

### Backend & AI
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password, Google Sign-In)
*   **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
*   **AI Model:** [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) (via Firebase Vertex AI/Genkit)

---

## 🏗 Architecture

### 1. Data Persistence
The application uses **Firebase Firestore** as the primary storage engine.
*   **User Notes:** Stored continuously under `/users/{userId}/notes`.
*   **Marketplace:** Public notes are stored/mirrored under `/public/data/marketplace`.
*   **Security:** Firestore Security Rules ensure users can only access their own private notes, while marketplace notes are globally readable.

### 2. Authentication
*   **Firebase Authentication** handles user identity.
*   **AuthContext:** Provides real-time auth state management across the app.
*   **Admin System:** Uses Firebase Custom Claims to identify administrators who have permission to publish to the marketplace.

---

## 🏁 Getting Started

### Prerequisites
*   Node.js v18+
*   npm, yarn, pnpm, or bun
*   A Firebase Project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/snap-note.git
    cd snap-note
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Firebase configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to start taking notes.

---

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── dashboard/        # Private user library (protected)
│   ├── editor/           # Note editor ([noteId] dynamic route)
│   ├── marketplace/      # Public note browsing
│   ├── admin/            # Admin controls (role-protected)
│   └── page.tsx          # Landing page
├── components/           # React components
│   ├── dashboard/        # Dashboard-specific UI
│   ├── editor/           # Editor specific UI (CornellEditor)
│   └── ...               # Shared components
├── context/              # React Contexts
│   └── AuthContext.tsx   # Firebase Auth state management
├── lib/                  # Library configurations
│   └── firebase.ts       # Firebase initialization
├── services/             # Business Logic
│   ├── noteService.ts    # Firestore data interaction
│   └── aiService.ts      # Gemini AI integration
```

## 📄 License

This project is proprietary software. All rights reserved.
