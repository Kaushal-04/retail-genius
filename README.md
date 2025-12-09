# RetailGenius: Text-to-Creative Campaign Generator

An AI-powered tool designed to democratize ad creation for retail advertisers. This application allows users to generate professional, retailer-compliant creative assets from simple text prompts, leveraging Generative AI concepts and a robust constraint-based compliance engine.

## 🚀 Key Features

*   **Text-to-Creative Engine**: Generates campaign visuals based on natural language prompts (Powered by Pollinations.ai for prototype).
*   **Compliance Constraint Engine**: Real-time validation against **Appendix B** retailer guidelines, including:
    *   Prohibited Claims (e.g., "discount", "money-back").
    *   Strict Safe Zone checks for Story (9:16) formats.
    *   Alcohol-specific mandates ("drinkaware.co.uk").
    *   Accessibility checks (Mock font size/contrast).
*   **Interactive Workspace**:
    *   **Drag & Drop**: Freely layout assets on the canvas.
    *   **Upload**: Import custom packshots or brand assets.
    *   **Multi-Format**: Switch instantly between Square (1:1), Story (9:16), and Landscape (1.91:1).
    *   **Brand Palette**: Manage and apply custom brand colors.
*   **One-Click Auto-Fix**: Automatically corrects common compliance violations (e.g., rewriting prohibited copy).
*   **Export**: Download high-quality PNGs ready for campaign submission.

## 🛠️ Setup & Installation

1.  **Prerequisites**: Ensure you have Node.js (v16+) installed.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:5173` (or the URL shown in your terminal).

## 📖 Usage Guide

1.  **Start a Campaign**:
    *   Enter a prompt like *"New Summer Mango Drink, exclusive at Tesco"*.
    *   Click **Generate Creatives**.

2.  **Edit & Customize**:
    *   **Move**: Drag elements around the canvas.
    *   **Resize/Rotate**: Click an element and use the **Properties Panel** on the right.
    *   **Change Image**: Use the **Upload** button in the left sidebar to replace the AI-generated background with your own product shot.

3.  **Check Compliance**:
    *   Watch the **Compliance Panel** on the far right.
    *   If you see a Red X, read the violation.
    *   Try the **Auto-Fix Violations** button (top toolbar) or manually edit text to fix it.

4.  **Export**:
    *   Select your desired format (e.g., Story 9:16).
    *   Click **Export** to download the PNG.

## 📦 Dependencies

*   **React + Vite**: Core framework for a fast, modern UI.
*   **lucide-react**: Premium icon set.
*   **react-draggable**: For interactive canvas elements.
*   **html2canvas**: For capturing and exporting the creative.
*   **Pollinations.ai (API)**: For generating background images from text prompts.
