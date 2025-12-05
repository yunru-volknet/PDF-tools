import React from "react";


export default function FileList({ files }) {
    return (
        <div>
            <h3>Selected Files</h3>
            <ul>
                {files.map((f, i) => (
                <li key={i}>{f.name} - {(f.size / 1024).toFixed(2)} KB</li>
                ))}
            </ul>
        </div>
    );
}