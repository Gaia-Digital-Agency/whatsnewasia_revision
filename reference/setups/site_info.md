# GDA-S01 Site Information

## External IP: 34.124.244.233

## Live URLs

| Project | URL | Status |
|---------|-----|--------|
| whatsnewasia | http://34.124.244.233/ | Active |
| 02staging | http://34.124.244.233/02staging/ | Placeholder |
| 03staging | http://34.124.244.233/03staging/ | Placeholder |

---

## Nginx Configuration

File location on VM: `/etc/nginx/sites-available/gda-s01`

```nginx
# Nginx Configuration for GDA-S01 VM (SSR Mode)
# All requests go through the Node.js backend for server-side rendering

server {
    listen 80;
    server_name _;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";

    # ==========================================
    # 02staging - Simple static site
    # ==========================================
    location /02staging {
        alias /var/www/02staging;
        index index.html;
        try_files $uri $uri/ /02staging/index.html;
    }

    # ==========================================
    # 03staging - Simple static site
    # ==========================================
    location /03staging {
        alias /var/www/03staging;
        index index.html;
        try_files $uri $uri/ /03staging/index.html;
    }

    # ==========================================
    # whatsnewasia - SSR (default, must be last)
    # ==========================================
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Error pages
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

## Setup Commands (run on VM)

```bash
# Create staging folders
sudo mkdir -p /var/www/02staging /var/www/03staging

# Create Hello World pages
echo '<!DOCTYPE html>
<html>
<head><title>02 Staging</title></head>
<body><h1>Hello World - 02 Staging</h1></body>
</html>' | sudo tee /var/www/02staging/index.html

echo '<!DOCTYPE html>
<html>
<head><title>03 Staging</title></head>
<body><h1>Hello World - 03 Staging</h1></body>
</html>' | sudo tee /var/www/03staging/index.html

# Set permissions
sudo chown -R www-data:www-data /var/www/02staging /var/www/03staging
sudo chmod -R 755 /var/www/02staging /var/www/03staging

# Update Nginx config
sudo nano /etc/nginx/sites-available/gda-s01

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```
