import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Clock3,
  MapPin,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

const initialSavedJobs = [
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
    savedDate: "Nov 18, 2026",
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
    savedDate: "Nov 16, 2026",
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
    savedDate: "Nov 14, 2026",
  },
];

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("match");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const removeJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.filter((job) => job.id !== jobId)
    );

    showMessage("Job removed from saved jobs.");
  };

  const clearAll = () => {
    if (savedJobs.length === 0) return;

    setSavedJobs([]);
    showMessage("All saved jobs have been removed.");
  };

  const filteredJobs = useMemo(() => {
    let result = savedJobs.filter((job) => {
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
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [savedJobs, search, sort]);

  return (
    <div className="saved-jobs-page">

      {/* Toast */}
      {message && (
        <div className="saved-jobs-toast">
          <Star size={16} />
          {message}
        </div>
      )}

      {/* Header */}
      <div className="saved-jobs-header">

        <div>
          <span className="saved-jobs-eyebrow">
            <Star size={13} />
            SAVED JOBS
          </span>

          <h1>Saved Jobs</h1>

          <p>
            Keep track of jobs you're interested in and
            come back to them anytime.
          </p>
        </div>

        <div className="saved-jobs-count">
          <strong>{savedJobs.length}</strong>
          <span>Saved Jobs</span>
        </div>

      </div>

      {/* Toolbar */}
      <div className="saved-jobs-toolbar">

        <div className="saved-jobs-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search saved jobs..."
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

        <div className="saved-jobs-toolbar-right">

          <div className="saved-sort">
            <label htmlFor="savedSort">
              Sort by
            </label>

            <select
              id="savedSort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="match">
                Best Match
              </option>

              <option value="recent">
                Recently Saved
              </option>
            </select>
          </div>

          {savedJobs.length > 0 && (
            <button
              type="button"
              className="clear-saved-button"
              onClick={clearAll}
            >
              <Trash2 size={15} />
              Clear All
            </button>
          )}

        </div>

      </div>

      {/* Results */}
      {filteredJobs.length > 0 ? (
        <div className="saved-jobs-list">

          {filteredJobs.map((job) => (
            <article
              className="saved-job-card"
              key={job.id}
            >

              {/* Company */}
              <div className="saved-company-logo">
                {job.company.charAt(0)}
              </div>

              {/* Main */}
              <div className="saved-job-main">

                <div className="saved-job-title-row">

                  <div>
                    <h3>{job.title}</h3>

                    <p>{job.company}</p>
                  </div>

                  <div className="saved-match">
                    <strong>
                      {job.match}%
                    </strong>

                    <span>AI Match</span>
                  </div>

                </div>

                <div className="saved-job-meta">

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

                <div className="saved-job-skills">
                  {job.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="saved-date">
                  <Star size={12} />
                  Saved on {job.savedDate}
                </div>

              </div>

              {/* Actions */}
              <div className="saved-job-actions">

                <strong className="saved-job-salary">
                  {job.salary}
                </strong>

                <button
                  type="button"
                  className="remove-saved-button"
                  onClick={() =>
                    removeJob(job.id)
                  }
                >
                  <Trash2 size={15} />
                  Remove
                </button>

                <Link
                  to={`/jobs/${job.id}`}
                  className="saved-view-button"
                >
                  View Job
                  <ArrowRight size={15} />
                </Link>

              </div>

            </article>
          ))}

        </div>
      ) : (
        <div className="saved-empty">

          <div className="saved-empty-icon">
            <Star size={26} />
          </div>

          <h2>
            {search
              ? "No saved jobs found"
              : "No saved jobs yet"}
          </h2>

          <p>
            {search
              ? "Try another search term."
              : "Save interesting jobs and they'll appear here."}
          </p>

          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          ) : (
            <Link to="/jobs">
              Browse Jobs
              <ArrowRight size={15} />
            </Link>
          )}

        </div>
      )}

      {/* Bottom CTA */}
      {savedJobs.length > 0 && (
        <section className="saved-jobs-cta">

          <div className="saved-cta-icon">
            <Briefcase size={20} />
          </div>

          <div>
            <h3>
              Looking for more opportunities?
            </h3>

            <p>
              Explore the latest jobs matched to your
              skills and career goals.
            </p>
          </div>

          <Link to="/candidate/recommended-jobs">
            View Recommended Jobs
            <ArrowRight size={15} />
          </Link>

        </section>
      )}

    </div>
  );
}

export default SavedJobs;