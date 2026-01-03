# CornellNotes+ (Snap Note)

**CornellNotes+** is a modern, comprehensive study platform designed for students, particularly those in STEM fields (Mathematics and Physics). It integrates the proven **Cornell Note-taking System** with advanced digital tools like LaTeX support, cloud synchronization, and a public marketplace for sharing knowledge.

## 🚀 Key Features

### 📝 Smart Editor
*   **Cornell Methodology:** Specialized layout with distinct **Cue**, **Note**, and **Summary** sections to encourage active recall.
*   **Math & Physics Ready:** Built-in **LaTeX** support using [KaTeX](https://katex.org/). Write complex formulas effortlessly (e.g., `$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$`).
*   **Print-First Design:** Custom `react-to-print` styles ensure notes look professional on paper, with high-contrast borders and an optimized 30/70 split.
*   **Glassmorphism UI:** A beautiful, modern interface designed to reduce eye strain and improve focus.

### 🛒 Marketplace (Simulated/Public)
*   **Buy & Sell:** Publish your high-quality notes to the marketplace.
*   **Discover:** Search for notes by topic or course code.
*   **Public Access:** Notes marked as public are accessible even to unauthenticated users.

### 📚 Dashboard (My Library)
*   **Personalized Storage:** Keep all your notes organized in one secure place.
*   **Offline-First / Cloud Sync:** Defaults to local storage for immediate use, with optional Firebase synchronization.

---

## 🛠 Tech Stack

### Frontend
*   **Framework:** [Next.js 16.1](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Math Rendering:** [KaTeX](https://katex.org/)
*   **Printing:** [react-to-print](https://www.npmjs.com/package/react-to-print)

### Backend & Authentication
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth) (Email/Password, Google Sign-In)
*   **Database:** [Firebase](https://firebase.google.com/) (Firestore)
*   **Route Protection:** Client-side auth context with protected route wrapper.

---

## 🏗 Architecture

### 1. Data Persistence Modes
The application supports two modes of operation, controlled by the `USE_LOCAL_STORAGE` flag in `src/services/noteService.ts`:

*   **Local Storage Mode (Default):**
    *   Notes are saved to the browser's `localStorage` using keys like `note_${userId}_${noteId}`.
    *   **Pros:** Zero setup required, works offline, instant feedback.
    *   **Cons:** Data is lost if browser cache is cleared, no cross-device sync.
    *   **Marketplace:** Simulates a marketplace by filtering local keys for `isPublic: true`.

*   **Cloud Mode (Firebase):**
    *   Notes are stored in Firestore under `/users/{userId}/notes` and `/public/data/marketplace`.
    *   **Pros:** Real-time sync, secure, cross-device access.
    *   **Cons:** Requires Firebase project setup and environment variables.

### 2. Authentication
*   **Firebase Authentication** handles user identity and session management.
*   **AuthContext (`src/context/AuthContext.tsx`):** Provides auth state, sign-in/sign-up methods, and admin role checking.
*   **ProtectedRoute Component:** Wraps protected pages to redirect unauthenticated users.
*   **Admin Roles:** Managed via Firebase Custom Claims.

---

## 🏁 Getting Started

### Prerequisites
*   Node.js v18+
*   npm, yarn, pnpm, or bun

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

3.  **Run in Development Mode (Local Storage):**
    By default, the app runs in **Mock/Local Mode**. No API keys are needed.
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to start taking notes.

### Configuration for Cloud Mode (Optional)

To enable Firebase persistence:

1.  **Setup Firebase:**
    *   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Firestore Database** and **Authentication**.
    *   Copy your web app configuration keys.

2.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

3.  **Switch Storage Mode:**
    Open `src/services/noteService.ts` and change:
    ```typescript
    const USE_LOCAL_STORAGE = false; // Change to false
    ```

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
│   ├── dashboard/        # Dashboard-specific UI (grids, cards)
│   ├── home/             # Landing page UI (hero, features)
│   ├── marketplace/      # Marketplace UI
│   └── ...               # Shared components
├── context/              # React Contexts
│   └── AuthContext.tsx   # Firebase Auth state management
├── lib/                  # Library configurations
│   └── firebase.ts       # Firebase init (with mock fallback)
├── services/             # Business Logic
│   └── noteService.ts    # Data layer (Local Storage logic vs Firestore refs)
```

## 📄 License

This project is proprietary software. All rights reserved.
