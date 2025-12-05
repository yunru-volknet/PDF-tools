// src/components/ModeSelector.jsx
export default function ModeSelector({ mode, setMode }) {
  const modes = [
    { id: "merge", label: "合并PDF" },
    { id: "compress", label: "压缩PDF" },
    { id: "imageToPdf", label: "图片转PDF" } // 新增模式
  ];

  return (
    <div className="mode-selector">
      {modes.map((m) => (
        <button
          key={m.id}
          className={`mode-btn ${mode === m.id ? "active" : ""}`}
          onClick={() => setMode(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
