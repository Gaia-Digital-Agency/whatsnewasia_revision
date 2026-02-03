# GDA-S01 VM Structure

## Overview

VM `gda-s01` is a staging/testing server hosting multiple Node.js projects.

**VM Details:**
- Name: `gda-s01`
- Project: `gda-viceroy`
- Zone: `asia-southeast1-b`
- Machine Type: `e2-small` (2 vCPU, 2GB RAM)
- OS: Ubuntu 24.04 LTS
- External IP: `34.124.244.233`

---

## Live URLs

| Project | URL | Status |
|---------|-----|--------|
| whatsnewasia | http://34.124.244.233/ | Active |
| 02staging | http://34.124.244.233/02staging/ | Placeholder |
| 03staging | http://34.124.244.233/03staging/ | Placeholder |

---

## Folder Structure on VM

```
/var/www/
├── whatsnewasia/
│   ├── backend/              # Node.js Express API + SSR
│   └── whatsnewfrontend/     # Frontend SSR build
│
├── 02staging/
│   └── index.html            # Placeholder "Hello World"
│
└── 03staging/
    └── index.html            # Placeholder "Hello World"
```

---

## Port Assignments

| Project | Backend Port | Frontend | Status |
|---------|-------------|----------|--------|
| whatsnewasia | 8080 | Nginx :80 (path: /) | Active |
| 02staging | 8081 | Nginx :80 (path: /02staging) | Placeholder |
| 03staging | 8082 | Nginx :80 (path: /03staging) | Placeholder |

---

## MySQL Databases

| Project | Database | User | Password |
|---------|----------|------|----------|
| whatsnewasia | `whatsnewasia` | `appuser` | `password` |
| 02staging | `02staging` | `02staging_user` | `[SET_PASSWORD]` |
| 03staging | `03staging` | `03staging_user` | `[SET_PASSWORD]` |

### Create Databases (run on VM)

```bash
sudo mysql <<EOF
-- 02staging
CREATE DATABASE 02staging CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '02staging_user'@'localhost' IDENTIFIED BY '[SET_PASSWORD]';
GRANT ALL PRIVILEGES ON 02staging.* TO '02staging_user'@'localhost';

-- 03staging
CREATE DATABASE 03staging CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '03staging_user'@'localhost' IDENTIFIED BY '[SET_PASSWORD]';
GRANT ALL PRIVILEGES ON 03staging.* TO '03staging_user'@'localhost';

FLUSH PRIVILEGES;
EOF
```

---

## PM2 Process Management

| Process Name | Script | Port | Status |
|--------------|--------|------|--------|
| whatsnewasia-backend | app.js | 8080 | Active |
| 02staging-backend | app.js | 8081 | Placeholder |
| 03staging-backend | app.js | 8082 | Placeholder |

---

## Quick Reference

| Action | Command |
|--------|---------|
| SSH to VM | `gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy` |
| View processes | `pm2 status` |
| View logs | `pm2 logs [process-name]` |
| Restart backend | `pm2 restart whatsnewasia-backend` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Check Nginx status | `sudo systemctl status nginx` |
| Check MySQL status | `sudo systemctl status mysql` |
