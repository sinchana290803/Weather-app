#!/bin/bash
set -e

echo "Cleaning node_modules and lockfiles..."
rm -rf node_modules
rm -f pnpm-lock.yaml
rm -f package-lock.json
rm -f yarn.lock
rm -f bun.lockb

echo "Installing dependencies with pnpm..."
pnpm install

echo "Dependencies reinstalled successfully!"
