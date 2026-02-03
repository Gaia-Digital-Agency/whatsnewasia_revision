// PM2 Ecosystem Configuration for GDA-S01 VM
// Copy to VM: /home/azlan/ecosystem.config.cjs
// Usage: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    // ===========================================
    // whatsnewasia - Active Project
    // ===========================================
    {
      name: 'whatsnewasia-backend',
      script: 'app.js',
      cwd: '/home/azlan/apps/whatsnewasia/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 8080
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/home/azlan/logs/whatsnewasia-error.log',
      out_file: '/home/azlan/logs/whatsnewasia-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },

    // ===========================================
    // staging02 - Placeholder
    // ===========================================
    // Uncomment when ready to deploy
    /*
    {
      name: 'staging02-backend',
      script: 'app.js',
      cwd: '/home/azlan/apps/staging02/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 8081
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/home/azlan/logs/staging02-error.log',
      out_file: '/home/azlan/logs/staging02-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    */

    // ===========================================
    // staging03 - Placeholder
    // ===========================================
    // Uncomment when ready to deploy
    /*
    {
      name: 'staging03-backend',
      script: 'app.js',
      cwd: '/home/azlan/apps/staging03/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 8082
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/home/azlan/logs/staging03-error.log',
      out_file: '/home/azlan/logs/staging03-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
    */
  ]
};
