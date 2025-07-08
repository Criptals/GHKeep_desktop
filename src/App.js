import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";
import ManageScreen from "./screens/Manage";
import "./App.css";
import logo from './assets/icon.png';   

const ExtraContext = createContext();

export default function App() {
    const [extra, setExtra] = useState(false);
    const [showLogo, setShowLogo] = useState(true);
    const value = { extra, setExtra };
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLogo(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <ExtraContext.Provider value={value}>
            <Router>
                <div className={`app-logo-container ${!showLogo ? 'hidden' : ''}`}>
                    <img src={logo} className="app-logo" alt="App Logo" />
                </div>
                <div className="App" style={{ opacity: showLogo ? 0 : 1, transition: 'opacity 0.5s' }}>
                    <nav className="nav-bar">
                        <Link to="/" className="nav-item">
                            <span>Home</span>
                        </Link>
                        <Link to="/manage" className="nav-item">
                            <span>Manage</span>
                        </Link>
                        <Link to="/settings" className="nav-item">
                            <span>Settings</span>
                        </Link>
                    </nav>
                    <Routes>
                        <Route path="/manage" element={<ManageScreen />} />
                        <Route path="/settings" element={<SettingsScreen />} />  
                        <Route path="/" element={<HomeScreen />} />         
                    </Routes>
                </div>
            </Router>
        </ExtraContext.Provider>
    );
}