import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import AppWithTracking from './AppTracking.tsx'

createRoot(document.getElementById('root')!).render(
 <HelmetProvider>
  <BrowserRouter>
    <AppWithTracking />
  </BrowserRouter>
</HelmetProvider>
)
