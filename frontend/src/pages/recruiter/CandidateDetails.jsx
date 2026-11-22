import React, { useMemo, useState } from "react";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  CalendarDays,
  Download,
  CheckCircle2,
  XCircle,
  Clock3,
  Target,
  Sparkles,
  Star,
  FileText,
  Linkedin,
  Github,
  ExternalLink,
  MoreHorizontal,
  MessageSquare,
  UserCheck,
  ShieldCheck,
  Award,
  Code2,
  Languages,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./CandidateDetails.css";


/* =========================================================
   TEMPORARY FRONTEND CANDIDATE DATA

   This will later come from Spring Boot API.
========================================================= */

const candidates = {
  1: {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    role: "Java Backend Developer",
    location: "Bengaluru, India",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    experience: "3 Years",
    education: "B.Tech Computer Science",
    university:
      "Visvesvaraya Technological University",
    applied: "2 days ago",
    status: "Shortlisted",
    match: 94,

    summary:
      "Backend-focused software engineer with strong experience in Java, Spring Boot, REST APIs and relational databases. Experienced in building scalable services and production-ready backend systems.",

    skills: [
      "Java",
      "Spring Boot",
      "REST API",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "Git",
      "Microservices",
    ],

    matchedSkills: [
      "Java",
      "Spring Boot",
      "REST API",
      "MySQL",
      "Git",
    ],

    missingSkills: [
      "Kubernetes",
    ],

    experienceDetails: [
      {
        company: "TechNova Solutions",
        role: "Java Backend Developer",
        duration: "2024 — Present",
        description:
          "Developing Spring Boot REST services, integrating MySQL databases and improving API performance for enterprise applications.",
      },

      {
        company: "CodeSphere Pvt. Ltd.",
        role: "Software Engineer",
        duration: "2023 — 2024",
        description:
          "Worked on Java-based web applications, database integration and backend API development.",
      },
    ],

    projects: [
      {
        name: "AI Job Portal",
        description:
          "Developed a recruitment platform using Spring Boot, MySQL and AI-assisted candidate matching.",
        tech: [
          "Java",
          "Spring Boot",
          "MySQL",
          "REST API",
        ],
      },

      {
        name: "Employee Management System",
        description:
          "Built a role-based employee management application with CRUD APIs and database integration.",
        tech: [
          "Java",
          "Spring Boot",
          "PostgreSQL",
        ],
      },
    ],

    languages: [
      "English",
      "Hindi",
    ],

    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};


/* =========================================================
   STATUS OPTIONS
========================================================= */

const statusOptions = [
  {
    label: "Review",
    icon: Clock3,
    className: "status-review",
  },

  {
    label: "Shortlisted",
    icon: CheckCircle2,
    className: "status-shortlisted",
  },

  {
    label: "Interview",
    icon: Target,
    className: "status-interview",
  },

  {
    label: "Rejected",
    icon: XCircle,
    className: "status-rejected",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

const CandidateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * Candidate ID comes from:
   *
   * /recruiter/candidate/1
   *
   * /recruiter/candidate/2
   *
   * etc.
   */

  const candidate =
    candidates[Number(id)] || candidates[1];

  const [status, setStatus] = useState(
    candidate.status
  );

  const [activeTab, setActiveTab] =
    useState("overview");

  const [showStatusMenu, setShowStatusMenu] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

  const [showMessage, setShowMessage] =
    useState(false);


  /* =====================================================
     AI SCORE LABEL
  ===================================================== */

  const scoreLabel = useMemo(() => {
    if (candidate.match >= 90) {
      return "Exceptional match";
    }

    if (candidate.match >= 85) {
      return "Strong match";
    }

    if (candidate.match >= 75) {
      return "Good match";
    }

    return "Potential match";
  }, [candidate.match]);


  const scoreClass = useMemo(() => {
    if (candidate.match >= 90) {
      return "excellent";
    }

    if (candidate.match >= 85) {
      return "strong";
    }

    return "good";
  }, [candidate.match]);


  /* =====================================================
     CURRENT STATUS
  ===================================================== */

  const currentStatus =
    statusOptions.find(
      (item) => item.label === status
    ) || statusOptions[0];

  const StatusIcon = currentStatus.icon;


  /* =====================================================
     HANDLERS
  ===================================================== */

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setShowStatusMenu(false);
  };


  const handleDownload = () => {
    alert(
      "Resume download will be connected to the backend."
    );
  };


  const handleMessage = () => {
    setShowMessage(true);
  };


  return (
    <div className="candidate-details-page">

      {/* =================================================
          BACK / HEADER
      ================================================= */}

      <div className="candidate-details-header">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back to Applicants
        </button>


        <div className="candidate-header-actions">

          <button
            type="button"
            className="candidate-secondary-button"
            onClick={handleMessage}
          >
            <MessageSquare size={16} />
            Message
          </button>


          <div className="candidate-menu-wrapper">

            <button
              type="button"
              className="candidate-icon-button"
              onClick={() =>
                setShowMoreMenu(
                  !showMoreMenu
                )
              }
              aria-label="More actions"
            >
              <MoreHorizontal size={19} />
            </button>


            {showMoreMenu && (
              <div className="candidate-more-menu">

                <button type="button">
                  <Star size={15} />
                  Add to favorites
                </button>

                <button type="button">
                  <UserCheck size={15} />
                  Assign recruiter
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                >
                  <Download size={15} />
                  Download profile
                </button>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =================================================
          PROFILE HERO
      ================================================= */}

      <section className="candidate-profile-hero">

        <div className="candidate-profile-main">

          <div className="candidate-large-avatar">
            {candidate.initials}
          </div>


          <div className="candidate-profile-info">

            <div className="candidate-name-line">

              <h1>
                {candidate.name}
              </h1>


              <span
                className={`candidate-status-badge ${currentStatus.className}`}
              >
                <StatusIcon size={13} />
                {status}
              </span>

            </div>


            <p className="candidate-role">
              {candidate.role}
            </p>


            <div className="candidate-meta-row">

              <span>
                <MapPin size={14} />
                {candidate.location}
              </span>

              <span>
                <BriefcaseBusiness size={14} />
                {candidate.experience}
              </span>

              <span>
                <GraduationCap size={14} />
                {candidate.education}
              </span>

            </div>


            <div className="candidate-contact-row">

              <a
                href={`mailto:${candidate.email}`}
              >
                <Mail size={14} />
                {candidate.email}
              </a>

              <a
                href={`tel:${candidate.phone}`}
              >
                <Phone size={14} />
                {candidate.phone}
              </a>

            </div>

          </div>

        </div>


        {/* HERO ACTIONS */}

        <div className="candidate-hero-actions">

          <div className="status-control-wrapper">

            <button
              type="button"
              className={`status-control ${currentStatus.className}`}
              onClick={() =>
                setShowStatusMenu(
                  !showStatusMenu
                )
              }
            >
              <StatusIcon size={15} />

              {status}

              <span className="status-chevron">
                ⌄
              </span>
            </button>


            {showStatusMenu && (
              <div className="status-dropdown">

                {statusOptions.map(
                  (option) => {
                    const Icon =
                      option.icon;

                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={
                          option.label === status
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          handleStatusChange(
                            option.label
                          )
                        }
                      >
                        <Icon size={15} />
                        {option.label}
                      </button>
                    );
                  }
                )}

              </div>
            )}

          </div>


          <button
            type="button"
            className="primary-action"
            onClick={() =>
              handleStatusChange(
                "Interview"
              )
            }
          >
            <CalendarDays size={16} />
            Schedule Interview
          </button>

        </div>

      </section>


      {/* =================================================
          QUICK METRICS
      ================================================= */}

      <section className="candidate-metrics">

        <div className="candidate-metric-card">

          <div className="metric-icon blue">
            <Sparkles size={17} />
          </div>

          <div>
            <span>
              AI Match
            </span>

            <strong>
              {candidate.match}%
            </strong>
          </div>

          <div className="metric-trend">
            {scoreLabel}
          </div>

        </div>


        <div className="candidate-metric-card">

          <div className="metric-icon green">
            <BriefcaseBusiness size={17} />
          </div>

          <div>
            <span>
              Experience
            </span>

            <strong>
              {candidate.experience}
            </strong>
          </div>

          <div className="metric-trend neutral">
            Relevant
          </div>

        </div>


        <div className="candidate-metric-card">

          <div className="metric-icon violet">
            <Code2 size={17} />
          </div>

          <div>
            <span>
              Skills
            </span>

            <strong>
              {candidate.skills.length}
            </strong>
          </div>

          <div className="metric-trend">
            {candidate.matchedSkills.length} matched
          </div>

        </div>


        <div className="candidate-metric-card">

          <div className="metric-icon orange">
            <CalendarDays size={17} />
          </div>

          <div>
            <span>
              Applied
            </span>

            <strong>
              {candidate.applied}
            </strong>
          </div>

          <div className="metric-trend neutral">
            Application
          </div>

        </div>

      </section>


      {/* =================================================
          TABS
      ================================================= */}

      <div className="candidate-detail-tabs">

        {[
          ["overview", "Overview"],
          ["experience", "Experience"],
          ["projects", "Projects"],
          ["resume", "Resume"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={
              activeTab === value
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(value)
            }
          >
            {label}
          </button>
        ))}

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="candidate-details-grid">

        <main className="candidate-details-main">


          {/* =================================================
              OVERVIEW
          ================================================= */}

          {activeTab === "overview" && (
            <>

              {/* ABOUT */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <span className="section-kicker">
                      Candidate profile
                    </span>

                    <h2>
                      About candidate
                    </h2>

                  </div>

                </div>


                <p className="candidate-summary">
                  {candidate.summary}
                </p>

              </section>


              {/* SKILLS */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <span className="section-kicker">
                      Technical profile
                    </span>

                    <h2>
                      Skills & expertise
                    </h2>

                  </div>

                </div>


                <div className="skills-section">

                  <div>

                    <span className="skills-label">
                      All skills
                    </span>


                    <div className="details-skill-list">

                      {candidate.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="details-skill"
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>


                  <div className="skill-match-grid">

                    <div className="skill-match-box matched">

                      <div className="skill-match-title">
                        <CheckCircle2 size={15} />
                        Matched skills
                      </div>


                      <div className="skill-match-list">

                        {candidate.matchedSkills.map(
                          (skill) => (
                            <span
                              key={skill}
                            >
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>


                    <div className="skill-match-box missing">

                      <div className="skill-match-title">
                        <Target size={15} />
                        Skill gaps
                      </div>


                      <div className="skill-match-list">

                        {candidate.missingSkills.map(
                          (skill) => (
                            <span
                              key={skill}
                            >
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* EDUCATION */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <span className="section-kicker">
                      Education
                    </span>

                    <h2>
                      Academic background
                    </h2>

                  </div>

                </div>


                <div className="education-item">

                  <div className="timeline-icon">
                    <GraduationCap size={18} />
                  </div>


                  <div>

                    <h3>
                      {candidate.education}
                    </h3>

                    <p>
                      {candidate.university}
                    </p>

                    <span>
                      Academic qualification
                    </span>

                  </div>

                </div>

              </section>


              {/* LINKS */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <span className="section-kicker">
                      Online presence
                    </span>

                    <h2>
                      Professional links
                    </h2>

                  </div>

                </div>


                <div className="profile-links">

                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={17} />
                    LinkedIn
                    <ExternalLink size={13} />
                  </a>


                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={17} />
                    GitHub
                    <ExternalLink size={13} />
                  </a>

                </div>

              </section>

            </>
          )}


          {/* =================================================
              EXPERIENCE
          ================================================= */}

          {activeTab === "experience" && (
            <section className="details-card">

              <div className="details-card-header">

                <div>

                  <span className="section-kicker">
                    Career history
                  </span>

                  <h2>
                    Work experience
                  </h2>

                </div>

              </div>


              <div className="experience-timeline">

                {candidate.experienceDetails.map(
                  (item, index) => (
                    <div
                      className="experience-item"
                      key={`${item.company}-${index}`}
                    >

                      <div className="experience-marker">
                        <BriefcaseBusiness size={16} />
                      </div>


                      <div className="experience-content">

                        <div className="experience-top">

                          <div>

                            <h3>
                              {item.role}
                            </h3>

                            <p>
                              {item.company}
                            </p>

                          </div>

                          <span>
                            {item.duration}
                          </span>

                        </div>


                        <p className="experience-description">
                          {item.description}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>
          )}


          {/* =================================================
              PROJECTS
          ================================================= */}

          {activeTab === "projects" && (
            <section className="details-card">

              <div className="details-card-header">

                <div>

                  <span className="section-kicker">
                    Portfolio
                  </span>

                  <h2>
                    Projects
                  </h2>

                </div>

              </div>


              <div className="project-list">

                {candidate.projects.map(
                  (project) => (
                    <article
                      className="project-card"
                      key={project.name}
                    >

                      <div className="project-icon">
                        <Code2 size={18} />
                      </div>


                      <div className="project-content">

                        <h3>
                          {project.name}
                        </h3>

                        <p>
                          {project.description}
                        </p>


                        <div className="project-tech">

                          {project.tech.map(
                            (tech) => (
                              <span
                                key={tech}
                              >
                                {tech}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    </article>
                  )
                )}

              </div>

            </section>
          )}


          {/* =================================================
              RESUME
          ================================================= */}

          {activeTab === "resume" && (
            <section className="details-card">

              <div className="details-card-header">

                <div>

                  <span className="section-kicker">
                    Candidate document
                  </span>

                  <h2>
                    Resume
                  </h2>

                </div>


                <button
                  type="button"
                  className="download-button"
                  onClick={handleDownload}
                >
                  <Download size={15} />
                  Download
                </button>

              </div>


              <div className="resume-preview">

                <div className="resume-preview-icon">
                  <FileText size={28} />
                </div>


                <div>

                  <h3>
                    {candidate.name} — Resume
                  </h3>

                  <p>
                    PDF resume available for recruiter review.
                  </p>

                  <span>
                    Uploaded {candidate.applied}
                  </span>

                </div>


                <button
                  type="button"
                  onClick={handleDownload}
                  aria-label="Download resume"
                >
                  <Download size={16} />
                </button>

              </div>

            </section>
          )}

        </main>


        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <aside className="candidate-details-sidebar">


          {/* AI MATCH */}

          <section
            className={`ai-match-detail-card ${scoreClass}`}
          >

            <div className="ai-card-top">

              <div className="ai-card-icon">
                <Sparkles size={18} />
              </div>


              <div>

                <span>
                  AI MATCH ANALYSIS
                </span>

                <h3>
                  Candidate fit
                </h3>

              </div>

            </div>


            <div className="large-match-score">

              <div
                className="score-ring"
                style={{
                  "--score": `${candidate.match}%`,
                }}
              >

                <div className="score-ring-inner">

                  <strong>
                    {candidate.match}
                  </strong>

                  <span>
                    %
                  </span>

                </div>

              </div>


              <div className="score-copy">

                <strong>
                  {scoreLabel}
                </strong>

                <p>
                  Strong alignment with the role
                  requirements based on skills,
                  experience and profile data.
                </p>

              </div>

            </div>


            <div className="ai-breakdown">

              <div>
                <span>Skills</span>
                <strong>96%</strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>92%</strong>
              </div>

              <div>
                <span>Education</span>
                <strong>94%</strong>
              </div>

            </div>


            <div className="verified-match">
              <ShieldCheck size={15} />
              AI analysis verified
            </div>

          </section>


          {/* APPLICATION */}

          <section className="side-card">

            <div className="side-card-header">

              <div>

                <span className="section-kicker">
                  Application
                </span>

                <h3>
                  Application details
                </h3>

              </div>

            </div>


            <div className="application-info">

              <div>

                <span>
                  Applied
                </span>

                <strong>
                  {candidate.applied}
                </strong>

              </div>


              <div>

                <span>
                  Current status
                </span>

                <strong className="status-text">
                  {status}
                </strong>

              </div>


              <div>

                <span>
                  Job role
                </span>

                <strong>
                  {candidate.role}
                </strong>

              </div>

            </div>

          </section>


          {/* LANGUAGES */}

          <section className="side-card">

            <div className="side-card-header">

              <div>

                <span className="section-kicker">
                  Communication
                </span>

                <h3>
                  Languages
                </h3>

              </div>

            </div>


            <div className="language-list">

              {candidate.languages.map(
                (language) => (
                  <div
                    key={language}
                  >

                    <Languages size={15} />

                    <span>
                      {language}
                    </span>

                    <small>
                      Professional
                    </small>

                  </div>
                )
              )}

            </div>

          </section>


          {/* RECRUITER ACTION */}

          <section className="recruiter-action-card">

            <div className="recruiter-action-icon">
              <Award size={19} />
            </div>


            <h3>
              Ready for the next step?
            </h3>


            <p>
              Move this candidate forward in
              your hiring workflow.
            </p>


            <button
              type="button"
              onClick={() =>
                handleStatusChange(
                  "Interview"
                )
              }
            >
              <CalendarDays size={15} />
              Schedule interview
            </button>

          </section>

        </aside>

      </div>


      {/* =================================================
          MESSAGE MODAL
      ================================================= */}

      {showMessage && (
        <div
          className="candidate-modal-overlay"
          onClick={() =>
            setShowMessage(false)
          }
        >

          <div
            className="message-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="message-modal-icon">
              <MessageSquare size={20} />
            </div>


            <h2>
              Message candidate
            </h2>


            <p>
              Messaging will be connected to
              the backend notification system.
            </p>


            <div className="message-modal-actions">

              <button
                type="button"
                className="modal-cancel"
                onClick={() =>
                  setShowMessage(false)
                }
              >
                Cancel
              </button>


              <button
                type="button"
                className="modal-primary"
                onClick={() =>
                  setShowMessage(false)
                }
              >
                Continue
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};


export default CandidateDetails;