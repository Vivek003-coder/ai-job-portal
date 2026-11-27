import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Users,
} from "lucide-react";

function Register() {
  const [role, setRole] = useState("CANDIDATE");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role,
      });
      navigate(
        role === "RECRUITER"
          ? "/recruiter/dashboard"
          : "/candidate/dashboard",
        { replace: true }
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page register-page">

      {/* LEFT SIDE */}
      <section className="auth-visual">
        <div className="auth-visual-content">

          <Link to="/" className="auth-brand">
            <div className="auth-brand-icon">
              <Briefcase size={22} />
            </div>

            <span>AI Job Portal</span>
          </Link>

          <div className="auth-hero">

            <div className="auth-badge">
              <Users size={15} />
              Join the future of hiring
            </div>

            <h1>
              Your next
              <span> opportunity starts here.</span>
            </h1>

            <p>
              Create your profile and let intelligent matching
              connect your skills with opportunities that fit you.
            </p>

            <div className="auth-benefits">

              <div>
                <CheckCircle2 size={18} />
                <span>AI-powered job recommendations</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Smart resume and skill matching</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Discover better career opportunities</span>
              </div>

            </div>

          </div>

          <div className="auth-trust">
            <CheckCircle2 size={17} />
            <span>Free to create your account</span>
          </div>

        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="auth-form-section">

        <div className="auth-form-wrapper">

          {/* Mobile logo */}
          <div className="mobile-auth-brand">
            <Link to="/" className="auth-brand">
              <div className="auth-brand-icon">
                <Briefcase size={20} />
              </div>

              <span>AI Job Portal</span>
            </Link>
          </div>

          <div className="auth-heading">

            <h2>Create your account</h2>

            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>

          </div>

          {/* ROLE SELECTION */}
          <div className="role-selection">

            <label>Account type</label>

            <div className="role-options">

              <button
                type="button"
                className={`role-card ${
                  role === "CANDIDATE" ? "active" : ""
                }`}
                onClick={() => setRole("CANDIDATE")}
              >
                <div className="role-icon">
                  <User size={19} />
                </div>

                <div>
                  <strong>Candidate</strong>
                  <span>Find your next job</span>
                </div>

                {role === "CANDIDATE" && (
                  <CheckCircle2
                    size={18}
                    className="role-check"
                  />
                )}
              </button>

              <button
                type="button"
                className={`role-card ${
                  role === "RECRUITER" ? "active" : ""
                }`}
                onClick={() => setRole("RECRUITER")}
              >
                <div className="role-icon">
                  <Briefcase size={19} />
                </div>

                <div>
                  <strong>Recruiter</strong>
                  <span>Find great candidates</span>
                </div>

                {role === "RECRUITER" && (
                  <CheckCircle2
                    size={18}
                    className="role-check"
                  />
                )}
              </button>

            </div>

          </div>

          {/* FORM */}
          <form className="auth-form register-form" onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="form-field">

              <label htmlFor="fullName">
                Full name
              </label>

              <div className="input-wrapper">

                <User size={18} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* EMAIL */}
            <div className="form-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="form-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-field">

              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* TERMS */}
            <label className="terms-checkbox">

              <input type="checkbox" required />

              <span>
                I agree to the{" "}
                <Link to="#">Terms of Service</Link>{" "}
                and{" "}
                <Link to="#">Privacy Policy</Link>.
              </span>

            </label>

            {/* SUBMIT */}
            {error && (
              <p role="alert" style={{ color: "#dc2626", margin: "0 0 12px" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          <p className="auth-footer-text">
            Your account type can be used to personalize
            your AI Job Portal experience.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;