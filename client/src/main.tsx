import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import "./i18n/config"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const quetyClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={quetyClient}>
      <Router/>
    </QueryClientProvider>
  </StrictMode>,
)
