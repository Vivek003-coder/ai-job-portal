import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  BriefcaseBusiness,
  Users,
  Sparkles,
  Eye,
  Pencil,
  PauseCircle,
  PlayCircle,
  Trash2,
  ChevronDown,
  MapPin,
  Clock3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  FileText,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import jobService from "../../services/jobService";
import "./ManageJobs.css";

const initialJobs = [
  {
    id: 1,
    title: "Java Backend Developer",
    department: "Engineering",
    location: "Bangalore, India",
    workplace: "Hybrid",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹6–10 LPA",
    status: "Active",
    applicants: 48,
    shortlisted: 12,
    interviews: 5,
    aiMatches: 34,
    posted: "2 days ago",
    views: 326,
  },
  {
    id: 2,
    title: "Full Stack Java Developer",
    department: "Product Engineering",
    location: "Hyderabad, India",
    workplace: "Remote",
    type: "Full-time",
    experience: "2–4 Years",
    salary: "₹7–12 LPA",
    status: "Active",
    applicants: 36,
    shortlisted: 9,
    interviews: 4,
    aiMatches: 27,
    posted: "5 days ago",
    views: 241,
  },
  {
    id: 3,
    title: "Software Engineer",
    department: "Technology",
    location: "Pune, India",
    workplace: "On-site",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹5–9 LPA",
    status: "Draft",
    applicants: 0,
    shortlisted: 0,
    interviews: 0,
    aiMatches: 0,
    posted: "Not published",
    views: 0,
  },
  {
    id: 4,
    title: "Spring Boot Developer",
    department: "Backend Engineering",
    location: "Noida, India",
    workplace: "Hybrid",
    type: "Full-time",
    experience: "2–5 Years",
    salary: "₹8–14 LPA",
    status: "Closed",
    applicants: 61,
    shortlisted: 14,
    interviews: 7,
    aiMatches: 43,
    posted: "18 days ago",
    views: 489,
  },
];

