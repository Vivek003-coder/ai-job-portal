import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  BriefcaseBusiness,
  ChevronDown,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  UserRound,
  ArrowUpRight,
  X,
  Mail,
  Phone,
  GraduationCap,
  CalendarDays,
  FileText,
  BrainCircuit,
  Target,
  ShieldCheck,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jobService from "../../services/jobService";
import applicationService from "../../services/applicationService";
import "./Applicants.css";

const demoJobs = [
  {
    id: 1,
    title: "Java Backend Developer",
    applicants: 48,
  },
  {
    id: 2,
    title: "Full Stack Java Developer",
    applicants: 36,
  },
  {
    id: 3,
    title: "Software Engineer",
    applicants: 0,
  },
  {
    id: 4,
    title: "Spring Boot Developer",
    applicants: 61,
  },
];

const demoApplicants = [
  {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    role: "Java Backend Developer",
    location: "Bangalore, India",
    experience: "3 Years",
    skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    match: 96,
    status: "Shortlisted",
    applied: "2 hours ago",
    resume: "Java_Backend_Resume.pdf",
    education: "B.Tech Computer Science",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    matchedSkills: 9,
    totalSkills: 10,
    summary:
      "Strong backend profile with excellent Java and Spring Boot experience. Resume demonstrates relevant API development and database experience.",
  },
  {
    id: 2,
    name: "Priya Singh",
    initials: "PS",
    role: "Backend Engineer",
    location: "Hyderabad, India",
    experience: "2 Years",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    match: 92,
    status: "Review",
    applied: "5 hours ago",
    resume: "Priya_Singh_Resume.pdf",
    education: "B.Tech Information Technology",
    email: "priya.singh@example.com",
    phone: "+91 98123 45678",
    matchedSkills: 8,
    totalSkills: 10,
    summary:
      "Excellent technical alignment with the role. Strong Spring Boot and database experience with additional Docker exposure.",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    initials: "AK",
    role: "Java Developer",
    location: "Pune, India",
    experience: "2.5 Years",
    skills: ["Java", "Spring", "MySQL", "AWS"],
    match: 88,
    status: "Interview",
    applied: "1 day ago",
    resume: "Arjun_Kumar_Resume.pdf",
    education: "B.E. Computer Engineering",
    email: "arjun.kumar@example.com",
    phone: "+91 98211 33445",
    matchedSkills: 8,
    totalSkills: 10,
    summary:
      "Good overall match with strong Java fundamentals and cloud exposure. Candidate is suitable for technical interview evaluation.",
  },
  {
    id: 4,
    name: "Neha Verma",
    initials: "NV",
    role: "Software Engineer",
    location: "Noida, India",
    experience: "1.5 Years",
    skills: ["Java", "Spring Boot", "MongoDB", "Git"],
    match: 84,
    status: "Review",
    applied: "1 day ago",
    resume: "Neha_Verma_Resume.pdf",
    education: "B.Tech Computer Science",
    email: "neha.verma@example.com",
    phone: "+91 99123 44556",
    matchedSkills: 7,
    totalSkills: 10,
    summary:
      "Solid early-career candidate with relevant Java and Spring Boot experience. Some role-specific skills need further validation.",
  },
  {
    id: 5,
    name: "Aman Gupta",
    initials: "AG",
    role: "Backend Developer",
    location: "Delhi, India",
    experience: "1 Year",
    skills: ["Java", "JDBC", "MySQL", "Spring"],
    match: 79,
    status: "Rejected",
    applied: "2 days ago",
    resume: "Aman_Gupta_Resume.pdf",
    education: "B.Tech Information Technology",
    email: "aman.gupta@example.com",
    phone: "+91 97654 32109",
    matchedSkills: 6,
    totalSkills: 10,
    summary:
      "Has relevant Java fundamentals but currently shows lower alignment with the complete skill requirements of the position.",
  },
];

const statusConfig = {
  Review: {
    icon: Clock3,
    className: "status-review",
  },
  Shortlisted: {
    icon: CheckCircle2,
    className: "status-shortlisted",
  },
  Interview: {
    icon: Target,
    className: "status-interview",
  },
  Rejected: {
    icon: XCircle,
    className: "status-rejected",
  },
};

