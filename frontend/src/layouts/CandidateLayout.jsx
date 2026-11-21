import { NavLink, Outlet, Link } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  User,
  FileText,
  Heart,
  Send,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function CandidateLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      path: "/candidate/profile",
      icon: User,
    },
    {
      label: "My Resume",
      path: "/candidate/resume",
      icon: FileText,
    },
    {
      label: "Recommended Jobs",
      path: "/candidate/recommended-jobs",
      icon: Sparkles,
    },
    {
      label: "Applications",
      path: "/candidate/applications",
      icon: Send,
    },
    {
      label: "Saved Jobs",
      path: "/candidate/saved-jobs",
      icon: Heart,
    },
  ];

  return (
    <div className="candidate-layout">

      {/* MOBILE HEADER */}
      <div className="candidate-mobile-header">

        <Link to="/" className="dashboard-logo">
          <div className="dashboard-logo-icon">
            <Briefcase size={20} />
          </div>

          <span>AI Job Portal</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>

      </div>

      {/* SIDEBAR */}
      <aside
        className={`candidate-sidebar ${
          mobileMenu ? "mobile-open" : ""
        }`}
      >

        <div className="sidebar-brand">
          <Link to="/" className="dashboard-logo">
            <div className="dashboard-logo-icon">
              <Briefcase size={20} />
            </div>

            <span>AI Job Portal</span>
          </Link>
        </div>

        <div className="sidebar-profile">

          <div className="profile-avatar">
            VK
          </div>

          <div className="sidebar-profile-info">
            <strong>Vivek Kumar</strong>
            <span>Candidate</span>
          </div>

        </div>

        <nav className="candidate-nav">

          <p className="nav-section-title">
            WORKSPACE
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `candidate-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={() => setMobileMenu(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <p className="nav-section-title settings-title">
            ACCOUNT
          </p>

          <NavLink
            to="/candidate/settings"
            className={({ isActive }) =>
              `candidate-nav-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={() => setMobileMenu(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

        </nav>

        <div className="sidebar-bottom">

          <button className="logout-button">
            <LogOut size={17} />
            <span>Logout</span>
          </button>

          <div className="sidebar-version">
            AI Job Portal v1.0
          </div>

        </div>

      </aside>

      {/* OVERLAY */}
      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="candidate-main">

        <header className="candidate-topbar">

          <div>
            <p className="dashboard-eyebrow">
              Candidate Workspace
            </p>

            <h1>
              Welcome back, Vivek 👋
            </h1>
          </div>

          <div className="topbar-actions">

            <Link
              to="/jobs"
              className="browse-jobs-button"
            >
              <Briefcase size={17} />
              Browse Jobs
            </Link>

            <div className="topbar-avatar">
              VK
            </div>

          </div>

        </header>

        <section className="candidate-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default CandidateLayout;