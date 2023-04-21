import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import { readFileSync } from 'fs';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const { version } = JSON.parse(json);

const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer]
		}
	}),

	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: 'index.html',
			precompress: false
		}),
		serviceWorker: {
			register: false
		},
		version: {
			name: version
		}
	}
};

export default config;
