$ErrorActionPreference = "Stop"

if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    throw "Maven was not found. Install Maven and ensure mvn is on PATH."
}

$originalDbUsername = $env:DB_USERNAME
$originalDbPassword = $env:DB_PASSWORD
$originalJwtSecret = $env:JWT_SECRET
$mavenExitCode = 1

try {
    $defaultUsername = if ([string]::IsNullOrWhiteSpace($env:DB_USERNAME)) {
        "root"
    } else {
        $env:DB_USERNAME
    }

    $username = Read-Host "MySQL username [$defaultUsername]"
    $env:DB_USERNAME = if ([string]::IsNullOrWhiteSpace($username)) {
        $defaultUsername
    } else {
        $username.Trim()
    }

    $securePassword = Read-Host "MySQL password" -AsSecureString
    $passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
    try {
        $env:DB_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
    }

    if ([string]::IsNullOrWhiteSpace($originalJwtSecret)) {
        $secretDirectory = Join-Path $env:LOCALAPPDATA "AIJobPortal"
        $secretPath = Join-Path $secretDirectory "jwt-secret"
        New-Item -ItemType Directory -Path $secretDirectory -Force | Out-Null

        if (-not (Test-Path -LiteralPath $secretPath)) {
            $randomBytes = New-Object byte[] 32
            $randomGenerator = [Security.Cryptography.RandomNumberGenerator]::Create()
            try {
                $randomGenerator.GetBytes($randomBytes)
                $localSecret = [Convert]::ToBase64String($randomBytes)
                [IO.File]::WriteAllText($secretPath, $localSecret)
            } finally {
                $randomGenerator.Dispose()
                [Array]::Clear($randomBytes, 0, $randomBytes.Length)
            }
        }

        $env:JWT_SECRET = (Get-Content -LiteralPath $secretPath -Raw).Trim()
        Write-Output "Using a local development JWT key stored outside the repository."
    }

    Set-Location -LiteralPath $PSScriptRoot
    & mvn spring-boot:run
    $mavenExitCode = $LASTEXITCODE
} finally {
    if ($null -eq $originalDbUsername) {
        Remove-Item Env:\DB_USERNAME -ErrorAction SilentlyContinue
    } else {
        $env:DB_USERNAME = $originalDbUsername
    }

    if ($null -eq $originalDbPassword) {
        Remove-Item Env:\DB_PASSWORD -ErrorAction SilentlyContinue
    } else {
        $env:DB_PASSWORD = $originalDbPassword
    }

    if ($null -eq $originalJwtSecret) {
        Remove-Item Env:\JWT_SECRET -ErrorAction SilentlyContinue
    } else {
        $env:JWT_SECRET = $originalJwtSecret
    }
}

exit $mavenExitCode
