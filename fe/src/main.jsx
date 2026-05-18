import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ThemeProvider from './contexts/ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider  from './contexts/AuthProvider.jsx';
import SidebarProvider from './contexts/SidebarProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
               <AuthProvider>
                <SidebarProvider>
                    <App />
                </SidebarProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
