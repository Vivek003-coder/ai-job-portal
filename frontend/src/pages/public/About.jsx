import {
  ArrowRight,
  Award,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code2,
  Globe2,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  const stats = [
    {
      value: "10K+",
      label: "Career opportunities",
    },
    {
      value: "5K+",
      label: "Active candidates",
    },
    {
      value: "1K+",
      label: "Recruiters & companies",
    },
    {
      value: "95%",
      label: "AI matching accuracy",
    },
  ];

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Matching",
      description:
        "Our intelligent matching system connects candidate skills, experience and preferences with the requirements of relevant job opportunities.",
    },
    {
      icon: Search,
      title: "Smart Job Discovery",
      description:
        "Find opportunities that actually match your career profile instead of wasting time scrolling through thousands of unrelated listings.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Your professional profile, resume and application data are designed to remain protected throughout your career journey.",
    },
    {
      icon: LineChart,
      title: "Career Intelligence",
      description:
        "Turn your skills and experience into actionable insights that help you understand where you fit and where you can grow.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Build your profile",
      description:
        "Create a professional profile with your skills, experience, education and career preferences.",
    },
    {
      number: "02",
      title: "Upload your resume",
      description:
        "Add your resume so our platform can understand your experience and professional strengths.",
    },
    {
      number: "03",
      title: "AI finds the right fit",
      description:
        "Our intelligent matching layer compares your profile against relevant opportunities.",
    },
    {
      number: "04",
      title: "Apply with confidence",
      description:
        "Review your match insights and apply to opportunities that align with your career goals.",
    },
  ];

  const technologies = [
    {
      icon: Code2,
      title: "Modern Web",
      text: "React-based responsive experience",
    },
    {
      icon: Zap,
      title: "Fast & Scalable",
      text: "Optimized architecture for growth",
    },
    {
      icon: BrainCircuit,
      title: "Artificial Intelligence",
      text: "Intelligent profile-to-job matching",
    },
    {
      icon: Globe2,
      title: "Connected Ecosystem",
      text: "Candidates and recruiters in one platform",
    },
  ];

  return (
    <main className="about-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="about-hero">
        <div className="about-hero-grid"></div>

        <div className="about-hero-orb about-orb-one"></div>
        <div className="about-hero-orb about-orb-two"></div>

        <div className="about-container about-hero-container">
          <div className="about-hero-content">
            <div className="about-eyebrow">
              <span className="about-eyebrow-icon">
                <Sparkles size={15} />
              </span>

              <span>Intelligent hiring, reimagined</span>
            </div>

            <h1>
              Reimagining how
              <span> talent meets opportunity.</span>
            </h1>

            <p className="about-hero-description">
              AI Job Portal brings candidates and recruiters together through
              intelligent matching, modern technology and a better approach to
              discovering meaningful career opportunities.
            </p>

            <div className="about-hero-actions">
              <Link to="/jobs" className="about-primary-btn">
                Explore opportunities
                <ArrowRight size={18} />
              </Link>

              <Link to="/register" className="about-secondary-btn">
                Create your profile
              </Link>
            </div>

            <div className="about-hero-trust">
              <div className="about-trust-item">
                <CheckCircle2 size={17} />
                <span>AI-powered matching</span>
              </div>

              <div className="about-trust-item">
                <CheckCircle2 size={17} />
                <span>Built for candidates & recruiters</span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="about-hero-visual">
            <div className="about-dashboard-card">
              <div className="about-dashboard-top">
                <div>
                  <span className="about-mini-label">AI MATCHING</span>
                  <h3>Candidate Match</h3>
                </div>

                <div className="about-dashboard-status">
                  <span></span>
                  Live
                </div>
              </div>

              <div className="about-match-score">
                <div className="about-score-circle">
                  <div className="about-score-inner">
                    <strong>94%</strong>
                    <span>Match</span>
                  </div>
                </div>

                <div className="about-score-content">
                  <h4>Java Backend Developer</h4>

                  <p>
                    Your skills and experience strongly align with this
                    opportunity.
                  </p>

                  <div className="about-score-tags">
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>MySQL</span>
                  </div>
                </div>
              </div>

              <div className="about-dashboard-divider"></div>

              <div className="about-dashboard-footer">
                <div>
                  <span>Skills matched</span>
                  <strong>12 / 14</strong>
                </div>

                <div>
                  <span>Experience</span>
                  <strong>Strong</strong>
                </div>

                <div>
                  <span>Profile fit</span>
                  <strong>Excellent</strong>
                </div>
              </div>
            </div>

            <div className="about-floating-card about-floating-card-one">
              <div className="about-floating-icon">
                <Target size={18} />
              </div>

              <div>
                <strong>Smart matching</strong>
                <span>Find better-fit roles</span>
              </div>
            </div>

            <div className="about-floating-card about-floating-card-two">
              <div className="about-floating-icon">
                <Users size={18} />
              </div>

              <div>
                <strong>Built for people</strong>
                <span>Candidate-first experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-card">
            {stats.map((stat, index) => (
              <div className="about-stat-item" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>

                {index !== stats.length - 1 && (
                  <div className="about-stat-divider"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY
      ===================================================== */}
      <section className="about-story-section">
        <div className="about-container about-two-column">
          <div className="about-section-heading">
            <div className="about-section-kicker">
              <Briefcase size={16} />
              Our story
            </div>

            <h2>
              The job search should be
              <span> smarter.</span>
            </h2>

            <p>
              Traditional job platforms often leave candidates with thousands
              of listings and very little clarity about which opportunities
              actually fit their profile.
            </p>
          </div>

          <div className="about-story-content">
            <p>
              AI Job Portal was designed to change that experience. Instead of
              simply showing more jobs, the platform focuses on understanding
              the relationship between a candidate's skills, experience,
              preferences and the requirements of a role.
            </p>

            <p>
              For recruiters, the same intelligence helps reduce the noise
              around hiring by highlighting candidates whose profiles are more
              closely aligned with the position.
            </p>

            <p>
              The result is a hiring ecosystem where technology supports
              better decisions instead of making the process more complicated.
            </p>

            <div className="about-story-highlight">
              <div className="about-highlight-icon">
                <Award size={20} />
              </div>

              <div>
                <strong>Built around meaningful matches.</strong>
                <span>
                  Because the right opportunity is more valuable than simply
                  having more opportunities.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          AI MATCHING
      ===================================================== */}
      <section className="about-ai-section">
        <div className="about-container">
          <div className="about-ai-header">
            <div>
              <div className="about-section-kicker">
                <BrainCircuit size={16} />
                Intelligence layer
              </div>

              <h2>
                More than a job board.
                <span> An intelligent career platform.</span>
              </h2>
            </div>

            <p>
              Our platform combines structured profile data, job requirements
              and intelligent matching to make career discovery more relevant.
            </p>
          </div>

          <div className="about-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="about-feature-card" key={feature.title}>
                  <div className="about-feature-icon">
                    <Icon size={21} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <Link to="/jobs" className="about-feature-link">
                    Learn more
                    <ChevronRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION
      ===================================================== */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-card about-mission-primary">
              <div className="about-card-number">01</div>

              <div className="about-mission-icon">
                <Target size={24} />
              </div>

              <span className="about-card-kicker">Our mission</span>

              <h3>
                Make career discovery
                <span> more intelligent.</span>
              </h3>

              <p>
                We want every candidate to spend less time searching and more
                time pursuing opportunities that genuinely align with their
                potential.
              </p>
            </div>

            <div className="about-mission-card">
              <div className="about-card-number">02</div>

              <div className="about-mission-icon">
                <Globe2 size={24} />
              </div>

              <span className="about-card-kicker">Our vision</span>

              <h3>
                Build a better
                <span> hiring ecosystem.</span>
              </h3>

              <p>
                A future where candidates are discovered for what they can
                contribute and recruiters can identify relevant talent with
                greater speed and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="about-process-section">
        <div className="about-container">
          <div className="about-centered-heading">
            <div className="about-section-kicker">
              <Zap size={16} />
              How it works
            </div>

            <h2>
              From profile to
              <span> opportunity.</span>
            </h2>

            <p>
              A simple workflow designed to help candidates move from
              searching to applying with more confidence.
            </p>
          </div>

          <div className="about-process-grid">
            {process.map((item) => (
              <div className="about-process-item" key={item.number}>
                <div className="about-process-number">{item.number}</div>

                <div className="about-process-line"></div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CANDIDATE + RECRUITER
      ===================================================== */}
      <section className="about-audience-section">
        <div className="about-container">
          <div className="about-audience-header">
            <div>
              <div className="about-section-kicker">
                <Users size={16} />
                One platform, two journeys
              </div>

              <h2>
                Designed for
                <span> both sides of hiring.</span>
              </h2>
            </div>

            <p>
              Whether you're building your career or building your team, the
              platform is designed around your goals.
            </p>
          </div>

          <div className="about-audience-grid">
            {/* CANDIDATE */}
            <div className="about-audience-card candidate-card">
              <div className="about-audience-card-top">
                <div className="about-audience-icon">
                  <UserIcon />
                </div>

                <span>For candidates</span>
              </div>

              <h3>Turn your skills into opportunities.</h3>

              <p>
                Build your professional profile, showcase your experience,
                discover relevant jobs and understand how well your profile
                matches each opportunity.
              </p>

              <div className="about-check-list">
                <div>
                  <CheckCircle2 size={17} />
                  <span>Personalized job recommendations</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>AI-powered profile matching</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Application tracking</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Centralized career profile</span>
                </div>
              </div>

              <Link to="/register" className="about-audience-link">
                Build your profile
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* RECRUITER */}
            <div className="about-audience-card recruiter-card">
              <div className="about-audience-card-top">
                <div className="about-audience-icon">
                  <Briefcase size={20} />
                </div>

                <span>For recruiters</span>
              </div>

              <h3>Find relevant talent faster.</h3>

              <p>
                Create jobs, review applicants and use intelligent matching to
                identify candidates whose skills and experience align with
                your requirements.
              </p>

              <div className="about-check-list">
                <div>
                  <CheckCircle2 size={17} />
                  <span>AI-assisted candidate matching</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Centralized applicant management</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Structured candidate profiles</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Faster hiring decisions</span>
                </div>
              </div>

              <Link to="/register" className="about-audience-link">
                Start hiring
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}
      <section className="about-tech-section">
        <div className="about-container">
          <div className="about-centered-heading">
            <div className="about-section-kicker">
              <Code2 size={16} />
              Technology
            </div>

            <h2>
              Built with modern
              <span> technology.</span>
            </h2>

            <p>
              A scalable technical foundation designed to support a fast,
              intelligent and reliable hiring experience.
            </p>
          </div>

          <div className="about-tech-grid">
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <div className="about-tech-card" key={technology.title}>
                  <div className="about-tech-icon">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3>{technology.title}</h3>
                    <p>{technology.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="about-tech-stack">
            <span>React</span>
            <span>Spring Boot</span>
            <span>Java</span>
            <span>MySQL</span>
            <span>REST APIs</span>
            <span>AI Integration</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          AWARD / RECOGNITION SECTION
      ===================================================== */}
      <section className="about-recognition-section">
        <div className="about-container">
          <div className="about-recognition-card">
            <div className="about-recognition-glow"></div>

            <div className="about-recognition-content">
              <div className="about-recognition-icon">
                <Award size={27} />
              </div>

              <div>
                <span className="about-recognition-kicker">
                  Built to make an impact
                </span>

                <h2>
                  Technology that puts
                  <span> people first.</span>
                </h2>

                <p>
                  AI Job Portal is designed around a simple idea: technology
                  should make career decisions clearer, hiring faster and
                  opportunities more accessible.
                </p>
              </div>
            </div>

            <div className="about-recognition-badge">
              <span className="about-badge-star">✦</span>

              <div>
                <strong>Innovation focused</strong>
                <span>AI • Careers • Hiring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-card">
            <div className="about-cta-grid"></div>

            <div className="about-cta-content">
              <div className="about-section-kicker about-cta-kicker">
                <Sparkles size={16} />
                Your next chapter starts here
              </div>

              <h2>
                Ready to find your
                <span> next opportunity?</span>
              </h2>

              <p>
                Create your profile, discover relevant opportunities and let
                intelligent matching help move your career forward.
              </p>

              <div className="about-cta-actions">
                <Link to="/register" className="about-primary-btn">
                  Get started
                  <ArrowRight size={18} />
                </Link>

                <Link to="/jobs" className="about-cta-text-link">
                  Explore jobs
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Small internal icon component */
function UserIcon() {
  return <Users size={20} />;
}

export default About;