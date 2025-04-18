# 10xCards

:warning: This project was in most part developed by AI. My rule was that if I had to write more than 1 line of code then I should make AI do it. As you can imagine I got fed up quickly :sweat_smile:. As a result this app is not great :sweat_smile: but was a great learning experience, by no means I plan to release it anywhere. I started with a shaky understanding what I actually want to build and cut the scope a bit in the process.

## Project Description

10xCards is a web application designed to streamline the creation of high-quality educational flashcards. It leverages artificial intelligence to automate flashcard generation while also providing tools for manual creation. Users can manage their flashcards through features like review, editing, and deletion, and integrate them with a spaced repetition algorithm for effective learning.

### Key Features:

- **Manual Flashcard Creation**: Simple form with validation for creating flashcards.
- **AI-Generated Flashcards**: Generate flashcards from text using AI, with user review and approval.
- **Flashcard Management**: List view, bulk delete, and editing capabilities.
- **User Account Management**: Change password and delete account.
- **Spaced Repetition Integration**: Flashcards compatible with spaced repetition algorithms.

---

## Tech Stack

### Frontend

- **Astro 5**: For fast, efficient web pages with minimal JavaScript.
- **React 19**: For interactive components.
- **TypeScript 5**: For static typing and better IDE support.
- **Tailwind 4**: For utility-first CSS styling.
- **Shadcn/ui**: For accessible React components.

### Backend

- **Supabase**: PostgreSQL database, user authentication, and backend services.

### AI

- **Openrouter.ai**: Access to various AI models (OpenAI, Anthropic, Google, etc.).

### CI/CD and Hosting

- **GitHub Actions**: For CI/CD pipelines.
- **DigitalOcean**: Hosting via Docker images.

---

## Getting Started Locally

### Prerequisites

- **Node.js**: Version 22 or higher.
- **npm**: Installed with Node.js.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/przbab/10xCards.git
    ```
2. Navigate to the project directory:
    ```bash
    cd 10xCards
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

---

## Available Scripts

- `npm run astro`: Run Astro commands.
- `npm run build`: Build the project for production.
- `npm run dev`: Start the development server.
- `npm run lint`: Run ESLint for code quality checks.
- `npm run prepare`: Prepare Husky for Git hooks.
- `npm run preview`: Preview the production build.

---

### Testing

- **Unit Testing**: Vitest is used for writing and running unit tests, ensuring individual components and functions work as expected.
- **End-to-End Testing (E2E)**: Playwright is utilized for comprehensive E2E testing, simulating real user interactions across the application.
