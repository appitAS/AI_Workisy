import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import Cards from "./Components/Crads";
import JobCards from "./Components/JobCards";
import MainPage from "./Components/AuthMainPage";


function App() {
  const [jobs, setJobs] = useState([]);

  console.log("jobs=>",jobs)

  return (
    <div>
      <Navbar />

      {/* Show Layout only when there are no jobs */}
      {/* {jobs.length === 0 && <Layout setJobs={setJobs} />} */}
      <JobCards jobs={jobs} />
<Layout setJobs={setJobs} />
      {/* Show Cards only when jobs exist */}
      {/* {jobs.length > 0 && <JobCards jobs={jobs} />} */}

      {/* <MainPage /> */}
    </div>
  );
}

export default App;
