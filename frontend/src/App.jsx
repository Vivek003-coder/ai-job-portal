import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/public/Home";
import Jobs from "./pages/public/Jobs";
import JobDetails from "./pages/public/JobDetails";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import About from "./pages/public/About";

// =====================================================
// CANDIDATE
// =====================================================

import CandidateLayout from "./layouts/CandidateLayout";

import Dashboard from "./pages/candidate/Dashboard";
import Profile from "./pages/candidate/Profile";
import Resume from "./pages/candidate/Resume";
import RecommendedJobs from "./pages/candidate/RecommendedJobs";
import Applications from "./pages/candidate/Applications";
import SavedJobs from "./pages/candidate/SavedJobs";
import CandidateSettings from "./pages/candidate/Settings";

// =====================================================
// RECRUITER
// =====================================================

import RecruiterLayout from "./layouts/RecruiterLayout";

import RecruiterDashboard from "./pages/recruiter/Dashboard";
import PostJob from "./pages/recruiter/PostJob";
import ManageJobs from "./pages/recruiter/ManageJobs";
import Applicants from "./pages/recruiter/Applicants";
import CandidateDetails from "./pages/recruiter/CandidateDetails";
import Company from "./pages/recruiter/Company";
import RecruiterSettings from "./pages/recruiter/Settings";

// =====================================================
// AUTHENTICATION
// =====================================================

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="app">

      {/* =================================================
          GLOBAL NAVBAR
      ================================================= */}

      <Navbar />

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        {/* =================================================
            CANDIDATE ROUTES
        ================================================= */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]} />
          }
        >
          <Route
            path="/candidate"
            element={<CandidateLayout />}
          >

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

            <Route
              path="resume"
              element={<Resume />}
            />

            <Route
              path="recommended-jobs"
              element={<RecommendedJobs />}
            />

            <Route
              path="applications"
              element={<Applications />}
            />

            <Route
              path="saved-jobs"
              element={<SavedJobs />}
            />

            <Route
              path="settings"
              element={<CandidateSettings />}
            />

          </Route>
        </Route>

        {/* =================================================
            RECRUITER ROUTES
        ================================================= */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]} />
          }
        >
          <Route
            path="/recruiter"
            element={<RecruiterLayout />}
          >

            <Route
              path="dashboard"
              element={<RecruiterDashboard />}
            />

            <Route
              path="post-job"
              element={<PostJob />}
            />

            <Route
              path="manage-jobs"
              element={<ManageJobs />}
            />

            <Route
              path="applicants"
              element={<Applicants />}
            />

            <Route
              path="candidate/:id"
              element={<CandidateDetails />}
            />

            <Route
              path="company"
              element={<Company />}
            />

            <Route
              path="settings"
              element={<RecruiterSettings />}
            />

          </Route>
        </Route>

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      {/* =================================================
          GLOBAL FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}

// =====================================================
// 404 PAGE
// =====================================================

function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "64px",
            lineHeight: 1,
            margin: "0 0 14px",
            color: "#0f172a",
          }}
        >
          404
        </h1>

        <h2
          style={{
            margin: "0 0 10px",
            color: "#1e293b",
          }}
        >
          Page not found
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
          }}
        >
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default App;