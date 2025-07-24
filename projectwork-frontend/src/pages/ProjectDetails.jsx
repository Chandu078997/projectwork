import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionLink, setSubmissionLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/details/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId]);

  const handleSubmit = () => {
    const userId = 1; // Replace with real user ID later
    fetch(
      `http://localhost:8085/projectwork/api/projects/submit/${projectId}?userId=${userId}&submissionLink=${encodeURIComponent(submissionLink)}`,
      { method: "POST" }
    )
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Submission failed."));
  };

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="page-container">
      <h2>{project.title}</h2>
      <p><b>Description:</b> {project.description}</p>
      <p><b>Skills Required:</b> {project.skillsRequired}</p>
      <p><b>Deadline:</b> {project.submissionDeadline}</p>
      <a href={project.whatsappGroupLink} target="_blank" rel="noopener noreferrer">
        Join WhatsApp Group
      </a>

      <div className="submission-box">
        <h3>Submit Your Work</h3>
        <input
          type="text"
          placeholder="Enter submission link"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ProjectDetails;
