module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key: 'swoop.pem',
      user : 'ubuntu',
      host : '34.220.100.117',
      ref  : 'origin/main',
      repo : 'git@github.com:NickMezacapa/swoop-search-engine.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
