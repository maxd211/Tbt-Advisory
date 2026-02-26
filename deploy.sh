#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./deploy.sh [REMOTE_URL] [BRANCH]
# Example:
#   ./deploy.sh https://github.com/your-org/your-repo.git main

REMOTE_URL="${1:-https://github.com/your-org/your-repo.git}"
BRANCH="${2:-main}"

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not installed." >&2
  exit 1
fi

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Git repo already initialized."
else
  git init
  echo "Initialized new git repository."
fi

if ! git config user.name >/dev/null 2>&1 || ! git config user.email >/dev/null 2>&1; then
  echo "Warning: git user.name/user.email are not configured. Set them before pushing." >&2
fi

mkdir -p .github/workflows

if [[ ! -f .github/workflows/vercel-deploy.yml ]]; then
  cat > .github/workflows/vercel-deploy.yml <<'YAML'
name: Vercel Deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy to Production
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
YAML
  echo "Created .github/workflows/vercel-deploy.yml"
else
  echo "Workflow already exists: .github/workflows/vercel-deploy.yml"
fi

git add .
if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "chore: initial project commit"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
  echo "Updated remote 'origin' to $REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
  echo "Added remote 'origin' as $REMOTE_URL"
fi

git branch -M "$BRANCH"

echo
echo "Sample commit messages:"
echo "  1) chore: initial project commit"
echo "  2) chore: add Vercel GitHub Actions deployment workflow"
echo
echo "Next steps to deploy:"
echo "  1) Create a GitHub repository and replace the placeholder remote URL."
echo "  2) Add GitHub secrets in repo settings:"
echo "     - VERCEL_TOKEN"
echo "     - VERCEL_ORG_ID"
echo "     - VERCEL_PROJECT_ID"
echo "  3) Push your code:"
echo "     git push -u origin $BRANCH"
echo "  4) GitHub Actions will run .github/workflows/vercel-deploy.yml and deploy to Vercel."