const Applicants = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestedJobId = Number(searchParams.get("jobId")) || null;
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [requestError, setRequestError] = useState("");
  const selectedJob = jobs.find((job) => job.id === requestedJobId) || jobs[0] || null;

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  useEffect(() => {
    let active = true;
    jobService.getMyJobs()
      .then((records) => {
        if (active) {
          setJobs(records.map((job) => ({
            ...job,
            applicants: 0,
            statusLabel: job.status === "ACTIVE" ? "Active" : "Closed",
          })));
        }
      })
      .catch((error) => {
        if (active) setRequestError(error.response?.data?.message || "Unable to load jobs.");
      })
      .finally(() => {
        if (active) setLoadingJobs(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedJob) return undefined;
    let active = true;
    setLoadingApplicants(true);
    applicationService.getApplicants(selectedJob.id)
      .then((records) => {
        if (active) {
          setApplicants(records.map((record) => ({
            ...record,
            id: record.candidateId,
            applicationId: record.id,
            name: record.candidateName,
            initials: (record.candidateName || "Candidate")
              .split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
            role: record.jobTitle,
            location: record.location || "Not specified",
            experience: "Not provided",
            skills: [],
            match: 0,
            status: record.status === "Under Review" || record.status === "Applied"
              ? "Review"
              : record.status,
            applied: record.appliedAt ? new Date(record.appliedAt).toLocaleDateString() : "",
            resume: "No resume uploaded",
            education: "Not provided",
            email: record.candidateEmail,
            phone: "",
            matchedSkills: 0,
            totalSkills: 0,
            summary: record.coverLetter || "No cover letter was provided.",
          })));
        }
      })
      .catch((error) => {
        if (active) setRequestError(error.response?.data?.message || "Unable to load applicants.");
      })
      .finally(() => {
        if (active) setLoadingApplicants(false);
      });
    return () => { active = false; };
  }, [selectedJob?.id]);

  const filteredApplicants = useMemo(() => {
    let result = applicants.filter((candidate) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query) ||
        candidate.location.toLowerCase().includes(query) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesStatus =
        activeFilter === "All" ||
        candidate.status === activeFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortBy === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    applicants,
    search,
    activeFilter,
    sortBy,
  ]);

  const stats = {
    total: applicants.length,
    shortlisted: applicants.filter(
      (a) => a.status === "Shortlisted"
    ).length,
    interview: applicants.filter(
      (a) => a.status === "Interview"
    ).length,
    highMatch: applicants.filter(
      (a) => a.match >= 85
    ).length,
  };

  const updateStatus = async (id, status) => {
    const applicant = applicants.find((candidate) => candidate.id === id);
    if (!applicant) return;
    try {
      const apiStatus = status === "Review" ? "Under Review" : status;
      await applicationService.updateStatus(applicant.applicationId, apiStatus);
      setApplicants((prev) => prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status } : candidate
      ));
      setSelectedApplicant(null);
    } catch (error) {
      setRequestError(error.response?.data?.message || "Unable to update application status.");
    }
  };

  const openCandidate = (candidate) => {
    navigate(`/recruiter/candidate/${candidate.id}`);
  };

  return (
    <div className="applicants-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="applicants-header">

        <div className="header-copy">

          <div className="applicants-eyebrow">
            <BrainCircuit size={15} />
            AI Hiring Workspace
          </div>

          <div className="title-row">
            <div>
              <h1>Applicants</h1>

              <p>
                Review, rank, and shortlist candidates
                using AI-powered candidate matching.
              </p>
            </div>
          </div>

        </div>

        <div className="job-selector">

          <BriefcaseBusiness size={17} />

          <select
            value={selectedJob?.id || ""}
            onChange={(e) =>
              navigate(
                `/recruiter/applicants?jobId=${e.target.value}`
              )
            }
          >
            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
              >
                {job.title}
              </option>
            ))}
          </select>

          <ChevronDown size={15} />

        </div>

      </section>

      {/* =====================================================
          ACTIVE JOB BANNER
      ===================================================== */}

      <section className="active-job-card">

        <div className="active-job-info">

          <div className="active-job-logo">
            <BriefcaseBusiness size={21} />
          </div>

          <div>

            <div className="active-job-title-row">

              <h2>{selectedJob?.title || "Select a job"}</h2>

              <span className="live-badge">
                <span />
                {selectedJob?.statusLabel || "No jobs"}
              </span>

            </div>

            <div className="active-job-meta">

              <span>
                <UsersIcon />
                {applicants.length} applicants
              </span>

              <span>
                <Sparkles size={14} />
                AI ranking enabled
              </span>

              <span>
                <CalendarDays size={14} />
                Posted recently
              </span>

            </div>

          </div>

        </div>

        <button
          className="manage-job-button"
          onClick={() =>
            navigate("/recruiter/manage-jobs")
          }
        >
          Manage Job
          <ArrowUpRight size={15} />
        </button>

      </section>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section className="applicant-stats">

        <StatCard
          label="Total Applicants"
          value={stats.total}
          helper="Applications received"
          icon={<UsersIcon />}
          type="blue"
        />

        <StatCard
          label="High AI Matches"
          value={stats.highMatch}
          helper="85%+ match score"
          icon={<Sparkles size={20} />}
          type="purple"
        />

        <StatCard
          label="Shortlisted"
          value={stats.shortlisted}
          helper="Ready for next stage"
          icon={<CheckCircle2 size={20} />}
          type="green"
        />

        <StatCard
          label="Interviews"
          value={stats.interview}
          helper="Candidates in interview"
          icon={<Target size={20} />}
          type="orange"
        />

      </section>

      {/* =====================================================
          MAIN WORKSPACE
      ===================================================== */}

      <section className="applicants-workspace">

        {/* Toolbar */}

        <div className="workspace-toolbar">

          <div className="search-container">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search candidates, skills, location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <X size={15} />
              </button>
            )}

          </div>

          <div className="workspace-actions">

            <button className="filter-button">
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <div className="sort-control">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="match">
                  Highest AI Match
                </option>

                <option value="name">
                  Candidate Name
                </option>
              </select>

              <ChevronDown size={15} />

            </div>

          </div>

        </div>

        {/* Status tabs */}

        <div className="status-tabs">

          {[
            "All",
            "Review",
            "Shortlisted",
            "Interview",
            "Rejected",
          ].map((filter) => {

            const count =
              filter === "All"
                ? applicants.length
                : applicants.filter(
                    (a) => a.status === filter
                  ).length;

            return (
              <button
                key={filter}
                className={`status-tab ${
                  activeFilter === filter
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveFilter(filter)
                }
              >

                <span>
                  {filter}
                </span>

                <b>
                  {count}
                </b>

              </button>
            );
          })}

        </div>

        {/* Workspace header */}

        <div className="workspace-header">

          <div className="candidate-column">
            Candidate
          </div>

          <div className="skills-column">
            Skills & Experience
          </div>

          <div className="ai-column">
            AI Match
          </div>

          <div className="action-column">
            Action
          </div>

        </div>

        {/* Candidate list */}

        <div className="candidate-list">

          {filteredApplicants.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <Search size={25} />
              </div>

              <h3>
                No candidates found
              </h3>

              <p>
                Try adjusting your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>

            </div>

          ) : (

            filteredApplicants.map((candidate) => {

              const StatusIcon =
                statusConfig[
                  candidate.status
                ].icon;

              return (
                <article
                  className="candidate-row"
                  key={candidate.id}
                >

                  {/* Candidate */}

                  <div className="candidate-cell">

                    <div className="candidate-avatar">
                      {candidate.initials}
                    </div>

                    <div className="candidate-identity">

                      <div className="candidate-name-line">

                        <button
                          className="candidate-name"
                          onClick={() =>
                            openCandidate(candidate)
                          }
                        >
                          {candidate.name}
                        </button>

                        <span
                          className={`candidate-status ${
                            statusConfig[
                              candidate.status
                            ].className
                          }`}
                        >
                          <StatusIcon size={12} />
                          {candidate.status}
                        </span>

                      </div>

                      <span className="candidate-role">
                        {candidate.role}
                      </span>

                      <div className="candidate-location">

                        <span>
                          <MapPin size={13} />
                          {candidate.location}
                        </span>

                        <span>
                          <Clock3 size={13} />
                          {candidate.applied}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Skills */}

                  <div className="skills-cell">

                    <div className="skill-chips">

                      {candidate.skills
                        .slice(0, 3)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="skill-chip"
                          >
                            {skill}
                          </span>
                        ))}

                      {candidate.skills.length > 3 && (
                        <span className="more-skills">
                          +{candidate.skills.length - 3}
                        </span>
                      )}

                    </div>

                    <div className="experience-line">
                      <BriefcaseBusiness
                        size={13}
                      />
                      {candidate.experience}
                      <span>•</span>
                      <GraduationCap
                        size={13}
                      />
                      {candidate.education}
                    </div>

                  </div>

                  {/* AI Match */}

                  <div className="ai-match-cell">

                    <div className="ai-score-wrapper">

                      <div className="ai-score-top">

                        <span className="ai-label">
                          <Sparkles size={13} />
                          Match
                        </span>

                        <strong>
                          {candidate.match}%
                        </strong>

                      </div>

                      <div className="ai-progress">
                        <div
                          className="ai-progress-fill"
                          style={{
                            width: `${candidate.match}%`,
                          }}
                        />
                      </div>

                      <span className="ai-match-description">
                        {candidate.match >= 90
                          ? "Exceptional match"
                          : candidate.match >= 85
                          ? "Strong match"
                          : "Good match"}
                      </span>

                    </div>

                  </div>

                  {/* Action */}

                  <div className="action-cell">

                    <button
                      className="view-button"
                      onClick={() =>
                        openCandidate(candidate)
                      }
                    >
                      <Eye size={15} />
                      View
                    </button>

                    <button
                      className="more-button"
                      onClick={() =>
                        setSelectedApplicant(
                          candidate
                        )
                      }
                    >
                      <MoreHorizontal
                        size={18}
                      />
                    </button>

                  </div>

                </article>
              );
            })
          )}

        </div>

      </section>

      {/* =====================================================
          AI EXPLANATION CARD
      ===================================================== */}

      <section className="ai-info-card">

        <div className="ai-info-icon">
          <BrainCircuit size={22} />
        </div>

        <div className="ai-info-content">

          <div className="ai-info-title">
            <h3>
              AI Candidate Ranking
            </h3>

            <span>
              Powered by HireAI
            </span>
          </div>

          <p>
            Match scores combine semantic similarity,
            extracted skills, experience relevance,
            and job requirements to help recruiters
            prioritize candidates faster.
          </p>

        </div>

        <div className="ai-info-points">

          <span>
            <ShieldCheck size={14} />
            Skill-aware
          </span>

          <span>
            <Target size={14} />
            Relevance-based
          </span>

        </div>

      </section>

      {/* =====================================================
          ACTION MODAL
      ===================================================== */}

      {selectedApplicant && (
        <div
          className="candidate-modal-overlay"
          onClick={() =>
            setSelectedApplicant(null)
          }
        >

          <div
            className="candidate-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="modal-eyebrow">
                  Candidate Actions
                </span>

                <h2>
                  {selectedApplicant.name}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedApplicant(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="modal-profile">

              <div className="modal-avatar">
                {selectedApplicant.initials}
              </div>

              <div>

                <strong>
                  {selectedApplicant.role}
                </strong>

                <span>
                  {selectedApplicant.location}
                </span>

                <span className="modal-ai-score">
                  <Sparkles size={13} />
                  {selectedApplicant.match}%
                  AI Match
                </span>

              </div>

            </div>

            <div className="modal-contact">

              <span>
                <Mail size={14} />
                {selectedApplicant.email}
              </span>

              <span>
                <Phone size={14} />
                {selectedApplicant.phone}
              </span>

            </div>

            <div className="modal-action-list">

              <button
                onClick={() =>
                  updateStatus(
                    selectedApplicant.id,
                    "Shortlisted"
                  )
                }
              >
                <CheckCircle2 size={17} />
                Shortlist Candidate
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    selectedApplicant.id,
                    "Interview"
                  )
                }
              >
                <Target size={17} />
                Move to Interview
              </button>

              <button
                onClick={() =>
                  openCandidate(
                    selectedApplicant
                  )
                }
              >
                <FileText size={17} />
                View Full Candidate
              </button>

              <button
                className="danger-action"
                onClick={() =>
                  updateStatus(
                    selectedApplicant.id,
                    "Rejected"
                  )
                }
              >
                <XCircle size={17} />
                Reject Candidate
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

const UsersIcon = () => (
  <UserRound size={20} />
);

const StatCard = ({
  label,
  value,
  helper,
  icon,
  type,
}) => (
  <div className="applicant-stat-card">

    <div
      className={`stat-icon ${type}`}
    >
      {icon}
    </div>

    <div className="stat-content">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {helper}
      </small>

    </div>

  </div>
);

export default Applicants;