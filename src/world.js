// simulate a superflat minecraft world with consistent getb, setb, geth

import { visualise } from './visualise.js';
import { blocks } from './world_state.js';
export { reset, setb, getb, geth } from './world_state.js';

/** @type {()} cleanup function from visualise */
let cleanup;

export function display(container) {
	if (cleanup) {
		cleanup();
		cleanup = undefined;
	}
	if (!container) return;
	container.innerHTML = '';
	cleanup = visualise(blocks, container);
}
