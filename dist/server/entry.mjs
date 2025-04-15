import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D6Yp96uf.mjs';
import { manifest } from './manifest_Bp1Qt1Ao.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/users/_id_.astro.mjs');
const _page2 = () => import('./pages/api/users.astro.mjs');
const _page3 = () => import('./pages/create.astro.mjs');
const _page4 = () => import('./pages/delete.astro.mjs');
const _page5 = () => import('./pages/edit.astro.mjs');
const _page6 = () => import('./pages/users.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/users/[id].astro", _page1],
    ["src/pages/api/users.astro", _page2],
    ["src/pages/create.astro", _page3],
    ["src/pages/delete.astro", _page4],
    ["src/pages/edit.astro", _page5],
    ["src/pages/users.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/www/astro-tailwind-css/dist/client/",
    "server": "file:///C:/www/astro-tailwind-css/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
