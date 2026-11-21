import React from "react";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileText,
  Github,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* =========================================================
   FEATURED JOB DATA
========================================================= */

const featuredJobs = [
  {
    id: 1,
    company: "TechNova",
    logo: "TN",
    title: "Java Backend Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹8–14 LPA",
    skills: ["Java", "Spring Boot", "MySQL"],
    match: 94,
  },
  {
    id: 2,
    company: "CloudCore",
    logo: "CC",
    title: "Full Stack Developer",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "2–4 Years",
    salary: "₹10–18 LPA",
    skills: ["React", "Node.js", "MongoDB"],
    match: 89,
  },
  {
    id: 3,
    company: "DataForge",
    logo: "DF",
    title: "Software Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹7–12 LPA",
    skills: ["Java", "DSA", "SQL"],
    match: 86,
  },
];

/* =========================================================
   PLATFORM STATS
========================================================= */

const stats = [
  {
    value: "12K+",
    label: "Active Jobs",
  },
  {
    value: "8K+",
    label: "Companies",
  },
  {
    value: "45K+",
    label: "Developers",
  },
  {
    value: "91%",
    label: "Match Accuracy",
  },
];

/* =========================================================
   PLATFORM FEATURES
========================================================= */

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Matching",
    description:
      "Your skills, experience and preferences are analyzed to surface jobs that actually fit your profile.",
  },
  {
    icon: Target,
    title: "Skill-Based Discovery",
    description:
      "Find opportunities based on your real technical stack instead of relying only on job titles.",
  },
  {
    icon: FileText,
    title: "Resume Intelligence",
    description:
      "Turn your resume into structured career signals and discover where your profile can improve.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Opportunities",
    description:
      "Discover professional opportunities with structured company and job information.",
  },
];

/* =========================================================
   HOW IT WORKS
========================================================= */

const process = [
  {
    number: "01",
    title: "Build your profile",
    text: "Add your skills, experience, projects, resume and career preferences.",
  },
  {
    number: "02",
    title: "Let AI understand you",
    text: "Our matching engine compares your profile with relevant opportunities.",
  },
  {
    number: "03",
    title: "Apply with confidence",
    text: "Explore high-fit jobs and track your applications from one dashboard.",
  },
];

/* =========================================================
   HOME COMPONENT
========================================================= */

