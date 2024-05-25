

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gpu_test/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.zmJus-UR.js","_app/immutable/chunks/scheduler.B977GoXl.js","_app/immutable/chunks/index.CnuI1Zf1.js"];
export const stylesheets = [];
export const fonts = [];
