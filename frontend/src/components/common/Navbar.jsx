import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);

  const location = useLocation();
  const jobsRef = useRef(null);

  const isJobsActive =
    location.pathname === "/jobs" ||
    location.pathname.startsWith("/jobs/") ||
    location.pathname.startsWith("/job/");

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        jobsRef.current &&
        !jobsRef.current.contains(event.target)
      ) {
        setJobsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* Close menus after route change */
  useEffect(() => {
    setJobsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const closeMobile = () => {
    setMobileOpen(false);
    setJobsOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `global-nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="global-navbar">
      <div className="global-navbar-inner">

        {/* BRAND */}
        <Link
          to="/"
          className="global-brand"
          onClick={closeMobile}
        >
          <span className="global-brand-mark">
            <BriefcaseBusiness
              size={20}
              strokeWidth={2.4}
            />
          </span>

          <span className="global-brand-copy">
            <strong>AI</strong>
            <span>Job Portal</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="global-desktop-nav">

          {/* HOME */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Home
          </NavLink>

          {/* JOBS */}
          <div
            ref={jobsRef}
            className={`global-nav-dropdown ${
              jobsOpen ? "dropdown-open" : ""
            }`}
            onMouseEnter={() => setJobsOpen(true)}
          >
            <button
              type="button"
              className={`global-nav-link global-dropdown-trigger ${
                isJobsActive ? "active" : ""
              }`}
              onClick={() =>
                setJobsOpen((prev) => !prev)
              }
              aria-expanded={jobsOpen}
              aria-haspopup="true"
            >
              Jobs

              <ChevronDown
                size={15}
                className={
                  jobsOpen ? "rotated" : ""
                }
              />
            </button>

            {/* JOBS DROPDOWN */}
            <div
              className={`global-dropdown-menu ${
                jobsOpen ? "show" : ""
              }`}
              onMouseEnter={() => setJobsOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (
                    !jobsRef.current?.matches(":hover")
                  ) {
                    setJobsOpen(false);
                  }
                }, 150);
              }}
            >
              <div className="global-dropdown-header">
                <div className="global-dropdown-header-icon">
                  <Search size={17} />
                </div>

                <div>
                  <strong>
                    Explore opportunities
                  </strong>

                  <span>
                    Find roles that match your skills
                  </span>
                </div>
              </div>

              <div className="global-dropdown-divider" />

              {/* FIND JOBS */}
              <Link
                to="/jobs"
                className="global-dropdown-item"
                onClick={() => setJobsOpen(false)}
              >
                <div className="global-dropdown-icon">
                  <Search size={16} />
                </div>

                <div>
                  <strong>Find Jobs</strong>

                  <span>
                    Search available opportunities
                  </span>
                </div>

                <ArrowRight size={15} />
              </Link>

              {/* AI MATCHED JOBS */}
              <Link
                to="/jobs"
                className="global-dropdown-item"
                onClick={() => setJobsOpen(false)}
              >
                <div className="global-dropdown-icon">
                  <Sparkles size={16} />
                </div>

                <div>
                  <strong>AI Matched Jobs</strong>

                  <span>
                    Find jobs based on your profile
                  </span>
                </div>

                <ArrowRight size={15} />
              </Link>

              {/* LATEST OPPORTUNITIES */}
              <Link
                to="/jobs"
                className="global-dropdown-item"
                onClick={() => setJobsOpen(false)}
              >
                <div className="global-dropdown-icon">
                  <BriefcaseBusiness size={16} />
                </div>

                <div>
                  <strong>
                    Latest Opportunities
                  </strong>

                  <span>
                    Explore recently posted roles
                  </span>
                </div>

                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* ABOUT */}
          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

        </nav>

        {/* RIGHT ACTIONS */}
        <div className="global-nav-actions">

          <Link
            to="/login"
            className="global-signin"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="global-get-started"
          >
            <span>Get started</span>
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="global-mobile-toggle"
          onClick={() =>
            setMobileOpen((prev) => !prev)
          }
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
        >
          {mobileOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </div>

      {/* MOBILE PANEL */}
      <div
        className={`global-mobile-panel ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="global-mobile-panel-inner">

          {/* HOME */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={closeMobile}
          >
            Home
          </NavLink>

          {/* JOBS */}
          <NavLink
            to="/jobs"
            className={navLinkClass}
            onClick={closeMobile}
          >
            Jobs
          </NavLink>

          {/* ABOUT */}
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={closeMobile}
          >
            About
          </NavLink>

          {/* MOBILE ACTIONS */}
          <div className="global-mobile-actions">

            <Link
              to="/login"
              className="global-mobile-signin"
              onClick={closeMobile}
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="global-mobile-cta"
              onClick={closeMobile}
            >
              Get started
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;