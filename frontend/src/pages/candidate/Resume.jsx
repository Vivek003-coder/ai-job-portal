import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Upload,
  Trash2,
  Download,
  Sparkles,
  Brain,
  Briefcase,
  GraduationCap,
  Award,
  RefreshCw,
  X,
} from "lucide-react";
import resumeService from "../../services/resumeService";

function Resume() {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [analysis] = useState({
    score: 0,
    skills: [],
    experience: "Not analyzed",
    education: "Not analyzed",
  });

  useEffect(() => {
    let active = true;
    resumeService.getMyResume()
      .then((metadata) => {
        if (active) setResume({
          name: metadata.fileName,
          size: metadata.size,
          type: metadata.contentType,
        });
      })
      .catch((error) => {
        if (active && error.response?.status !== 404) {
          showMessage(error.response?.data?.message || "Unable to load your resume.");
        }
      });
    return () => { active = false; };
  }, []);

  /* =========================
     FILE VALIDATION
  ========================= */

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    const validType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.includes(extension);

    if (!validType) {
      showMessage("Please upload a PDF or DOC/DOCX file.");
      return false;
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      showMessage("Resume size must be less than 10 MB.");
      return false;
    }

    return true;
  };

  /* =========================
     MESSAGE
  ========================= */

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  /* =========================
     UPLOAD
  ========================= */

  const handleFile = async (file) => {
    if (!validateFile(file)) return;
    setUploading(true);
    try {
      const metadata = await resumeService.upload(file);
      setResume({
        name: metadata.fileName,
        size: metadata.size,
        type: metadata.contentType,
      });
      showMessage("Resume uploaded successfully.");
    } catch (error) {
      showMessage(error.response?.data?.message || "Unable to upload your resume.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleFile(file);
    }
  };

  /* =========================
     DRAG & DROP
  ========================= */

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };

  /* =========================
     REMOVE RESUME
  ========================= */

  const removeResume = async () => {
    try {
      await resumeService.remove();
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      showMessage("Resume removed.");
    } catch (error) {
      showMessage(error.response?.data?.message || "Unable to remove your resume.");
    }
  };

  /* =========================
     ANALYZE RESUME
  ========================= */

  const analyzeResume = () => {
    if (!resume) {
      showMessage("Please upload a resume first.");
      return;
    }

    setAnalyzing(false);
    showMessage("Automated resume analysis is not configured yet.");
  };

  /* =========================
     DOWNLOAD
  ========================= */

  const downloadResume = async () => {
    if (!resume) return;
    try {
      const file = await resumeService.download();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      showMessage(error.response?.data?.message || "Unable to download your resume.");
    }
  };

  /* =========================
     FORMAT FILE SIZE
  ========================= */

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${Math.ceil(bytes / 1024)} KB`;
  };

  return (
    <div className="resume-page">

      {/* =========================
          SUCCESS / INFO MESSAGE
      ========================= */}

      {message && (
        <div className="resume-toast">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      )}

      {/* =========================
          HEADER
      ========================= */}

      <div className="resume-page-header">

        <div>

          <Link
            to="/candidate/dashboard"
            className="resume-back-link"
          >
            <ArrowLeft size={15} />
            Back to dashboard
          </Link>

          <h1>My Resume</h1>

          <p>
            Upload your latest resume and let our AI analyze
            your profile for better job matches.
          </p>

        </div>

        {resume && (
          <button
            type="button"
            className="resume-analyze-button"
            onClick={analyzeResume}
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <RefreshCw
                  size={17}
                  className="spin-icon"
                />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Analyze with AI
              </>
            )}
          </button>
        )}

      </div>

      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="resume-layout">

        {/* =========================
            LEFT COLUMN
        ========================= */}

        <div className="resume-main-column">

          {/* =========================
              UPLOAD AREA
          ========================= */}

          <section className="resume-card">

            <div className="resume-card-header">

              <div>
                <h2>Resume</h2>

                <p>
                  Upload your latest CV or resume.
                </p>
              </div>

              {resume && (
                <span className="resume-uploaded-badge">
                  <CheckCircle2 size={14} />
                  Uploaded
                </span>
              )}

            </div>

            {!resume ? (

              <div
                className={`resume-dropzone ${
                  isDragging ? "dragging" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <div className="resume-upload-icon">
                  <Upload size={25} />
                </div>

                <h3>
                  Drag & drop your resume here
                </h3>

                <p>
                  or click to browse from your computer
                </p>

                <span>
                  Supported formats: PDF, DOC, DOCX
                  <br />
                  Maximum file size: 10 MB
                </span>

                <button
                  type="button"
                  className="browse-resume-button"
                  disabled={uploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <Upload size={16} />
                  {uploading ? "Uploading..." : "Choose Resume"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  hidden
                />

              </div>

            ) : (

              <div className="uploaded-resume">

                <div className="uploaded-resume-icon">
                  <FileText size={25} />
                </div>

                <div className="uploaded-resume-info">

                  <h3>
                    {resume.name}
                  </h3>

                  <p>
                    {formatFileSize(resume.size)}
                    {" • "}
                    {resume.type ===
                    "application/pdf"
                      ? "PDF"
                      : "Document"}
                  </p>

                  <div className="upload-status">
                    <CheckCircle2 size={14} />
                    Ready for AI analysis
                  </div>

                </div>

                <div className="uploaded-resume-actions">

                  <button
                    type="button"
                    title="Download resume"
                    onClick={downloadResume}
                  >
                    <Download size={17} />
                  </button>

                  <button
                    type="button"
                    title="Replace resume"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >
                    <RefreshCw size={17} />
                  </button>

                  <button
                    type="button"
                    title="Remove resume"
                    onClick={removeResume}
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  hidden
                />

              </div>

            )}

          </section>

          {/* =========================
              AI ANALYSIS
          ========================= */}

          <section className="resume-card">

            <div className="resume-card-header">

              <div>

                <h2>
                  <Sparkles size={19} />
                  AI Resume Analysis
                </h2>

                <p>
                  AI-powered insights from your resume.
                </p>

              </div>

              <span className="ai-powered-label">
                AI POWERED
              </span>

            </div>

            {!resume ? (

              <div className="analysis-empty">

                <div className="analysis-empty-icon">
                  <Brain size={24} />
                </div>

                <h3>
                  Upload your resume to begin
                </h3>

                <p>
                  Our AI will analyze your skills,
                  experience and education.
                </p>

              </div>

            ) : (

              <div className="analysis-content">

                <div className="resume-score-card">

                  <div className="score-circle">

                    <span>
                      {analysis.score}
                    </span>

                    <small>/100</small>

                  </div>

                  <div>

                    <span>
                      Resume Score
                    </span>

                    <h3>
                      Excellent profile
                    </h3>

                    <p>
                      Your resume is well aligned with
                      software development roles.
                    </p>

                  </div>

                </div>

                <div className="analysis-stats">

                  <div>
                    <Brain size={18} />
                    <span>Skills</span>
                    <strong>
                      {analysis.skills.length}
                    </strong>
                  </div>

                  <div>
                    <Briefcase size={18} />
                    <span>Experience</span>
                    <strong>
                      1
                    </strong>
                  </div>

                  <div>
                    <GraduationCap size={18} />
                    <span>Education</span>
                    <strong>
                      1
                    </strong>
                  </div>

                </div>

              </div>

            )}

          </section>

          {/* =========================
              EXTRACTED SKILLS
          ========================= */}

          {resume && (
            <section className="resume-card">

              <div className="resume-card-header">

                <div>

                  <h2>
                    Extracted Skills
                  </h2>

                  <p>
                    Skills detected from your resume.
                  </p>

                </div>

              </div>

              <div className="resume-skills">

                {analysis.skills.map((skill) => (
                  <span
                    key={skill}
                    className="resume-skill"
                  >
                    <CheckCircle2 size={13} />
                    {skill}
                  </span>
                ))}

              </div>

            </section>
          )}

        </div>

        {/* =========================
            RIGHT COLUMN
        ========================= */}

        <aside className="resume-side-column">

          {/* =========================
              RESUME TIPS
          ========================= */}

          <section className="resume-side-card">

            <div className="side-card-icon">
              <Sparkles size={19} />
            </div>

            <h3>
              Improve your resume
            </h3>

            <p>
              Make your resume stronger and improve
              your AI job matching score.
            </p>

            <div className="resume-tip">

              <CheckCircle2 size={15} />

              <span>
                Keep your skills up to date
              </span>

            </div>

            <div className="resume-tip">

              <CheckCircle2 size={15} />

              <span>
                Add measurable achievements
              </span>

            </div>

            <div className="resume-tip">

              <CheckCircle2 size={15} />

              <span>
                Mention relevant technologies
              </span>

            </div>

            <div className="resume-tip">

              <CheckCircle2 size={15} />

              <span>
                Keep your resume concise
              </span>

            </div>

          </section>

          {/* =========================
              AI PIPELINE
          ========================= */}

          <section className="resume-side-card">

            <div className="side-card-icon ai">
              <Brain size={19} />
            </div>

            <h3>
              How AI works
            </h3>

            <div className="ai-pipeline">

              <div className="pipeline-step">

                <div className="pipeline-number">
                  1
                </div>

                <div>
                  <strong>
                    Resume Processing
                  </strong>

                  <p>
                    Text and sections are extracted.
                  </p>
                </div>

              </div>

              <div className="pipeline-line" />

              <div className="pipeline-step">

                <div className="pipeline-number">
                  2
                </div>

                <div>
                  <strong>
                    Skill Extraction
                  </strong>

                  <p>
                    Relevant technical skills are identified.
                  </p>
                </div>

              </div>

              <div className="pipeline-line" />

              <div className="pipeline-step">

                <div className="pipeline-number">
                  3
                </div>

                <div>
                  <strong>
                    AI Matching
                  </strong>

                  <p>
                    Your profile is compared with jobs.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =========================
              SUPPORTED FORMATS
          ========================= */}

          <section className="resume-side-card">

            <h3>
              Supported formats
            </h3>

            <div className="format-item">

              <FileText size={17} />

              <div>
                <strong>
                  PDF
                </strong>

                <span>
                  Recommended
                </span>
              </div>

            </div>

            <div className="format-item">

              <FileText size={17} />

              <div>
                <strong>
                  DOC / DOCX
                </strong>

                <span>
                  Microsoft Word
                </span>
              </div>

            </div>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default Resume;