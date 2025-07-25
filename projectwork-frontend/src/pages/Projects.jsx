import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const { domainId } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(` ${process.env.REACT_APP_API_URL}/projectwork/api/projects/domain/${domainId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [domainId]);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to view projects.</h2>;
  }

  return (
    <div className="page-container">
      <h2>Projects in Domain {domainId}</h2>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><b>Skills:</b> {project.skillsRequired}</p>
            <p><b>Deadline:</b> {project.submissionDeadline}</p>
            <Link to={`/project/${project.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;
