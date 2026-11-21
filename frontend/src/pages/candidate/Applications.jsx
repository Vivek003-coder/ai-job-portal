import { useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPin,
  Search,
  XCircle,
} from "lucide-react";

const applications = [
  {
    id: 1,
    jobTitle: "Java Backend Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    type: "Full Time",
    appliedDate: "Nov 18, 2026",
    status: "Interview",
    salary: "₹6 - ₹10 LPA",
    match: 94,
    nextStep: "Technical interview scheduled",
  },
  {
    id: 2,
    jobTitle: "Full Stack Java Developer",
    company: "InnovateLabs",
    location: "Hyderabad, India",
    type: "Full Time",
    appliedDate: "Nov 15, 2026",
    status: "Shortlisted",
    salary: "₹7 - ₹12 LPA",
    match: 91,
    nextStep: "Recruiter will contact you soon",
  },
  {
    id: 3,
    jobTitle: "Software Engineer",
    company: "CloudMatrix",
    location: "Pune, India",
    type: "Full Time",
    appliedDate: "Nov 12, 2026",
    status: "Under Review",
    salary: "₹5 - ₹9 LPA",
    match: 87,
    nextStep: "Application is being reviewed",
  },
  {
    id: 4,
    jobTitle: "Spring Boot Developer",
    company: "DevSphere Technologies",
    location: "Remote",
    type: "Full Time",
    appliedDate: "Nov 8, 2026",
    status: "Applied",
    salary: "₹8 - ₹13 LPA",
    match: 84,
    nextStep: "Application submitted successfully",
  },
  {
    id: 5,
    jobTitle: "Junior Java Developer",
    company: "CodeWorks",
    location: "Delhi, India",
    type: "Full Time",
    appliedDate: "Nov 2, 2026",
    status: "Rejected",
    salary: "₹4 - ₹7 LPA",
    match: 72,
    nextStep: "Application was not selected",
  },
];

const statusConfig = {
  Applied: {
    className: "status-applied",
    icon: FileText,
  },
  "Under Review": {
    className: "status-review",
    icon: Clock3,
  },
  Shortlisted: {
    className: "status-shortlisted",
    icon: CheckCircle2,
  },
  Interview: {
    className: "status-interview",
    icon: CalendarDays,
  },
  Selected: {
    className: "status-selected",
    icon: CheckCircle2,
  },
  Rejected: {
    className: "status-rejected",
    icon: XCircle,
  },
};

