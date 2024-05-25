import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BvlDQceq.js","_app/immutable/chunks/scheduler.B977GoXl.js","_app/immutable/chunks/index.CnuI1Zf1.js","_app/immutable/chunks/mode.BhY0mbpz.js","_app/immutable/chunks/index.Cnp2ZY1U.js"];
export const stylesheets = ["_app/immutable/assets/0.BDwap1fO.css"];
export const fonts = [];
