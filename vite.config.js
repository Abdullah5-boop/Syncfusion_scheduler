import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Plan Info API
      '/api/plan_info': {
        target: 'http://202.4.125.191',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/plan_info/, '/platform_erp/logic-api/index.php/api/planning/plan_info'),
      },

      // Work Hour API
      '/api/work_hour': {
        target: 'http://202.4.125.191',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/work_hour/, '/platform_erp/logic-api/index.php/api/planning/work_hour'),
      },

      // Line Info API
      '/api/line_info': {
        target: 'http://202.4.125.191',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/line_info/, '/platform_erp/logic-api/index.php/api/planning/line_info'),
      },
    },
  },
});
