import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // StrictMode double-invokes renders in development to help catch side-effects
  // and unsafe lifecycle patterns early — has no effect in production.
  <StrictMode>
    <App />
    {/* SpeedInsights collects Core Web Vitals (LCP, FID, CLS) via Vercel.
        It sends no PII — only performance timing data. */}
    <SpeedInsights />
  </StrictMode>,
)
