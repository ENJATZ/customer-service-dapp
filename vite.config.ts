import inject from '@rollup/plugin-inject';
import { sveltekit } from '@sveltejs/kit/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), viteCommonjs()],
	build: {
		target: 'es2020',
		rollupOptions: {
			plugins: [
				inject({
					include: ['node_modules/@ledgerhq/**'],
					modules: { Buffer: ['buffer', 'Buffer'] }
				})
			]
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			}
		}
	}
};
export default config;
