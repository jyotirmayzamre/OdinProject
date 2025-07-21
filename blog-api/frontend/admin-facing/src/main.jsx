import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../user-facing/src/index.css';
import router from './components/router';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
