$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$certDir = Join-Path $repoRoot '.certs'
$env:VITE_TLS_CERT_FILE = Join-Path $certDir 'localhost+127.0.0.1.pem'
$env:VITE_TLS_KEY_FILE = Join-Path $certDir 'localhost+127.0.0.1-key.pem'
$rootCA = Join-Path $certDir 'mkcert-rootCA.pem'

if (-not (Test-Path $env:VITE_TLS_CERT_FILE) -or -not (Test-Path $env:VITE_TLS_KEY_FILE)) {
    throw "Missing TLS certificate files. Run .\generate_local_tls_certs.ps1 first."
}

if (Test-Path $rootCA) {
    $env:NODE_EXTRA_CA_CERTS = $rootCA
}

npm run dev
