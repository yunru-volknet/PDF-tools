import React from "react";
import { validateFileLimits } from "../utils/fileHelpers";


export default function FileUploader({ mode, setFiles }) {
    const handleSelect = (e) => {
        const selected = Array.from(e.target.files);
        if (!validateFileLimits(mode, selected)) {
            alert("File limit exceeded for this mode.");
            return;
        }
            setFiles(selected);
    };


    return <input type="file" multiple onChange={handleSelect} />;
}