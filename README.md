# Career Buddy

> Your comprehensive career development platform.

## Gemini API Key Setup

To use features that require Google's Gemini API, you need to set up an API key:

1. **Get your API key:**

    - Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and sign in with your Google account to generate an API key.

2. **Set up your API key locally:**

    - Create a file named `.env.local` in the root of your project (if it doesn't already exist).
    - Add the following line to `.env.local`:

        ```env
        GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
        ```

    - Replace `your-api-key-here` with the API key you obtained from Google AI Studio.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Using the Application

Once the development server is running, you can access the main features of the application:

- **Resume Builder:**

    - Navigate to `/resume` to start building your resume.
    - Fill in your personal information, education, work experience, and other sections.
    - Preview your resume and download it when you're ready.

- **Interview Prep:**

    - Go to `/interview-prep` to generate interview questions and prepare for interviews.
    - Use the mock interview feature to practice answering questions.

- **Career Roadmap:**

    - Visit `/roadmap` to create a personalized career roadmap.
    - Set your career goals and track your progress.

- **Dashboard:**
    - The dashboard provides an overview of your applications and progress.

Explore the navigation menu to access these features. The app will auto-update as you make changes.