const statusConfig = {
  Active: {
    icon: CheckCircle2,
    className: "status-active",
  },
  Draft: {
    icon: FileText,
    className: "status-draft",
  },
  Closed: {
    icon: XCircle,
    className: "status-closed",
  },
};

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [openMenu, setOpenMenu] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let active = true;
    jobService.getMyJobs()
      .then((records) => {
        if (active) {
          setJobs(records.map((job) => ({
            ...job,
            type: job.employmentType,
            status: job.status === "ACTIVE"
              ? "Active"
              : job.status === "CLOSED" ? "Closed" : "Draft",
            salary: job.salaryMin != null || job.salaryMax != null
              ? `₹${job.salaryMin ?? 0}–${job.salaryMax ?? job.salaryMin} LPA`
              : "Not specified",
            applicants: 0,
            shortlisted: 0,
            interviews: 0,
            aiMatches: 0,
            views: 0,
            posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "",
          })));
        }
      })
      .catch((error) => {
        if (active) showToast(error.response?.data?.message || "Unable to load your jobs.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const matchesTab =
        activeTab === "All" || job.status === activeTab;

      const query = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });

    if (sortBy === "applicants") {
      result.sort((a, b) => b.applicants - a.applicants);
    }

    if (sortBy === "matches") {
      result.sort((a, b) => b.aiMatches - a.aiMatches);
    }

    if (sortBy === "views") {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [jobs, activeTab, search, sortBy]);

  const counts = {
    All: jobs.length,
    Active: jobs.filter((job) => job.status === "Active").length,
    Draft: jobs.filter((job) => job.status === "Draft").length,
    Closed: jobs.filter((job) => job.status === "Closed").length,
  };

  const totalApplicants = jobs.reduce(
    (sum, job) => sum + job.applicants,
    0
  );

  const totalMatches = jobs.reduce(
    (sum, job) => sum + job.aiMatches,
    0
  );

  const handleDelete = async (id) => {
    try {
      await jobService.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setOpenMenu(null);
      showToast("Job removed successfully.");
    } catch (error) {
      showToast(error.response?.data?.message || "Unable to delete this job.");
    }
  };

  const handleToggleStatus = async (id) => {
    const currentJob = jobs.find((job) => job.id === id);
    if (!currentJob) return;
    const nextStatus = currentJob.status === "Active" ? "CLOSED" : "ACTIVE";
    try {
      const updated = await jobService.updateJobStatus(id, nextStatus);
      setJobs((prev) => prev.map((job) => job.id === id
        ? { ...job, status: updated.status === "ACTIVE" ? "Active" : "Closed" }
        : job));
    } catch (error) {
      showToast(error.response?.data?.message || "Unable to update job status.");
    }

    setOpenMenu(null);
    showToast("Job status updated successfully.");
  };

  const handleEdit = (id) => {
    navigate(`/recruiter/post-job?edit=${id}`);
  };

  return (
    <div className="manage-jobs-page">

      {/* Toast */}
      {toast && (
        <div className="manage-toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <section className="manage-header">
        <div>
          <div className="page-eyebrow">
            <BriefcaseBusiness size={15} />
            Job Management
          </div>

          <h1>Manage Jobs</h1>

          <p>
            Create, monitor, and manage your job openings from one place.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={() => navigate("/recruiter/post-job")}
        >
          <Plus size={19} />
          Post New Job
        </button>
      </section>

      {/* Overview cards */}
      <section className="job-overview-grid">

        <div className="overview-card">
          <div className="overview-icon blue">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Total Jobs</span>
            <strong>{jobs.length}</strong>
            <small>Across all statuses</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Jobs</span>
            <strong>{counts.Active}</strong>
            <small>Currently accepting applications</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon purple">
            <Users size={20} />
          </div>

          <div>
            <span>Applications</span>
            <strong>{totalApplicants}</strong>
            <small>Total candidates received</small>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orange">
            <Sparkles size={20} />
          </div>

          <div>
            <span>AI Matches</span>
            <strong>{totalMatches}</strong>
            <small>High-relevance candidates</small>
          </div>
        </div>

      </section>

      {/* Main panel */}
      <section className="jobs-panel">

        {/* Tabs */}
        <div className="jobs-tabs">

          {["All", "Active", "Draft", "Closed"].map((tab) => (
            <button
              key={tab}
              className={`job-tab ${
                activeTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}

              <span
                className={`tab-count ${
                  activeTab === tab ? "active-count" : ""
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          ))}

        </div>

        {/* Toolbar */}
        <div className="jobs-toolbar">

          <div className="job-search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search jobs, departments or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">

            <button className="filter-button">
              <Filter size={17} />
              Filters
            </button>

            <div className="sort-select">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Recently posted</option>
                <option value="applicants">Most applicants</option>
                <option value="matches">Most AI matches</option>
                <option value="views">Most views</option>
              </select>

              <ChevronDown size={16} />
            </div>

          </div>
        </div>

        {/* Jobs */}
        <div className="jobs-list">

          {loading ? (
            <p role="status">Loading your jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <div className="jobs-empty">

              <div className="empty-icon">
                <Search size={25} />
              </div>

              <h3>No jobs found</h3>

              <p>
                Try changing your search or selected job status.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveTab("All");
                }}
              >
                Clear filters
              </button>

            </div>
          ) : (
            filteredJobs.map((job) => {

              const StatusIcon =
                statusConfig[job.status].icon;

              return (
                <article className="job-management-card" key={job.id}>

                  {/* Main info */}
                  <div className="job-main">

                    <div className="company-logo">
                      {job.title.charAt(0)}
                    </div>

                    <div className="job-information">

                      <div className="job-title-row">

                        <h3>{job.title}</h3>

                        <span
                          className={`job-status ${
                            statusConfig[job.status].className
                          }`}
                        >
                          <StatusIcon size={14} />
                          {job.status}
                        </span>

                      </div>

                      <p className="department">
                        {job.department}
                      </p>

                      <div className="job-meta">

                        <span>
                          <MapPin size={15} />
                          {job.location}
                        </span>

                        <span>
                          <BriefcaseBusiness size={15} />
                          {job.workplace}
                        </span>

                        <span>
                          <Clock3 size={15} />
                          {job.type}
                        </span>

                        <span>
                          <CalendarDays size={15} />
                          {job.posted}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Metrics */}
                  <div className="job-metrics">

                    <div className="metric">
                      <span>Applicants</span>
                      <strong>{job.applicants}</strong>
                    </div>

                    <div className="metric">
                      <span>Shortlisted</span>
                      <strong>{job.shortlisted}</strong>
                    </div>

                    <div className="metric ai-metric">
                      <span>
                        <Sparkles size={13} />
                        AI Matches
                      </span>

                      <strong>{job.aiMatches}</strong>
                    </div>

                    <div className="metric">
                      <span>Views</span>
                      <strong>{job.views}</strong>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="job-actions">

                    <button
                      className="view-applicants-button"
                      onClick={() =>
                        navigate(
                          `/recruiter/applicants?jobId=${job.id}`
                        )
                      }
                    >
                      <Users size={16} />
                      Applicants
                      <ArrowUpRight size={15} />
                    </button>

                    <button
                      className="menu-button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === job.id ? null : job.id
                        )
                      }
                    >
                      <MoreVertical size={19} />
                    </button>

                    {openMenu === job.id && (
                      <div className="job-action-menu">

                        <button
                          onClick={() => handleEdit(job.id)}
                        >
                          <Pencil size={16} />
                          Edit Job
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/recruiter/applicants?jobId=${job.id}`
                            )
                          }
                        >
                          <Eye size={16} />
                          View Applicants
                        </button>

                        <button
                          onClick={() =>
                            handleToggleStatus(job.id)
                          }
                        >
                          {job.status === "Active" ? (
                            <>
                              <PauseCircle size={16} />
                              Close Job
                            </>
                          ) : (
                            <>
                              <PlayCircle size={16} />
                              Activate Job
                            </>
                          )}
                        </button>

                        <div className="menu-divider" />

                        <button
                          className="danger-action"
                          onClick={() =>
                            handleDelete(job.id)
                          }
                        >
                          <Trash2 size={16} />
                          Delete Job
                        </button>

                      </div>
                    )}

                  </div>

                </article>
              );
            })
          )}

        </div>

      </section>

    </div>
  );
}

export default ManageJobs;