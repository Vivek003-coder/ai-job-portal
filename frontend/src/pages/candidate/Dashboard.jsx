import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      label: "Applications",
      value: "12",
      change: "+3 this week",
      icon: Send,
      type: "blue",
    },
    {
      label: "Saved Jobs",
      value: "8",
      change: "+2 this week",
      icon: Heart,
      type: "rose",
    },
    {
      label: "Profile Views",
      value: "24",
      change: "+18% this week",
      icon: TrendingUp,
      type: "green",
    },
    {
      label: "Profile Strength",
      value: "86%",
      change: "Almost complete",
      icon: Target,
      type: "purple",
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Java Backend Developer",
      company: "TechNova Solutions",
      location: "Bangalore, India",
      salary: "₹6 - ₹10 LPA",
      match: 94,
      skills: ["Java", "Spring Boot", "MySQL"],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "InnovateX Labs",
      location: "Hyderabad, India",
      salary: "₹7 - ₹12 LPA",
      match: 89,
      skills: ["React", "Java", "Spring Boot"],
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "CloudCore Technologies",
      location: "Pune, India",
      salary: "₹8 - ₹13 LPA",
      match: 84,
      skills: ["Java", "AWS", "SQL"],
    },
  ];

  return (
    <div className="dashboard-page">

      {/* PROFILE COMPLETION */}
      <section className="profile-completion-card">

        <div className="completion-icon">
          <Sparkles size={21} />
        </div>

        <div className="completion-content">

          <div className="completion-heading">
            <div>
              <h3>Complete your profile</h3>

              <p>
                A complete profile helps our AI find better
                job matches for you.
              </p>
            </div>

            <strong>86%</strong>
          </div>

          <div className="completion-progress">
            <div style={{ width: "86%" }} />
          </div>

          <div className="completion-footer">
            <span>
              Add your latest project and certifications
            </span>

            <Link to="/candidate/profile">
              Complete profile
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="dashboard-stats">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="dashboard-stat-card"
              key={stat.label}
            >

              <div className={`stat-icon ${stat.type}`}>
                <Icon size={19} />
              </div>

              <div className="stat-info">

                <span>{stat.label}</span>

                <div className="stat-value">
                  {stat.value}
                </div>

                <small>{stat.change}</small>

              </div>

            </div>
          );
        })}

      </section>

      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* RECOMMENDED JOBS */}
        <section className="dashboard-panel recommended-panel">

          <div className="panel-header">

            <div>
              <div className="panel-title-row">
                <Sparkles size={17} />
                <h2>Recommended for you</h2>
              </div>

              <p>
                Jobs selected based on your skills and profile.
              </p>
            </div>

            <Link to="/candidate/recommended-jobs">
              View all
              <ArrowUpRight size={15} />
            </Link>

          </div>

          <div className="recommended-list">

            {recommendedJobs.map((job) => (
              <div
                className="recommended-job"
                key={job.id}
              >

                <div className="job-company-logo">
                  {job.company.charAt(0)}
                </div>

                <div className="recommended-job-info">

                  <div className="job-title-row">

                    <div>
                      <h3>{job.title}</h3>

                      <span>
                        {job.company}
                      </span>
                    </div>

                    <div className="match-score">
                      <Sparkles size={13} />
                      {job.match}% match
                    </div>

                  </div>

                  <div className="job-meta">

                    <span>
                      <Briefcase size={14} />
                      {job.location}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {job.salary}
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

                <Link
                  to={`/jobs/${job.id}`}
                  className="job-arrow"
                >
                  <ArrowUpRight size={18} />
                </Link>

              </div>
            ))}

          </div>

        </section>

        {/* RIGHT COLUMN */}
        <div className="dashboard-side-column">

          {/* AI MATCHING */}
          <section className="ai-match-card">

            <div className="ai-match-icon">
              <Sparkles size={22} />
            </div>

            <div>
              <span className="ai-label">
                AI MATCHING
              </span>

              <h3>
                Your profile is getting noticed
              </h3>

              <p>
                Our matching engine found
                <strong> 18 new opportunities</strong>
                that align with your skills.
              </p>

              <Link to="/candidate/recommended-jobs">
                Explore matches
                <ArrowUpRight size={15} />
              </Link>
            </div>

          </section>

          {/* RESUME */}
          <section className="dashboard-panel resume-card">

            <div className="panel-title-row">
              <FileText size={17} />
              <h2>Resume</h2>
            </div>

            <div className="resume-status">

              <div className="resume-file-icon">
                <FileText size={19} />
              </div>

              <div>
                <strong>
                  Vivek_Kumar_Resume.pdf
                </strong>

                <span>
                  Updated 2 days ago
                </span>
              </div>

              <CheckCircle2
                size={17}
                className="resume-check"
              />

            </div>

            <Link
              to="/candidate/resume"
              className="resume-action"
            >
              Manage resume
              <ArrowUpRight size={15} />
            </Link>

          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-panel quick-actions">

            <div className="panel-title-row">
              <Target size={17} />
              <h2>Quick actions</h2>
            </div>

            <Link to="/jobs">
              <Briefcase size={16} />
              Find new jobs
            </Link>

            <Link to="/candidate/profile">
              <FileText size={16} />
              Update profile
            </Link>

            <Link to="/candidate/applications">
              <Send size={16} />
              Track applications
            </Link>

          </section>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;