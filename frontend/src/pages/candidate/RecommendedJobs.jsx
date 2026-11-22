import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Java Backend Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹6 - ₹10 LPA",
    salaryValue: 10,
    match: 94,
    skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    reason:
      "Strong match for your Java and Spring Boot skills.",
    posted: "2 days ago",
    postedDays: 2,
  },
  {
    id: 2,
    title: "Full Stack Java Developer",
    company: "InnovateLabs",
    location: "Hyderabad, India",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹7 - ₹12 LPA",
    salaryValue: 12,
    match: 91,
    skills: ["Java", "Spring Boot", "React", "SQL"],
    reason:
      "Your Java backend and React experience closely match this role.",
    posted: "1 day ago",
    postedDays: 1,
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "CloudMatrix",
    location: "Pune, India",
    type: "Full Time",
    experience: "0-1 Years",
    salary: "₹5 - ₹9 LPA",
    salaryValue: 9,
    match: 87,
    skills: ["Java", "DSA", "Git", "SQL"],
    reason:
      "Good alignment with your Java, DSA and database background.",
    posted: "3 days ago",
    postedDays: 3,
  },
  {
    id: 4,
    title: "Spring Boot Developer",
    company: "DevSphere Technologies",
    location: "Remote",
    type: "Full Time",
    experience: "1-3 Years",
    salary: "₹8 - ₹13 LPA",
    salaryValue: 13,
    match: 84,
    skills: [
      "Spring Boot",
      "Java",
      "Microservices",
      "PostgreSQL",
    ],
    reason:
      "Your backend profile matches most of the required technologies.",
    posted: "4 days ago",
    postedDays: 4,
  },
];

