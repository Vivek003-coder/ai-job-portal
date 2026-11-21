function JobFilter() {
  return (
    <aside className="job-filter">

      <div className="filter-header">
        <h3>Filters</h3>
        <button>Clear All</button>
      </div>

      <div className="filter-group">
        <h4>Job Type</h4>

        <label>
          <input type="checkbox" />
          Full Time
        </label>

        <label>
          <input type="checkbox" />
          Part Time
        </label>

        <label>
          <input type="checkbox" />
          Internship
        </label>

        <label>
          <input type="checkbox" />
          Contract
        </label>
      </div>

      <div className="filter-group">
        <h4>Experience</h4>

        <label>
          <input type="checkbox" />
          Fresher
        </label>

        <label>
          <input type="checkbox" />
          1–3 Years
        </label>

        <label>
          <input type="checkbox" />
          3–5 Years
        </label>

        <label>
          <input type="checkbox" />
          5+ Years
        </label>
      </div>

      <div className="filter-group">
        <h4>Work Mode</h4>

        <label>
          <input type="checkbox" />
          Remote
        </label>

        <label>
          <input type="checkbox" />
          Hybrid
        </label>

        <label>
          <input type="checkbox" />
          On-site
        </label>
      </div>

      <div className="filter-group">
        <h4>Salary</h4>

        <label>
          <input type="checkbox" />
          ₹3–6 LPA
        </label>

        <label>
          <input type="checkbox" />
          ₹6–10 LPA
        </label>

        <label>
          <input type="checkbox" />
          ₹10–15 LPA
        </label>

        <label>
          <input type="checkbox" />
          ₹15+ LPA
        </label>
      </div>

    </aside>
  );
}

export default JobFilter;