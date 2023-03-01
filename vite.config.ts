import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	server: {
		proxy: {
			'/live': {
				target: 'ws://127.0.0.1:3000',
				ws: true,
			},
		},
	},
})
