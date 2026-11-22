import React, { useMemo, useState } from "react";
import {
  User,
  Bell,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Trash2,
  Check,
  AlertCircle,
  Mail,
  Smartphone,
  BriefcaseBusiness,
  ChevronRight,
  KeyRound,
  Globe,
  LogOut,
} from "lucide-react";

import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  const [account, setAccount] = useState({
    firstName: "Alex",
    lastName: "Kumar",
    email: "alex.kumar@example.com",
    phone: "+91 98765 43210",
    designation: "Talent Acquisition",
    timezone: "Asia/Kolkata",
  });

  const [notifications, setNotifications] = useState({
    newApplications: true,
    candidateUpdates: true,
    interviewReminders: true,
    weeklySummary: true,
    productUpdates: false,
    emailNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    candidateActivity: true,
    analytics: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    {
      id: "account",
      label: "Account",
      description: "Personal and workspace information",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Control how you receive updates",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      description: "Password and account protection",
      icon: ShieldCheck,
    },
    {
      id: "privacy",
      label: "Privacy",
      description: "Manage visibility and data controls",
      icon: Lock,
    },
  ];

  const passwordStrength = useMemo(() => {
    const password = passwords.newPassword;

    if (!password) {
      return {
        label: "",
        score: 0,
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return { label: "Weak", score };
    }

    if (score <= 4) {
      return { label: "Good", score };
    }

    return { label: "Strong", score };
  }, [passwords.newPassword]);

  const handleAccountChange = (e) => {
    const { name, value } = e.target;

    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  const togglePrivacy = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  const validatePassword = () => {
    if (!passwords.current) {
      return "Please enter your current password.";
    }

    if (!passwords.newPassword) {
      return "Please enter a new password.";
    }

    if (passwords.newPassword.length < 8) {
      return "New password must contain at least 8 characters.";
    }

    if (passwords.newPassword !== passwords.confirm) {
      return "New password and confirmation do not match.";
    }

    return "";
  };

  const handleSave = () => {
    setError("");

    if (activeTab === "security") {
      const validationError = validatePassword();

      if (validationError) {
        setError(validationError);
        setSaved(false);
        return;
      }

      setPasswords({
        current: "",
        newPassword: "",
        confirm: "",
      });
    }

    // Frontend-ready.
    // Later connect this to your Spring Boot API.
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleCancel = () => {
    setError("");
    setSaved(false);

    if (activeTab === "security") {
      setPasswords({
        current: "",
        newPassword: "",
        confirm: "",
      });
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);

    // Backend integration can be connected later.
    alert("Account deletion will be connected to the backend.");
  };

  const renderPasswordInput = (
    name,
    label,
    placeholder,
    value
  ) => {
    const visible = showPassword[name];

    return (
      <div className="settings-field">
        <label>{label}</label>

        <div className="settings-password-wrap">
          <KeyRound size={17} />

          <input
            type={visible ? "text" : "password"}
            name={name}
            value={value}
            onChange={handlePasswordChange}
            placeholder={placeholder}
            autoComplete="new-password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                [name]: !prev[name],
              }))
            }
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>
    );
  };

  const renderToggle = (
    title,
    description,
    checked,
    onChange,
    icon
  ) => (
    <div className="settings-toggle-row">
      <div className="settings-toggle-left">
        <div className="settings-toggle-icon">
          {icon}
        </div>

        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </div>

      <button
        type="button"
        className={`settings-switch ${
          checked ? "active" : ""
        }`}
        onClick={onChange}
        aria-pressed={checked}
      >
        <span />
      </button>
    </div>
  );

  return (
    <div className="recruiter-settings-page">

      {/* HEADER */}
      <div className="settings-page-header">
        <div>
          <div className="settings-eyebrow">
            ACCOUNT SETTINGS
          </div>

          <h1>Settings</h1>

          <p>
            Manage your recruiter account, notifications,
            security and privacy preferences.
          </p>
        </div>

        <div className="settings-header-status">
          <span className="settings-status-dot" />
          Account active
        </div>
      </div>

      {/* SUCCESS */}
      {saved && (
        <div className="settings-alert success">
          <div className="alert-icon">
            <Check size={17} />
          </div>

          <div>
            <strong>Changes saved successfully</strong>
            <span>
              Your settings have been updated.
            </span>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="settings-alert error">
          <div className="alert-icon">
            <AlertCircle size={17} />
          </div>

          <div>
            <strong>Unable to save changes</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="settings-layout">

        {/* SIDEBAR */}
        <aside className="settings-sidebar">

          <div className="settings-nav-title">
            SETTINGS
          </div>

          <nav>
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`settings-tab ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSaved(false);
                    setError("");
                  }}
                >
                  <div className="settings-tab-icon">
                    <Icon size={18} />
                  </div>

                  <div className="settings-tab-copy">
                    <strong>{tab.label}</strong>
                    <span>{tab.description}</span>
                  </div>

                  <ChevronRight size={16} />
                </button>
              );
            })}
          </nav>

          <div className="settings-security-card">
            <div className="security-card-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <strong>Protected account</strong>
              <p>
                Your recruiter workspace is secured.
              </p>
            </div>
          </div>

        </aside>

        {/* CONTENT */}
        <main className="settings-content">

          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (
            <section className="settings-section">

              <div className="section-heading">
                <div className="section-icon blue">
                  <User size={19} />
                </div>

                <div>
                  <h2>Account information</h2>
                  <p>
                    Keep your recruiter profile information
                    up to date.
                  </p>
                </div>
              </div>

              <div className="profile-card">

                <div className="profile-avatar-large">
                  AK
                </div>

                <div className="profile-card-info">
                  <strong>
                    {account.firstName} {account.lastName}
                  </strong>

                  <span>
                    {account.designation}
                  </span>

                  <small>
                    Recruiter account
                  </small>
                </div>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    document
                      .getElementById("firstName")
                      ?.focus()
                  }
                >
                  Edit profile
                </button>
              </div>

              <div className="form-grid">

                <div className="settings-field">
                  <label htmlFor="firstName">
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    value={account.firstName}
                    onChange={handleAccountChange}
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="lastName">
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    value={account.lastName}
                    onChange={handleAccountChange}
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="email">
                    Email address
                  </label>

                  <div className="input-with-icon">
                    <Mail size={16} />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={account.email}
                      onChange={handleAccountChange}
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label htmlFor="phone">
                    Phone number
                  </label>

                  <div className="input-with-icon">
                    <Smartphone size={16} />

                    <input
                      id="phone"
                      name="phone"
                      value={account.phone}
                      onChange={handleAccountChange}
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label htmlFor="designation">
                    Job title
                  </label>

                  <div className="input-with-icon">
                    <BriefcaseBusiness size={16} />

                    <input
                      id="designation"
                      name="designation"
                      value={account.designation}
                      onChange={handleAccountChange}
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label htmlFor="timezone">
                    Time zone
                  </label>

                  <div className="input-with-icon">
                    <Globe size={16} />

                    <select
                      id="timezone"
                      name="timezone"
                      value={account.timezone}
                      onChange={handleAccountChange}
                    >
                      <option value="Asia/Kolkata">
                        India Standard Time (IST)
                      </option>

                      <option value="UTC">
                        Coordinated Universal Time (UTC)
                      </option>

                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>

                      <option value="Europe/London">
                        London Time (GMT)
                      </option>
                    </select>
                  </div>
                </div>

              </div>

            </section>
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {activeTab === "notifications" && (
            <section className="settings-section">

              <div className="section-heading">
                <div className="section-icon violet">
                  <Bell size={19} />
                </div>

                <div>
                  <h2>Notifications</h2>
                  <p>
                    Choose which recruiter updates you
                    want to receive.
                  </p>
                </div>
              </div>

              <div className="toggle-card">

                {renderToggle(
                  "New applications",
                  "Get notified when candidates apply to your jobs.",
                  notifications.newApplications,
                  () =>
                    toggleNotification("newApplications"),
                  <BriefcaseBusiness size={17} />
                )}

                {renderToggle(
                  "Candidate updates",
                  "Receive updates when candidate profiles change.",
                  notifications.candidateUpdates,
                  () =>
                    toggleNotification("candidateUpdates"),
                  <User size={17} />
                )}

                {renderToggle(
                  "Interview reminders",
                  "Get reminders for upcoming candidate interviews.",
                  notifications.interviewReminders,
                  () =>
                    toggleNotification("interviewReminders"),
                  <Bell size={17} />
                )}

                {renderToggle(
                  "Weekly hiring summary",
                  "Receive a weekly overview of your hiring activity.",
                  notifications.weeklySummary,
                  () =>
                    toggleNotification("weeklySummary"),
                  <Mail size={17} />
                )}

                {renderToggle(
                  "Product updates",
                  "Receive occasional news about new HireAI features.",
                  notifications.productUpdates,
                  () =>
                    toggleNotification("productUpdates"),
                  <Globe size={17} />
                )}

                {renderToggle(
                  "Email notifications",
                  "Allow HireAI to send important account emails.",
                  notifications.emailNotifications,
                  () =>
                    toggleNotification("emailNotifications"),
                  <Mail size={17} />
                )}

              </div>

            </section>
          )}

          {/* ================= SECURITY ================= */}
          {activeTab === "security" && (
            <section className="settings-section">

              <div className="section-heading">
                <div className="section-icon green">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <h2>Security</h2>
                  <p>
                    Protect your recruiter account with a
                    strong password.
                  </p>
                </div>
              </div>

              <div className="security-info-banner">
                <div className="security-info-icon">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <strong>Password security</strong>
                  <p>
                    Use at least 8 characters with a mix of
                    uppercase letters, numbers and symbols.
                  </p>
                </div>
              </div>

              <div className="password-card">

                {renderPasswordInput(
                  "current",
                  "Current password",
                  "Enter your current password",
                  passwords.current
                )}

                {renderPasswordInput(
                  "newPassword",
                  "New password",
                  "Enter a new password",
                  passwords.newPassword
                )}

                {passwords.newPassword && (
                  <div className="password-strength">
                    <div className="strength-header">
                      <span>Password strength</span>
                      <strong>
                        {passwordStrength.label}
                      </strong>
                    </div>

                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <span
                          key={item}
                          className={
                            item <= passwordStrength.score
                              ? "filled"
                              : ""
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {renderPasswordInput(
                  "confirm",
                  "Confirm new password",
                  "Re-enter your new password",
                  passwords.confirm
                )}

              </div>

            </section>
          )}

          {/* ================= PRIVACY ================= */}
          {activeTab === "privacy" && (
            <section className="settings-section">

              <div className="section-heading">
                <div className="section-icon orange">
                  <Lock size={19} />
                </div>

                <div>
                  <h2>Privacy & data</h2>
                  <p>
                    Control how your recruiter profile and
                    workspace data are handled.
                  </p>
                </div>
              </div>

              <div className="toggle-card">

                {renderToggle(
                  "Profile visibility",
                  "Allow candidates to view your recruiter profile.",
                  privacy.profileVisibility,
                  () =>
                    togglePrivacy("profileVisibility"),
                  <Eye size={17} />
                )}

                {renderToggle(
                  "Candidate activity",
                  "Allow activity insights to improve your hiring workflow.",
                  privacy.candidateActivity,
                  () =>
                    togglePrivacy("candidateActivity"),
                  <User size={17} />
                )}

                {renderToggle(
                  "Analytics",
                  "Allow anonymous usage analytics to improve the platform.",
                  privacy.analytics,
                  () =>
                    togglePrivacy("analytics"),
                  <Globe size={17} />
                )}

              </div>

              <div className="danger-zone">

                <div className="danger-zone-copy">
                  <div className="danger-icon">
                    <Trash2 size={18} />
                  </div>

                  <div>
                    <h3>Delete account</h3>
                    <p>
                      Permanently remove your recruiter
                      account and associated workspace data.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="danger-button"
                  onClick={() =>
                    setShowDeleteModal(true)
                  }
                >
                  Delete account
                </button>

              </div>

            </section>
          )}

          {/* ACTION BAR */}
          <div className="settings-action-bar">

            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              <RotateCcw size={16} />
              Cancel
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleSave}
            >
              <Save size={16} />
              Save changes
            </button>

          </div>

        </main>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div
          className="settings-modal-backdrop"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="settings-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-danger-icon">
              <Trash2 size={22} />
            </div>

            <h2>Delete recruiter account?</h2>

            <p>
              This action will permanently remove your
              recruiter account and workspace data. This
              cannot be undone.
            </p>

            <div className="modal-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={handleDeleteAccount}
              >
                Delete account
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;