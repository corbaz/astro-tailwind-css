import { e as createComponent, f as createAstro, l as renderHead, k as renderComponent, n as renderSlot, r as renderTemplate } from './astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
/* empty css                          */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxs("nav", { className: "bg-gray-800", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "text-white font-bold text-xl",
            children: "Sistema de Usuarios"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "ml-10 flex items-baseline space-x-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
              children: "Inicio"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/create",
              className: "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
              children: "Crear"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "-mr-2 flex md:hidden", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: toggleMenu,
          type: "button",
          className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white",
          "aria-controls": "mobile-menu",
          "aria-expanded": "false",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Abrir menú principal" }),
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: `${isOpen ? "hidden" : "block"} h-6 w-6`,
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M4 6h16M4 12h16M4 18h16"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: `${isOpen ? "block" : "hidden"} h-6 w-6`,
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M6 18L18 6M6 6l12 12"
                  }
                )
              }
            )
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${isOpen ? "block" : "hidden"} md:hidden`,
        id: "mobile-menu",
        children: /* @__PURE__ */ jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
              children: "Inicio"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/create",
              className: "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
              children: "Crear"
            }
          )
        ] })
      }
    )
  ] });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="bg-gray-100 min-h-screen"> ${renderComponent($$result, "Navbar", Navbar, {})} <div class="container mx-auto p-4 mt-4"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "C:/www/astro-tailwind-css/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
