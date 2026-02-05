# Claude Code Context

Project context for Claude Code AI assistant.

## Project Overview

WhatsNewAsia is a full-stack content management and publishing platform for news across Asian countries. It features SSR (Server-Side Rendering) for SEO optimization.

## Tech Stack

- **Backend**: Node.js, Express.js, Sequelize ORM, MySQL 8
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4
- **Infrastructure**: GCP Compute Engine VM, Nginx, PM2

## Key URLs

| Environment | URL |
|-------------|-----|
| Production Site | http://34.124.244.233/whatsnewasia/ |
| Admin Panel | http://34.124.244.233/whatsnewasia/admin |
| API | http://34.124.244.233/whatsnewasia/api |

## VM Access

```bash
gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy
```

## Important Paths on VM

| Path | Description |
|------|-------------|
| `/var/www/whatsnewasia/` | Project root |
| `/var/www/whatsnewasia/backend/` | Backend API + SSR |
| `/var/www/whatsnewasia/frontend/` | Frontend build |
| `/var/www/whatsnewasia/backend/uploads/` | Uploaded images |
| `/var/lib/mysql/whatsnewasia/` | MySQL database files |

## Build & Deploy Commands

```bash
# On VM as azlan user
sudo su - azlan

# Build frontend
cd /var/www/whatsnewasia/frontend
npm run build
npm run build:ssr

# Restart backend
pm2 restart whatsnewasia
pm2 save
```

## Environment Configuration

### Base Path
The site runs under `/whatsnewasia/` base path. This is configured via:
- `VITE_BASE_PATH=/whatsnewasia` in frontend `.env.production`
- Nginx rewrites `/whatsnewasia/*` to `/*` before proxying to backend

### Important Environment Variables

**Frontend (.env.production)**:
- `VITE_BASE_PATH` - Base path for routing (e.g., `/whatsnewasia`)
- `VITE_WHATSNEW_BACKEND_URL` - Backend API URL (no trailing slash)
- `VITE_SITE_URL` - Site URL for canonical links (no trailing slash)
- `VITE_IMAGE_URL` - Image URL prefix (no trailing slash)

**Backend (.env)**:
- `FRONTEND_PATH` - Path to frontend dist folder (e.g., `../frontend`)
- `DISABLE_SSR` - Set to `false` to enable SSR

## Common Issues & Fixes

### Double slashes in URLs
Ensure env URLs don't have trailing slashes:
- Wrong: `http://example.com/whatsnewasia/`
- Correct: `http://example.com/whatsnewasia`

### Images not loading (404)
1. Check if `/var/www/whatsnewasia/backend/uploads/` folder exists
2. Verify image files are present in uploads folder
3. Check `VITE_IMAGE_URL` configuration

### Port already in use
```bash
sudo lsof -i :8080
sudo kill <PID>
pm2 restart whatsnewasia
```

## Database

- **Host**: localhost
- **Port**: 3306
- **Database**: whatsnewasia
- **User**: appuser

```bash
mysql -u appuser -p'password' whatsnewasia
```

## Key Files

| File | Purpose |
|------|---------|
| `backend/app.js` | Main backend entry point, SSR logic |
| `frontend/vite.config.ts` | Vite build config, uses `VITE_BASE_PATH` |
| `frontend/src/entry-server.tsx` | SSR renderer |
| `frontend/src/routes/FrontApp.tsx` | React Router with basename |

## PM2 Commands

```bash
pm2 status                    # View processes
pm2 logs whatsnewasia         # View logs
pm2 restart whatsnewasia      # Restart
pm2 save                      # Save process list
```
