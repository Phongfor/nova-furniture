import { useState } from 'react';
import './App.css';
import HomePage from './pages/client/HomePage/HomePage';
import AppRoutes from './routes/AppRoutes';
import SidebarContainer from './components/common/SidebarContainer';


function App() {
    return (
        <>
            <AppRoutes />
            <SidebarContainer />
        </>
    );
}
export default App;
