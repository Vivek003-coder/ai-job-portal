import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

/* =========================================================
   JOB DATA
========================================================= */

const jobs = [
  {
    id: 1,
    company: "TechNova",
    logo: "TN",
    title: "Java Backend Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹8–14 LPA",
    posted: "2 days ago",
    deadline: "30 Nov 2026",
    match: 94,

    description:
      "We are looking for a Java Backend Developer to build scalable APIs, backend services and reliable application infrastructure. You will work closely with frontend engineers, product teams and other backend developers to deliver secure, maintainable and production-ready software.",

    responsibilities: [
      "Design and develop scalable REST APIs using Java and Spring Boot.",
      "Build clean, maintainable and production-ready backend services.",
      "Work with MySQL and relational database systems.",
      "Implement authentication and authorization using secure backend practices.",
      "Write unit tests and participate in code reviews.",
      "Collaborate with frontend and product teams to deliver new features.",
      "Debug production issues and improve application performance.",
    ],

    requirements: [
      "Strong fundamentals in Java and object-oriented programming.",
      "Hands-on knowledge of Spring Boot and REST APIs.",
      "Understanding of SQL and relational databases.",
      "Familiarity with Git and modern software development workflows.",
      "Good understanding of exception handling and API design.",
      "Strong problem-solving and communication skills.",
    ],

    skills: [
      "Java",
      "Spring Boot",
      "REST API",
      "MySQL",
      "JPA",
      "Hibernate",
      "Git",
      "OOP",
      "Microservices",
    ],

    benefits: [
      "Competitive compensation",
      "Flexible work environment",
      "Learning and development opportunities",
      "Collaborative engineering culture",
      "Health and wellness benefits",
    ],

    companyDescription:
      "TechNova is a technology company focused on building scalable software products, cloud solutions and modern digital platforms for growing businesses.",

    aiMatch: {
      score: 94,
      summary:
        "Excellent fit for this backend role based on your Java, Spring Boot, database and REST API experience.",
      skillsMatch: 96,
      experienceMatch: 90,
      roleMatch: 95,
      matchedSkills: [
        "Java",
        "Spring Boot",
        "MySQL",
        "REST API",
        "Git",
      ],
      missingSkills: ["Docker", "Advanced Microservices"],
    },
  },

  {
    id: 2,
    company: "CloudCore",
    logo: "CC",
    title: "Full Stack Developer",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "2–4 Years",
    salary: "₹10–18 LPA",
    posted: "1 day ago",
    deadline: "05 Dec 2026",
    match: 91,

    description:
      "Join our product engineering team to build modern full-stack applications used by thousands of users. You will work across frontend and backend systems while collaborating with designers, product managers and engineers.",

    responsibilities: [
      "Develop responsive React applications.",
      "Build scalable Node.js backend services.",
      "Design and integrate REST APIs.",
      "Work with MongoDB and cloud-based services.",
      "Create reusable frontend components.",
      "Optimize application performance and reliability.",
      "Collaborate with product and design teams.",
    ],

    requirements: [
      "Strong React and JavaScript knowledge.",
      "Experience with Node.js and REST APIs.",
      "Understanding of MongoDB and database design.",
      "Knowledge of Git and software development practices.",
      "Good understanding of responsive web development.",
      "Ability to work across frontend and backend technologies.",
    ],

    skills: [
      "React",
      "Node.js",
      "JavaScript",
      "MongoDB",
      "REST API",
      "Express.js",
      "HTML",
      "CSS",
      "Git",
    ],

    benefits: [
      "Flexible working",
      "Learning budget",
      "Performance incentives",
      "Collaborative culture",
      "Remote-work flexibility",
    ],

    companyDescription:
      "CloudCore builds cloud-first software solutions and full-stack digital products for modern businesses.",

    aiMatch: {
      score: 91,
      summary:
        "Strong match for a full-stack position based on your React, JavaScript, API and database skills.",
      skillsMatch: 93,
      experienceMatch: 88,
      roleMatch: 92,
      matchedSkills: [
        "React",
        "JavaScript",
        "REST API",
        "MongoDB",
        "Git",
      ],
      missingSkills: ["AWS", "Advanced Node.js"],
    },
  },

  {
    id: 3,
    company: "DataForge",
    logo: "DF",
    title: "Software Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹7–12 LPA",
    posted: "3 days ago",
    deadline: "08 Dec 2026",
    match: 88,

    description:
      "Work with our engineering team to build reliable software systems and solve challenging technical problems. This role is suitable for developers who have strong programming fundamentals and enjoy solving algorithmic and system-level problems.",

    responsibilities: [
      "Develop and maintain software applications.",
      "Write clean, efficient and maintainable code.",
      "Participate in technical discussions and design reviews.",
      "Build database-driven applications.",
      "Write automated unit and integration tests.",
      "Debug application issues.",
      "Collaborate with senior engineers to deliver product features.",
    ],

    requirements: [
      "Strong programming fundamentals.",
      "Good understanding of Data Structures and Algorithms.",
      "Knowledge of SQL and relational databases.",
      "Understanding of object-oriented programming.",
      "Strong analytical and problem-solving skills.",
      "Good communication and teamwork abilities.",
    ],

    skills: [
      "Java",
      "DSA",
      "SQL",
      "OOP",
      "Git",
      "Problem Solving",
      "Algorithms",
      "Database",
    ],

    benefits: [
      "Technical mentorship",
      "Structured learning programs",
      "Career growth opportunities",
      "Flexible work environment",
      "Performance recognition",
    ],

    companyDescription:
      "DataForge develops data-driven technology products, engineering platforms and scalable software systems for modern enterprises.",

    aiMatch: {
      score: 88,
      summary:
        "Good fit based on your programming fundamentals, Java knowledge, SQL and problem-solving capabilities.",
      skillsMatch: 89,
      experienceMatch: 94,
      roleMatch: 86,
      matchedSkills: [
        "Java",
        "SQL",
        "OOP",
        "DSA",
        "Git",
      ],
      missingSkills: ["System Design", "Unit Testing"],
    },
  },

  {
    id: 4,
    company: "DevSphere",
    logo: "DS",
    title: "React Frontend Developer",
    location: "Remote, India",
    type: "Remote",
    experience: "1–3 Years",
    salary: "₹7–13 LPA",
    posted: "5 hours ago",
    deadline: "12 Dec 2026",
    match: 87,

    description:
      "Create fast, accessible and responsive interfaces for a growing technology platform. You will work closely with designers and backend engineers to build polished user experiences.",

    responsibilities: [
      "Build reusable React components.",
      "Develop responsive web interfaces.",
      "Integrate frontend applications with REST APIs.",
      "Optimize application performance.",
      "Implement reusable UI patterns.",
      "Collaborate with backend developers and designers.",
      "Ensure cross-browser compatibility.",
    ],

    requirements: [
      "Strong React knowledge.",
      "Good JavaScript fundamentals.",
      "Experience with responsive design.",
      "Understanding of REST APIs.",
      "Knowledge of modern frontend development.",
      "Good understanding of HTML and CSS.",
    ],

    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "REST API",
      "Git",
      "Responsive Design",
    ],

    benefits: [
      "Remote-first culture",
      "Flexible working hours",
      "Learning opportunities",
      "Performance bonuses",
      "Developer-focused environment",
    ],

    companyDescription:
      "DevSphere creates modern software products and developer-focused digital experiences for startups and technology companies.",

    aiMatch: {
      score: 87,
      summary:
        "Strong frontend alignment based on your React, JavaScript, HTML, CSS and API integration experience.",
      skillsMatch: 91,
      experienceMatch: 84,
      roleMatch: 88,
      matchedSkills: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "REST API",
      ],
      missingSkills: ["Testing", "Advanced React Architecture"],
    },
  },

  {
    id: 5,
    company: "ByteWorks",
    logo: "BW",
    title: "Spring Boot Developer",
    location: "Noida, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹8–15 LPA",
    posted: "4 days ago",
    deadline: "15 Dec 2026",
    match: 92,

    description:
      "We are hiring a Spring Boot Developer to design and develop enterprise-grade backend services. The role involves building RESTful APIs, integrating databases and implementing secure application services.",

    responsibilities: [
      "Develop REST APIs using Spring Boot.",
      "Implement business logic using Java.",
      "Design database schemas and optimize SQL queries.",
      "Integrate third-party APIs and services.",
      "Implement authentication and authorization.",
      "Write unit and integration tests.",
      "Monitor and troubleshoot backend services.",
    ],

    requirements: [
      "Good knowledge of Java and Spring Boot.",
      "Understanding of Spring MVC and Spring Data JPA.",
      "Knowledge of MySQL or PostgreSQL.",
      "Understanding of RESTful architecture.",
      "Familiarity with Maven and Git.",
      "Knowledge of basic security concepts.",
    ],

    skills: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "MySQL",
      "PostgreSQL",
      "Maven",
      "REST API",
      "Git",
    ],

    benefits: [
      "Technical training",
      "Health insurance",
      "Flexible working environment",
      "Career advancement",
      "Performance-based incentives",
    ],

    companyDescription:
      "ByteWorks develops enterprise software platforms and backend solutions for businesses across finance, retail and technology.",

    aiMatch: {
      score: 92,
      summary:
        "Excellent backend match because of your Java, Spring Boot, Maven, SQL and REST API background.",
      skillsMatch: 95,
      experienceMatch: 89,
      roleMatch: 94,
      matchedSkills: [
        "Java",
        "Spring Boot",
        "MySQL",
        "REST API",
        "Maven",
      ],
      missingSkills: ["Docker", "Cloud Deployment"],
    },
  },

  {
    id: 6,
    company: "InsightLabs",
    logo: "IL",
    title: "Data Analyst",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹6–11 LPA",
    posted: "2 days ago",
    deadline: "18 Dec 2026",
    match: 84,

    description:
      "Join our analytics team to transform business data into meaningful insights. You will work with structured datasets, dashboards and analytical models to support data-driven decision making.",

    responsibilities: [
      "Collect and clean data from multiple sources.",
      "Analyze datasets to identify trends and patterns.",
      "Create dashboards and analytical reports.",
      "Write SQL queries for business analysis.",
      "Work with stakeholders to understand reporting requirements.",
      "Present analytical findings to business teams.",
      "Maintain data quality and reporting accuracy.",
    ],

    requirements: [
      "Strong understanding of SQL.",
      "Good knowledge of Excel and data analysis.",
      "Understanding of statistics and data visualization.",
      "Basic knowledge of Python is preferred.",
      "Strong analytical and communication skills.",
      "Ability to work with large datasets.",
    ],

    skills: [
      "SQL",
      "Python",
      "Excel",
      "Power BI",
      "Data Visualization",
      "Statistics",
      "Pandas",
      "Analytics",
    ],

    benefits: [
      "Learning and development programs",
      "Mentorship",
      "Flexible working",
      "Career growth",
      "Performance incentives",
    ],

    companyDescription:
      "InsightLabs helps businesses convert complex data into actionable insights through analytics, reporting and intelligent decision-support solutions.",

    aiMatch: {
      score: 84,
      summary:
        "Moderate-to-strong match based on your SQL and analytical fundamentals, with room to strengthen BI and statistics skills.",
      skillsMatch: 82,
      experienceMatch: 90,
      roleMatch: 83,
      matchedSkills: [
        "SQL",
        "Analytics",
        "Database",
        "Problem Solving",
      ],
      missingSkills: [
        "Power BI",
        "Python",
        "Statistics",
      ],
    },
  },

  {
    id: 7,
    company: "NeuralGrid",
    logo: "NG",
    title: "AI/ML Engineer",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹10–20 LPA",
    posted: "1 day ago",
    deadline: "20 Dec 2026",
    match: 89,

    description:
      "Build intelligent machine learning systems that solve real-world business problems. You will work with data scientists and software engineers to develop, evaluate and deploy AI-powered applications.",

    responsibilities: [
      "Develop and evaluate machine learning models.",
      "Prepare and preprocess datasets.",
      "Build machine learning pipelines.",
      "Experiment with NLP and recommendation models.",
      "Integrate AI models into production applications.",
      "Monitor model performance.",
      "Collaborate with software and data engineering teams.",
    ],

    requirements: [
      "Strong Python programming skills.",
      "Understanding of machine learning fundamentals.",
      "Knowledge of supervised and unsupervised learning.",
      "Understanding of data preprocessing and model evaluation.",
      "Basic knowledge of NLP or deep learning.",
      "Strong mathematical and analytical skills.",
    ],

    skills: [
      "Python",
      "Machine Learning",
      "NLP",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Deep Learning",
      "SQL",
    ],

    benefits: [
      "AI research opportunities",
      "Learning budget",
      "Conference support",
      "Flexible work",
      "Technical mentorship",
    ],

    companyDescription:
      "NeuralGrid builds AI-powered products and intelligent automation solutions using machine learning, NLP and modern data technologies.",

    aiMatch: {
      score: 89,
      summary:
        "Good AI-oriented match with strong potential, especially for candidates combining software development with machine learning fundamentals.",
      skillsMatch: 86,
      experienceMatch: 88,
      roleMatch: 91,
      matchedSkills: [
        "Machine Learning",
        "NLP",
        "Python",
        "SQL",
      ],
      missingSkills: [
        "TensorFlow",
        "Deep Learning",
        "Model Deployment",
      ],
    },
  },

  {
    id: 8,
    company: "CloudAxis",
    logo: "CA",
    title: "DevOps Engineer",
    location: "Gurugram, India",
    type: "Full-time",
    experience: "2–4 Years",
    salary: "₹9–17 LPA",
    posted: "3 days ago",
    deadline: "22 Dec 2026",
    match: 82,

    description:
      "We are looking for a DevOps Engineer to improve deployment automation, infrastructure reliability and application delivery pipelines. You will work closely with developers and cloud teams.",

    responsibilities: [
      "Build and maintain CI/CD pipelines.",
      "Automate application deployment workflows.",
      "Manage cloud infrastructure.",
      "Monitor application and infrastructure performance.",
      "Implement containerized deployments.",
      "Improve system reliability and security.",
      "Collaborate with development teams on release management.",
    ],

    requirements: [
      "Understanding of Linux systems.",
      "Experience with CI/CD concepts.",
      "Knowledge of Docker and containerization.",
      "Understanding of cloud platforms.",
      "Knowledge of Git and deployment workflows.",
      "Basic scripting knowledge.",
    ],

    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Linux",
      "Jenkins",
      "Git",
      "CI/CD",
      "Terraform",
      "Shell Scripting",
    ],

    benefits: [
      "Cloud certification support",
      "Technical training",
      "Flexible working",
      "Health benefits",
      "Career development",
    ],

    companyDescription:
      "CloudAxis provides cloud infrastructure, DevOps automation and scalable platform engineering solutions for technology companies.",

    aiMatch: {
      score: 82,
      summary:
        "A reasonable match with transferable software development skills, while cloud and infrastructure experience would strengthen the profile.",
      skillsMatch: 78,
      experienceMatch: 86,
      roleMatch: 81,
      matchedSkills: [
        "Git",
        "REST API",
        "Software Development",
      ],
      missingSkills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
      ],
    },
  },

  {
    id: 9,
    company: "AppVertex",
    logo: "AV",
    title: "Android Developer",
    location: "Chennai, India",
    type: "Full-time",
    experience: "1–3 Years",
    salary: "₹7–14 LPA",
    posted: "6 hours ago",
    deadline: "25 Dec 2026",
    match: 85,

    description:
      "Join our mobile engineering team to build high-quality Android applications used by a growing customer base. You will contribute to feature development, performance optimization and application reliability.",

    responsibilities: [
      "Develop and maintain Android applications.",
      "Build reusable UI components.",
      "Integrate REST APIs into mobile applications.",
      "Implement authentication and secure data handling.",
      "Optimize application performance.",
      "Debug production issues.",
      "Collaborate with product and backend teams.",
    ],

    requirements: [
      "Strong knowledge of Android development.",
      "Experience with Kotlin or Java.",
      "Understanding of REST APIs.",
      "Knowledge of Android lifecycle and architecture.",
      "Understanding of Git and version control.",
      "Good debugging and problem-solving skills.",
    ],

    skills: [
      "Kotlin",
      "Java",
      "Android",
      "REST API",
      "Firebase",
      "SQLite",
      "Git",
      "Material Design",
    ],

    benefits: [
      "Flexible working hours",
      "Learning opportunities",
      "Mobile development training",
      "Performance incentives",
      "Collaborative environment",
    ],

    companyDescription:
      "AppVertex develops consumer-focused mobile applications and digital products designed to simplify everyday experiences.",

    aiMatch: {
      score: 85,
      summary:
        "Good technical foundation match because of your Java and API knowledge, although dedicated Android experience would improve the fit.",
      skillsMatch: 81,
      experienceMatch: 89,
      roleMatch: 84,
      matchedSkills: [
        "Java",
        "REST API",
        "Git",
      ],
      missingSkills: [
        "Android",
        "Kotlin",
        "Firebase",
      ],
    },
  },

  {
    id: 10,
    company: "CodeMatrix",
    logo: "CM",
    title: "Software Development Engineer",
    location: "Delhi NCR, India",
    type: "Full-time",
    experience: "0–2 Years",
    salary: "₹8–15 LPA",
    posted: "8 hours ago",
    deadline: "28 Dec 2026",
    match: 90,

    description:
      "We are looking for Software Development Engineers who enjoy solving complex technical problems and building scalable software. This role provides opportunities to work across application development, databases and distributed systems.",

    responsibilities: [
      "Design and develop scalable software applications.",
      "Write efficient and maintainable code.",
      "Solve algorithmic and engineering problems.",
      "Design and optimize database queries.",
      "Participate in code reviews and technical discussions.",
      "Write automated tests.",
      "Collaborate with cross-functional engineering teams.",
    ],

    requirements: [
      "Strong programming fundamentals.",
      "Good knowledge of Data Structures and Algorithms.",
      "Strong understanding of OOP.",
      "Knowledge of SQL and database systems.",
      "Understanding of REST APIs.",
      "Strong analytical and problem-solving abilities.",
    ],

    skills: [
      "Java",
      "Python",
      "DSA",
      "OOP",
      "SQL",
      "REST API",
      "Git",
      "Algorithms",
      "Problem Solving",
    ],

    benefits: [
      "Competitive salary",
      "Mentorship from senior engineers",
      "Learning and development budget",
      "Flexible working environment",
      "Career growth opportunities",
    ],

    companyDescription:
      "CodeMatrix builds scalable software products and engineering platforms for businesses operating across multiple technology domains.",

    aiMatch: {
      score: 90,
      summary:
        "Excellent early-career software engineering match based on Java, DSA, OOP, SQL and problem-solving experience.",
      skillsMatch: 93,
      experienceMatch: 95,
      roleMatch: 91,
      matchedSkills: [
        "Java",
        "DSA",
        "OOP",
        "SQL",
        "REST API",
        "Git",
      ],
      missingSkills: [
        "System Design",
        "Distributed Systems",
      ],
    },
  },
];