function Applications() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const tabs = [
    "All",
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview",
    "Rejected",
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesTab =
        activeTab === "All" ||
        application.status === activeTab;

      const query = search.toLowerCase();

      const matchesSearch =
        application.jobTitle.toLowerCase().includes(query) ||
        application.company.toLowerCase().includes(query) ||
        application.location.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const getStatusIcon = (status) => {
    const Icon = statusConfig[status]?.icon || FileText;
    return <Icon size={14} />;
  };

  return (
    <div className="applications-page">

      {/* Header */}
      <div className="applications-header">
        <div>
          <span className="applications-eyebrow">
            <Briefcase size={14} />
            APPLICATION TRACKER
          </span>

          <h1>My Applications</h1>

          <p>
            Track your job applications and monitor every
            stage of your hiring journey.
          </p>
        </div>

        <div className="application-summary">
          <strong>{applications.length}</strong>
          <span>Total Applications</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="application-stats">

        <div className="application-stat-card">
          <div className="application-stat-icon blue">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Applied</span>
            <strong>5</strong>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon yellow">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>1</strong>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Shortlisted</span>
            <strong>1</strong>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon purple">
            <CalendarDays size={19} />
          </div>

          <div>
            <span>Interviews</span>
            <strong>1</strong>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="applications-toolbar">

        <div className="applications-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search applications..."
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

      </div>

      {/* Tabs */}
      <div className="application-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}

            <span>
              {tab === "All"
                ? applications.length
                : applications.filter(
                    (application) =>
                      application.status === tab
                  ).length}
            </span>
          </button>
        ))}
      </div>

      {/* Application List */}
      <div className="applications-list">

        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => {
            const status = statusConfig[application.status];

            return (
              <article
                className="application-card"
                key={application.id}
              >

                <div className="application-company-logo">
                  {application.company.charAt(0)}
                </div>

                <div className="application-main">

                  <div className="application-title-row">

                    <div>
                      <h3>{application.jobTitle}</h3>

                      <p>
                        {application.company}
                      </p>
                    </div>

                    <div
                      className={`application-status ${status.className}`}
                    >
                      {getStatusIcon(application.status)}
                      {application.status}
                    </div>

                  </div>

                  <div className="application-meta">

                    <span>
                      <MapPin size={14} />
                      {application.location}
                    </span>

                    <span>
                      <Briefcase size={14} />
                      {application.type}
                    </span>

                    <span>
                      <CalendarDays size={14} />
                      Applied {application.appliedDate}
                    </span>

                  </div>

                  <div className="application-bottom">

                    <div className="application-next-step">
                      <strong>Next step:</strong>
                      <span>
                        {application.nextStep}
                      </span>
                    </div>

                    <div className="application-match">
                      <span>AI Match</span>
                      <strong>
                        {application.match}%
                      </strong>
                    </div>

                  </div>

                </div>

                <div className="application-actions">

                  <span className="application-salary">
                    {application.salary}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                  >
                    <Eye size={15} />
                    Details
                  </button>

                  <button
                    type="button"
                    className="application-view-button"
                    onClick={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                  >
                    View Application
                    <ArrowRight size={15} />
                  </button>

                </div>

              </article>
            );
          })
        ) : (
          <div className="applications-empty">

            <div className="applications-empty-icon">
              <Search size={25} />
            </div>

            <h3>No applications found</h3>

            <p>
              Try another search term or application status.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveTab("All");
              }}
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* Hiring Timeline */}
      <section className="application-process-card">

        <div className="process-header">
          <div>
            <span>YOUR HIRING JOURNEY</span>
            <h2>Application process</h2>
          </div>
        </div>

        <div className="application-timeline">

          <div className="timeline-item completed">
            <div className="timeline-dot">
              <CheckCircle2 size={15} />
            </div>

            <div>
              <strong>Application Submitted</strong>
              <p>
                Your application has been successfully submitted.
              </p>
            </div>
          </div>

          <div className="timeline-line" />

          <div className="timeline-item completed">
            <div className="timeline-dot">
              <CheckCircle2 size={15} />
            </div>

            <div>
              <strong>Application Review</strong>
              <p>
                Recruiter reviews your profile and resume.
              </p>
            </div>
          </div>

          <div className="timeline-line" />

          <div className="timeline-item active">
            <div className="timeline-dot">
              <CalendarDays size={15} />
            </div>

            <div>
              <strong>Interview</strong>
              <p>
                Selected candidates move to the interview stage.
              </p>
            </div>
          </div>

          <div className="timeline-line" />

          <div className="timeline-item">
            <div className="timeline-dot">
              <CheckCircle2 size={15} />
            </div>

            <div>
              <strong>Final Decision</strong>
              <p>
                Final selection decision from the employer.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedApplication && (
        <div
          className="application-modal-overlay"
          onClick={() =>
            setSelectedApplication(null)
          }
        >
          <div
            className="application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="application-modal-close"
              onClick={() =>
                setSelectedApplication(null)
              }
            >
              <X size={18} />
            </button>

            <div className="modal-application-status">
              <span
                className={`application-status ${
                  statusConfig[
                    selectedApplication.status
                  ].className
                }`}
              >
                {getStatusIcon(
                  selectedApplication.status
                )}

                {selectedApplication.status}
              </span>
            </div>

            <h2>
              {selectedApplication.jobTitle}
            </h2>

            <p className="modal-company">
              {selectedApplication.company}
            </p>

            <div className="modal-application-details">

              <div>
                <span>Location</span>
                <strong>
                  {selectedApplication.location}
                </strong>
              </div>

              <div>
                <span>Job Type</span>
                <strong>
                  {selectedApplication.type}
                </strong>
              </div>

              <div>
                <span>Salary</span>
                <strong>
                  {selectedApplication.salary}
                </strong>
              </div>

              <div>
                <span>AI Match</span>
                <strong className="modal-match-score">
                  {selectedApplication.match}%
                </strong>
              </div>

            </div>

            <div className="modal-next-step">
              <span>Current status</span>

              <p>
                {selectedApplication.nextStep}
              </p>
            </div>

            <div className="modal-timeline">

              <div className="modal-timeline-step done">
                <div />
                <span>Application submitted</span>
              </div>

              <div className="modal-timeline-step done">
                <div />
                <span>Recruiter review</span>
              </div>

              <div
                className={
                  selectedApplication.status ===
                  "Interview"
                    ? "modal-timeline-step done"
                    : "modal-timeline-step"
                }
              >
                <div />
                <span>Interview stage</span>
              </div>

              <div className="modal-timeline-step">
                <div />
                <span>Final decision</span>
              </div>

            </div>

            <button
              type="button"
              className="close-modal-button"
              onClick={() =>
                setSelectedApplication(null)
              }
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Applications;