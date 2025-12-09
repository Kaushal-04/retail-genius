# Deploying RetailGenius to Vercel

Vercel is the easiest way to deploy this React + Vite application.

## Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  A [Vercel](https://vercel.com/) account (you can sign up using GitHub).

## Option 1: Deploy via GitHub Integration (Recommended)

1.  **Push to GitHub**:
    *   Create a new repository on GitHub.
    *   Push this project code to that repository.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Import to Vercel**:
    *   Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your GitHub repository in the list and click **"Import"**.

3.  **Configure**:
    *   **Framework Preset**: Select `Vite`.
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
    *   Click **"Deploy"**.

4.  **Done!**: Vercel will build your site and give you a live URL (e.g., `retail-genius.vercel.app`).

---

## Option 2: Deploy via CLI

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```

2.  Run Deploy Command:
    ```bash
    vercel
    ```

3.  Follow the prompts (logging in, selecting scope, etc.).
