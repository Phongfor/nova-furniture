import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ThemeProvider from './contexts/ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider  from './contexts/AuthProvider.jsx';
import SidebarProvider from './contexts/SidebarProvider.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <AuthProvider>
                        <SidebarProvider>
                            <App />
                        </SidebarProvider>
                    </AuthProvider>
                </GoogleOAuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
