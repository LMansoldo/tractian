import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@views': path.resolve(__dirname, './src/views'),
			'@types': path.resolve(__dirname, './src/types'),
			'@repositories': path.resolve(__dirname, './src/repositories'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@context': path.resolve(__dirname, './src/context'),
			'@store': path.resolve(__dirname, './src/store'),
		},
	},
	server: {
		port: 3000,
	},
})
