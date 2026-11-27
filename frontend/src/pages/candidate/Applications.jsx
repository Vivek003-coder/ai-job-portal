import { useEffect, useMemo, useState } from "react";
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
  X,
  XCircle,
} from "lucide-react";
import applicationService from "../../services/applicationService";

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
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    let active = true;
    applicationService.getMyApplications()
      .then((records) => {
        if (!active) return;
        setApplications(records.map((record) => ({
          ...record,
          title: record.jobTitle,
          appliedDate: record.appliedAt ? new Date(record.appliedAt).toLocaleDateString() : "",
          salary: record.salaryMin != null || record.salaryMax != null
            ? `₹${record.salaryMin ?? 0} - ₹${record.salaryMax ?? record.salaryMin} LPA`
            : "Salary not specified",
          match: 0,
          nextStep: record.status === "Rejected"
            ? "This application was not selected."
            : record.status === "Interview"
              ? "Check your email for interview details."
              : record.status === "Selected"
                ? "The recruiter selected your application."
                : "Your application is being reviewed.",
        })));
      })
      .catch((error) => {
        if (active) setLoadError(error.response?.data?.message || "Unable to load applications.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const tabs = [
    "All",
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview",
    "Rejected",
  ];

  /*
   * Safe filtering:
   * - Handles empty search
   * - Avoids calling methods on undefined values
   * - Searches across multiple application fields
   */
  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesTab =
        activeTab === "All" ||
        application.status === activeTab;

      if (!matchesTab) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        application.jobTitle,
        application.company,
        application.location,
        application.type,
        application.salary,
        application.status,
        application.nextStep,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [applications, activeTab, search]);

  const getStatusIcon = (status) => {
    const Icon = statusConfig[status]?.icon || FileText;
    return <Icon size={14} />;
  };

  const clearFilters = () => {
    setSearch("");
    setActiveTab("All");
  };

  return (
    <div className="applications-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
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


      {/* =====================================================
          STATISTICS
      ===================================================== */}
      <div className="application-stats">

        <div className="application-stat-card">
          <div className="application-stat-icon blue">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Applied</span>
            <strong>{applications.length}</strong>
          </div>
        </div>


        <div className="application-stat-card">
          <div className="application-stat-icon yellow">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>{applications.filter((application) => application.status === "Under Review").length}</strong>
          </div>
        </div>


        <div className="application-stat-card">
          <div className="application-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Shortlisted</span>
            <strong>{applications.filter((application) => application.status === "Shortlisted").length}</strong>
          </div>
        </div>


        <div className="application-stat-card">
          <div className="application-stat-icon purple">
            <CalendarDays size={19} />
          </div>

          <div>
            <span>Interviews</span>
            <strong>{applications.filter((application) => application.status === "Interview").length}</strong>
          </div>
        </div>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}
      <div className="applications-toolbar">

        <div className="applications-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search applications..."
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
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

      </div>


      {/* =====================================================
          TABS
      ===================================================== */}
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


      {/* =====================================================
          APPLICATION LIST
      ===================================================== */}
      <div className="applications-list">

        {loadError && <p role="alert">{loadError}</p>}
        {loading ? (
          <p role="status">Loading applications...</p>
        ) : filteredApplications.length > 0 ? (

          filteredApplications.map((application) => {
            const status =
              statusConfig[application.status] ||
              statusConfig.Applied;

            return (
              <article
                className="application-card"
                key={application.id}
              >

                {/* Company Logo */}
                <div className="application-company-logo">
                  {application.company.charAt(0)}
                </div>


                {/* Main Application Information */}
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


                  {/* Meta Information */}
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


                  {/* Bottom Information */}
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


                {/* Actions */}
                <div className="application-actions">

                  <span className="application-salary">
                    {application.salary}
                  </span>


                  <button
                    type="button"
                    onClick={() =>
                      setSelectedApplication(application)
                    }
                  >
                    <Eye size={15} />
                    Details
                  </button>


                  <button
                    type="button"
                    className="application-view-button"
                    onClick={() =>
                      setSelectedApplication(application)
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

          /* =================================================
             EMPTY SEARCH RESULT
          ================================================= */
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
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>


      {/* =====================================================
          HIRING TIMELINE
      ===================================================== */}
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


      {/* =====================================================
          APPLICATION DETAILS MODAL
      ===================================================== */}
      {selectedApplication && (
        <div
          className="application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >

          <div
            className="application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              className="application-modal-close"
              onClick={() =>
                setSelectedApplication(null)
              }
              aria-label="Close application details"
            >
              <X size={18} />
            </button>


            {/* Status */}
            <div className="modal-application-status">

              <span
                className={`application-status ${
                  statusConfig[
                    selectedApplication.status
                  ]?.className || "status-applied"
                }`}
              >
                {getStatusIcon(
                  selectedApplication.status
                )}

                {selectedApplication.status}
              </span>

            </div>


            {/* Job Title */}
            <h2>
              {selectedApplication.jobTitle}
            </h2>


            {/* Company */}
            <p className="modal-company">
              {selectedApplication.company}
            </p>


            {/* Application Details */}
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


            {/* Current Status */}
            <div className="modal-next-step">

              <span>Current status</span>

              <p>
                {selectedApplication.nextStep}
              </p>

            </div>


            {/* Modal Timeline */}
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


            {/* Close */}
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