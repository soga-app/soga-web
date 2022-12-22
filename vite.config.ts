import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  server: {
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://43.139.46.117:8081',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    // minify: "terser",
    // terserOptions: {
    // 	compress: {
    // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
    // 		drop_debugger: true
    // 	}
    // },
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
});
