// src/components/UploadBox.jsx
import React from "react";

export default function UploadBox({ multiple = false, onChange }) {
  return (
    <div className="w-full p-8 border-2 border-dashed border-white/40 rounded-2xl 
      bg-white/10 backdrop-blur-xl text-center cursor-pointer hover:bg-white/20 transition">

      <label className="cursor-pointer text-white text-lg">
        {multiple ? "选择多个文件" : "选择文件"}
        <input
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
