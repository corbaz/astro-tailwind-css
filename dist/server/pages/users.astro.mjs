import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CpbBJ4mL.mjs';
import { U as UserList } from '../chunks/UserList_CyWeUAEb.mjs';
export { renderers } from '../renderers.mjs';

const $$Users = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "User Management" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">Sistema de Gestión de Usuarios</h1> ${renderComponent($$result2, "UserList", UserList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/www/astro-tailwind-css/src/components/UserList.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "C:/www/astro-tailwind-css/src/pages/users.astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/users.astro";
const $$url = "/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
