import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // โหลดไฟล์ .env ตาม mode (เช่น development หรือ production)
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      // 1. เพิ่ม base ให้ตรงกับชื่อ Repository บน GitHub
      base: '/GE-AIWorkshop/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      
      // 2. การจัดการ API Key
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      resolve: {
        alias: {
          // ใช้การอ้างอิง path แบบเดิมที่คุณตั้งไว้
          '@': path.resolve(__dirname, './'),
        }
      },
      
      // 3. ตั้งค่าการ Build ให้ไฟล์ไปอยู่ที่ dist เพื่อใช้กับ gh-pages
      build: {
        outDir: 'dist',
      }
    };
});
