import axios from "axios";


export const uploadFiles = (mode, files, onProgress) => {
    const formData = new FormData();


    files.forEach((file) => formData.append("files", file));
    formData.append("mode", mode);


    return axios.post("/api/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            onProgress(percent);
        },
    });
};