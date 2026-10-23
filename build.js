const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distDir   = path.join(__dirname, 'dist');
const androidDir = path.join(__dirname, 'android');

// ─── Step 1: Clean dist directory ──────────────────────────────────────────
console.log('==> Limpando pasta dist...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('    dist/ removida.');
} else {
  console.log('    dist/ não existe, pulando limpeza.');
}

// ─── Step 2: Vite build ────────────────────────────────────────────────────
console.log('\n==> Executando Vite build...');
execSync('npx vite build', { stdio: 'inherit', cwd: __dirname });

// ─── Step 3: Filter production files (remove source maps) ─────────────────
function cleanupDistFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanupDistFiles(fullPath);
    } else if (item.endsWith('.map')) {
      fs.unlinkSync(fullPath);
      console.log('    Removido arquivo desnecessário: ' + fullPath);
    }
  }
}

console.log('\n==> Filtrando arquivos de produção...');
cleanupDistFiles(distDir);
console.log('    Limpeza concluída.');

// ─── Step 4: Add Android platform if missing, then sync ───────────────────
if (!fs.existsSync(androidDir)) {
  console.log('\n==> Adicionando plataforma Android (primeira vez)...');
  execSync('npx cap add android', { stdio: 'inherit', cwd: __dirname });
} else {
  console.log('\n==> Sincronizando com Capacitor Android...');
  execSync('npx cap sync android', { stdio: 'inherit', cwd: __dirname });
}

console.log('\n✅  Build completo! Projeto sincronizado com Android.');
console.log('    Para gerar o APK localmente:');
console.log('    Linux/macOS: cd android && ./gradlew assembleDebug');
console.log('    Windows:     cd android && gradlew.bat assembleDebug');
