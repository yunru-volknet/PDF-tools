/**
// src/App.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import ModeSelector from "./components/ModeSelector";
import PDFEncrypt from "./components/PDFEncrypt";
import PDFMerge from "./components/PDFMerge";
import PDFCompress from "./components/PDFCompress";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./styles/global.css";

export default function App() {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState("merge");

  const renderTool = () => {
    switch (mode) {
      case "encrypt":
        return <PDFEncrypt />;
      case "merge":
        return <PDFMerge />;
      case "compress":
        return <PDFCompress />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">PDF Tools</span>
        </div>
        
        <div className="nav-center">
          <ModeSelector mode={mode} setMode={setMode} />
        </div>
        
        <div className="nav-right">
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="main-content">
        <div className="tool-card">
          <h1 className="tool-title">{t("title")}</h1>
          {renderTool()}
        </div>
      </main>
    </div>
  );
}
*/
// src/App.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import ModeSelector from "./components/ModeSelector";
import PDFMerge from "./components/PDFMerge";
import PDFCompress from "./components/PDFCompress";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./styles/global.css";
import PDFImageToPdf from "./components/PDFImageToPdf"; // 新增导入

export default function App() {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState("merge");

  const renderTool = () => {
    switch (mode) {
      case "merge":
        return <PDFMerge />;
      case "compress":
        return <PDFCompress />;
      case "imageToPdf": // 新增模式
        return <PDFImageToPdf />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* 导航栏 */}
      <nav className="navbar glass-nav">
        <div className="nav-logo">
          <span className="logo-text">PDF Craft</span>
        </div>
        
        <div className="nav-center">
          <ModeSelector mode={mode} setMode={setMode} />
        </div>
        
        <div className="nav-right">
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="main-content">
        <div className="tool-card glass-card">
          <h1 className="tool-title">{t("title")}</h1>
          {renderTool()}
        </div>
      </main>
    </div>
  );
}