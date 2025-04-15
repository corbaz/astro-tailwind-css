import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CpbBJ4mL.mjs';
import { U as UserCreate } from '../chunks/UserCreate_Dct1D_vb.mjs';
export { renderers } from '../renderers.mjs';

const $$Create = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Create User" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">Create User</h1> ${renderComponent($$result2, "UserCreate", UserCreate, {})} </main> ` })}`;
}, "C:/www/astro-tailwind-css/src/pages/create.astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/create.astro";
const $$url = "/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
