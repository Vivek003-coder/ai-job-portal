import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

/* =========================================================
   MOCK JOB DATA
   Later this will come from Spring Boot API
========================================================= */

const jobsData = [
  {
    id: 1,
    company: "TechNova",
    logo: "TN",
    logoClass: "blue",
    title: "Java Backend Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹8–14 LPA",
    posted: "2 days ago",
    skills: ["Java", "Spring Boot", "MySQL"],
    match: 94,
    description:
      "Build scalable backend services and REST APIs using Java and Spring Boot.",
  },
  {
    id: 2,
    company: "CloudCore",
    logo: "CC",
    logoClass: "purple",
    title: "Full Stack Developer",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "2–4 Years",
    salary: "₹10–18 LPA",
    posted: "1 day ago",
    skills: ["React", "Node.js", "MongoDB"],
    match: 91,
    description:
      "Work across frontend and backend systems while building modern web applications.",
  },
  {
    id: 3,
    company: "DataForge",
    logo: "DF",
    logoClass: "green",
    title: "Software Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹7–12 LPA",
    posted: "3 days ago",
    skills: ["Java", "DSA", "SQL"],
    match: 88,
    description:
      "Join an engineering team building reliable software products and APIs.",
  },
  {
    id: 4,
    company: "DevSphere",
    logo: "DS",
    logoClass: "orange",
    title: "React Frontend Developer",
    location: "Remote, India",
    type: "Remote",
    experience: "1–3 Years",
    salary: "₹7–13 LPA",
    posted: "5 hours ago",
    skills: ["React", "JavaScript", "Tailwind"],
    match: 87,
    description:
      "Create fast, accessible and responsive interfaces for a growing product platform.",
  },
  {
    id: 5,
    company: "FinStack",
    logo: "FS",
    logoClass: "navy",
    title: "Spring Boot Developer",
    location: "Noida, India",
    type: "Full-time",
    experience: "2–5 Years",
    salary: "₹12–20 LPA",
    posted: "1 day ago",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    match: 96,
    description:
      "Develop secure financial APIs and backend services using Spring Boot.",
  },
  {
    id: 6,
    company: "AI Labs",
    logo: "AI",
    logoClass: "cyan",
    title: "AI Software Engineer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–4 Years",
    salary: "₹12–22 LPA",
    posted: "4 days ago",
    skills: ["Python", "AI", "FastAPI"],
    match: 83,
    description:
      "Build intelligent applications combining software engineering and AI technologies.",
  },
  {
    id: 7,
    company: "NextStack",
    logo: "NS",
    logoClass: "indigo",
    title: "Node.js Backend Developer",
    location: "Gurugram, India",
    type: "Hybrid",
    experience: "1–3 Years",
    salary: "₹8–15 LPA",
    posted: "2 days ago",
    skills: ["Node.js", "Express", "MongoDB"],
    match: 89,
    description:
      "Design backend APIs and services for a high-growth technology platform.",
  },
  {
    id: 8,
    company: "CodeWorks",
    logo: "CW",
    logoClass: "rose",
    title: "Software Development Engineer",
    location: "Chennai, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹6–11 LPA",
    posted: "6 days ago",
    skills: ["Java", "DSA", "Git"],
    match: 84,
    description:
      "Solve engineering problems and contribute to scalable production systems.",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const jobTypes = [
  "Full-time",
  "Remote",
  "Hybrid",
  "Part-time",
  "Internship",
];

const experienceOptions = [
  "Fresher",
  "0–2 Years",
  "1–3 Years",
  "2–4 Years",
  "2–5 Years",
];

const salaryOptions = [
  "₹0–5 LPA",
  "₹5–10 LPA",
  "₹10–15 LPA",
  "₹15–20 LPA",
  "₹20+ LPA",
];

const skillOptions = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "MongoDB",
  "DSA",
];

/* =========================================================
   JOBS COMPONENT
========================================================= */

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* =======================================================
     INITIAL SEARCH
  ======================================================= */

  const initialKeyword = searchParams.get("keyword") || "";
  const initialLocation = searchParams.get("location") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [sortBy, setSortBy] = useState("relevance");

  const [savedJobs, setSavedJobs] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  /* =======================================================
     FILTER HANDLERS
  ======================================================= */

  const toggleFilter = (value, setter) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const params = {};

    if (keyword.trim()) {
      params.keyword = keyword.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    setSearchParams(params);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedExperience([]);
    setSelectedSalary([]);
    setSelectedSkills([]);

    setKeyword("");
    setLocation("");

    setSearchParams({});
  };

  /* =======================================================
     SAVE JOB
  ======================================================= */

  const toggleSaveJob = (jobId) => {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  /* =======================================================
     FILTER JOBS
  ======================================================= */

  const filteredJobs = useMemo(() => {
    let result = [...jobsData];

    /* Keyword */

    if (keyword.trim()) {
      const search = keyword.toLowerCase();

      result = result.filter((job) => {
        const searchableText = [
          job.title,
          job.company,
          job.location,
          job.description,
          ...job.skills,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(search);
      });
    }

    /* Location */

    if (location.trim()) {
      const searchLocation = location.toLowerCase();

      result = result.filter((job) =>
        job.location.toLowerCase().includes(searchLocation)
      );
    }

    /* Job type */

    if (selectedTypes.length > 0) {
      result = result.filter((job) =>
        selectedTypes.includes(job.type)
      );
    }

    /* Experience */

    if (selectedExperience.length > 0) {
      result = result.filter((job) =>
        selectedExperience.includes(job.experience)
      );
    }

    /* Skills */

    if (selectedSkills.length > 0) {
      result = result.filter((job) =>
        selectedSkills.some((skill) =>
          job.skills.includes(skill)
        )
      );
    }

    /* Salary */

    if (selectedSalary.length > 0) {
      result = result.filter((job) => {
        const salaryNumber = Number(
          job.salary
            .replace(/[₹,]/g, "")
            .match(/\d+/)?.[0] || 0
        );

        return selectedSalary.some((range) => {
          if (range === "₹0–5 LPA") {
            return salaryNumber <= 5;
          }

          if (range === "₹5–10 LPA") {
            return salaryNumber >= 5 && salaryNumber <= 10;
          }

          if (range === "₹10–15 LPA") {
            return salaryNumber >= 10 && salaryNumber <= 15;
          }

          if (range === "₹15–20 LPA") {
            return salaryNumber >= 15 && salaryNumber <= 20;
          }

          if (range === "₹20+ LPA") {
            return salaryNumber >= 20;
          }

          return true;
        });
      });
    }

    /* Sort */

    if (sortBy === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sortBy === "salary-high") {
      result.sort((a, b) => {
        const salaryA =
          Number(a.salary.match(/\d+/)?.[0]) || 0;

        const salaryB =
          Number(b.salary.match(/\d+/)?.[0]) || 0;

        return salaryB - salaryA;
      });
    }

    if (sortBy === "salary-low") {
      result.sort((a, b) => {
        const salaryA =
          Number(a.salary.match(/\d+/)?.[0]) || 0;

        const salaryB =
          Number(b.salary.match(/\d+/)?.[0]) || 0;

        return salaryA - salaryB;
      });
    }

    return result;
  }, [
    keyword,
    location,
    selectedTypes,
    selectedExperience,
    selectedSalary,
    selectedSkills,
    sortBy,
  ]);

  /* =======================================================
     FILTER SIDEBAR
  ======================================================= */

  const FilterSidebar = () => (
    <aside className="job-filter">

      <div className="filter-header">
        <div className="filter-title">
          <SlidersHorizontal size={17} />
          <h3>Filters</h3>
        </div>

        <button
          type="button"
          onClick={clearFilters}
        >
          Clear all
        </button>
      </div>

      {/* Job Type */}

      <div className="filter-group">

        <h4>Job Type</h4>

        {jobTypes.map((type) => (
          <label key={type} className="filter-checkbox">

            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() =>
                toggleFilter(type, setSelectedTypes)
              }
            />

            <span className="custom-checkbox" />

            <span>{type}</span>

          </label>
        ))}

      </div>

      {/* Experience */}

      <div className="filter-group">

        <h4>Experience</h4>

        {experienceOptions.map((experience) => (
          <label
            key={experience}
            className="filter-checkbox"
          >

            <input
              type="checkbox"
              checked={selectedExperience.includes(
                experience
              )}
              onChange={() =>
                toggleFilter(
                  experience,
                  setSelectedExperience
                )
              }
            />

            <span className="custom-checkbox" />

            <span>{experience}</span>

          </label>
        ))}

      </div>

      {/* Salary */}

      <div className="filter-group">

        <h4>Salary Range</h4>

        {salaryOptions.map((salary) => (
          <label
            key={salary}
            className="filter-checkbox"
          >

            <input
              type="checkbox"
              checked={selectedSalary.includes(
                salary
              )}
              onChange={() =>
                toggleFilter(
                  salary,
                  setSelectedSalary
                )
              }
            />

            <span className="custom-checkbox" />

            <span>{salary}</span>

          </label>
        ))}

      </div>

      {/* Skills */}

      <div className="filter-group">

        <h4>Skills</h4>

        {skillOptions.map((skill) => (
          <label
            key={skill}
            className="filter-checkbox"
          >

            <input
              type="checkbox"
              checked={selectedSkills.includes(
                skill
              )}
              onChange={() =>
                toggleFilter(
                  skill,
                  setSelectedSkills
                )
              }
            />

            <span className="custom-checkbox" />

            <span>{skill}</span>

          </label>
        ))}

      </div>

    </aside>
  );

  return (
    <div className="jobs-page">

      {/* =================================================
          JOBS HERO
      ================================================= */}

      <section className="jobs-header">

        <div className="jobs-header-container">

          <div>

            <div className="jobs-page-kicker">
              <Sparkles size={14} />
              AI-powered job discovery
            </div>

            <h1>
              Find your next
              <span> opportunity.</span>
            </h1>

            <p>
              Discover developer jobs matched to your
              skills, experience and career goals.
            </p>

          </div>

          <div className="jobs-header-stat">

            <strong>
              {filteredJobs.length}
            </strong>

            <span>
              opportunities
            </span>

          </div>

        </div>
      </section>

      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <section className="jobs-search-section">

        <form
          className="jobs-search-box"
          onSubmit={handleSearch}
        >

          <div className="jobs-search-field">

            <Search size={19} />

            <div>

              <label>
                Keywords
              </label>

              <input
                type="text"
                value={keyword}
                onChange={(event) =>
                  setKeyword(event.target.value)
                }
                placeholder="Java, React, Spring Boot..."
              />

            </div>

          </div>

          <div className="jobs-search-divider" />

          <div className="jobs-search-field">

            <MapPin size={19} />

            <div>

              <label>
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="City or remote"
              />

            </div>

          </div>

          <button
            type="submit"
            className="jobs-search-button"
          >
            Search Jobs
            <ArrowRight size={17} />
          </button>

        </form>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="jobs-main">

        <div className="jobs-layout">

          {/* Desktop filters */}

          <div className="desktop-filter">
            <FilterSidebar />
          </div>

          {/* =================================================
              RESULTS
          ================================================= */}

          <section className="jobs-results">

            {/* Results toolbar */}

            <div className="results-toolbar">

              <div>

                <div className="results-title-row">

                  <h2>
                    Developer opportunities
                  </h2>

                  <span className="results-count">
                    {filteredJobs.length}
                  </span>

                </div>

                <p>
                  Roles selected based on your search
                  and preferences.
                </p>

              </div>

              <div className="results-actions">

                <button
                  type="button"
                  className="mobile-filter-btn"
                  onClick={() =>
                    setMobileFiltersOpen(true)
                  }
                >
                  <Filter size={16} />
                  Filters
                </button>

                <div className="sort-wrapper">

                  <span>
                    Sort by
                  </span>

                  <div className="sort-select">

                    <select
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value)
                      }
                    >
                      <option value="relevance">
                        Relevance
                      </option>

                      <option value="match">
                        Highest AI Match
                      </option>

                      <option value="salary-high">
                        Highest Salary
                      </option>

                      <option value="salary-low">
                        Lowest Salary
                      </option>
                    </select>

                    <ChevronDown size={15} />

                  </div>

                </div>

              </div>

            </div>

            {/* Active filters */}

            {(selectedTypes.length > 0 ||
              selectedExperience.length > 0 ||
              selectedSalary.length > 0 ||
              selectedSkills.length > 0) && (
              <div className="active-filters">

                <span>
                  Active filters:
                </span>

                {[
                  ...selectedTypes,
                  ...selectedExperience,
                  ...selectedSalary,
                  ...selectedSkills,
                ].map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    onClick={() => {
                      if (
                        selectedTypes.includes(filter)
                      ) {
                        toggleFilter(
                          filter,
                          setSelectedTypes
                        );
                      }

                      if (
                        selectedExperience.includes(
                          filter
                        )
                      ) {
                        toggleFilter(
                          filter,
                          setSelectedExperience
                        );
                      }

                      if (
                        selectedSalary.includes(filter)
                      ) {
                        toggleFilter(
                          filter,
                          setSelectedSalary
                        );
                      }

                      if (
                        selectedSkills.includes(filter)
                      ) {
                        toggleFilter(
                          filter,
                          setSelectedSkills
                        );
                      }
                    }}
                  >
                    {filter}
                    <X size={13} />
                  </button>
                ))}

              </div>
            )}

            {/* =================================================
                JOB GRID
            ================================================= */}

            {filteredJobs.length > 0 ? (

              <div className="jobs-grid">

                {filteredJobs.map((job) => (

                  <article
                    className="job-card"
                    key={job.id}
                  >

                    {/* Card top */}

                    <div className="job-card-top">

                      <div
                        className={`company-logo ${job.logoClass}`}
                      >
                        {job.logo}
                      </div>

                      <button
                        type="button"
                        className={`bookmark-btn ${
                          savedJobs.includes(job.id)
                            ? "saved"
                            : ""
                        }`}
                        onClick={() =>
                          toggleSaveJob(job.id)
                        }
                        aria-label={
                          savedJobs.includes(job.id)
                            ? "Remove saved job"
                            : "Save job"
                        }
                      >
                        <Heart
                          size={18}
                          fill={
                            savedJobs.includes(job.id)
                              ? "currentColor"
                              : "none"
                        }
                      />
                      </button>

                    </div>

                    {/* Main content */}

                    <div className="job-card-content">

                      <div className="job-company-row">

                        <span className="company-name">
                          {job.company}
                        </span>

                        {job.match >= 90 && (
                          <span className="excellent-badge">
                            <CheckCircle2 size={12} />
                            Top match
                          </span>
                        )}

                      </div>

                      <Link
                        to={`/jobs/${job.id}`}
                        className="job-title-link"
                      >
                        <h3>
                          {job.title}
                        </h3>
                      </Link>

                      <p className="job-description">
                        {job.description}
                      </p>

                      <div className="job-info">

                        <span>
                          <MapPin size={15} />
                          {job.location}
                        </span>

                        <span>
                          <BriefcaseBusiness size={15} />
                          {job.type}
                        </span>

                        <span>
                          <Clock3 size={15} />
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

                    </div>

                    {/* Footer */}

                    <div className="job-card-footer">

                      <div className="job-salary">

                        <strong>
                          {job.salary}
                        </strong>

                        <span>
                          estimated
                        </span>

                      </div>

                      <div className="job-match">

                        <div
                          className="match-ring"
                          style={{
                            "--match": job.match,
                          }}
                        >
                          <span>
                            {job.match}%
                          </span>
                        </div>

                        <div>
                          <strong>
                            AI Match
                          </strong>

                          <span>
                            Profile fit
                          </span>
                        </div>

                      </div>

                    </div>

                    <Link
                      to={`/jobs/${job.id}`}
                      className="job-view-link"
                    >
                      View job details
                      <ArrowRight size={15} />
                    </Link>

                    <div className="job-posted">
                      Posted {job.posted}
                    </div>

                  </article>

                ))}

              </div>

            ) : (

              /* =================================================
                  EMPTY STATE
              ================================================= */

              <div className="no-jobs">

                <div className="no-jobs-icon">
                  <Search size={25} />
                </div>

                <h3>
                  No matching jobs found
                </h3>

                <p>
                  Try changing your search terms
                  or clearing some filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* =================================================
          MOBILE FILTER DRAWER
      ================================================= */}

      {mobileFiltersOpen && (

        <div className="mobile-filter-overlay">

          <div
            className="mobile-filter-backdrop"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
          />

          <div className="mobile-filter-drawer">

            <div className="mobile-filter-header">

              <div>

                <span>
                  Job filters
                </span>

                <h3>
                  Refine results
                </h3>

              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="mobile-filter-content">

              <FilterSidebar />

            </div>

            <div className="mobile-filter-footer">

              <button
                type="button"
                className="mobile-clear-button"
                onClick={clearFilters}
              >
                Clear all
              </button>

              <button
                type="button"
                className="mobile-apply-button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              >
                Apply filters
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Jobs;