// import { useEffect, useState } from "react";
import DocViewer from "./DocViewer";
import PdfViewer from "./PdfViewer";

const FileRenderer = ({ file }) => {
  // const [fileUrl, setFileUrl] = useState("");
  // const [fileExtension, setFileExtension] = useState("");

  // useEffect(() => {
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     const extension = file.name.split(".").pop().toLowerCase();

  //     setFileUrl(url);
  //     setFileExtension(extension);

  //     return () => URL.revokeObjectURL(url);
  //   }
  // }, [file]);
  const fileExtension = file.split(".").pop().toLowerCase();
  const filePath = encodeURI(`${import.meta.env.VITE_FILE_APP}/${file}`);
  console.log(filePath, fileExtension, "lkkllk");
  if (!file) return null;

  if (fileExtension === "pdf") {
    return <PdfViewer fileUrl={filePath} />;
  } else if (fileExtension === "doc" || fileExtension === "docx") {
    return <DocViewer fileUrl={filePath} />;
  } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileExtension)) {
    return (
      <img
        src={filePath}
        alt="Image Preview"
        style={{ width: "100%", maxHeight: "800px", objectFit: "contain" }}
      />
    );
  } else {
    return <div>Unsupported file type</div>;
  }
};

export default FileRenderer;