/* =========================================================
   HELPER — SIMILAR JOBS
========================================================= */

const getSimilarJobs = (currentJob) => {
  return jobs
    .filter((job) => job.id !== currentJob.id)
    .sort((a, b) => {
      const aDistance = Math.abs(a.match - currentJob.match);
      const bDistance = Math.abs(b.match - currentJob.match);

      return aDistance - bDistance;
    })
    .slice(0, 3);
};

/* =========================================================
   COMPONENT
========================================================= */

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  const job = jobs.find(
    (item) => String(item.id) === String(id)
  );

  /* =======================================================
     JOB NOT FOUND
  ======================================================= */

  if (!job) {
    return (
      <div className="job-not-found">
        <div className="job-not-found-icon">
          <BriefcaseBusiness size={28} />
        </div>

        <h2>Job not found</h2>

        <p>
          The job you are looking for may have been removed
          or is no longer available.
        </p>

        <Link
          to="/jobs"
          className="back-to-jobs"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
      </div>
    );
  }

  /* =======================================================
     APPLICATION DATA
  ======================================================= */

  const application = {
    status: applied
      ? "Application Submitted"
      : "Not Applied Yet",

    statusDescription: applied
      ? "Your application has been successfully submitted for recruiter review."
      : "Complete your application to be considered for this role.",

    deadline: job.deadline,

    resumeRequired: true,

    profileCompletion: 92,

    progress: applied ? 100 : 50,

    steps: [
      {
        title: "Profile completed",
        completed: true,
      },
      {
        title: "Resume uploaded",
        completed: true,
      },
      {
        title: "Application submitted",
        completed: applied,
      },
      {
        title: "Recruiter review",
        completed: false,
      },
    ],
  };

  /* =======================================================
     APPLY
  ======================================================= */

  const handleApply = () => {
    setApplied(true);

    /*
      Later connect this with Spring Boot:

      await applicationService.apply({
        jobId: job.id
      });

      navigate("/candidate/applications");
    */
  };

  /* =======================================================
     SAVE JOB
  ======================================================= */

  const handleSave = () => {
    setSaved((previous) => !previous);

    /*
      Later:

      await jobService.saveJob(job.id);
    */
  };

  /* =======================================================
     SIMILAR JOBS
  ======================================================= */

  const similarJobs = getSimilarJobs(job);

  return (
    <div className="job-details-page">

      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <section className="job-details-header">

        <div className="job-details-container">

          {/* BACK */}
          <Link
            to="/jobs"
            className="back-link"
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Link>


          {/* =================================================
              JOB HERO
          ================================================= */}

          <div className="job-header-card">

            {/* COMPANY LOGO */}

            <div className="company-large-logo">
              {job.logo}
            </div>


            {/* JOB INFORMATION */}

            <div className="job-header-info">

              <div className="job-company">

                <span>
                  {job.company}
                </span>

                <span className="verified-company">
                  <CheckCircle2 size={13} />
                  Verified
                </span>

              </div>


              <h1>
                {job.title}
              </h1>


              <div className="job-meta">

                <span>
                  <MapPin size={15} />
                  {job.location}
                </span>

                <span>
                  <BriefcaseBusiness size={15} />
                  {job.type}
                </span>

                <span>
                  <Users size={15} />
                  {job.experience}
                </span>

                <span>
                  <WalletCards size={15} />
                  {job.salary}
                </span>

                <span>
                  <Clock3 size={15} />
                  {job.posted}
                </span>

              </div>

            </div>


            {/* HEADER ACTIONS */}

            <div className="job-header-actions">

              <button
                type="button"
                className={`save-job-btn ${
                  saved ? "saved" : ""
                }`}
                onClick={handleSave}
                aria-label={
                  saved
                    ? "Remove saved job"
                    : "Save job"
                }
              >

                <Heart
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                />

                {saved ? "Saved" : "Save"}

              </button>


              <button
                type="button"
                className="apply-btn"
                onClick={handleApply}
              >

                {applied ? (
                  <>
                    <Check size={17} />
                    Applied
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Apply Now
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="job-details-container">

        <div className="job-details-main">

          <div className="job-content-layout">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="job-description">


              {/* =================================================
                  ABOUT
              ================================================= */}

              <section className="details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      THE ROLE
                    </span>

                    <h2>
                      About this position
                    </h2>

                  </div>

                </div>


                <p className="job-long-description">
                  {job.description}
                </p>

              </section>


              {/* =================================================
                  RESPONSIBILITIES
              ================================================= */}

              <section className="details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <Target size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      WHAT YOU'LL DO
                    </span>

                    <h2>
                      Responsibilities
                    </h2>

                  </div>

                </div>


                <ul className="details-list">

                  {job.responsibilities.map(
                    (item, index) => (
                      <li key={index}>

                        <span className="list-check">
                          <Check size={14} />
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>
                    )
                  )}

                </ul>

              </section>


              {/* =================================================
                  REQUIREMENTS
              ================================================= */}

              <section className="details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <ShieldCheck size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      WHAT WE'RE LOOKING FOR
                    </span>

                    <h2>
                      Requirements
                    </h2>

                  </div>

                </div>


                <ul className="details-list">

                  {job.requirements.map(
                    (item, index) => (
                      <li key={index}>

                        <span className="list-check">
                          <Check size={14} />
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>
                    )
                  )}

                </ul>

              </section>


              {/* =================================================
                  SKILLS
              ================================================= */}

              <section className="details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <Zap size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      TECHNICAL SKILLS
                    </span>

                    <h2>
                      Skills required
                    </h2>

                  </div>

                </div>


                <div className="details-skills">

                  {job.skills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="skill-tag"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </section>


              {/* =================================================
                  BENEFITS
              ================================================= */}

              <section className="details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <WalletCards size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      PERKS & BENEFITS
                    </span>

                    <h2>
                      What we offer
                    </h2>

                  </div>

                </div>


                <div className="benefits-grid">

                  {job.benefits.map(
                    (benefit, index) => (
                      <div
                        className="benefit-item"
                        key={index}
                      >

                        <span className="benefit-icon">
                          <Check size={14} />
                        </span>

                        <span>
                          {benefit}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </section>


              {/* =================================================
                  APPLICATION INFORMATION
              ================================================= */}

              <section className="details-section application-details-section">

                <div className="section-heading-with-icon">

                  <div className="details-heading-icon">
                    <FileText size={18} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      APPLICATION INFORMATION
                    </span>

                    <h2>
                      Before you apply
                    </h2>

                  </div>

                </div>


                <div className="application-info-grid">

                  <div className="application-info-item">

                    <div className="application-info-icon">
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <span>
                        Application deadline
                      </span>

                      <strong>
                        {job.deadline}
                      </strong>
                    </div>

                  </div>


                  <div className="application-info-item">

                    <div className="application-info-icon">
                      <FileText size={17} />
                    </div>

                    <div>
                      <span>
                        Resume
                      </span>

                      <strong>
                        Required
                      </strong>
                    </div>

                  </div>


                  <div className="application-info-item">

                    <div className="application-info-icon">
                      <UserCheck size={17} />
                    </div>

                    <div>
                      <span>
                        Profile completion
                      </span>

                      <strong>
                        {application.profileCompletion}%
                      </strong>
                    </div>

                  </div>


                  <div className="application-info-item">

                    <div className="application-info-icon">
                      <Users size={17} />
                    </div>

                    <div>
                      <span>
                        Application status
                      </span>

                      <strong>
                        {application.status}
                      </strong>
                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  AI MATCH DETAILS
              ================================================= */}

              <section className="details-section ai-match-card">

                <div className="ai-card-header">

                  <div className="ai-card-icon">
                    <Sparkles size={19} />
                  </div>

                  <div>

                    <span className="details-kicker">
                      AI-POWERED MATCH
                    </span>

                    <h2>
                      Why this job matches you
                    </h2>

                  </div>

                </div>


                <div className="ai-match-content">

                  <div className="ai-score-block">

                    <div className="match-score-large">

                      <div className="match-circle">
                        <span>
                          {job.aiMatch.score}%
                        </span>

                        <small>
                          Match
                        </small>
                      </div>

                    </div>

                  </div>


                  <div className="match-summary">

                    <h3>
                      {job.aiMatch.summary}
                    </h3>

                    <p>
                      Our matching engine compares your profile,
                      skills and experience against the requirements
                      of this job.
                    </p>


                    <div className="match-progress">

                      <div className="match-progress-row">

                        <span>
                          Skills match
                        </span>

                        <strong>
                          {job.aiMatch.skillsMatch}%
                        </strong>

                      </div>

                      <div className="match-progress-bar">
                        <div
                          style={{
                            width: `${job.aiMatch.skillsMatch}%`,
                          }}
                        />
                      </div>


                      <div className="match-progress-row">

                        <span>
                          Experience match
                        </span>

                        <strong>
                          {job.aiMatch.experienceMatch}%
                        </strong>

                      </div>

                      <div className="match-progress-bar">
                        <div
                          style={{
                            width: `${job.aiMatch.experienceMatch}%`,
                          }}
                        />
                      </div>


                      <div className="match-progress-row">

                        <span>
                          Role match
                        </span>

                        <strong>
                          {job.aiMatch.roleMatch}%
                        </strong>

                      </div>

                      <div className="match-progress-bar">
                        <div
                          style={{
                            width: `${job.aiMatch.roleMatch}%`,
                          }}
                        />
                      </div>

                    </div>

                  </div>

                </div>


                <div className="skill-match-area">

                  <div className="skill-match-column">

                    <h4>
                      Matched skills
                    </h4>

                    <div className="details-skills">

                      {job.aiMatch.matchedSkills.map(
                        (skill, index) => (
                          <span
                            className="skill-tag matched"
                            key={index}
                          >
                            <Check size={12} />
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>


                  <div className="skill-match-column">

                    <h4>
                      Skills to strengthen
                    </h4>

                    <div className="details-skills">

                      {job.aiMatch.missingSkills.map(
                        (skill, index) => (
                          <span
                            className="skill-tag missing"
                            key={index}
                          >
                            <X size={12} />
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  SIMILAR JOBS
              ================================================= */}

              <section className="details-section similar-jobs-section">

                <div className="similar-jobs-heading">

                  <div>

                    <span className="details-kicker">
                      YOU MAY ALSO LIKE
                    </span>

                    <h2>
                      Similar jobs
                    </h2>

                  </div>

                  <Link
                    to="/jobs"
                    className="view-all-jobs"
                  >
                    View all jobs
                    <ArrowRight size={15} />
                  </Link>

                </div>


                <div className="similar-jobs-grid">

                  {similarJobs.map(
                    (similarJob) => (
                      <Link
                        to={`/jobs/${similarJob.id}`}
                        className="similar-job-card"
                        key={similarJob.id}
                      >

                        <div className="similar-job-top">

                          <div className="similar-job-logo">
                            {similarJob.logo}
                          </div>

                          <span className="similar-match">
                            {similarJob.match}% match
                          </span>

                        </div>


                        <h3>
                          {similarJob.title}
                        </h3>


                        <p className="similar-company">
                          {similarJob.company}
                        </p>


                        <div className="similar-job-meta">

                          <span>
                            <MapPin size={13} />
                            {similarJob.location}
                          </span>

                          <span>
                            <WalletCards size={13} />
                            {similarJob.salary}
                          </span>

                        </div>


                        <div className="similar-job-bottom">

                          <span>
                            {similarJob.type}
                          </span>

                          <ArrowRight size={15} />

                        </div>

                      </Link>
                    )
                  )}

                </div>

              </section>

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="job-sidebar">


              {/* =================================================
                  APPLICATION CARD
              ================================================= */}

              <div className="apply-card">

                <div className="application-card-top">

                  <div>

                    <span className="application-kicker">
                      APPLICATION
                    </span>

                    <h3>
                      {applied
                        ? "Application submitted"
                        : "Ready to apply?"}
                    </h3>

                  </div>


                  <div className="ai-card-icon">
                    <Send size={18} />
                  </div>

                </div>


                {/* STATUS */}

                <div
                  className={`application-status-banner ${
                    applied ? "submitted" : ""
                  }`}
                >

                  <div className="application-status-icon">

                    {applied ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <FileText size={20} />
                    )}

                  </div>


                  <div>

                    <strong>
                      {application.status}
                    </strong>

                    <p>
                      {application.statusDescription}
                    </p>

                  </div>

                </div>


                {/* APPLICATION DETAILS */}

                <div className="application-details-list">

                  <div className="application-detail-row">

                    <div>

                      <CalendarDays size={17} />

                      <span>
                        Deadline
                      </span>

                    </div>

                    <strong>
                      {application.deadline}
                    </strong>

                  </div>


                  <div className="application-detail-row">

                    <div>

                      <FileText size={17} />

                      <span>
                        Resume
                      </span>

                    </div>

                    <strong>
                      {application.resumeRequired
                        ? "Required"
                        : "Optional"}
                    </strong>

                  </div>


                  <div className="application-detail-row">

                    <div>

                      <ShieldCheck size={17} />

                      <span>
                        Profile
                      </span>

                    </div>

                    <strong>
                      {application.profileCompletion}% complete
                    </strong>

                  </div>

                </div>


                {/* PROGRESS */}

                <div className="application-progress-section">

                  <div className="application-progress-header">

                    <span>
                      Application progress
                    </span>

                    <strong>
                      {application.progress}%
                    </strong>

                  </div>


                  <div className="application-progress">

                    <div
                      style={{
                        width: `${application.progress}%`,
                      }}
                    />

                  </div>

                </div>


                {/* STEPS */}

                <div className="application-steps">

                  {application.steps.map(
                    (step, index) => (
                      <div
                        className={`application-step ${
                          step.completed
                            ? "completed"
                            : ""
                        }`}
                        key={index}
                      >

                        <div className="application-step-icon">

                          {step.completed ? (
                            <Check size={14} />
                          ) : (
                            index + 1
                          )}

                        </div>

                        <span>
                          {step.title}
                        </span>

                      </div>
                    )
                  )}

                </div>


                {/* APPLY BUTTON */}

                <button
                  type="button"
                  className="sidebar-apply-btn"
                  onClick={handleApply}
                  disabled={applied}
                >

                  {applied ? (
                    <>
                      <CheckCircle2 size={17} />
                      Application Submitted
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Apply for this Job
                    </>
                  )}

                </button>


                {!applied && (
                  <p className="application-note">
                    Make sure your profile and resume are up to date
                    before submitting your application.
                  </p>
                )}

              </div>


              {/* =================================================
                  JOB OVERVIEW
              ================================================= */}

              <div className="overview-card">

                <div className="sidebar-card-title">

                  <h3>
                    Job overview
                  </h3>

                </div>


                <div className="overview-item">

                  <div className="overview-icon">
                    <BriefcaseBusiness size={16} />
                  </div>

                  <div>

                    <span>
                      Job type
                    </span>

                    <strong>
                      {job.type}
                    </strong>

                  </div>

                </div>


                <div className="overview-item">

                  <div className="overview-icon">
                    <MapPin size={16} />
                  </div>

                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      {job.location}
                    </strong>

                  </div>

                </div>


                <div className="overview-item">

                  <div className="overview-icon">
                    <Users size={16} />
                  </div>

                  <div>

                    <span>
                      Experience
                    </span>

                    <strong>
                      {job.experience}
                    </strong>

                  </div>

                </div>


                <div className="overview-item">

                  <div className="overview-icon">
                    <WalletCards size={16} />
                  </div>

                  <div>

                    <span>
                      Salary
                    </span>

                    <strong>
                      {job.salary}
                    </strong>

                  </div>

                </div>


                <div className="overview-item">

                  <div className="overview-icon">
                    <CalendarDays size={16} />
                  </div>

                  <div>

                    <span>
                      Application deadline
                    </span>

                    <strong>
                      {job.deadline}
                    </strong>

                  </div>

                </div>

              </div>


              {/* =================================================
                  COMPANY CARD
              ================================================= */}

              <div className="company-card">

                <div className="company-card-top">

                  <div className="company-card-logo">
                    {job.logo}
                  </div>

                  <div className="company-verified">
                    <CheckCircle2 size={13} />
                    Verified
                  </div>

                </div>


                <h3>
                  {job.company}
                </h3>


                <p>
                  {job.companyDescription}
                </p>


                <Link
                  to="/jobs"
                  className="company-link"
                >
                  View more jobs
                  <ArrowRight size={15} />
                </Link>

              </div>

            </aside>

          </div>

        </div>

      </main>

    </div>
  );
}

export default JobDetails;