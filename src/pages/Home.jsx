// src/pages/Home.jsx (updated)
import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import FileList from '../components/FileList';
import ModeSelector from '../components/ModeSelector';
import ProgressBar from '../components/ProgressBar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useI18n } from '../i18n/i18n.jsx';


export default function Home() {
    const [files, setFiles] = useState([]);
    const [mode, setMode] = useState('encrypt');
    const [progress, setProgress] = useState(0);
    const { t } = useI18n();


    return (
        <div className="container">
            <LanguageSwitcher />
            <h1>{t('title')}</h1>
            <ModeSelector mode={mode} setMode={setMode} />
            <FileUploader mode={mode} setFiles={setFiles} />
            <FileList files={files} />
            <ProgressBar progress={progress} />
        </div>
    );
}