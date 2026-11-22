import React, { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Mail,
  Phone,
  Save,
  Pencil,
  Camera,
  CheckCircle2,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

import "./Company.css";

const Company = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [company, setCompany] = useState({
    name: "HireAI Technologies",
    industry: "Information Technology",
    size: "51-200 employees",
    location: "Bangalore, India",
    website: "https://hireai.com",
    email: "hr@hireai.com",
    phone: "+91 98765 43210",
    description:
      "HireAI Technologies is a modern technology company focused on building intelligent hiring solutions that connect talented candidates with growing organizations.",
  });

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleLogoUpload = () => {
    alert("Company logo upload will be connected to backend storage later.");
  };

  return (
    <div className="company-page">
      {/* HEADER */}
      <div className="company-header">
        <div>
          <div className="company-eyebrow">
            <Building2 size={15} />
            COMPANY PROFILE
          </div>

          <h1>Company Profile</h1>

          <p>
            Manage your company information and how it appears to candidates.
          </p>
        </div>

        <div className="company-header-actions">
          {!isEditing ? (
            <button
              type="button"
              className="company-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className="company-cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="company-save-btn"
                onClick={handleSave}
              >
                <Save size={16} />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="company-success">
          <CheckCircle2 size={18} />
          <div>
            <strong>Profile updated successfully</strong>
            <span>Your company information has been saved.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="company-layout">
          {/* LEFT COLUMN */}
          <div className="company-main">
            {/* COMPANY IDENTITY */}
            <section className="company-card company-identity-card">
              <div className="company-section-header">
                <div className="company-section-icon blue">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2>Company Identity</h2>
                  <p>Basic information about your organization.</p>
                </div>
              </div>

              <div className="company-identity">
                <div className="company-logo-wrapper">
                  <div className="company-logo">
                    <span>HA</span>
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      className="company-logo-camera"
                      onClick={handleLogoUpload}
                      aria-label="Change company logo"
                    >
                      <Camera size={15} />
                    </button>
                  )}
                </div>

                <div className="company-identity-copy">
                  <h3>{company.name}</h3>
                  <p>
                    Your company logo and name will be visible to candidates
                    across your job listings.
                  </p>

                  {isEditing && (
                    <button
                      type="button"
                      className="company-logo-btn"
                      onClick={handleLogoUpload}
                    >
                      <Camera size={15} />
                      Change Logo
                    </button>
                  )}
                </div>
              </div>

              <div className="company-form-grid">
                <div className="company-field">
                  <label htmlFor="name">Company Name</label>

                  <input
                    id="name"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="company-field">
                  <label htmlFor="industry">Industry</label>

                  <select
                    id="industry"
                    name="industry"
                    value={company.industry}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option>Information Technology</option>
                    <option>Software & SaaS</option>
                    <option>Financial Services</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>E-commerce</option>
                    <option>Manufacturing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="company-field">
                  <label htmlFor="size">Company Size</label>

                  <select
                    id="size"
                    name="size"
                    value={company.size}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>

                <div className="company-field">
                  <label htmlFor="location">Headquarters</label>

                  <div className="company-input-icon">
                    <MapPin size={16} />

                    <input
                      id="location"
                      name="location"
                      value={company.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section className="company-card">
              <div className="company-section-header">
                <div className="company-section-icon violet">
                  <BriefcaseBusiness size={19} />
                </div>

                <div>
                  <h2>About Company</h2>
                  <p>Tell candidates what makes your company unique.</p>
                </div>
              </div>

              <div className="company-field">
                <label htmlFor="description">Company Description</label>

                <textarea
                  id="description"
                  name="description"
                  value={company.description}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={6}
                  required
                />

                <div className="company-character-count">
                  {company.description.length} characters
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="company-card">
              <div className="company-section-header">
                <div className="company-section-icon green">
                  <Mail size={19} />
                </div>

                <div>
                  <h2>Contact Information</h2>
                  <p>Information candidates can use to identify your company.</p>
                </div>
              </div>

              <div className="company-form-grid">
                <div className="company-field">
                  <label htmlFor="email">Recruitment Email</label>

                  <div className="company-input-icon">
                    <Mail size={16} />

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={company.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="company-field">
                  <label htmlFor="phone">Contact Number</label>

                  <div className="company-input-icon">
                    <Phone size={16} />

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={company.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="company-field company-full-field">
                  <label htmlFor="website">Company Website</label>

                  <div className="company-input-icon">
                    <Globe size={16} />

                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={company.website}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* MOBILE SAVE */}
            {isEditing && (
              <div className="company-mobile-actions">
                <button
                  type="button"
                  className="company-cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="company-save-btn">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="company-side">
            <div className="company-card company-status-card">
              <div className="company-status-top">
                <div className="company-status-icon">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <span className="company-status-label">PROFILE STATUS</span>
                  <h3>Verified Company</h3>
                </div>
              </div>

              <p>
                Your company profile is visible to candidates and can be used
                on published job listings.
              </p>

              <div className="company-status-divider" />

              <div className="company-profile-complete">
                <div>
                  <span>Profile completeness</span>
                  <strong>92%</strong>
                </div>

                <div className="company-progress">
                  <span />
                </div>
              </div>
            </div>

            <div className="company-card company-preview-card">
              <div className="company-preview-label">
                <span>PUBLIC PREVIEW</span>
              </div>

              <div className="company-preview-logo">HA</div>

              <h3>{company.name}</h3>

              <p>{company.industry}</p>

              <div className="company-preview-info">
                <span>
                  <MapPin size={14} />
                  {company.location}
                </span>

                <span>
                  <Users size={14} />
                  {company.size}
                </span>
              </div>

              <button
                type="button"
                className="company-preview-btn"
                onClick={() => alert("Public company preview coming soon.")}
              >
                View Public Profile
              </button>
            </div>

            <div className="company-card company-tip-card">
              <div className="company-tip-icon">
                <Globe size={17} />
              </div>

              <div>
                <strong>Build candidate trust</strong>

                <p>
                  A complete company profile helps candidates understand your
                  organization before applying.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default Company;