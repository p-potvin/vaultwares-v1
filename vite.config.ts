import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const tlsKeyPath = env.VITE_TLS_KEY_FILE || path.resolve('.certs/localhost+127.0.0.1-key.pem');
  const tlsCertPath = env.VITE_TLS_CERT_FILE || path.resolve('.certs/localhost+127.0.0.1.pem');
  const httpsConfig =
    fs.existsSync(tlsKeyPath) && fs.existsSync(tlsCertPath)
      ? {
          key: fs.readFileSync(tlsKeyPath),
          cert: fs.readFileSync(tlsCertPath),
        }
      : undefined;
  return {
    base: env.VITE_BASE_URL ?? '/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '127.0.0.1',
      https: httpsConfig,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    preview: {
      host: '127.0.0.1',
      https: httpsConfig,
    },
  };
});
