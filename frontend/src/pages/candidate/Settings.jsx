import React, { useEffect, useRef, useState } from "react";

import {
  User,
  Bell,
  Lock,
  Shield,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertTriangle,
  Trash2,
  MapPin,
  Camera,
  X,
  KeyRound,
  Info,
  Check,
} from "lucide-react";

import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  // =========================================================
  // ACCOUNT
  // =========================================================

  const [account, setAccount] = useState({
    fullName: "Vivek Kumar",
    email: "vivek@example.com",
    phone: "+91 98765 43210",
    location: "Bihar, India",
  });

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const [profilePhoto, setProfilePhoto] = useState(null);
  const photoInputRef = useRef(null);

  // =========================================================
  // NOTIFICATIONS
  // =========================================================

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    recruiterMessages: true,
    recommendedJobs: true,
    marketing: false,
  });

  // =========================================================
  // PRIVACY
  // =========================================================

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    recruiterContact: true,
    showResume: true,
  });

  // =========================================================
  // PASSWORD
  // =========================================================

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordLoading, setPasswordLoading] = useState(false);

  // =========================================================
  // UI STATE
  // =========================================================

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [deleteModal, setDeleteModal] = useState(false);

  // =========================================================
  // CLEANUP IMAGE URL
  // =========================================================

  useEffect(() => {
    return () => {
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }
    };
  }, [profilePhoto]);

  // =========================================================
  // TOAST
  // =========================================================

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });

    window.clearTimeout(showMessage.timer);

    showMessage.timer = window.setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 3500);
  };

  // =========================================================
  // ACCOUNT
  // =========================================================

  const handleAccountChange = (event) => {
    const { name, value } = event.target;

    setAccount((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveAccount = (event) => {
    event.preventDefault();

    const fullName = account.fullName.trim();
    const email = account.email.trim();

    if (!fullName) {
      showMessage("error", "Full name is required.");
      return;
    }

    if (!email) {
      showMessage("error", "Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showMessage("error", "Please enter a valid email address.");
      return;
    }

    setAccount((previous) => ({
      ...previous,
      fullName,
      email,
      phone: previous.phone.trim(),
      location: previous.location.trim(),
    }));

    showMessage(
      "success",
      "Account information saved successfully."
    );
  };

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const openPhotoPicker = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage(
        "error",
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage(
        "error",
        "Profile photo must be smaller than 5 MB."
      );

      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfilePhoto((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }

      return imageUrl;
    });

    showMessage(
      "success",
      "Profile photo updated successfully."
    );

    event.target.value = "";
  };

  const removePhoto = () => {
    setProfilePhoto((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }

      return null;
    });

    showMessage(
      "success",
      "Profile photo removed successfully."
    );
  };

  // =========================================================
  // PASSWORD
  // =========================================================

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPassword((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const changePassword = async (event) => {
    event.preventDefault();

    const currentPassword =
      password.currentPassword.trim();

    const newPassword =
      password.newPassword;

    const confirmPassword =
      password.confirmPassword;

    if (!currentPassword) {
      showMessage(
        "error",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      showMessage(
        "error",
        "Please enter a new password."
      );
      return;
    }

    if (!confirmPassword) {
      showMessage(
        "error",
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword.length < 8) {
      showMessage(
        "error",
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        "error",
        "New password and confirm password do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      showMessage(
        "error",
        "New password must be different from your current password."
      );
      return;
    }

    setPasswordLoading(true);

    /*
      Frontend validation is complete.

      Later connect this function to your Spring Boot API:
      PUT /api/users/change-password

      The backend should verify the current password
      and update the new password securely.
    */

    setTimeout(() => {
      setPasswordLoading(false);

      showMessage(
        "success",
        "Password validated successfully. Backend API integration is pending."
      );

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    }, 700);
  };

  // =========================================================
  // NOTIFICATIONS
  // =========================================================

  const toggleNotification = (field) => {
    setNotifications((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const saveNotifications = () => {
    showMessage(
      "success",
      "Notification preferences saved successfully."
    );
  };

  // =========================================================
  // PRIVACY
  // =========================================================

  const togglePrivacy = (field) => {
    setPrivacy((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const savePrivacy = () => {
    showMessage(
      "success",
      "Privacy settings saved successfully."
    );
  };

  // =========================================================
  // DELETE ACCOUNT
  // =========================================================

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const confirmDeleteAccount = () => {
    setDeleteModal(false);

    showMessage(
      "error",
      "Account deletion requires backend confirmation."
    );
  };

  // =========================================================
  // INITIALS
  // =========================================================

  const initials =
    account.fullName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "VK";

  // =========================================================
  // TABS
  // =========================================================

  const tabs = [
    {
      id: "account",
      label: "Account",
      description: "Personal information",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Alerts and updates",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      description: "Password and protection",
      icon: Lock,
    },
    {
      id: "privacy",
      label: "Privacy",
      description: "Profile visibility",
      icon: Shield,
    },
  ];

  return (
    <div className="settings-page">

      {/* =====================================================
          TOAST
      ===================================================== */}

      {message.text && (
        <div
          className={`settings-toast ${
            message.type === "error"
              ? "error"
              : "success"
          }`}
          role="status"
          aria-live="polite"
        >
          {message.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}

          <span>{message.text}</span>
        </div>
      )}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="settings-header">

        <div className="settings-header-copy">
          <span className="settings-eyebrow">
            ACCOUNT MANAGEMENT
          </span>

          <h1>Settings</h1>

          <p>
            Manage your account, notifications, privacy,
            and security preferences from one place.
          </p>
        </div>

        <div className="settings-header-status">
          <span className="status-dot" />
          Account active
        </div>

      </header>

      {/* =====================================================
          LAYOUT
      ===================================================== */}

      <div className="settings-layout">

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside className="settings-sidebar">

          <div className="settings-profile-mini">

            <div className="settings-avatar">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                />
              ) : (
                initials
              )}
            </div>

            <div className="settings-profile-info">
              <h3>{account.fullName}</h3>
              <p>Candidate account</p>
            </div>

          </div>

          <nav
            className="settings-nav"
            aria-label="Settings navigation"
          >

            <p className="settings-nav-label">
              SETTINGS
            </p>

            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`settings-nav-item ${
                    activeTab === tab.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  aria-current={
                    activeTab === tab.id
                      ? "page"
                      : undefined
                  }
                >
                  <span className="settings-nav-icon">
                    <Icon size={17} />
                  </span>

                  <span className="settings-nav-copy">
                    <strong>{tab.label}</strong>
                    <small>{tab.description}</small>
                  </span>
                </button>
              );
            })}

          </nav>

          <div className="settings-sidebar-footer">
            <div className="settings-secure-mini">
              <Shield size={15} />
              <span>Your account is protected</span>
            </div>

            <span className="settings-version">
              AI Job Portal · v1.0
            </span>
          </div>

        </aside>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="settings-content">

          {/* =================================================
              ACCOUNT
          ================================================= */}

          {activeTab === "account" && (
            <section className="settings-section">

              <SectionTitle
                icon={<User size={21} />}
                title="Account Information"
                description="Update the personal information associated with your account."
              />

              <form
                className="settings-card"
                onSubmit={saveAccount}
              >

                {/* PROFILE PHOTO */}

                <div className="avatar-section">

                  <div className="large-avatar">

                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                      />
                    ) : (
                      initials
                    )}

                  </div>

                  <div className="avatar-info">

                    <div className="avatar-title-row">
                      <div>
                        <h3>Profile Photo</h3>

                        <p>
                          Add a professional photo so recruiters
                          can recognize you easily.
                        </p>
                      </div>

                      <span className="photo-status">
                        <Check size={13} />
                        Profile
                      </span>
                    </div>

                    <div className="photo-actions">

                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        hidden
                        onChange={handlePhotoChange}
                      />

                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={openPhotoPicker}
                      >
                        <Camera size={15} />

                        {profilePhoto
                          ? "Change Photo"
                          : "Upload Photo"}
                      </button>

                      {profilePhoto && (
                        <button
                          type="button"
                          className="danger-btn"
                          onClick={removePhoto}
                        >
                          <X size={15} />
                          Remove
                        </button>
                      )}

                    </div>

                    <span className="file-help">
                      JPG, PNG or WEBP · Maximum 5 MB
                    </span>

                  </div>

                </div>

                <div className="settings-divider" />

                {/* FORM */}

                <div className="form-grid">

                  <FormInput
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    icon={<User size={17} />}
                    type="text"
                    value={account.fullName}
                    onChange={handleAccountChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />

                  <FormInput
                    id="email"
                    name="email"
                    label="Email Address"
                    icon={<Mail size={17} />}
                    type="email"
                    value={account.email}
                    onChange={handleAccountChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />

                  <FormInput
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    icon={<Smartphone size={17} />}
                    type="tel"
                    value={account.phone}
                    onChange={handleAccountChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />

                  <FormInput
                    id="location"
                    name="location"
                    label="Location"
                    icon={<MapPin size={17} />}
                    type="text"
                    value={account.location}
                    onChange={handleAccountChange}
                    placeholder="Enter your location"
                    autoComplete="address-level2"
                  />

                </div>

                <FormActions>

                  <button
                    type="submit"
                    className="primary-btn"
                  >
                    <Save size={17} />
                    Save Changes
                  </button>

                </FormActions>

              </form>

            </section>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab === "notifications" && (
            <section className="settings-section">

              <SectionTitle
                icon={<Bell size={21} />}
                title="Notification Preferences"
                description="Choose which updates and alerts you want to receive."
              />

              <div className="settings-card">

                <ToggleRow
                  title="Job Alerts"
                  description="Receive alerts when new jobs match your profile."
                  enabled={notifications.jobAlerts}
                  onChange={() =>
                    toggleNotification("jobAlerts")
                  }
                />

                <ToggleRow
                  title="Application Updates"
                  description="Get notified when your application status changes."
                  enabled={
                    notifications.applicationUpdates
                  }
                  onChange={() =>
                    toggleNotification(
                      "applicationUpdates"
                    )
                  }
                />

                <ToggleRow
                  title="Recruiter Messages"
                  description="Receive notifications when recruiters contact you."
                  enabled={
                    notifications.recruiterMessages
                  }
                  onChange={() =>
                    toggleNotification(
                      "recruiterMessages"
                    )
                  }
                />

                <ToggleRow
                  title="Recommended Jobs"
                  description="Receive personalized job recommendations based on your profile."
                  enabled={
                    notifications.recommendedJobs
                  }
                  onChange={() =>
                    toggleNotification(
                      "recommendedJobs"
                    )
                  }
                />

                <ToggleRow
                  title="Marketing Emails"
                  description="Receive product news, career tips, and promotional emails."
                  enabled={notifications.marketing}
                  onChange={() =>
                    toggleNotification("marketing")
                  }
                />

                <FormActions>

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={saveNotifications}
                  >
                    <Save size={17} />
                    Save Preferences
                  </button>

                </FormActions>

              </div>

            </section>
          )}

          {/* =================================================
              SECURITY
          ================================================= */}

          {activeTab === "security" && (
            <section className="settings-section">

              <SectionTitle
                icon={<Lock size={21} />}
                title="Security"
                description="Manage your password and account security."
              />

              <form
                className="settings-card"
                onSubmit={changePassword}
                noValidate
              >

                <div className="security-status">

                  <div className="security-icon">
                    <Shield size={21} />
                  </div>

                  <div className="security-info">
                    <h3>Account Security</h3>

                    <p>
                      Keep your account protected with
                      a strong, unique password.
                    </p>
                  </div>

                  <span className="secure-badge">
                    <Check size={12} />
                    Secure
                  </span>

                </div>

                <div className="settings-divider" />

                <div className="security-form-heading">
                  <div>
                    <h3 className="sub-heading">
                      Change Password
                    </h3>

                    <p>
                      Update your password regularly to
                      keep your account secure.
                    </p>
                  </div>
                </div>

                <div className="password-form">

                  <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={
                      password.currentPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    visible={
                      showPassword.currentPassword
                    }
                    onToggle={() =>
                      togglePasswordVisibility(
                        "currentPassword"
                      )
                    }
                  />

                  <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={
                      password.newPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    visible={
                      showPassword.newPassword
                    }
                    onToggle={() =>
                      togglePasswordVisibility(
                        "newPassword"
                      )
                    }
                  />

                  <PasswordField
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={
                      password.confirmPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    visible={
                      showPassword.confirmPassword
                    }
                    onToggle={() =>
                      togglePasswordVisibility(
                        "confirmPassword"
                      )
                    }
                  />

                </div>

                <div className="password-tip">
                  <Info size={16} />

                  <span>
                    Use at least 8 characters. For
                    stronger security, combine uppercase
                    letters, numbers, and symbols.
                  </span>
                </div>

                <FormActions>

                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={passwordLoading}
                  >

                    {passwordLoading ? (
                      <>
                        <span className="button-spinner" />
                        Validating...
                      </>
                    ) : (
                      <>
                        <KeyRound size={17} />
                        Change Password
                      </>
                    )}

                  </button>

                </FormActions>

              </form>

              {/* DANGER ZONE */}

              <div className="danger-card">

                <div className="danger-icon">
                  <AlertTriangle size={20} />
                </div>

                <div className="danger-content">

                  <h3>Danger Zone</h3>

                  <p>
                    Permanently delete your account and
                    associated data. This action cannot
                    be undone.
                  </p>

                  <button
                    type="button"
                    className="danger-btn"
                    onClick={openDeleteModal}
                  >
                    <Trash2 size={16} />
                    Delete Account
                  </button>

                </div>

              </div>

            </section>
          )}

          {/* =================================================
              PRIVACY
          ================================================= */}

          {activeTab === "privacy" && (
            <section className="settings-section">

              <SectionTitle
                icon={<Shield size={21} />}
                title="Privacy"
                description="Control how recruiters can discover and interact with your profile."
              />

              <div className="settings-card">

                <ToggleRow
                  title="Public Profile"
                  description="Allow recruiters to discover your profile."
                  enabled={
                    privacy.profileVisibility
                  }
                  onChange={() =>
                    togglePrivacy(
                      "profileVisibility"
                    )
                  }
                />

                <ToggleRow
                  title="Recruiter Contact"
                  description="Allow verified recruiters to contact you about relevant opportunities."
                  enabled={
                    privacy.recruiterContact
                  }
                  onChange={() =>
                    togglePrivacy(
                      "recruiterContact"
                    )
                  }
                />

                <ToggleRow
                  title="Resume Visibility"
                  description="Allow recruiters to view your uploaded resume."
                  enabled={
                    privacy.showResume
                  }
                  onChange={() =>
                    togglePrivacy(
                      "showResume"
                    )
                  }
                />

                <FormActions>

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={savePrivacy}
                  >
                    <Save size={17} />
                    Save Privacy Settings
                  </button>

                </FormActions>

              </div>

            </section>
          )}

        </main>

      </div>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteModal && (
        <div
          className="settings-modal-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="settings-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="settings-modal-close"
              onClick={closeDeleteModal}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="settings-modal-icon">
              <AlertTriangle size={24} />
            </div>

            <span className="modal-eyebrow">
              ACCOUNT ACTION
            </span>

            <h2>
              Delete Account?
            </h2>

            <p>
              This action cannot be undone. Your
              profile, applications, saved jobs,
              and associated data may be permanently
              deleted.
            </p>

            <div className="delete-warning">
              <AlertTriangle size={16} />
              <span>
                Account deletion will require backend
                confirmation when the API is connected.
              </span>
            </div>

            <div className="settings-modal-actions">

              <button
                type="button"
                className="secondary-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="danger-btn"
                onClick={confirmDeleteAccount}
              >
                <Trash2 size={15} />
                Confirm Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

// =========================================================
// SECTION TITLE
// =========================================================

const SectionTitle = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="section-title">

      <div className="section-title-copy">
        <div className="section-title-icon">
          {icon}
        </div>

        <div>
          <h2>{title}</h2>

          <p>{description}</p>
        </div>
      </div>

    </div>
  );
};

// =========================================================
// FORM INPUT
// =========================================================

const FormInput = ({
  id,
  name,
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="form-group">

      <label htmlFor={id}>
        {label}
      </label>

      <div className="input-wrapper">

        <span className="field-icon">
          {icon}
        </span>

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

      </div>

    </div>
  );
};

// =========================================================
// PASSWORD FIELD
// =========================================================

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  visible,
  onToggle,
}) => {
  return (
    <div className="form-group">

      <label htmlFor={name}>
        {label}
      </label>

      <div className="password-wrapper">

        <Lock
          size={17}
          className="password-lock-icon"
        />

        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          autoComplete={
            name === "currentPassword"
              ? "current-password"
              : "new-password"
          }
        />

        <button
          type="button"
          className="password-eye"
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
};

// =========================================================
// TOGGLE ROW
// =========================================================

const ToggleRow = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="toggle-row">

      <div className="toggle-info">

        <div className="toggle-title-line">
          <h3>{title}</h3>

          <span
            className={`toggle-state ${
              enabled ? "on" : "off"
            }`}
          >
            {enabled ? "On" : "Off"}
          </span>
        </div>

        <p>{description}</p>

      </div>

      <button
        type="button"
        className={`toggle ${
          enabled ? "active" : ""
        }`}
        onClick={onChange}
        aria-pressed={enabled}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>

    </div>
  );
};

// =========================================================
// FORM ACTIONS
// =========================================================

const FormActions = ({ children }) => {
  return (
    <div className="form-actions">
      {children}
    </div>
  );
};

export default Settings;