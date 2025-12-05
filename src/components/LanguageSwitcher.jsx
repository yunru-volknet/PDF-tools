// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
            <button 
                onClick={() => changeLanguage('zh')} 
                disabled={i18n.language === 'zh'}
                style={{ 
                    marginLeft: 8,
                    padding: '5px 10px',
                    backgroundColor: i18n.language === 'zh' ? '#007bff' : 'transparent',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '4px',
                    cursor: i18n.language === 'zh' ? 'default' : 'pointer'
                }}
            >
                中文
            </button>
            <button 
                onClick={() => changeLanguage('en')} 
                disabled={i18n.language === 'en'}
                style={{ 
                    marginLeft: 8,
                    padding: '5px 10px',
                    backgroundColor: i18n.language === 'en' ? '#007bff' : 'transparent',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '4px',
                    cursor: i18n.language === 'en' ? 'default' : 'pointer'
                }}
            >
                EN
            </button>
        </div>
    );
}