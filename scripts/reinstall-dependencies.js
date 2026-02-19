import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

const projectRoot = resolve(process.cwd());

console.log('Cleaning node_modules and lockfiles...');

// Remove node_modules
const nodeModulesPath = resolve(projectRoot, 'node_modules');
if (existsSync(nodeModulesPath)) {
  rmSync(nodeModulesPath, { recursive: true, force: true });
  console.log('✓ Removed node_modules');
}

// Remove lockfiles
const lockFiles = [
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  'bun.lockb'
];

for (const lockFile of lockFiles) {
  const filePath = resolve(projectRoot, lockFile);
  if (existsSync(filePath)) {
    rmSync(filePath, { force: true });
    console.log(`✓ Removed ${lockFile}`);
  }
}

console.log('\nInstalling dependencies with npm...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
  console.log('\n✓ Dependencies reinstalled successfully!');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}
