import {
  BriefcaseBusiness,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="global-footer">

      {/* MAIN FOOTER */}
      <div className="global-footer-main">
        <div className="global-footer-container">

          <div className="global-footer-grid">

            {/* BRAND */}
            <div className="global-footer-brand">

              <Link
                to="/"
                className="global-footer-logo"
              >
                <span className="global-footer-logo-mark">
                  <BriefcaseBusiness
                    size={19}
                    strokeWidth={2.4}
                  />
                </span>

                <span>
                  <strong>AI</strong> Job Portal
                </span>
              </Link>

              <p>
                An intelligent career platform connecting ambitious
                professionals with meaningful opportunities and smarter
                hiring teams.
              </p>

              <div className="global-footer-contact">

                <a href="mailto:hello@aijobportal.com">
                  <Mail size={15} />
                  hello@aijobportal.com
                </a>

                <span>
                  <MapPin size={15} />
                  India
                </span>

              </div>

              <div className="global-footer-socials">

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={17} />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter size={17} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={17} />
                </a>

              </div>
            </div>

            {/* PLATFORM */}
            <div className="global-footer-column">

              <h3>Platform</h3>

              <Link to="/jobs">
                Find Jobs
              </Link>

              <Link to="/jobs">
                AI Job Matching
              </Link>

              <Link to="/register">
                Create Profile
              </Link>

              <Link to="/login">
                Sign In
              </Link>

            </div>

            {/* CANDIDATES */}
            <div className="global-footer-column">

              <h3>For Candidates</h3>

              <Link to="/register">
                Create Resume
              </Link>

              <Link to="/jobs">
                Recommended Jobs
              </Link>

              <Link to="/jobs">
                Track Opportunities
              </Link>

              <Link to="/about">
                Career Intelligence
              </Link>

            </div>

            {/* RECRUITERS */}
            <div className="global-footer-column">

              <h3>For Recruiters</h3>

              <Link to="/register">
                Start Hiring
              </Link>

              <Link to="/register">
                Post a Job
              </Link>

              <Link to="/register">
                Find Candidates
              </Link>

              <Link to="/about">
                AI Matching
              </Link>

            </div>

            {/* COMPANY */}
            <div className="global-footer-column">

              <h3>Company</h3>

              <Link to="/about">
                About Us
              </Link>

              <Link to="/about">
                How It Works
              </Link>

              <Link to="/about">
                Our Technology
              </Link>

              <Link to="/about">
                Contact
              </Link>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="global-footer-bottom">

            <div>
              <p>
                © 2026 AI Job Portal. All rights reserved.
              </p>
            </div>

            <div className="global-footer-legal">

              <Link to="#">
                Privacy Policy
              </Link>

              <Link to="#">
                Terms of Service
              </Link>

              <Link to="#">
                Cookie Policy
              </Link>

            </div>

            <div className="global-footer-status">

              <span className="global-status-dot" />

              <span>
                Platform operational
              </span>

            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;