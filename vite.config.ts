import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: './',        // Explicitly set the project root
      publicDir: false, // ONLY files in the 'public' folder will be copied
      base: '/',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          input: path.resolve(__dirname, 'index.html'),
        }
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      }
    };
});