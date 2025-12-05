import { useState } from "react";
import { mergePDFs } from "../utils/pdf/merge";

export default function PDFMerge() {
  const [files, setFiles] = useState([]);

  async function handleMerge() {
    if (files.length < 2) {
      alert("请选择至少两个 PDF 文件！");
      return;
    }

    const mergedBytes = await mergePDFs(files);
    const blob = new Blob([mergedBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="tool-content">
      {/* 文件上传区域 */}
      <div className="upload-section">
        <label className="upload-label">选择PDF文件</label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setFiles([...files, ...e.target.files])}
          className="file-input"
        />
        <p className="upload-hint">支持多选，至少选择2个PDF文件</p>
      </div>

      {/* 已上传文件列表 */}
      {files.length > 0 && (
        <div className="file-list-section">
          <h3 className="section-title">已上传文件 ({files.length})</h3>
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <button 
                  onClick={() => removeFile(index)}
                  className="remove-btn"
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 执行操作按钮 */}
      <div className="action-section">
        <button 
          className="action-btn primary"
          onClick={handleMerge}
          disabled={files.length < 2}
        >
          开始合并PDF
        </button>
        
        {files.length > 0 && (
          <button 
            className="action-btn secondary"
            onClick={() => setFiles([])}
          >
            清空列表
          </button>
        )}
      </div>
    </div>
  );
}