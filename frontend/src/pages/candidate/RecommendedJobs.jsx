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
    match: 94,
    skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    reason: "Strong match for your Java and Spring Boot skills.",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Full Stack Java Developer",
    company: "InnovateLabs",
    location: "Hyderabad, India",
    type: "Full Time",
    experience: "0-2 Years",
    salary: "₹7 - ₹12 LPA",
    match: 91,
    skills: ["Java", "Spring Boot", "React", "SQL"],
    reason: "Your Java backend and React experience closely match this role.",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "CloudMatrix",
    location: "Pune, India",
    type: "Full Time",
    experience: "0-1 Years",
    salary: "₹5 - ₹9 LPA",
    match: 87,
    skills: ["Java", "DSA", "Git", "SQL"],
    reason: "Good alignment with your Java, DSA and database background.",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Spring Boot Developer",
    company: "DevSphere Technologies",
    location: "Remote",
    type: "Full Time",
    experience: "1-3 Years",
    salary: "₹8 - ₹13 LPA",
    match: 84,
    skills: ["Spring Boot", "Java", "Microservices", "PostgreSQL"],
    reason: "Your backend profile matches most of the required technologies.",
    posted: "4 days ago",
  },
];

function RecommendedJobs() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("match");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const query = search.toLowerCase();

      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        )
      );
    });

    if (sort === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sort === "recent") {
      result.sort((a, b) => a.id - b.id);
    }

    if (sort === "salary") {
      result.sort((a, b) => b.match - a.match);
    }

    return result;
  }, [search, sort]);

  const toggleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="recommended-page">

      {/* Header */}
      <div className="recommended-header">
        <div>
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

          <div>
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

          <div>
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
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
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
            >
              <option value="match">Best Match</option>
              <option value="recent">Most Recent</option>
              <option value="salary">Top Match</option>
            </select>

            <ChevronDown size={15} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="recommended-results-header">
        <div>
          <h2>
            {filteredJobs.length} jobs found
          </h2>

          <p>
            Ranked according to your profile compatibility
          </p>
        </div>

        <Link to="/jobs" className="browse-all-link">
          Browse all jobs
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Job List */}
      <div className="recommended-job-list">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <article className="recommended-job-card" key={job.id}>

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
                    : "Strong"}
                </div>
              </div>

              {/* Main Info */}
              <div className="recommended-job-main">

                <div className="recommended-job-title-row">

                  <div className="company-logo">
                    {job.company.charAt(0)}
                  </div>

                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>

                </div>

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

                <div className="job-skills">
                  {job.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

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
                    savedJobs.includes(job.id)
                      ? "saved"
                      : ""
                  }`}
                  onClick={() => toggleSave(job.id)}
                >
                  <Star
                    size={17}
                    fill={
                      savedJobs.includes(job.id)
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {savedJobs.includes(job.id)
                    ? "Saved"
                    : "Save"}
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
          ))
        ) : (
          <div className="no-recommended-jobs">
            <Search size={30} />
            <h3>No matching jobs found</h3>
            <p>
              Try searching with another job title,
              company or skill.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
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

        <div>
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
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="job-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedJob(null)}
            >
              <X size={18} />
            </button>

            <div className="modal-match">
              <div className="modal-score">
                {selectedJob.match}%
              </div>

              <span>
                AI Match Score
              </span>
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
                    savedJobs.includes(selectedJob.id)
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