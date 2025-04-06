# Fabulous-repo

A React application for AI Course Advisor.

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### How it works

1. When you push to the `main` branch, the GitHub Actions workflow will:
   - Build the React application
   - Deploy it to GitHub Pages

2. The deployed site will be available at: https://denasara0.github.io/Fabulous-repo

### Manual Deployment

You can also manually trigger the deployment workflow:
1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy React App to GitHub Pages" workflow
3. Click "Run workflow"

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Technologies Used

- React
- SASS
- GitHub Actions
- GitHub Pages
