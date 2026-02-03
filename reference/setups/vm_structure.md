# GDA-S01 VM Structure

## Overview

VM `gda-s01` is a staging/testing server hosting multiple Node.js projects.

**VM Details:**
- Name: `gda-s01`
- Project: `gda-viceroy`
- Zone: `asia-southeast1-b`
- Machine Type: `e2-small` (2 vCPU, 2GB RAM)
- OS: Ubuntu 24.04 LTS
- Static IP: `gda-s01-ip` (get actual IP with command below)

```bash
gcloud compute addresses describe gda-s01-ip \
  --project=gda-viceroy \
  --region=asia-southeast1 \
  --format="get(address)"
```

---

## Folder Structure on VM

```
/home/azlan/
├── apps/
│   ├── whatsnewasia/
│   │   ├── frontend/          # React built files (served by Nginx)
│   │   └── backend/           # Node.js Express API
│   │
│   ├── staging02/
│   │   ├── frontend/          # Placeholder
│   │   └── backend/           # Placeholder
│   │
│   └── staging03/
│       ├── frontend/          # Placeholder
│       └── backend/           # Placeholder

/var/www/
├── whatsnewasia/
│   └── frontend/              # Nginx serves static files from here
├── staging02/
│   └── frontend/              # Placeholder
└── staging03/
    └── frontend/              # Placeholder
```

---

## Port Assignments

| Project | Backend Port | Frontend | Status |
|---------|-------------|----------|--------|
| whatsnewasia | 8080 | Nginx :80 (path: /) | Active |
| staging02 | 8081 | Nginx :80 (path: /staging02) | Placeholder |
| staging03 | 8082 | Nginx :80 (path: /staging03) | Placeholder |

---

## MySQL Databases

Each project has its own database with dedicated user:

| Project | Database | User | Password |
|---------|----------|------|----------|
| whatsnewasia | `whatsnewasia` | `appuser` | `password` |
| staging02 | `staging02` | `staging02_user` | `[SET_PASSWORD]` |
| staging03 | `staging03` | `staging03_user` | `[SET_PASSWORD]` |

### Create Databases (run on VM)

```bash
sudo mysql <<EOF
-- whatsnewasia (already created)
-- CREATE DATABASE whatsnewasia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON whatsnewasia.* TO 'appuser'@'localhost';

-- staging02
CREATE DATABASE staging02 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'staging02_user'@'localhost' IDENTIFIED BY '[SET_PASSWORD]';
GRANT ALL PRIVILEGES ON staging02.* TO 'staging02_user'@'localhost';

-- staging03
CREATE DATABASE staging03 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'staging03_user'@'localhost' IDENTIFIED BY '[SET_PASSWORD]';
GRANT ALL PRIVILEGES ON staging03.* TO 'staging03_user'@'localhost';

FLUSH PRIVILEGES;
EOF
```

---

## PM2 Process Management

| Process Name | Script | Port | Status |
|--------------|--------|------|--------|
| whatsnewasia-backend | app.js | 8080 | Active |
| staging02-backend | app.js | 8081 | Placeholder |
| staging03-backend | app.js | 8082 | Placeholder |

### PM2 Commands

```bash
# View all processes
pm2 status

# Start whatsnewasia
pm2 start /home/azlan/apps/whatsnewasia/backend/app.js --name whatsnewasia-backend

# Start staging02 (when ready)
pm2 start /home/azlan/apps/staging02/backend/app.js --name staging02-backend

# Start staging03 (when ready)
pm2 start /home/azlan/apps/staging03/backend/app.js --name staging03-backend

# Save PM2 process list (persist across reboots)
pm2 save

# Logs
pm2 logs whatsnewasia-backend
pm2 logs staging02-backend
pm2 logs staging03-backend
```

---

## Nginx Configuration

Single Nginx config handles all projects with path-based routing:

- `/` → whatsnewasia frontend
- `/api` → whatsnewasia backend (port 8080)
- `/staging02` → staging02 frontend
- `/staging02/api` → staging02 backend (port 8081)
- `/staging03` → staging03 frontend
- `/staging03/api` → staging03 backend (port 8082)

Config file: `/etc/nginx/sites-available/gda-s01`

---

## Local to VM Sync

### Local Folder Structure

```
whatsnewasia/
└── whatsnewasia_revision/
    ├── frontend/              # React source code
    ├── backend/               # Node.js source code
    └── vm_structure.md        # This file
```

### Deploy Commands (from local machine)

```bash
# Connect to VM
gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy

# Copy backend to VM
gcloud compute scp --recurse ./whatsnewasia_revision/backend \
  gda-s01:/home/azlan/apps/whatsnewasia/ \
  --zone=asia-southeast1-b --project=gda-viceroy

# Build frontend locally first
cd whatsnewasia_revision/frontend
npm run build

# Copy built frontend to VM
gcloud compute scp --recurse ./dist/client \
  gda-s01:/home/azlan/apps/whatsnewasia/frontend \
  --zone=asia-southeast1-b --project=gda-viceroy
```

---

## Initial VM Setup Commands (run once)

```bash
# Create app directories
mkdir -p ~/apps/whatsnewasia/frontend ~/apps/whatsnewasia/backend
mkdir -p ~/apps/staging02/frontend ~/apps/staging02/backend
mkdir -p ~/apps/staging03/frontend ~/apps/staging03/backend

# Create Nginx directories
sudo mkdir -p /var/www/whatsnewasia/frontend
sudo mkdir -p /var/www/staging02/frontend
sudo mkdir -p /var/www/staging03/frontend

# Set ownership
sudo chown -R azlan:azlan /var/www/whatsnewasia
sudo chown -R azlan:azlan /var/www/staging02
sudo chown -R azlan:azlan /var/www/staging03

# Setup PM2 to start on boot
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u azlan --hp /home/azlan
```

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
