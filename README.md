# DotPulse-webapp

### Run Unit Tests

```
    npm i
    npm run test
```

### Run DotPulse-webapp, DotPulse Scraper and DotPulse API

```
    git clone https://github.com/CrossChainLabs-DOT/dotpulse-scraper.git
    git clone https://github.com/CrossChainLabs-DOT/dotpulse-api.git
    git clone https://github.com/CrossChainLabs-DOT/dotpulse-webapp.git
    
    cd dotpulse-scraper
    cp .env.sample .env
    # update GITHUB_TOKEN=
    
    docker-compose build
    docker-compose up
```

### Test DotPulse-webapp

```
    http://localhost:3000/
```
