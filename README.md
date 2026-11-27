# AI Job Portal

## Requirements

- Java 22 or newer
- Maven
- Node.js and npm
- MySQL

## MySQL Workbench setup

In MySQL Workbench, connect to your local MySQL server and run:

```sql
CREATE DATABASE ai_job_portal;
```

The Spring Boot application creates or updates tables when it connects.

## Run the backend (Windows PowerShell)

In PowerShell, run the local startup script. It prompts for the MySQL username and password without echoing the password, and creates a stable development JWT key in your local AppData directory (not in the repository):

```powershell
Set-Location .\backend
.\run-local.ps1
```

Enter the same MySQL credentials you use in Workbench. If startup reports `Access denied`, verify the username/password in Workbench. The development JWT key remains stable across restarts; production deployments must provide their own `DB_PASSWORD` and `JWT_SECRET` through the deployment environment.

For a direct `mvn spring-boot:run` during local development, an unset `JWT_SECRET` is generated temporarily in memory and logged as a warning. Tokens from that run will stop working after the backend restarts. The `run-local.ps1` script avoids that by keeping a local development key between runs.

## Run the frontend

Open a second terminal:

```powershell
Set-Location .\frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Checks

```powershell
Set-Location .\backend
mvn test
```

```powershell
Set-Location .\frontend
npm run build
```

## Current scope

Job browsing, candidate applications and saved jobs, resume upload, candidate profiles, recruiter job management, application status updates, notifications, and skill-overlap recommendations use the Spring Boot API. Recommendations are rule-based skill matching; the separate `ai-service` and several secondary recruiter screens are not yet implemented.