import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      return; // Only load if logged in
    }
    fetch("http://localhost:8085/projectwork/domains")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to see available domains.</h2>;
  }

  return (
    <div className="page-container">
      <h2>Available Domains</h2>
      {loading ? <p>Loading domains...</p> : (
        <ul>
          {domains.map((domain) => (
            <li key={domain.id}>
              <Link to={`/projects/${domain.id}`}>{domain.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
