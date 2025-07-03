import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Box, IconButton, Stack } from "@mui/material";
import {
  NavigateBeforeRounded as NavigateBeforeRoundedIcon,
  NavigateNextRounded as NavigateNextRoundedIcon,
} from "@mui/icons-material";

const FileRenderer = ({ file }) => {
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight - 220);
  const [fileExtension, setFileExtension] = useState("");
  const [filePath, setFilePath] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(window.innerHeight - 220);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (file) {
      setFileExtension(file.split(".").pop().toLowerCase());
      setFilePath(`${import.meta.env.VITE_API_BASE_URL}/${file}`);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));

  if (!file) return null;

  return (
    <>
      {fileExtension === "pdf" ? (
        <Box style={{ textAlign: "center" }}>
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            className="pdf-document"
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {numPages > 1 && (
            <Stack
              direction="row"
              justifyContent="center"
              gap={1}
              sx={{
                marginTop: "16px",
              }}
            >
              <IconButton
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                sx={{
                  backgroundColor: "#FFFFFF",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  "&:disabled": {
                    backgroundColor: "#bdbdbd",
                    // color: "#bdbdbd",
                  },
                }}
              >
                <NavigateBeforeRoundedIcon />
              </IconButton>
              <span style={{ margin: "8px 10px 0 10px" }}>
                Page {pageNumber} of {numPages}
              </span>
              <IconButton
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                sx={{
                  backgroundColor: "#FFFFFF",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  "&:disabled": {
                    backgroundColor: "#bdbdbd",
                    // color: "#bdbdbd",
                  },
                }}
              >
                <NavigateNextRoundedIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
      ) : fileExtension === "doc" || fileExtension === "docx" ? (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            filePath
          )}&embedded=true`}
          width="100%"
          height={iframeHeight}
          style={{ border: "none" }}
          title="Google Docs Viewer"
        >
          This browser does not support embedding documents.
        </iframe>
      ) : (
        <div>Unsupported file type</div>
      )}
    </>
  );
};

export default FileRenderer;
