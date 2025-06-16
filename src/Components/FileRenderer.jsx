import { useState, useEffect } from "react";

const FileRenderer = ({ file }) => {
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight - 220);
  const [fileExtension, setFileExtension] = useState("");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(window.innerHeight - 220);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setFileExtension(file.split(".").pop().toLowerCase());
    setFilePath(`${import.meta.env.VITE_API_BASE_URL}/${file}`);
  }, [file]);

  if (!file) return null;

  return (
    <>
      {fileExtension === "pdf" ||
      fileExtension === "doc" ||
      fileExtension === "docx" ? (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            filePath
          )}&embedded=true`}
          width="100%"
          height={iframeHeight}
          style={{ border: "none" }}
          title="Google Docs PDF Viewer"
        >
          This browser does not support PDFs. Please download the PDF to view
          it:
        </iframe>
      ) : (
        <div>Unsupported file type</div>
      )}
    </>
  );
};

export default FileRenderer;
