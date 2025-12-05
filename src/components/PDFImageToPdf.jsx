// src/components/PDFImageToPdf.jsx
import { useState, useRef } from "react";
import { imagesToPDF } from "../utils/pdf/imageToPdf";

export default function PDFImageToPdf() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    // 过滤只允许图片文件
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/') || 
      ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].some(ext => 
        file.name.toLowerCase().endsWith(ext)
      )
    );
    
    if (imageFiles.length === 0) {
      alert("请选择有效的图片文件（支持 JPG, PNG, GIF, BMP, WebP）");
      return;
    }
    
    // 检查是否有非图片文件被过滤掉
    if (selectedFiles.length !== imageFiles.length) {
      alert(`已过滤掉 ${selectedFiles.length - imageFiles.length} 个非图片文件`);
    }
    
    // 添加到图片列表
    setImages([...images, ...imageFiles]);
    
    // 清空文件输入以便再次选择相同的文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const newIndex = index + direction;
    
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setImages(newImages);
    }
  };

  const clearAllImages = () => {
    setImages([]);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      alert("请至少选择一张图片！");
      return;
    }

    setIsProcessing(true);
    
    try {
      const pdfBytes = await imagesToPDF(images);
      
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted_images_${new Date().getTime()}.pdf`;
      a.click();
      
      // 清理URL对象
      URL.revokeObjectURL(url);
      
      alert(`转换成功！已成功将 ${images.length} 张图片转换为PDF。`);
      
    } catch (error) {
      console.error("转换失败:", error);
      alert(`转换失败: ${error.message || "请检查图片格式和文件完整性"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload({ target: { files } });
  };

  return (
    <div className="tool-content">
      {/* 文件上传区域 - 支持拖拽 */}
      <div 
        className="upload-section drag-drop-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="upload-label">选择图片文件</label>
        
        <div className="drag-drop-zone">
          <div className="upload-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          
          <p className="drag-text">拖拽图片到此处 或</p>
          
          <button 
            className="browse-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            浏览文件
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="file-input hidden"
          />
        </div>
        
        <p className="upload-hint">
          支持 JPG, PNG, GIF, BMP, WebP 格式，可多选
        </p>
      </div>

      {/* 图片预览和列表 */}
      {images.length > 0 && (
        <div className="image-preview-section">
          <h3 className="section-title">
            已选择图片 ({images.length})
            <span className="image-count-badge">{images.length}</span>
          </h3>
          
          <div className="image-list">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={image.name}
                    onLoad={() => URL.revokeObjectURL(this.src)}
                  />
                  <div className="image-info">
                    <span className="image-name">{image.name}</span>
                    <span className="image-size">
                      {(image.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                
                <div className="image-actions">
                  <button 
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    className="action-icon move-up"
                    title="上移"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => moveImage(index, 1)}
                    disabled={index === images.length - 1}
                    className="action-icon move-down"
                    title="下移"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => removeImage(index)}
                    className="remove-btn"
                  >
                    移除
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* 排序提示 */}
          <div className="sort-hint">
            <span className="hint-icon">?</span>
            提示：图片顺序即PDF页面顺序，可使用上下箭头调整
          </div>
        </div>
      )}

      {/* 执行操作按钮 */}
      <div className="action-section">
        <button 
          className="action-btn primary"
          onClick={handleConvert}
          disabled={images.length === 0 || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              转换中...
            </>
          ) : (
            `开始转换 (${images.length} 张图片)`
          )}
        </button>
        
        {images.length > 0 && (
          <button 
            className="action-btn secondary"
            onClick={clearAllImages}
            disabled={isProcessing}
          >
            清空所有图片
          </button>
        )}
      </div>
    </div>
  );
}