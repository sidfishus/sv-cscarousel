import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

//sidtodo how do I change this per build (prod vs dev)
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
