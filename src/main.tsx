
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'

const container = document.getElementById("root");

if (!container) {
  console.error("Failed to find the root element");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <>
        <App />
        <Toaster position="top-right" />
      </>
    );
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Failed to render the app:", error);
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; padding: 20px; text-align: center;">
        <h2 style="color: #e11d48; margin-bottom: 16px;">Something went wrong</h2>
        <p style="max-width: 500px; margin-bottom: 16px;">
          There was an error loading the application. This is likely due to missing Supabase environment variables.
        </p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: left; max-width: 500px;">
          <p style="font-weight: bold; margin-bottom: 8px;">Required environment variables:</p>
          <code style="display: block; font-family: monospace; margin-bottom: 8px;">VITE_SUPABASE_URL=your_supabase_url</code>
          <code style="display: block; font-family: monospace;">VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</code>
        </div>
        <p style="max-width: 500px; margin-bottom: 16px;">
          Please create a .env file in your project root with these variables or add them to your environment.
        </p>
        <button 
          style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
          onclick="window.location.reload()"
        >
          Refresh Page
        </button>
      </div>
    `;
  }
}
