import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import Cards from "./Components/Crads";
import JobCards from "./Components/JobCards";
import MainPage from "./Components/AuthMainPage";

// const jobCardsData = [
//   {
//     title: "Sr UI/UX Designer And Developer",
//     salary: "₹8,00,000 – 12,00,000 Lpa",
//     tags: ["FULL TIME", "REMOTE", "2yr+ Exp"],
//     description:
//       "We are looking for a talented UI/UX Designer to create intuitive and visually appealing digital experiences...",
//     skills: [
//       "UI Design",
//       "UX Research",
//       "Wireframing & Prototyping",
//       "Information Architecture",
//       "Usability Testing",
//       "User Persona Mapping",
//       "Data Analysis",
//     ],
//     location: "Hyderabad",
//     education: "Any Graduate",
//   },
//   {
//     title: "Frontend React Developer",
//     salary: "₹6,00,000 – 10,00,000 Lpa",
//     tags: ["FULL TIME", "HYBRID", "3yr+ Exp"],
//     description:
//       "Looking for a React developer with solid skills in frontend libraries and clean coding practices...",
//     skills: [
//       "React.js",
//       "JavaScript",
//       "HTML5",
//       "CSS3",
//       "REST APIs",
//       "Redux",
//       "Responsive Design",
//     ],
//     location: "Bangalore",
//     education: "B.Tech / B.E",
//   },
//   {
//     title: "Product Designer",
//     salary: "₹10,00,000 – 15,00,000 Lpa",
//     tags: ["FULL TIME", "ONSITE", "4yr+ Exp"],
//     description:
//       "Creative product designer needed to build innovative and accessible interfaces for web and mobile apps...",
//     skills: [
//       "Figma",
//       "Design Thinking",
//       "User Research",
//       "Prototyping",
//       "Visual Design",
//       "Interaction Design",
//     ],
//     location: "Pune",
//     education: "Any Graduate",
//   },
// ];

function App() {
  const [jobs, setJobs] = useState([]);

  console.log("jobs", jobs);

  return (
    <div>
      <Navbar />

      {/* Show Layout only when there are no jobs */}
      {jobs.length === 0 && <Layout setJobs={setJobs} />}

      {/* Show Cards only when jobs exist */}
      {jobs.length > 0 && <JobCards jobs={jobs} />}

      {/* <MainPage /> */}
    </div>
  );
}

export default App;