function Home() {
  const navigate = useNavigate();

  /* =======================================================
     JOB SEARCH
  ======================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const keyword = form.get("keyword")?.toString().trim();
    const location = form.get("location")?.toString().trim();

    const params = new URLSearchParams();

    if (keyword) {
      params.set("keyword", keyword);
    }

    if (location) {
      params.set("location", location);
    }

    const query = params.toString();

    navigate(`/jobs${query ? `?${query}` : ""}`);
  };

  return (
    <div className="home-page">
      <main>

        {/* =================================================
            HERO SECTION
        ================================================= */}

        <section className="home-hero">
          <div className="home-hero-grid" />

          <div className="home-container home-hero-container">

            {/* =============================================
                HERO CONTENT
            ============================================= */}

            <div className="home-hero-content">

              {/* Eyebrow */}

              <div className="home-eyebrow">
                <span className="home-eyebrow-dot" />
                AI-powered career matching
              </div>

              {/* Main Heading */}

              <h1>
                Build your career.
                <span> Find the right opportunity.</span>
              </h1>

              {/* Description */}

              <p className="home-hero-description">
                A smarter way for developers to discover jobs that match their
                skills, experience and ambitions — powered by AI.
              </p>

              {/* =========================================
                  JOB SEARCH
              ========================================= */}

              <form
                className="home-search-box"
                onSubmit={handleSearch}
              >
                {/* Keyword */}

                <div className="home-search-field">
                  <Search size={20} />

                  <input
                    name="keyword"
                    type="text"
                    placeholder="Job title, skills or keywords"
                  />
                </div>

                <div className="home-search-divider" />

                {/* Location */}

                <div className="home-search-field">
                  <MapPin size={20} />

                  <input
                    name="location"
                    type="text"
                    placeholder="Location or remote"
                  />
                </div>

                {/* Search Button */}

                <button
                  type="submit"
                  className="home-search-button"
                >
                  Search Jobs
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* =========================================
                  POPULAR SEARCHES
              ========================================= */}

              <div className="home-popular-searches">
                <span>Popular:</span>

                <Link to="/jobs?keyword=Java">
                  Java
                </Link>

                <Link to="/jobs?keyword=Spring%20Boot">
                  Spring Boot
                </Link>

                <Link to="/jobs?keyword=React">
                  React
                </Link>

                <Link to="/jobs?keyword=Node.js">
                  Node.js
                </Link>

                <Link to="/jobs?keyword=Software%20Engineer">
                  Software Engineer
                </Link>
              </div>

              {/* =========================================
                  TRUST / USERS
              ========================================= */}

              <div className="home-hero-trust">

                <div className="home-trust-avatars">
                  <span>AK</span>
                  <span>RS</span>
                  <span>VP</span>
                  <span>+</span>
                </div>

                <div>
                  <strong>
                    45,000+ developers
                  </strong>

                  <p>
                    are already exploring better opportunities
                  </p>
                </div>

              </div>
            </div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <div className="home-hero-visual">

              {/* =============================================
                  CODE WINDOW
              ============================================= */}

              <div className="home-code-panel">

                <div className="home-window-bar">

                  <div className="home-window-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="home-window-title">
                    developer-profile.json
                  </span>

                  <Code2 size={15} />
                </div>

                <div className="home-code-body">

                  <div className="home-code-line">
                    <span className="code-key">
                      profile
                    </span>

                    <span className="code-symbol">
                      :
                    </span>

                    <span className="code-brace">
                      {"{"}
                    </span>
                  </div>

                  <div className="home-code-line indent">
                    <span className="code-key">
                      role
                    </span>

                    <span className="code-symbol">
                      :
                    </span>

                    <span className="code-string">
                      "Java Backend Developer"
                    </span>
                  </div>

                  <div className="home-code-line indent">
                    <span className="code-key">
                      experience
                    </span>

                    <span className="code-symbol">
                      :
                    </span>

                    <span className="code-number">
                      2
                    </span>
                  </div>

                  <div className="home-code-line indent">
                    <span className="code-key">
                      skills
                    </span>

                    <span className="code-symbol">
                      :
                    </span>

                    <span className="code-brace">
                      {"["}
                    </span>
                  </div>

                  <div className="home-code-line double-indent">
                    <span className="code-string">
                      "Java"
                    </span>

                    <span className="code-comma">
                      ,
                    </span>
                  </div>

                  <div className="home-code-line double-indent">
                    <span className="code-string">
                      "Spring Boot"
                    </span>

                    <span className="code-comma">
                      ,
                    </span>
                  </div>

                  <div className="home-code-line double-indent">
                    <span className="code-string">
                      "MySQL"
                    </span>
                  </div>

                  <div className="home-code-line indent">
                    <span className="code-brace">
                      {"],"}
                    </span>
                  </div>

                  <div className="home-code-line indent">
                    <span className="code-key">
                      availability
                    </span>

                    <span className="code-symbol">
                      :
                    </span>

                    <span className="code-string">
                      "Open to work"
                    </span>
                  </div>

                  <div className="home-code-line">
                    <span className="code-brace">
                      {"}"}
                    </span>
                  </div>

                </div>
              </div>

              {/* =============================================
                  AI MATCH CARD
              ============================================= */}

              <div className="home-match-card">

                <div className="home-match-top">

                  <div className="home-match-icon">
                    <BrainCircuit size={19} />
                  </div>

                  <div>
                    <span>
                      AI Match
                    </span>

                    <strong>
                      Excellent fit
                    </strong>
                  </div>

                  <div className="home-match-score">
                    94%
                  </div>

                </div>

                <div className="home-match-progress">
                  <span
                    style={{
                      width: "94%",
                    }}
                  />
                </div>

                <div className="home-match-meta">

                  <span>
                    <CheckCircle2 size={15} />
                    8/9 skills matched
                  </span>

                  <span>
                    <Zap size={15} />
                    High relevance
                  </span>

                </div>
              </div>

              {/* =============================================
                  FLOATING JOB CARD
              ============================================= */}

              <div className="home-floating-job">

                <div className="home-floating-logo">
                  TN
                </div>

                <div className="home-floating-info">

                  <strong>
                    Java Backend Developer
                  </strong>

                  <span>
                    TechNova · Bengaluru
                  </span>

                </div>

                <div className="home-floating-match">
                  94%
                </div>

              </div>

              {/* =============================================
                  GITHUB / PROFILE CARD
              ============================================= */}

              <div className="home-floating-github">

                <div className="home-github-icon">
                  <Github size={17} />
                </div>

                <div>

                  <strong>
                    Developer profile
                  </strong>

                  <span>
                    Skills analyzed
                  </span>

                </div>

                <TrendingUp size={17} />

              </div>

            </div>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="home-container">

            <div className="home-stats">

              {stats.map((stat) => (
                <div
                  className="home-stat"
                  key={stat.label}
                >
                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.label}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            FEATURED JOBS
        ================================================= */}

        <section className="home-section home-jobs-section">

          <div className="home-container">

            <div className="home-section-heading">

              <div>

                <span className="home-section-kicker">
                  OPPORTUNITIES FOR YOU
                </span>

                <h2>
                  Featured{" "}
                  <span>
                    developer jobs
                  </span>
                </h2>

                <p>
                  Discover roles from companies hiring developers across
                  different technologies and experience levels.
                </p>

              </div>

              <Link
                to="/jobs"
                className="home-text-link"
              >
                View all jobs
                <ArrowRight size={17} />
              </Link>

            </div>

            {/* =============================================
                JOB CARDS
            ============================================= */}

            <div className="home-job-grid">

              {featuredJobs.map((job) => (
                <Link
                  to={`/jobs/${job.id}`}
                  className="home-job-card"
                  key={job.id}
                >

                  <div className="home-job-card-top">

                    <div className="home-company-logo">
                      {job.logo}
                    </div>

                    <button
                      type="button"
                      className="home-save-button"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                      aria-label="Save job"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.8L6 21V4.5Z" />
                      </svg>
                    </button>

                  </div>

                  <div className="home-job-company">
                    {job.company}
                  </div>

                  <h3>
                    {job.title}
                  </h3>

                  <div className="home-job-location">
                    <MapPin size={15} />
                    {job.location}
                  </div>

                  <div className="home-job-tags">

                    <span>
                      {job.type}
                    </span>

                    <span>
                      {job.experience}
                    </span>

                  </div>

                  <div className="home-job-skills">

                    {job.skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}

                  </div>

                  <div className="home-job-bottom">

                    <div>

                      <strong>
                        {job.salary}
                      </strong>

                      <span>
                        estimated salary
                      </span>

                    </div>

                    <div className="home-job-match">

                      <span>
                        {job.match}%
                      </span>

                      <small>
                        AI match
                      </small>

                    </div>

                  </div>

                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            AI MATCHING SECTION
        ================================================= */}

        <section className="home-ai-section">

          <div className="home-container home-ai-container">

            {/* =============================================
                AI VISUAL
            ============================================= */}

            <div className="home-ai-visual">

              <div className="home-ai-orbit orbit-one" />

              <div className="home-ai-orbit orbit-two" />

              <div className="home-ai-center">

                <BrainCircuit size={40} />

                <strong>
                  AI
                </strong>

                <span>
                  Matching Engine
                </span>

              </div>

              <div className="home-ai-skill skill-one">
                <Code2 size={15} />
                Java
              </div>

              <div className="home-ai-skill skill-two">
                <Code2 size={15} />
                Spring Boot
              </div>

              <div className="home-ai-skill skill-three">
                <Code2 size={15} />
                React
              </div>

              <div className="home-ai-skill skill-four">
                <Target size={15} />
                Career Goals
              </div>

            </div>

            {/* =============================================
                AI CONTENT
            ============================================= */}

            <div className="home-ai-content">

              <span className="home-section-kicker">
                INTELLIGENT MATCHING
              </span>

              <h2>
                Stop applying everywhere.
                <span>
                  {" "}Start applying smarter.
                </span>
              </h2>

              <p>
                Your profile shouldn't disappear into hundreds of job
                listings. AI Job Portal analyzes your technical skills,
                experience and preferences to prioritize opportunities where
                you're most likely to fit.
              </p>

              <div className="home-ai-points">

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Skill compatibility analysis
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Experience and role matching
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Personalized job recommendations
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>
                    Actionable profile insights
                  </span>
                </div>

              </div>

              <Link
                to="/register"
                className="home-primary-button"
              >
                Build your AI profile
                <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        </section>

        {/* =================================================
            WHY AI JOB PORTAL
        ================================================= */}

        <section className="home-section home-feature-section">

          <div className="home-container">

            <div className="home-section-heading centered">

              <span className="home-section-kicker">
                WHY AI JOB PORTAL
              </span>

              <h2>
                Built for the{" "}
                <span>
                  modern developer
                </span>
              </h2>

              <p>
                Everything you need to discover better opportunities without
                wasting time on irrelevant listings.
              </p>

            </div>

            <div className="home-feature-grid">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    className="home-feature-card"
                    key={feature.title}
                  >

                    <div className="home-feature-icon">
                      <Icon size={22} />
                    </div>

                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.description}
                    </p>

                    <Link to="/jobs">
                      Explore
                      <ChevronRight size={15} />
                    </Link>

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section className="home-process-section">

          <div className="home-container">

            <div className="home-section-heading centered">

              <span className="home-section-kicker">
                SIMPLE PROCESS
              </span>

              <h2>
                From profile to{" "}
                <span>
                  opportunity
                </span>
              </h2>

              <p>
                Get discovered by relevant companies in three straightforward
                steps.
              </p>

            </div>

            <div className="home-process-grid">

              {process.map((item) => (
                <div
                  className="home-process-card"
                  key={item.number}
                >

                  <span className="home-process-number">
                    {item.number}
                  </span>

                  <div className="home-process-line" />

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =================================================
            CANDIDATE / RECRUITER
        ================================================= */}

        <section className="home-section home-dual-section">

          <div className="home-container home-dual-grid">

            {/* =============================================
                CANDIDATE
            ============================================= */}

            <div className="home-role-card candidate">

              <div className="home-role-icon">
                <Users size={23} />
              </div>

              <span className="home-role-label">
                FOR DEVELOPERS
              </span>

              <h2>
                Your next role should match your{" "}
                <span>
                  potential.
                </span>
              </h2>

              <p>
                Create a stronger profile, discover high-fit opportunities and
                manage your entire job search from one place.
              </p>

              <div className="home-role-list">

                <div>
                  <CheckCircle2 size={17} />
                  Personalized recommendations
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  Resume and profile insights
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  Application tracking
                </div>

              </div>

              <Link
                to="/register"
                className="home-role-button"
              >
                Create developer profile
                <ArrowRight size={17} />
              </Link>

            </div>

            {/* =============================================
                RECRUITER
            ============================================= */}

            <div className="home-role-card recruiter">

              <div className="home-role-icon">
                <Building2 size={23} />
              </div>

              <span className="home-role-label">
                FOR RECRUITERS
              </span>

              <h2>
                Find developers who{" "}
                <span>
                  fit the role.
                </span>
              </h2>

              <p>
                Reach relevant candidates faster using structured profiles,
                intelligent matching and a centralized hiring workflow.
              </p>

              <div className="home-role-list">

                <div>
                  <CheckCircle2 size={17} />
                  AI-assisted candidate matching
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  Candidate skill insights
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  Centralized applicant management
                </div>

              </div>

              <Link
                to="/register"
                className="home-role-button"
              >
                Start hiring
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="home-final-section">

          <div className="home-container">

            <div className="home-final-card">

              <div className="home-final-grid" />

              <div className="home-final-content">

                <div className="home-final-icon">
                  <Sparkles size={22} />
                </div>

                <span>
                  YOUR NEXT OPPORTUNITY STARTS HERE
                </span>

                <h2>
                  Ready to build your
                  <br />
                  next career move?
                </h2>

                <p>
                  Create your profile and let AI help you discover
                  opportunities that actually match your skills.
                </p>

                <div className="home-final-actions">

                  <Link
                    to="/register"
                    className="home-final-primary"
                  >
                    Get Started
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    to="/jobs"
                    className="home-final-secondary"
                  >
                    Browse Jobs
                  </Link>

                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;