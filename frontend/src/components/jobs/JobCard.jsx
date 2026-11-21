import {
  MapPin,
  Briefcase,
  Clock3,
  IndianRupee,
  Bookmark,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <button className="bookmark-btn" aria-label="Save job">
          <Bookmark size={19} />
        </button>
      </div>

      <div className="job-card-content">
        <span className="job-type">{job.type}</span>

        <h3>{job.title}</h3>

        <p className="company-name">
          {job.company}
        </p>

        <div className="job-info">
          <span>
            <MapPin size={16} />
            {job.location}
          </span>

          <span>
            <Briefcase size={16} />
            {job.experience}
          </span>

          <span>
            <IndianRupee size={16} />
            {job.salary}
          </span>
        </div>

        <div className="job-skills">
          {job.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="job-card-footer">
        <span className="posted-time">
          <Clock3 size={15} />
          {job.posted}
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="view-job-btn"
        >
          View Job
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default JobCard;