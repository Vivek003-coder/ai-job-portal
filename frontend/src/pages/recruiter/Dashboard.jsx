import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  Users,
  UserCheck,
  UserPlus,
  ArrowUpRight,
  MoreHorizontal,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock3,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
  Check,
} from "lucide-react";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState("Last 30 days");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [openStatMenu, setOpenStatMenu] = useState(null);
  const [openPanelMenu, setOpenPanelMenu] = useState(null);

  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      change: "+3",
      description: "from last month",
      icon: BriefcaseBusiness,
      tone: "blue",
      route: "/recruiter/manage-jobs",
    },
    {
      title: "Total Applicants",
      value: "148",
      change: "+18.4%",
      description: "from last month",
      icon: Users,
      tone: "violet",
      route: "/recruiter/applicants",
    },
    {
      title: "Shortlisted",
      value: "32",
      change: "+12.6%",
      description: "from last month",
      icon: UserCheck,
      tone: "green",
      route: "/recruiter/applicants",
    },
    {
      title: "Hired",
      value: "8",
      change: "+2",
      description: "this month",
      icon: UserPlus,
      tone: "orange",
      route: "/recruiter/applicants",
    },
  ];

  const applicants = [
    {
      name: "Rahul Sharma",
      role: "Java Backend Developer",
      location: "Bangalore, India",
      experience: "2.8 years",
      match: 96,
      skills: ["Java", "Spring Boot", "MySQL"],
      initials: "RS",
    },
    {
      name: "Priya Singh",
      role: "Full Stack Developer",
      location: "Hyderabad, India",
      experience: "2.1 years",
      match: 93,
      skills: ["React", "Java", "Spring"],
      initials: "PS",
    },
    {
      name: "Arjun Mehta",
      role: "Software Engineer",
      location: "Pune, India",
      experience: "3.4 years",
      match: 89,
      skills: ["Java", "AWS", "Docker"],
      initials: "AM",
    },
    {
      name: "Neha Verma",
      role: "Backend Engineer",
      location: "Delhi, India",
      experience: "1.9 years",
      match: 86,
      skills: ["Spring Boot", "SQL", "REST"],
      initials: "NV",
    },
  ];

  const jobs = [
    {
      title: "Senior Java Backend Developer",
      location: "Bangalore",
      type: "Full-time",
      applicants: 42,
      posted: "2 days ago",
      status: "Active",
    },
    {
      title: "Full Stack Java Developer",
      location: "Hyderabad",
      type: "Full-time",
      applicants: 31,
      posted: "4 days ago",
      status: "Active",
    },
    {
      title: "Software Engineer",
      location: "Pune",
      type: "Hybrid",
      applicants: 28,
      posted: "6 days ago",
      status: "Active",
    },
  ];

  const dateOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "This year",
  ];

  const handleDateChange = (range) => {
    setDateRange(range);
    setShowDateMenu(false);
  };

  const handleStatClick = (route) => {
    navigate(route);
  };

  const handlePostJob = () => {
    navigate("/recruiter/post-job");
  };

  const handleApplicants = () => {
    navigate("/recruiter/applicants");
  };

  const handleManageJobs = () => {
    navigate("/recruiter/manage-jobs");
  };

  const handleCandidateDetails = () => {
    navigate("/recruiter/candidate-details");
  };

  const handleAIRecommendations = () => {
    navigate("/recruiter/applicants");
  };

  return (
    <div className="recruiter-dashboard">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="dashboard-header">

        <div>
          <div className="dashboard-eyebrow">
            <span className="live-dot" />
            Recruiter workspace
          </div>

          <h1>
            Good morning, Alex
            <span>👋</span>
          </h1>

          <p>
            Here's what's happening with your hiring pipeline today.
          </p>
        </div>

        <div className="dashboard-header-actions">

          {/* DATE FILTER */}

          <div className="dashboard-date-wrapper">

            <button
              type="button"
              className="dashboard-secondary-btn"
              onClick={() => {
                setShowDateMenu((prev) => !prev);
                setOpenStatMenu(null);
              }}
            >
              <CalendarDays size={16} />

              <span>{dateRange}</span>

              <ChevronRight
                size={14}
                className={`date-chevron ${
                  showDateMenu ? "date-chevron-open" : ""
                }`}
              />
            </button>

            {showDateMenu && (
              <div className="dashboard-date-menu">

                {dateOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`dashboard-date-option ${
                      dateRange === option ? "selected" : ""
                    }`}
                    onClick={() => handleDateChange(option)}
                  >
                    <span>{option}</span>

                    {dateRange === option && (
                      <Check size={15} />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* POST JOB */}

          <button
            type="button"
            className="dashboard-primary-btn"
            onClick={handlePostJob}
          >
            <BriefcaseBusiness size={16} />
            Post a Job
          </button>

        </div>

      </section>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <section className="stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className={`stat-card stat-${stat.tone}`}
              key={stat.title}
              onClick={() => handleStatClick(stat.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleStatClick(stat.route);
                }
              }}
            >

              <div className="stat-card-top">

                <div className="stat-icon">
                  <Icon size={19} />
                </div>

                <button
                  type="button"
                  className="stat-more"
                  aria-label={`Options for ${stat.title}`}
                  onClick={(event) => {
                    event.stopPropagation();

                    setOpenStatMenu(
                      openStatMenu === stat.title
                        ? null
                        : stat.title
                    );
                  }}
                >
                  <MoreHorizontal size={17} />
                </button>

              </div>

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-footer">

                <span className="stat-title">
                  {stat.title}
                </span>

                <span className="stat-change">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>

              </div>

              <div className="stat-description">
                {stat.description}
              </div>

              {openStatMenu === stat.title && (
                <div
                  className="stat-action-menu"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleStatClick(stat.route)}
                  >
                    Open details
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenStatMenu(null)}
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          );
        })}

      </section>


      {/* =====================================================
          MAIN ANALYTICS
      ===================================================== */}

      <section className="dashboard-main-grid">

        {/* Hiring Overview */}

        <div className="dashboard-panel hiring-panel">

          <div className="panel-header">

            <div>
              <h2>Hiring overview</h2>

              <p>
                Applications received over the last 30 days
              </p>
            </div>

            <button
              type="button"
              className="panel-menu"
              aria-label="Hiring overview options"
              onClick={() =>
                setOpenPanelMenu(
                  openPanelMenu === "hiring"
                    ? null
                    : "hiring"
                )
              }
            >
              <MoreHorizontal size={18} />
            </button>

          </div>

          {openPanelMenu === "hiring" && (
            <div className="panel-action-menu">
              <button
                type="button"
                onClick={() => setDateRange("Last 30 days")}
              >
                Last 30 days
              </button>

              <button
                type="button"
                onClick={() => setDateRange("Last 90 days")}
              >
                Last 90 days
              </button>
            </div>
          )}

          <div className="chart-container">

            <div className="chart-y-axis">
              <span>60</span>
              <span>45</span>
              <span>30</span>
              <span>15</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-line line-1" />
              <div className="chart-grid-line line-2" />
              <div className="chart-grid-line line-3" />
              <div className="chart-grid-line line-4" />
              <div className="chart-grid-line line-5" />

              <svg
                className="chart-svg"
                viewBox="0 0 700 230"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity="0.22"
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="
                    M0 184
                    C35 170 45 160 72 166
                    C100 173 113 143 145 151
                    C180 159 188 121 218 132
                    C248 143 267 108 296 119
                    C330 132 340 88 373 101
                    C407 114 425 79 453 91
                    C480 103 501 58 529 72
                    C557 87 581 48 610 60
                    C640 73 663 32 700 42
                    L700 230
                    L0 230
                    Z
                  "
                  fill="url(#areaGradient)"
                />

                <path
                  d="
                    M0 184
                    C35 170 45 160 72 166
                    C100 173 113 143 145 151
                    C180 159 188 121 218 132
                    C248 143 267 108 296 119
                    C330 132 340 88 373 101
                    C407 114 425 79 453 91
                    C480 103 501 58 529 72
                    C557 87 581 48 610 60
                    C640 73 663 32 700 42
                  "
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <div className="chart-labels">
                <span>May 1</span>
                <span>May 7</span>
                <span>May 14</span>
                <span>May 21</span>
                <span>May 30</span>
              </div>

            </div>

          </div>

          <div className="chart-summary">

            <div>
              <span>Total applications</span>
              <strong>148</strong>
            </div>

            <div>
              <span>Qualified candidates</span>
              <strong>86</strong>
            </div>

            <div>
              <span>Avg. time to shortlist</span>
              <strong>2.4 days</strong>
            </div>

          </div>

        </div>


        {/* AI Insights */}

        <div className="dashboard-panel ai-panel">

          <div className="ai-panel-glow" />

          <div className="ai-content">

            <div className="ai-icon">
              <Sparkles size={20} />
            </div>

            <span className="ai-label">
              AI Hiring Intelligence
            </span>

            <h2>
              Your hiring pipeline
              <br />
              is looking strong.
            </h2>

            <p>
              Our matching engine found
              <strong> 23 candidates </strong>
              with an AI compatibility score above 85%.
            </p>

            <div className="ai-stat">

              <div className="ai-stat-number">
                92%
              </div>

              <div>
                <span>Average match quality</span>
                <small>↑ 7.4% this month</small>
              </div>

            </div>

            <button
              type="button"
              className="ai-action"
              onClick={handleAIRecommendations}
            >
              View AI recommendations
              <ArrowUpRight size={16} />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          LOWER GRID
      ===================================================== */}

      <section className="dashboard-lower-grid">

        {/* Top matching candidates */}

        <div className="dashboard-panel applicants-panel">

          <div className="panel-header">

            <div>
              <h2>Top matching candidates</h2>

              <p>
                Recently evaluated by the AI matching engine
              </p>
            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={handleApplicants}
            >
              View all
              <ChevronRight size={15} />
            </button>

          </div>

          <div className="applicant-list">

            {applicants.map((candidate) => (
              <div
                className="applicant-row"
                key={candidate.name}
              >

                <div className="candidate-avatar">
                  {candidate.initials}
                </div>

                <div className="candidate-main">

                  <div className="candidate-name">
                    {candidate.name}
                  </div>

                  <div className="candidate-role">
                    {candidate.role}
                  </div>

                  <div className="candidate-meta">

                    <span>
                      <MapPin size={12} />
                      {candidate.location}
                    </span>

                    <span>
                      <Clock3 size={12} />
                      {candidate.experience}
                    </span>

                  </div>

                </div>

                <div className="candidate-skills">

                  {candidate.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}

                </div>

                <div className="match-score">

                  <div className="match-circle">
                    {candidate.match}%
                  </div>

                  <span>AI Match</span>

                </div>

                <button
                  type="button"
                  className="candidate-arrow"
                  aria-label={`View ${candidate.name}`}
                  onClick={handleCandidateDetails}
                >
                  <ChevronRight size={17} />
                </button>

              </div>
            ))}

          </div>

        </div>


        {/* Active Jobs */}

        <div className="dashboard-panel jobs-panel">

          <div className="panel-header">

            <div>
              <h2>Active jobs</h2>

              <p>
                Currently accepting applications
              </p>
            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={handleManageJobs}
            >
              View all
              <ChevronRight size={15} />
            </button>

          </div>

          <div className="jobs-list">

            {jobs.map((job) => (
              <div
                className="job-row"
                key={job.title}
              >

                <div className="job-icon">
                  <BriefcaseBusiness size={17} />
                </div>

                <div className="job-info">

                  <h3>{job.title}</h3>

                  <div className="job-meta">

                    <span>
                      <MapPin size={12} />
                      {job.location}
                    </span>

                    <span>
                      {job.type}
                    </span>

                  </div>

                  <div className="job-bottom">

                    <span>
                      <Users size={12} />
                      {job.applicants} applicants
                    </span>

                    <span>
                      {job.posted}
                    </span>

                  </div>

                </div>

                <span className="job-status">
                  <CheckCircle2 size={12} />
                  {job.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="quick-actions">

        <div className="quick-action-intro">

          <div className="quick-action-icon">
            <Sparkles size={18} />
          </div>

          <div>
            <h3>Ready to hire?</h3>
            <p>Move your next role forward.</p>
          </div>

        </div>

        <div className="quick-action-buttons">

          <button
            type="button"
            onClick={handlePostJob}
          >
            <BriefcaseBusiness size={16} />
            Create a job
          </button>

          <button
            type="button"
            onClick={handleApplicants}
          >
            <Users size={16} />
            Review applicants
          </button>

          <button
            type="button"
            onClick={handleAIRecommendations}
          >
            <Sparkles size={16} />
            Explore AI matches
          </button>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;