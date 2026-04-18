# VaultWares Pipeline Database Credentials

If you need to connect directly to the underlying `vaultwares-pipelines` database for debugging, use the following details. Note that since we're using a local SQLite file during startup for tests, you can connect directly to the SQLite file.

**Connection String (Local SQLite):**
`sqlite://db.sqlite`

**Admin Bootstrap Credentials (if Auth is enabled):**
Set these environment variables before starting the backend:
- `BOOTSTRAP_ADMIN_USERNAME`
- `BOOTSTRAP_ADMIN_PASSWORD`

By default, an admin user is created on startup if these are provided.
