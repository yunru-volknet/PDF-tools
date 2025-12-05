// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "PDF Tool Suite",
      encrypt: "Encrypt PDF",
      merge: "Merge PDFs",
      compress: "Compress PDF",

      chooseFile: "Choose File",
      chooseFiles: "Choose Files",
      password: "Password",
      start: "Start",
      download: "Download",

      success: "Completed!",
      failed: "Failed",
    },
  },

  zh: {
    translation: {
      title: "PDF 工具套件",
      encrypt: "PDF 加密",
      merge: "PDF 合并",
      compress: "PDF 压缩",

      chooseFile: "选择文件",
      chooseFiles: "选择多个文件",
      password: "密码",
      start: "开始处理",
      download: "下载",

      success: "完成！",
      failed: "失败",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh", // 默认中文
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
