import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  Users,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import "./RecruiterLayout.css";
import { useAuth } from "../context/AuthContext";
import NotificationCenter from "../components/common/NotificationCenter";

const RecruiterLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    {
      label: "Overview",
      items: [
        {
          name: "Dashboard",
          path: "/recruiter/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      label: "Hiring",
      items: [
        {
          name: "Manage Jobs",
          path: "/recruiter/manage-jobs",
          icon: BriefcaseBusiness,
        },
        {
          name: "Post a Job",
          path: "/recruiter/post-job",
          icon: PlusCircle,
        },
        {
          name: "Applicants",
          path: "/recruiter/applicants",
          icon: Users,
        },
      ],
    },

    {
      label: "Company",
      items: [
        {
          name: "Company Profile",
          path: "/recruiter/company",
          icon: Building2,
        },
        {
          name: "Settings",
          path: "/recruiter/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="recruiter-shell">

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}
      {mobileOpen && (
        <div
          className="recruiter-mobile-overlay"
          onClick={closeMobileMenu}
        />
      )}

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside
        className={`recruiter-sidebar ${
          mobileOpen ? "recruiter-sidebar-open" : ""
        }`}
      >

        {/* =======================================
            BRAND
        ======================================= */}
        <div className="recruiter-brand">

          <div className="recruiter-brand-mark">
            <Sparkles
              size={20}
              strokeWidth={2.5}
            />
          </div>

          <div className="recruiter-brand-text">

            <span className="recruiter-brand-name">
              Hire<span>AI</span>
            </span>

            <span className="recruiter-brand-subtitle">
              Recruiter Console
            </span>

          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="recruiter-mobile-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>

        {/* =======================================
            NAVIGATION
        ======================================= */}
        <nav className="recruiter-navigation">

          {navigation.map((section) => (

            <div
              className="recruiter-nav-section"
              key={section.label}
            >

              <div className="recruiter-section-label">
                {section.label}
              </div>

              {section.items.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `recruiter-nav-link ${
                        isActive ? "active" : ""
                      }`
                    }
                  >

                    <Icon
                      size={18}
                      strokeWidth={1.9}
                    />

                    <span>
                      {item.name}
                    </span>

                  </NavLink>
                );
              })}

            </div>

          ))}

        </nav>

        {/* =======================================
            SIDEBAR BOTTOM PROFILE
        ======================================= */}
        <div className="recruiter-sidebar-bottom">

          <div className="recruiter-profile-mini">

            <div className="recruiter-avatar">
              {(user?.fullName || "Recruiter").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            <div className="recruiter-profile-info">

              <strong>
                {user?.fullName || "Recruiter"}
              </strong>

              <span>
                Recruiter
              </span>

            </div>

            <ChevronDown size={15} />

          </div>

          <button
            type="button"
            className="recruiter-logout"
            onClick={handleLogout}
          >

            <LogOut size={17} />

            <span>
              Sign out
            </span>

          </button>

        </div>

      </aside>

      {/* =========================================
          MAIN AREA
      ========================================= */}
      <div className="recruiter-main">

        {/* =======================================
            TOPBAR
        ======================================= */}
        <header className="recruiter-topbar">

          {/* Left */}
          <div className="recruiter-topbar-left">

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="recruiter-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>

            {/* Search */}
            <div className="recruiter-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search candidates, jobs..."
              />

              <span className="search-shortcut">
                ⌘ K
              </span>

            </div>

          </div>

          {/* Right */}
          <div className="recruiter-topbar-right">

            {/* Notification */}
            <NotificationCenter className="recruiter-icon-button" />

            {/* User */}
            <div className="recruiter-user-menu">

              <div className="recruiter-avatar small">
                AK
              </div>

              <div className="recruiter-user-details">

                <strong>
                  Alex Kumar
                </strong>

                <span>
                  Talent Acquisition
                </span>

              </div>

              <ChevronDown size={15} />

            </div>

          </div>

        </header>

        {/* =======================================
            PAGE CONTENT
        ======================================= */}
        <main className="recruiter-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default RecruiterLayout;