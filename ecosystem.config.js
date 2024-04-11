module.exports = {
    apps : [{
      name: "SEA2024",
      script: "./server.js",
      watch: true, 
      ignore_watch: ["node_modules", "public"], // Do not watch these directories
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      }
    }]
  };
  