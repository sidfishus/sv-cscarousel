import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

//sidtodo this isn't working.
export default defineConfig({
	plugins: [sveltekit()],
	build: {
		terserOptions: {
			compress: {
				drop_console: false,
				drop_debugger: false,
			}
		}
	}
});
