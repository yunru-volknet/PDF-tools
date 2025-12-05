// src/main.jsx (updated)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import "./i18n/i18n.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <i18n defaultLang={'zh'}>
        <App />
    </i18n>
);