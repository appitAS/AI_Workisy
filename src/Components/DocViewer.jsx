const DocViewer = ({ fileUrl }) => {
  return (
    <iframe
      src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
      style={{ width: "100%", height: "800px" }}
      frameBorder="0"
      title={fileUrl.split("/")[fileUrl.split("/").length - 1]}
    ></iframe>
  );
};

export default DocViewer;
