export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.NKk7INWj.js","app":"_app/immutable/entry/app.BOv6ARUR.js","imports":["_app/immutable/entry/start.NKk7INWj.js","_app/immutable/chunks/entry.D0aOg-py.js","_app/immutable/chunks/scheduler.B977GoXl.js","_app/immutable/chunks/index.Cnp2ZY1U.js","_app/immutable/entry/app.BOv6ARUR.js","_app/immutable/chunks/scheduler.B977GoXl.js","_app/immutable/chunks/index.CnuI1Zf1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/gpu_test",
				pattern: /^\/gpu_test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
