import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_URL?.replace(/\/php$/, '') || 'https://sachinchat.interiorsita.com';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/php': {
          target: apiTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/php/, ''),
        },
        '/images': {
          target: `${apiTarget}/php/images`,
          changeOrigin: true,
        },
      },
    },
  };
})
