/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				sm: '12px',
				base: '14px',
			},
		},
	},
	plugins: [],
}
