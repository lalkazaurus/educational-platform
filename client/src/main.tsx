import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import "./i18n/config"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const quetyClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={quetyClient}>
      <Router/>
      <Toaster position='bottom-right' reverseOrder={false}/>
    </QueryClientProvider>
  </StrictMode>,
)
