import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import postcssVwResize from "@minz-starter/postcss-dvw-to-vw"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    reactivityTransform: true, // 启用响应式变量支持 https://cn.vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/images')
    }
  },
  server:{
    host:'0.0.0.0',
    changeOrigin:true,
    ws:true
  },
  base:'./',
  css: {
    postcss: {
      plugins: [postcssVwResize({
        width:750
      })]
    },
  }
})
