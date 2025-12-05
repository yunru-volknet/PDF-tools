export const validateFileLimits = (mode, files) => {
    if (mode === "encrypt" || mode === "compress") return files.length <= 1;
    if (mode === "merge") return files.length <= 2;
    return true;
};