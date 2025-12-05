import { useState } from "react";
import { compressPDF } from "../utils/pdf/compress";

export default function PDFCompress() {
  const [file, setFile] = useState(null);

  async function handleCompress() {
    if (!file) {
      alert("请选择一个 PDF 文件！");
      return;
    }

    const compressedBytes = await compressPDF(file);
    const blob = new Blob([compressedBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_" + file.name;
    a.click();
  }

  return (
    <div className="tool-content">
      {/* 文件上传区域 */}
      <div className="upload-section">
        <label className="upload-label">选择PDF文件</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
        <p className="upload-hint">选择一个PDF文件进行压缩</p>
      </div>

      {/* 已上传文件显示 */}
      {file && (
        <div className="file-list-section">
          <h3 className="section-title">已选择文件</h3>
          <div className="file-list">
            <div className="file-item">
              <span className="file-name">{file.name}</span>
              <button 
                onClick={() => setFile(null)}
                className="remove-btn"
              >
                移除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 执行操作按钮 */}
      <div className="action-section">
        <button 
          className="action-btn primary"
          onClick={handleCompress}
          disabled={!file}
        >
          开始压缩PDF
        </button>
        
        {file && (
          <button 
            className="action-btn secondary"
            onClick={() => setFile(null)}
          >
            重新选择
          </button>
        )}
      </div>
    </div>
  );
}