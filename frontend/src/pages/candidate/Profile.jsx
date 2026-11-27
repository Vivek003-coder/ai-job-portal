import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Edit3,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Sparkles,
  User,
  X,
} from "lucide-react";
import profileService from "../../services/profileService";

function Profile() {
  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    profileService.getProfile()
      .then((data) => {
        if (active) {
          setProfile((current) => ({ ...current, ...data }));
        }
      })
      .catch((error) => {
        if (active) setMessage(error.response?.data?.message || "Unable to load your profile.");
      });
    return () => { active = false; };
  }, []);

  const [newSkill, setNewSkill] = useState("");

  const [experience, setExperience] = useState([]);

  const [education, setEducation] = useState([
    {
      degree: "Bachelor of Technology in Computer Science",
      field: "Computer Science & Engineering",
      duration: "2023 — 2027",
      institution: "Engineering College",
    },
  ]);

  const [showExperienceModal, setShowExperienceModal] =
    useState(false);

  const [showEducationModal, setShowEducationModal] =
    useState(false);

  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    company: "",
    duration: "",
    description: "",
  });

  const [educationForm, setEducationForm] = useState({
    degree: "",
    field: "",
    institution: "",
    duration: "",
  });

  /* =========================
     PROFILE HANDLERS
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const updated = await profileService.updateProfile(profile);
      setProfile((current) => ({ ...current, ...updated }));
      setEditing(false);
      setMessage("Profile changes saved successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     SKILL HANDLERS
  ========================= */

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    const alreadyExists = profile.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (!alreadyExists) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));

      setMessage(`${skill} added to your skills.`);
    }

    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));

    setMessage(`${skillToRemove} removed.`);
  };

  /* =========================
     EXPERIENCE HANDLERS
  ========================= */

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;

    setExperienceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveExperience = (e) => {
    e.preventDefault();

    if (
      !experienceForm.jobTitle ||
      !experienceForm.company ||
      !experienceForm.duration
    ) {
      return;
    }

    setExperience((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...experienceForm,
      },
    ]);

    setExperienceForm({
      jobTitle: "",
      company: "",
      duration: "",
      description: "",
    });

    setShowExperienceModal(false);

    setMessage("Experience added successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const removeExperience = (id) => {
    setExperience((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setMessage("Experience removed.");
  };

  /* =========================
     EDUCATION HANDLERS
  ========================= */

  const handleEducationChange = (e) => {
    const { name, value } = e.target;

    setEducationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEducation = (e) => {
    e.preventDefault();

    if (
      !educationForm.degree ||
      !educationForm.field ||
      !educationForm.institution ||
      !educationForm.duration
    ) {
      return;
    }

    setEducation((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...educationForm,
      },
    ]);

    setEducationForm({
      degree: "",
      field: "",
      institution: "",
      duration: "",
    });

    setShowEducationModal(false);

    setMessage("Education added successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const removeEducation = (id) => {
    setEducation((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setMessage("Education removed.");
  };

  /* =========================
     SOCIAL LINK
  ========================= */

  const openSocialLink = (url) => {
    if (!url || url === "#") return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="profile-page">

      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {message && (
        <div className="profile-toast">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="profile-page-header">

        <div>

          <Link
            to="/candidate/dashboard"
            className="back-dashboard"
          >
            <ArrowLeft size={15} />
            Back to dashboard
          </Link>

          <h1>My Profile</h1>

          <p>
            Manage your professional profile and let AI
            understand your skills.
          </p>

        </div>

        <button
          type="button"
          className="profile-edit-button"
          disabled={saving}
          onClick={() => {
            if (editing) {
              saveProfile();
            } else {
              setEditing(true);
            }
          }}
        >
          {editing ? (
            <>
              <Save size={16} />
              {saving ? "Saving..." : "Save changes"}
            </>
          ) : (
            <>
              <Edit3 size={16} />
              Edit profile
            </>
          )}
        </button>

      </div>

      {/* =========================
          PROFILE COMPLETION
      ========================= */}

      <section className="profile-strength-card">

        <div className="strength-icon">
          <Sparkles size={21} />
        </div>

        <div className="strength-content">

          <div className="strength-top">

            <div>

              <span>PROFILE STRENGTH</span>

              <h3>
                Your profile is 86% complete
              </h3>

            </div>

            <strong>86%</strong>

          </div>

          <div className="strength-bar">
            <div style={{ width: "86%" }} />
          </div>

          <p>
            Add your experience and certifications to
            improve your AI job matches.
          </p>

        </div>

      </section>

      {/* =========================
          MAIN PROFILE
      ========================= */}

      <div className="profile-layout">

        {/* =========================
            LEFT COLUMN
        ========================= */}

        <div className="profile-main-column">

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>
                <h2>Basic information</h2>

                <p>
                  Your personal and professional identity.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  className="icon-only-button"
                  onClick={() => setEditing(true)}
                  title="Edit profile"
                >
                  <Edit3 size={17} />
                </button>
              )}

            </div>

            <div className="profile-basic">

              <div className="large-profile-avatar">
                {profile.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="profile-identity">

                {editing ? (
                  <input
                    className="profile-name-input"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                  />
                ) : (
                  <h2>{profile.fullName}</h2>
                )}

                {editing ? (
                  <input
                    className="profile-headline-input"
                    name="headline"
                    value={profile.headline}
                    onChange={handleChange}
                    placeholder="Professional headline"
                  />
                ) : (
                  <p>{profile.headline}</p>
                )}

                <div className="identity-meta">

                  <span>
                    <MapPin size={14} />
                    {profile.location}
                  </span>

                  <span>
                    <Mail size={14} />
                    {profile.email}
                  </span>

                </div>

              </div>

            </div>

            {editing && (
              <div className="profile-edit-grid">

                <div className="profile-field">

                  <label>Location</label>

                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />

                </div>

                <div className="profile-field">

                  <label>Phone</label>

                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />

                </div>

                <div className="profile-field">

                  <label>Email</label>

                  <input
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                  />

                </div>

              </div>
            )}

          </section>

          {/* =========================
              ABOUT
          ========================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>About me</h2>

                <p>
                  Tell recruiters what makes you unique.
                </p>

              </div>

            </div>

            {editing ? (
              <textarea
                className="profile-about-input"
                name="about"
                value={profile.about}
                onChange={handleChange}
                rows="6"
                placeholder="Write something about yourself..."
              />
            ) : (
              <p className="profile-about">
                {profile.about}
              </p>
            )}

          </section>

          {/* =========================
              SKILLS
          ========================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>Skills</h2>

                <p>
                  These skills are used by our AI matching
                  engine.
                </p>

              </div>

              <span className="skill-count">
                {profile.skills.length} skills
              </span>

            </div>

            <div className="skills-list">

              {profile.skills.map((skill) => (
                <span
                  className="profile-skill"
                  key={skill}
                >

                  {skill}

                  {editing && (
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="remove-skill-button"
                      title={`Remove ${skill}`}
                    >
                      <X size={13} />
                    </button>
                  )}

                </span>
              ))}

            </div>

            {editing && (
              <div className="add-skill">

                <input
                  type="text"
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) =>
                    setNewSkill(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={addSkill}
                >
                  <Plus size={16} />
                  Add
                </button>

              </div>
            )}

          </section>

          {/* =========================
              EXPERIENCE
          ========================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>Experience</h2>

                <p>
                  Showcase your professional experience.
                </p>

              </div>

              <button
                type="button"
                className="small-add-button"
                onClick={() =>
                  setShowExperienceModal(true)
                }
              >
                <Plus size={15} />
                Add experience
              </button>

            </div>

            {experience.length === 0 ? (

              <div className="empty-profile-section">

                <div className="empty-icon">
                  <Briefcase size={20} />
                </div>

                <h3>
                  No experience added yet
                </h3>

                <p>
                  Add internships, jobs or relevant
                  professional experience.
                </p>

                <button
                  type="button"
                  className="empty-action-button"
                  onClick={() =>
                    setShowExperienceModal(true)
                  }
                >
                  <Plus size={15} />
                  Add your first experience
                </button>

              </div>

            ) : (

              <div className="experience-list">

                {experience.map((item) => (

                  <div
                    className="experience-item"
                    key={item.id}
                  >

                    <div className="experience-icon">
                      <Briefcase size={18} />
                    </div>

                    <div className="experience-content">

                      <div className="experience-top">

                        <div>

                          <h3>
                            {item.jobTitle}
                          </h3>

                          <p className="experience-company">
                            {item.company}
                          </p>

                        </div>

                        <button
                          type="button"
                          className="delete-item-button"
                          onClick={() =>
                            removeExperience(item.id)
                          }
                        >
                          <X size={16} />
                        </button>

                      </div>

                      <span className="experience-duration">
                        {item.duration}
                      </span>

                      {item.description && (
                        <p>
                          {item.description}
                        </p>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* =========================
              EDUCATION
          ========================= */}

          <section className="profile-card">

            <div className="profile-card-header">

              <div>

                <h2>Education</h2>

                <p>
                  Add your academic background.
                </p>

              </div>

              <button
                type="button"
                className="small-add-button"
                onClick={() =>
                  setShowEducationModal(true)
                }
              >
                <Plus size={15} />
                Add education
              </button>

            </div>

            <div className="education-list">

              {education.map((item) => (

                <div
                  className="education-item"
                  key={item.id || `${item.degree}-${item.duration}`}
                >

                  <div className="education-logo">
                    <User size={20} />
                  </div>

                  <div className="education-content">

                    <div className="education-top">

                      <div>

                        <h3>
                          {item.degree}
                        </h3>

                        <p>
                          {item.field}
                        </p>

                        <span>
                          {item.institution}
                        </span>

                        <span>
                          {item.duration}
                        </span>

                      </div>

                      {education.length > 1 && (
                        <button
                          type="button"
                          className="delete-item-button"
                          onClick={() =>
                            removeEducation(item.id)
                          }
                        >
                          <X size={16} />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

        {/* =========================
            RIGHT SIDEBAR
        ========================= */}

        <aside className="profile-side-column">

          {/* =========================
              CONTACT
          ========================= */}

          <section className="profile-side-card">

            <h3>Contact information</h3>

            <div className="contact-list">

              <div>
                <Mail size={15} />
                <span>{profile.email}</span>
              </div>

              <div>
                <Phone size={15} />
                <span>{profile.phone}</span>
              </div>

              <div>
                <MapPin size={15} />
                <span>{profile.location}</span>
              </div>

            </div>

          </section>

          {/* =========================
              SOCIAL
          ========================= */}

          <section className="profile-side-card">

            <div className="social-header">

              <div>
                <h3>Social profiles</h3>
                <p>Connect your professional profiles.</p>
              </div>

            </div>

            {editing ? (

              <div className="social-edit-fields">

                <div className="profile-field">
                  <label>GitHub URL</label>

                  <input
                    name="github"
                    value={profile.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="profile-field">
                  <label>LinkedIn URL</label>

                  <input
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="profile-field">
                  <label>Portfolio URL</label>

                  <input
                    name="portfolio"
                    value={profile.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

              </div>

            ) : (

              <div className="social-profile-links">

                <button
                  type="button"
                  onClick={() =>
                    openSocialLink(profile.github)
                  }
                >
                  <Github size={16} />
                  GitHub
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openSocialLink(profile.linkedin)
                  }
                >
                  <Linkedin size={16} />
                  LinkedIn
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openSocialLink(profile.portfolio)
                  }
                >
                  <Globe size={16} />
                  Portfolio
                </button>

              </div>

            )}

          </section>

          {/* =========================
              AI PROFILE ANALYSIS
          ========================= */}

          <section className="ai-profile-card">

            <div className="ai-profile-icon">
              <Sparkles size={19} />
            </div>

            <span>AI PROFILE ANALYSIS</span>

            <h3>
              Your strongest skills
            </h3>

            <div className="ai-skill">

              <div>
                <span>Java</span>
                <strong>92%</strong>
              </div>

              <div className="ai-progress">
                <div style={{ width: "92%" }} />
              </div>

            </div>

            <div className="ai-skill">

              <div>
                <span>Spring Boot</span>
                <strong>88%</strong>
              </div>

              <div className="ai-progress">
                <div style={{ width: "88%" }} />
              </div>

            </div>

            <div className="ai-skill">

              <div>
                <span>React</span>
                <strong>81%</strong>
              </div>

              <div className="ai-progress">
                <div style={{ width: "81%" }} />
              </div>

            </div>

            <p>
              Complete your profile to improve matching
              accuracy.
            </p>

          </section>

        </aside>

      </div>

      {/* =================================================
          EXPERIENCE MODAL
      ================================================= */}

      {showExperienceModal && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setShowExperienceModal(false)
          }
        >

          <div
            className="profile-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>Add Experience</h2>

                <p>
                  Add your internship or work experience.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowExperienceModal(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={saveExperience}>

              <div className="modal-form-grid">

                <div className="profile-field">

                  <label>
                    Job title *
                  </label>

                  <input
                    name="jobTitle"
                    value={experienceForm.jobTitle}
                    onChange={handleExperienceChange}
                    placeholder="Java Backend Intern"
                    required
                  />

                </div>

                <div className="profile-field">

                  <label>
                    Company *
                  </label>

                  <input
                    name="company"
                    value={experienceForm.company}
                    onChange={handleExperienceChange}
                    placeholder="Company name"
                    required
                  />

                </div>

              </div>

              <div className="profile-field">

                <label>
                  Duration *
                </label>

                <input
                  name="duration"
                  value={experienceForm.duration}
                  onChange={handleExperienceChange}
                  placeholder="June 2026 — August 2026"
                  required
                />

              </div>

              <div className="profile-field">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={experienceForm.description}
                  onChange={handleExperienceChange}
                  rows="4"
                  placeholder="Describe your responsibilities, projects and achievements..."
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() =>
                    setShowExperienceModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-button"
                >
                  <Save size={16} />
                  Save experience
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          EDUCATION MODAL
      ================================================= */}

      {showEducationModal && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setShowEducationModal(false)
          }
        >

          <div
            className="profile-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>Add Education</h2>

                <p>
                  Add your academic qualification.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEducationModal(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={saveEducation}>

              <div className="profile-field">

                <label>
                  Degree *
                </label>

                <input
                  name="degree"
                  value={educationForm.degree}
                  onChange={handleEducationChange}
                  placeholder="Bachelor of Technology"
                  required
                />

              </div>

              <div className="profile-field">

                <label>
                  Field of study *
                </label>

                <input
                  name="field"
                  value={educationForm.field}
                  onChange={handleEducationChange}
                  placeholder="Computer Science & Engineering"
                  required
                />

              </div>

              <div className="profile-field">

                <label>
                  Institution *
                </label>

                <input
                  name="institution"
                  value={educationForm.institution}
                  onChange={handleEducationChange}
                  placeholder="College / University"
                  required
                />

              </div>

              <div className="profile-field">

                <label>
                  Duration *
                </label>

                <input
                  name="duration"
                  value={educationForm.duration}
                  onChange={handleEducationChange}
                  placeholder="2023 — 2027"
                  required
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() =>
                    setShowEducationModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-button"
                >
                  <Save size={16} />
                  Save education
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Profile;