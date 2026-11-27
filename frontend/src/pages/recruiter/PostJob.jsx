import React, { useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Clock3,
  FileText,
  Sparkles,
  Plus,
  X,
  Eye,
  Send,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import jobService from "../../services/jobService";
import "./PostJob.css";

const PostJob = () => {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([
    "Java",
    "Spring Boot",
    "MySQL",
  ]);

  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    company: "TechNova Solutions",
    location: "",
    jobType: "Full-time",
    workplace: "Hybrid",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    responsibilities: "",
    requirements: "",
    education: "",
  });

  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (
      skill &&
      !skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setPublishError("");

    try {
      await jobService.createJob({
        title: form.title,
        companyName: form.company,
        department: "General",
        location: form.location,
        workplace: form.workplace,
        employmentType: form.jobType,
        experience: form.experience,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        skills: skills.join(", "),
        status: "ACTIVE",
      });
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    } catch (error) {
      setPublishError(
        error.response?.data?.message ||
        "Unable to publish this job. Please try again."
      );
    }
  };

  return (
    <div className="post-job-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="post-job-header">

        <div className="post-job-heading">

          <button
            className="back-button"
            onClick={() => navigate("/recruiter/dashboard")}
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <div className="post-job-eyebrow">
              Hiring workspace
            </div>

            <h1>Create a new job</h1>

            <p>
              Find the right talent with AI-powered candidate matching.
            </p>
          </div>

        </div>

        <div className="header-actions">

          <button className="preview-button">
            <Eye size={16} />
            Preview
          </button>

          <button
            className="publish-button"
            onClick={handlePublish}
          >
            <Send size={16} />
            Publish Job
          </button>

        </div>

      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {published && (
        <div className="publish-success">
          <CheckCircle2 size={18} />

          <div>
            <strong>Job published successfully</strong>
            <span>
              Your job is now ready to receive applications.
            </span>
          </div>
        </div>
      )}

      {publishError && (
        <div
          role="alert"
          style={{
            margin: "16px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fef2f2",
            color: "#b91c1c",
          }}
        >
          {publishError}
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <form
        className="post-job-layout"
        onSubmit={handlePublish}
      >

        <div className="post-job-main">

          {/* BASIC INFORMATION */}

          <section className="job-form-card">

            <div className="form-section-header">

              <div className="section-icon blue">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <h2>Job information</h2>
                <p>
                  Start with the basics about the position.
                </p>
              </div>

            </div>

            <div className="form-grid">

              <div className="form-group full">

                <label>
                  Job title <span>*</span>
                </label>

                <div className="input-with-icon">
                  <BriefcaseBusiness size={16} />

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Java Backend Developer"
                    required
                  />
                </div>

              </div>

              <div className="form-group">

                <label>
                  Company <span>*</span>
                </label>

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Location <span>*</span>
                </label>

                <div className="input-with-icon">
                  <MapPin size={16} />

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, India"
                    required
                  />
                </div>

              </div>

              <div className="form-group">

                <label>
                  Job type
                </label>

                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Workplace
                </label>

                <select
                  name="workplace"
                  value={form.workplace}
                  onChange={handleChange}
                >
                  <option>On-site</option>
                  <option>Hybrid</option>
                  <option>Remote</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Experience
                </label>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option value="">Select experience</option>
                  <option>0–1 years</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–8 years</option>
                  <option>8+ years</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Salary range
                </label>

                <div className="salary-row">

                  <div className="salary-input">
                    <DollarSign size={15} />

                    <input
                      name="salaryMin"
                      type="number"
                      value={form.salaryMin}
                      onChange={handleChange}
                      placeholder="Min"
                    />

                    <span>LPA</span>
                  </div>

                  <span className="salary-divider">
                    to
                  </span>

                  <div className="salary-input">
                    <DollarSign size={15} />

                    <input
                      name="salaryMax"
                      type="number"
                      value={form.salaryMax}
                      onChange={handleChange}
                      placeholder="Max"
                    />

                    <span>LPA</span>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* DESCRIPTION */}

          <section className="job-form-card">

            <div className="form-section-header">

              <div className="section-icon purple">
                <FileText size={18} />
              </div>

              <div>
                <h2>Job description</h2>
                <p>
                  Tell candidates what makes this opportunity valuable.
                </p>
              </div>

            </div>

            <div className="form-group">

              <label>
                Description <span>*</span>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the role, team, company culture, and what the candidate can expect..."
                rows={7}
                required
              />

              <div className="character-count">
                {form.description.length} characters
              </div>

            </div>

          </section>

          {/* RESPONSIBILITIES */}

          <section className="job-form-card">

            <div className="form-section-header">

              <div className="section-icon green">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <h2>Responsibilities</h2>
                <p>
                  Define what the successful candidate will own.
                </p>
              </div>

            </div>

            <div className="form-group">

              <textarea
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                placeholder={`Example:
• Build scalable REST APIs using Spring Boot
• Design and optimize MySQL databases
• Collaborate with frontend and product teams`}
                rows={7}
              />

            </div>

          </section>

          {/* REQUIREMENTS */}

          <section className="job-form-card">

            <div className="form-section-header">

              <div className="section-icon orange">
                Sparkles size={18}
              </div>

              <div>
                <h2>Candidate requirements</h2>
                <p>
                  Define the experience and capabilities you're looking for.
                </p>
              </div>

            </div>

            <div className="form-group">

              <label>
                Requirements
              </label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder={`Example:
• Strong knowledge of Java
• Experience with Spring Boot
• Understanding of REST APIs
• Good problem-solving skills`}
                rows={7}
              />

            </div>

          </section>

          {/* SKILLS */}

          <section className="job-form-card">

            <div className="form-section-header">

              <div className="section-icon blue">
                <Sparkles size={18} />
              </div>

              <div>
                <h2>Required skills</h2>
                <p>
                  These skills will be used by the AI matching engine.
                </p>
              </div>

            </div>

            <div className="skills-editor">

              <div className="skill-input-row">

                <input
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                />

                <button
                  type="button"
                  onClick={addSkill}
                >
                  <Plus size={16} />
                  Add
                </button>

              </div>

              <div className="skill-list">

                {skills.map((skill) => (
                  <span
                    className="skill-chip"
                    key={skill}
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill)
                      }
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={12} />
                    </button>

                  </span>
                ))}

              </div>

            </div>

          </section>

        </div>

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="post-job-sidebar">

          {/* AI CARD */}

          <div className="ai-job-card">

            <div className="ai-job-icon">
              <Sparkles size={19} />
            </div>

            <span className="ai-job-label">
              AI Matching
            </span>

            <h3>
              Find candidates who actually fit.
            </h3>

            <p>
              Our AI engine compares resumes against your
              job requirements using semantic matching,
              skill extraction, and weighted scoring.
            </p>

            <div className="ai-feature">
              <CheckCircle2 size={14} />
              Semantic resume matching
            </div>

            <div className="ai-feature">
              <CheckCircle2 size={14} />
              Skill-based analysis
            </div>

            <div className="ai-feature">
              <CheckCircle2 size={14} />
              Candidate ranking
            </div>

          </div>

          {/* JOB SUMMARY */}

          <div className="summary-card">

            <div className="summary-title">
              <Clock3 size={16} />
              <span>Job summary</span>
            </div>

            <div className="summary-row">
              <span>Job type</span>
              <strong>
                {form.jobType}
              </strong>
            </div>

            <div className="summary-row">
              <span>Workplace</span>
              <strong>
                {form.workplace}
              </strong>
            </div>

            <div className="summary-row">
              <span>Experience</span>
              <strong>
                {form.experience || "Not selected"}
              </strong>
            </div>

            <div className="summary-row">
              <span>Location</span>
              <strong>
                {form.location || "Not selected"}
              </strong>
            </div>

          </div>

          {/* ACTION */}

          <div className="sidebar-publish-card">

            <div>
              <strong>
                Ready to publish?
              </strong>

              <p>
                Your job will become visible to matching candidates.
              </p>
            </div>

            <button type="submit">
              <Send size={15} />
              Publish Job
            </button>

          </div>

        </aside>

      </form>

    </div>
  );
};

export default PostJob;