function RecommendedJobs() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("match");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(showToast.timer);

    showToast.timer = window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = jobs.filter((job) => {
      if (!query) return true;

      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.type,
        job.experience,
        job.salary,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    if (sort === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sort === "recent") {
      result.sort((a, b) => a.postedDays - b.postedDays);
    }

    if (sort === "salary") {
      result.sort((a, b) => b.salaryValue - a.salaryValue);
    }

    return result;
  }, [search, sort]);

  const toggleSave = (jobId) => {
    const isSaved = savedJobs.includes(jobId);

    setSavedJobs((prev) =>
      isSaved
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );

    showToast(
      isSaved
        ? "Job removed from saved jobs."
        : "Job saved successfully."
    );
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="recommended-page">

      {/* Toast */}
      {toast && (
        <div className="recommended-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="recommended-header">
        <div className="recommended-header-content">
          <span className="recommended-eyebrow">
            <Sparkles size={14} />
            AI POWERED
          </span>

          <h1>Recommended Jobs</h1>

          <p>
            Jobs ranked specifically for you using your skills,
            experience and profile.
          </p>
        </div>

        <div className="ai-match-status">
          <div className="ai-status-icon">
            <Brain size={19} />
          </div>

          <div className="ai-status-copy">
            <span>Profile Match Engine</span>
            <strong>Active</strong>
          </div>

          <CheckCircle2 size={17} />
        </div>
      </div>

      {/* AI Summary */}
      <section className="recommendation-summary">
        <div className="summary-main">
          <div className="summary-icon">
            <Brain size={24} />
          </div>

          <div className="summary-content">
            <span>Your AI profile score</span>

            <div className="summary-score">
              <strong>91%</strong>
              <span>Excellent match profile</span>
            </div>

            <p>
              Your profile is currently optimized for Java,
              Spring Boot and full-stack development roles.
            </p>
          </div>
        </div>

        <div className="summary-stats">
          <div>
            <strong>24</strong>
            <span>Jobs analyzed</span>
          </div>

          <div>
            <strong>8</strong>
            <span>Strong matches</span>
          </div>

          <div>
            <strong>94%</strong>
            <span>Top match</span>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="recommended-toolbar">

        <div className="recommended-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search recommended jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            autoComplete="off"
          />

          {search && (
            <button
              type="button"
              className="recommended-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="recommended-sort">
          <span>Sort by</span>

          <div className="sort-select">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort recommended jobs"
            >
              <option value="match">Best Match</option>
              <option value="recent">Most Recent</option>
              <option value="salary">Highest Salary</option>
            </select>

            <ChevronDown size={15} />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="recommended-results-header">
        <div>
          <h2>
            {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? "job" : "jobs"} found
          </h2>

          <p>
            Ranked according to your profile compatibility
          </p>
        </div>

        <Link
          to="/jobs"
          className="browse-all-link"
        >
          Browse all jobs
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Job List */}
      <div className="recommended-job-list">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isSaved = savedJobs.includes(job.id);

            return (
              <article
                className="recommended-job-card"
                key={job.id}
              >

                {/* Match Score */}
                <div className="job-match-column">
                  <div
                    className={`match-score ${
                      job.match >= 90
                        ? "excellent"
                        : job.match >= 80
                          ? "good"
                          : "average"
                    }`}
                  >
                    <strong>{job.match}%</strong>
                    <span>Match</span>
                  </div>

                  <div className="match-label">
                    <TrendingUp size={13} />

                    {job.match >= 90
                      ? "Excellent"
                      : job.match >= 80
                        ? "Strong"
                        : "Good"}
                  </div>
                </div>

                {/* Main Information */}
                <div className="recommended-job-main">

                  <div className="recommended-job-title-row">
                    <div className="company-logo">
                      {job.company.charAt(0)}
                    </div>

                    <div className="recommended-title-content">
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="job-meta">
                    <span>
                      <MapPin size={14} />
                      {job.location}
                    </span>

                    <span>
                      <Briefcase size={14} />
                      {job.type}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {job.experience}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="job-skills">
                    {job.skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Match Reason */}
                  <div className="match-reason">
                    <Sparkles size={14} />

                    <span>
                      <strong>Why this matches:</strong>{" "}
                      {job.reason}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="recommended-job-actions">

                  <div className="salary">
                    <strong>{job.salary}</strong>
                    <span>{job.posted}</span>
                  </div>

                  <button
                    type="button"
                    className={`save-job-button ${
                      isSaved ? "saved" : ""
                    }`}
                    onClick={() => toggleSave(job.id)}
                  >
                    <Star
                      size={17}
                      fill={
                        isSaved
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {isSaved ? "Saved" : "Save"}
                  </button>

                  <button
                    type="button"
                    className="view-match-button"
                    onClick={() => setSelectedJob(job)}
                  >
                    View Job
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="no-recommended-jobs">
            <div className="no-jobs-icon">
              <Search size={28} />
            </div>

            <h3>No matching jobs found</h3>

            <p>
              Try searching with another job title,
              company or skill.
            </p>

            <button
              type="button"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* AI Explanation */}
      <section className="matching-explanation">
        <div className="explanation-icon">
          <Brain size={22} />
        </div>

        <div className="explanation-content">
          <h3>How your AI matching works</h3>

          <p>
            Our matching engine compares your resume with job
            descriptions using semantic similarity, extracted
            skills and profile relevance.
          </p>

          <div className="explanation-points">
            <span>
              <CheckCircle2 size={14} />
              Resume skills
            </span>

            <span>
              <CheckCircle2 size={14} />
              Job requirements
            </span>

            <span>
              <CheckCircle2 size={14} />
              Semantic similarity
            </span>
          </div>
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <div
          className="job-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="job-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close job details"
            >
              <X size={18} />
            </button>

            <div className="modal-match">
              <div className="modal-score">
                {selectedJob.match}%
              </div>

              <span>AI Match Score</span>
            </div>

            <h2>{selectedJob.title}</h2>

            <p className="modal-company">
              {selectedJob.company}
            </p>

            <div className="modal-details">
              <span>
                <MapPin size={15} />
                {selectedJob.location}
              </span>

              <span>
                <Briefcase size={15} />
                {selectedJob.type}
              </span>

              <span>
                <Clock3 size={15} />
                {selectedJob.experience}
              </span>
            </div>

            <div className="modal-section">
              <h3>Why you match</h3>

              <p>
                {selectedJob.reason}
              </p>
            </div>

            <div className="modal-section">
              <h3>Required skills</h3>

              <div className="job-skills">
                {selectedJob.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-salary">
              <span>Estimated salary</span>
              <strong>{selectedJob.salary}</strong>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-secondary"
                onClick={() =>
                  toggleSave(selectedJob.id)
                }
              >
                <Star
                  size={16}
                  fill={
                    savedJobs.includes(
                      selectedJob.id
                    )
                      ? "currentColor"
                      : "none"
                  }
                />

                {savedJobs.includes(selectedJob.id)
                  ? "Saved"
                  : "Save Job"}
              </button>

              <Link
                to={`/jobs/${selectedJob.id}`}
                className="modal-primary"
              >
                View Full Job
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendedJobs;