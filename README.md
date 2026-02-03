# WhatsNewAsia

A full-stack content management and publishing platform for news and articles across Asian countries. The platform features a public-facing website for readers and an admin CMS for content creators and administrators.

## Live Application (Staging VM)

| Environment | URL |
|-------------|-----|
| **Frontend (Public Site)** | http://34.124.244.233 |
| **Admin Panel** | http://34.124.244.233/admin |
| **Backend API** | http://34.124.244.233/api |

---

## Infrastructure Status

Current deployment configuration for WhatsNewAsia on GCP Compute Engine VM.

### Enabled Features

| Feature | Status | Details |
|---------|--------|---------|
| **Server-Side Rendering (SSR)** | Enabled | Full SSR via backend, improves SEO and initial load |
| **MySQL Database** | Enabled | Local MySQL 8.0 on VM |
| **PM2 Process Manager** | Enabled | Auto-restart, process monitoring |
| **Nginx Reverse Proxy** | Enabled | All traffic proxied to Node.js backend |
| **Gzip Compression** | Enabled | Configured in Nginx |
| **Static Asset Caching** | Enabled | 30-day cache for assets |
| **Image Storage (GCS)** | Enabled | Images served from Google Cloud Storage |

### Disabled Features

| Feature | Status | Notes |
|---------|--------|-------|
| **Redis Caching** | Disabled | `REDIS_ENABLED=false` |
| **SSL/HTTPS** | Disabled | HTTP only for staging |
| **CDN** | Not configured | Images served directly from GCS bucket |
| **Load Balancer** | Not configured | Single VM setup |
| **Cloud Armor/WAF** | Not configured | Basic firewall only |
| **Rate Limiting** | Not configured | No rate limiting middleware |
| **Email Service** | Not configured | SMTP not set up |

### Firewall Rules

| Rule | Port | Description |
|------|------|-------------|
| allow-http | TCP:80 | HTTP traffic to Nginx |
| allow-backend | TCP:8080 | Direct backend access (if needed) |

---

## Architecture

```
                     GCP Compute Engine VM (gda-s01)
                     ================================

    Internet          VM: e2-small (2 vCPU, 2GB RAM)
        |             Ubuntu 24.04 LTS
        v             IP: 34.124.244.233
   +---------+
   |  Nginx  |  :80   +-----------------------+
   |  Proxy  |------->|  Node.js Backend      |
   +---------+        |  (PM2 managed)        |
        |             |  Port: 8080           |
        |             |                       |
        |             |  - Express.js API     |
        |             |  - SSR Renderer       |
        |             |  - Static Assets      |
        |             +-----------+-----------+
        |                         |
        |                         v
        |             +-----------+-----------+
        |             |  MySQL 8.0            |
        |             |  (localhost:3306)     |
        |             |  DB: whatsnewasia     |
        |             +-----------------------+
        |
        v
   +--------------------+
   |  Google Cloud      |
   |  Storage (GCS)     |
   |  gda_wna_images    |
   +--------------------+
```

### Request Flow

1. **All Requests** → Nginx (:80) → Backend (:8080)
2. **SSR Pages**: Backend renders HTML with initial data → Client hydrates
3. **API Calls**: `/api/*` routes handled by Express controllers
4. **Static Assets**: Served by backend from `whatsnewfrontend/dist/client/`
5. **Images**: Frontend constructs URLs pointing to GCS public bucket

---

## VM Details

| Property | Value |
|----------|-------|
| VM Name | `gda-s01` |
| Project | `gda-viceroy` |
| Zone | `asia-southeast1-b` |
| Machine Type | `e2-small` (2 vCPU, 2GB RAM) |
| OS | Ubuntu 24.04 LTS |
| Storage | 10GB boot disk |
| Static IP | `34.124.244.233` |

### VM Folder Structure

```
/home/azlan/apps/whatsnewasia/
├── backend/                    # Node.js Express API + SSR
│   ├── app.js                  # Main entry point
│   ├── .env                    # Environment variables
│   └── src/                    # Source code
│
└── whatsnewfrontend/           # Frontend SSR build
    ├── package.json            # Dependencies for SSR
    ├── node_modules/           # SSR runtime dependencies
    └── dist/
        ├── client/             # Static assets
        │   ├── src/
        │   │   ├── main.html       # Public site template
        │   │   └── mainAdmin.html  # Admin template
        │   ├── assets/         # JS/CSS bundles
        │   └── images/         # Static images
        │
        └── server/             # SSR server bundles
            ├── front.js        # Public site renderer
            └── admin.js        # Admin panel renderer
```

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js 20 | Runtime environment |
| Express.js | Web framework |
| Sequelize | ORM for MySQL |
| MySQL 8 | Database |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Multer | File uploads |
| Sharp | Image processing |
| PM2 | Process manager |

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| React Router 7 | Routing |
| Tailwind CSS 4 | Styling |
| Axios | HTTP client |
| Quill | Rich text editor |

---

## Database

### Connection Details

| Property | Value |
|----------|-------|
| Host | `localhost` |
| Port | `3306` |
| Database | `whatsnewasia` |
| User | `appuser` |
| Charset | `utf8mb4` |

### Core Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts |
| `articles` | Article metadata |
| `article_versions` | Article content versions |
| `category` | Content categories |
| `tags` | Article tags |
| `country` | Countries |
| `city` | Cities |
| `region` | Regions |
| `asset_media` | Uploaded images |
| `article_templating` | Page templates |
| `subscribers` | Newsletter subscribers |

---

## Local Development

### Prerequisites

- Node.js 20+
- MySQL 8
- npm

### Backend Setup

```bash
cd whatsnewasia_revision/backend

# Install dependencies
npm install

# Create .env file from template
cp .env.vm .env
# Edit .env with local database credentials

# Run development server
npm run dev
```

Backend runs on: http://localhost:7777

### Frontend Setup

```bash
cd whatsnewasia_revision/frontend

# Install dependencies
npm install

# Create .env file
cp .env.vm .env

# Start development server (CSR mode)
npm run dev
```

Frontend runs on: http://localhost:5173

### Build for Production (SSR)

```bash
cd whatsnewasia_revision/frontend

# Build with SSR support
npm run build:ssr

# Output:
# - dist/client/  (static assets)
# - dist/server/  (SSR bundles)
```

---

## Deployment to VM

### Quick Deploy

```bash
# 1. Build frontend with SSR
cd whatsnewasia_revision/frontend
npm run build:ssr

# 2. Create tarball (excluding node_modules)
tar -czvf frontend-ssr.tar.gz \
  --exclude='node_modules' \
  dist/ package.json package-lock.json

# 3. Copy to VM
gcloud compute scp frontend-ssr.tar.gz \
  gda-s01:/home/azlan/apps/whatsnewasia/ \
  --zone=asia-southeast1-b --project=gda-viceroy

# 4. SSH to VM and deploy
gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy

# On VM:
cd ~/apps/whatsnewasia
tar -xzvf frontend-ssr.tar.gz -C whatsnewfrontend/
cd whatsnewfrontend && npm install --legacy-peer-deps --omit=dev
pm2 restart whatsnewasia-backend
```

### Backend Deploy

```bash
# Copy backend (excluding node_modules)
tar -czvf backend.tar.gz \
  --exclude='node_modules' \
  --exclude='uploads/*' \
  -C whatsnewasia_revision backend

gcloud compute scp backend.tar.gz \
  gda-s01:/home/azlan/apps/whatsnewasia/ \
  --zone=asia-southeast1-b --project=gda-viceroy

# On VM:
cd ~/apps/whatsnewasia
tar -xzvf backend.tar.gz
cd backend && npm install --omit=dev
pm2 restart whatsnewasia-backend
```

---

## PM2 Commands

```bash
# View all processes
pm2 status

# View logs
pm2 logs whatsnewasia-backend

# Restart backend
pm2 restart whatsnewasia-backend

# Save process list (persist across reboots)
pm2 save
```

---

## Environment Variables

### Backend (.env)

```env
# Server
PORT=8080
NODE_ENV=production
URL=http://34.124.244.233

# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=appuser
DATABASE_PASSWORD=password
DATABASE=whatsnewasia

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# CORS
WHITELIST_CORS_ORIGIN=http://34.124.244.233
FRONTEND_URL=http://34.124.244.233

# SSR
DISABLE_SSR=false
FRONTEND_PATH=whatsnewfrontend
SITEMAP_URL=http://34.124.244.233

# Redis (disabled)
REDIS_ENABLED=false

# Images
IMAGE_URL=https://storage.googleapis.com/gda_p01_storage/gda_wna_images
```

### Frontend (.env)

```env
VITE_WHATSNEW_BACKEND_URL=http://34.124.244.233
VITE_SITE_URL=http://34.124.244.233
VITE_IMAGE_URL=https://storage.googleapis.com/gda_p01_storage/gda_wna_images
```

---

## Admin Panel

### Access

- URL: http://34.124.244.233/admin
- Default credentials:
  - Email: `super_admin@admin.com`
  - Password: `12345678`

### Features

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/admin` | Stats and overview |
| Articles | `/admin/mst_article` | Create/edit articles |
| Media Library | `/admin/media_library` | Upload images |
| Templates | `/admin/mst_templates` | Page layouts |
| Categories | `/admin/mst_categories` | Content categories |
| Tags | `/admin/mst_tags` | Article tags |
| Locations | `/admin/mst_locations` | Countries/cities |
| Users | `/admin/users` | User management |

---

## Troubleshooting

### Check Service Status

```bash
# SSH to VM
gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy

# Check PM2
pm2 status
pm2 logs whatsnewasia-backend --lines 50

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check MySQL
sudo systemctl status mysql
```

### Common Issues

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check if PM2 process is running |
| SSR not working | Verify `DISABLE_SSR=false` and `FRONTEND_PATH` is correct |
| Images not loading | Check `IMAGE_URL` in .env |
| Database connection failed | Verify MySQL is running and credentials are correct |

### Verify SSR is Working

```bash
curl -s http://34.124.244.233/ | grep -o 'window.__INITIAL_DATA__' | head -1
# Should output: window.__INITIAL_DATA__
```

---

## Project Structure (Local)

```
whatsnewasia/
└── whatsnewasia_revision/
    ├── README.md                 # This file
    ├── backend/                  # Node.js backend
    │   ├── app.js
    │   ├── .env.vm               # VM environment template
    │   └── src/
    │       ├── controllers/
    │       ├── models/
    │       ├── routers/
    │       └── ssr/              # SSR logic
    │
    ├── frontend/                 # React frontend
    │   ├── .env.vm               # VM environment template
    │   ├── vite.config.ts
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       └── entry-server.tsx  # SSR entry
    │
    └── reference/                # Documentation & configs
        ├── setups/
        │   ├── setup_compute.md  # VM setup guide
        │   ├── vm_structure.md   # VM folder structure
        │   ├── ecosystem.config.cjs
        │   └── nginx-gda-s01-ssr.conf
        ├── database/
        │   └── whatsnewasia-backup.sql
        └── fixes/
            └── ...
```

---

## Future Enhancements (Not Yet Configured)

- [ ] SSL/HTTPS with Let's Encrypt
- [ ] Redis caching for improved performance
- [ ] CDN for static assets
- [ ] Load balancer for high availability
- [ ] Rate limiting for API protection
- [ ] Email service (SMTP)
- [ ] Monitoring and alerting
- [ ] Automated backups

---

## Related Documentation

- [VM Setup Guide](reference/setups/setup_compute.md)
- [VM Folder Structure](reference/setups/vm_structure.md)
- [Nginx SSR Config](reference/setups/nginx-gda-s01-ssr.conf)
- [PM2 Ecosystem Config](reference/setups/ecosystem.config.cjs)

---

*Last updated: February 3, 2026 - Migrated from Cloud Run to GCP Compute Engine VM with SSR enabled*
