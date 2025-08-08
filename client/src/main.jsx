import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ✅ Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// ✅ Tailwind (via your own index.css)
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
