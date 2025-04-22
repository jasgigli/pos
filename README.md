# POS Analyzer

A modern web application for analyzing parts of speech in text.

## Features

- Text analysis for parts of speech
- Beautiful, responsive UI
- Mobile-friendly design
- Fast and accurate tagging

## Project Structure

- `app/page.tsx`: Contains the React component for the user interface (textarea, button, results display). It handles user input and fetches data from the API. Marked as `'use client'`.
- `app/api/tag/route.ts`: A Next.js API Route (Route Handler) that receives text, processes it using the `compromise` library, and returns the tagged words as JSON. Runs on the server.

## How It Works

1.  The user types or pastes text into the textarea field in the browser (`app/page.tsx`).
2.  When the user clicks the "Tag Text" button, a `fetch` request (POST) is sent from the client to the `/api/tag` endpoint, containing the input text in the request body.
3.  The API Route Handler (`app/api/tag/route.ts`) on the server receives the request.
4.  It uses the `compromise` library to parse the text and identify the part-of-speech tags for each word/term.
5.  The API route sends back a JSON response containing an array of tagged terms (each with its text and tags).
6.  The client-side component (`app/page.tsx`) receives the JSON response.
7.  It updates its state with the received data, causing React to re-render the UI.
8.  The tagged words are displayed below the input form, styled according to their primary POS tag. Error or loading states are shown as appropriate.

## Deployment to Vercel

Follow these steps to deploy the application to Vercel:

1. **Create a Vercel Account**

   - Go to [vercel.com](https://vercel.com) and sign up for a free account
   - You can sign up with GitHub, GitLab, or Bitbucket for easier integration

2. **Install Vercel CLI** (Optional)

   ```bash
   npm install -g vercel
   ```

3. **Deploy via GitHub**

   - Push your code to a GitHub repository
   - Go to the Vercel dashboard and click "New Project"
   - Import your GitHub repository
   - Configure your project settings (or use the defaults)
   - Click "Deploy"

4. **Deploy via Vercel CLI** (Alternative)

   ```bash
   # Login to Vercel
   vercel login

   # Deploy from your project directory
   vercel
   ```

5. **Custom Domain** (Optional)
   - In the Vercel dashboard, go to your project
   - Click on "Domains"
   - Add your custom domain or use the free yourproject.vercel.app domain

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to:

1. Open an issue to discuss the change or report the bug.
2. Fork the repository and create a pull request with your changes.

Please ensure your code adheres to the existing style and that any new dependencies are necessary.

## License

Built by Junaid Ali Shah Gigli
