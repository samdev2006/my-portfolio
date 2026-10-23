import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuration Vite : plugin React uniquement, aucune option exotique.
export default defineConfig({
  plugins: [react()],
  server: { host: true },
});
