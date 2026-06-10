import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">CMRTC Chatbot</h3>
          <p className="footer-version">v1.0</p>
          <p className="footer-description">College Enquiry Chatbot</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Developer</h4>
          <p className="footer-name">Ramakrishna Bootla</p>
          <a
            href="https://ramakrishnab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            View Portfolio
          </a>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Tech Stack</h4>
          <div className="tech-grid">
            <span className="tech-item">React.js</span>
            <span className="tech-item">FastAPI</span>
            <span className="tech-item">Python</span>
            <span className="tech-item">Tailwind CSS</span>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact & Links</h4>
          <div className="footer-links">
            <a
              href="mailto:bootlaramakrishna0@gmail.com"
              className="social-link"
              title="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a
              href="https://github.com/Ramakrishnabootla"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://linkedin.com/in/ramakrishna-bootla"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <p className="footer-email">bootlaramakrishna0@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 CMRTC Chatbot. All rights reserved.</p>
      </div>
    </footer>
  );
}
