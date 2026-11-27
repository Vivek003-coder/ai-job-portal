import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(formData);
      const requestedPath = location.state?.from?.pathname;
      const defaultPath = data.user.role === "RECRUITER"
        ? "/recruiter/dashboard"
        : "/candidate/dashboard";
      navigate(requestedPath || defaultPath, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      {/* Left Branding Section */}
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
              <Sparkles size={15} />
              AI-powered career matching
            </div>

            <h1>
              Find opportunities
              <span> built for you.</span>
            </h1>

            <p>
              Connect your skills with the right opportunities using
              intelligent job matching powered by AI.
            </p>

            <div className="auth-benefits">
              <div>
                <CheckCircle2 size={18} />
                <span>Personalized job recommendations</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Smart resume-to-job matching</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>One profile for your career journey</span>
              </div>
            </div>
          </div>

          <div className="auth-trust">
            <ShieldCheck size={17} />
            <span>Your career data is kept secure</span>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="mobile-auth-brand">
            <Link to="/" className="auth-brand">
              <div className="auth-brand-icon">
                <Briefcase size={20} />
              </div>
              <span>AI Job Portal</span>
            </Link>
          </div>

          <div className="auth-heading">
            <h2>Welcome back</h2>

            <p>
              Don't have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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

            {/* Remember */}
            <div className="remember-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>
              </label>
            </div>

            {/* Submit */}
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          {/* Google */}
          <button className="google-login" type="button">
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="auth-footer-text">
            By continuing, you agree to our{" "}
            <Link to="#">Terms of Service</Link> and{" "}
            <Link to="#">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;