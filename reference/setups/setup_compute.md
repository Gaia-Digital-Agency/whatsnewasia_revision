# Set User

gcloud config set account azlan@gaiada.com

## Create VM

 gcloud compute instances create gda-s01 \
  --project=gda-viceroy \
  --zone=asia-southeast1-b \
  --machine-type=e2-small \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --tags=http-server,https-server

## Firewall

### Check Firewall

gcloud compute firewall-rules list --project=gda-viceroy

### Create Firewall Rule (if required)

gcloud compute firewall-rules create allow-http \
  --project=gda-viceroy \
  --allow=tcp:80 \
  --target-tags=http-server

### Allow backend API (port 8080) - for direct access if needed

gcloud compute firewall-rules create allow-backend \
  --project=gda-s01 \
  --allow=tcp:8080 \
  --target-tags=http-server

## Get Static IP

### 1. Create static IP
gcloud compute addresses create gda-s01-ip \
  --project=gda-viceroy \
  --region=asia-southeast1

### 2. Remove current ephemeral IP
gcloud compute instances delete-access-config gda-s01 \
  --project=gda-viceroy \
  --zone=asia-southeast1-b \
  --access-config-name="external-nat"

### 3. Get and Check IP

gcloud compute addresses describe gda-s01-ip \
  --project=gda-viceroy \
  --region=asia-southeast1 \
  --format="get(address)"

## 4. Attach static IP
gcloud compute instances add-access-config gda-s01 \
  --project=gda-viceroy \
  --zone=asia-southeast1-b \
  --address=<THE_IP_ADDRESS_FROM_ABOVE>

## Connect To VM & Install Packages

gcloud compute ssh gda-s01 --zone=asia-southeast1-b --project=gda-viceroy

### In VM - FOR NODE.JS

### Update system
sudo apt update && sudo apt upgrade -y

### Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

### Install Nginx
sudo apt install -y nginx

### Install MySQL 8.0
sudo apt install -y mysql-server

### Install PM2 (process manager for Node.js)
sudo npm install -g pm2

### Install build tools for native modules
sudo apt install -y build-essential python3

## Create database and user

sudo mysql -u root -p <<EOF
CREATE DATABASE whatsnewasia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON whatsnewasia.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
EOF

# Verify MySQL setup

# 1. Check database exists
sudo mysql -e "SHOW DATABASES;" | grep whatsnewasia

# 2. Check user exists
sudo mysql -e "SELECT User, Host FROM mysql.user WHERE User='appuser';"

# 3. Test login as appuser
mysql -u appuser -p -e "SHOW DATABASES;"

# 4. Change Password if needed
sudo mysql -e "ALTER USER 'appuser'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"

# MySQL Multi-Database Setup (3 Staging Projects)

## Database Structure

| Project | Database | User | Password |
|---------|----------|------|----------|
| whatsnewasia | `whatsnewasia` | `appuser` | `password` |
| staging02 | `staging02` | `staging02_user` | `[SET_PASSWORD]` |
| staging03 | `staging03` | `staging03_user` | `[SET_PASSWORD]` |

## Create All Databases

```bash
sudo mysql <<EOF
-- whatsnewasia (already created above)

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

## Verify All Databases

```bash
# List all databases
sudo mysql -e "SHOW DATABASES;"

# List all users
sudo mysql -e "SELECT User, Host FROM mysql.user WHERE User LIKE '%user%' OR User='appuser';"

# Test each connection
mysql -u appuser -ppassword -e "SELECT 'whatsnewasia connected' AS status;"
mysql -u staging02_user -p[PASSWORD] -e "SELECT 'staging02 connected' AS status;"
mysql -u staging03_user -p[PASSWORD] -e "SELECT 'staging03 connected' AS status;"
```

