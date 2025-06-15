const FileRenderer = ({ file }) => {
  const fileExtension = file.split(".").pop().toLowerCase();
  const filePath = `${import.meta.env.VITE_API_BASE_URL}/${file}`;

  console.log(filePath, fileExtension, file, "filePath,ext,file");

  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    filePath
  )}&embedded=true`;

  if (!file) return null;

  if (
    fileExtension === "pdf" ||
    fileExtension === "doc" ||
    fileExtension === "docx"
  ) {
    return (
      <iframe
        src={googleViewerUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Google Docs PDF Viewer"
      >
        This browser does not support PDFs. Please download the PDF to view it:
      </iframe>
    );
  } else return <div>Unsupported file type</div>;
};

export default FileRenderer;
