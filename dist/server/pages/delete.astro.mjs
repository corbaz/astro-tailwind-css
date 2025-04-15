import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CpbBJ4mL.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const UserDelete = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [debug, setDebug] = useState("");
  const getUserId = useCallback(() => {
    if (userId) return userId;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log("ID obtenido de URL:", id);
    return id || "";
  }, [userId]);
  const fetchUser = useCallback(async () => {
    const id = getUserId();
    if (!id) {
      setError("No se proporcionó ID de usuario");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    setDebug(`Intentando cargar usuario con ID: ${id}`);
    try {
      const apiUrl = `/api/users/${id}`;
      setDebug((prev) => `${prev}
URL de API: ${apiUrl}`);
      const response = await fetch(apiUrl);
      setDebug(
        (prev) => `${prev}
Estado de respuesta: ${response.status}`
      );
      if (!response.ok) {
        throw new Error(`Error al cargar usuario (${response.status})`);
      }
      const userData = await response.json();
      setDebug(
        (prev) => `${prev}
Datos recibidos: ${JSON.stringify(userData)}`
      );
      if (!userData || typeof userData !== "object") {
        throw new Error("Datos de usuario no válidos");
      }
      setUser(userData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      setDebug((prev) => `${prev}
Error: ${errorMsg}`);
      console.error("Error al cargar usuario:", err);
    } finally {
      setLoading(false);
    }
  }, [getUserId]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const handleDelete = async () => {
    const id = getUserId();
    if (!id || !user) {
      setError("No hay usuario para eliminar");
      return;
    }
    setDeleting(true);
    setError("");
    setSuccess("");
    setDebug(`Intentando eliminar usuario con ID: ${id}`);
    try {
      const apiUrl = `/api/users/${id}`;
      setDebug(
        (prev) => `${prev}
URL de API para eliminación: ${apiUrl}`
      );
      const response = await fetch(apiUrl, {
        method: "DELETE"
      });
      setDebug(
        (prev) => `${prev}
Estado de respuesta: ${response.status}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        setDebug((prev) => `${prev}
Respuesta de error: ${errorText}`);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          throw new Error(
            `Error ${response.status}: ${response.statusText || errorText}`
          );
        }
        throw new Error(errorData.error || `Error ${response.status}`);
      }
      try {
        const deletedData = await response.json();
        setDebug(
          (prev) => `${prev}
Respuesta de eliminación: ${JSON.stringify(
            deletedData
          )}`
        );
      } catch (e) {
        setDebug(
          (prev) => `${prev}
No se pudo parsear la respuesta como JSON, pero el usuario fue eliminado correctamente.`
        );
      }
      setUser(null);
      setSuccess("Usuario eliminado correctamente");
      if (window.refreshUserList) {
        setDebug(
          (prev) => `${prev}
Intentando refrescar lista de usuarios...`
        );
        try {
          await window.refreshUserList();
          setDebug(
            (prev) => `${prev}
Lista de usuarios refrescada correctamente`
          );
        } catch (error2) {
          setDebug(
            (prev) => `${prev}
Error al refrescar lista: ${error2}`
          );
        }
      }
      console.log("Redireccionando a la página principal...");
      setTimeout(() => {
        document.location.href = "/";
      }, 800);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      setDebug((prev) => `${prev}
Error en eliminación: ${errorMsg}`);
      console.error("Error eliminando usuario:", err);
    } finally {
      setDeleting(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("p", { className: "text-center py-4", children: "Cargando usuario..." });
  }
  if (error && !user) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-500 py-4", children: error }),
      debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 overflow-auto", children: debug }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:underline", children: "Volver a la lista de usuarios" })
    ] });
  }
  if (!user && !success) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-500 py-4", children: "No se encontró el usuario" }),
      debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 overflow-auto", children: debug }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:underline", children: "Volver a la lista de usuarios" })
    ] });
  }
  if (success) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4", children: [
      /* @__PURE__ */ jsx("p", { children: success }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Redirigiendo a la página principal..." }),
      debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 overflow-auto", children: debug })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Eliminar Usuario" }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 mb-4 overflow-auto", children: debug }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mb-4", children: "¿Está seguro que desea eliminar este usuario?" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "ID:" }),
          " ",
          user?.id ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Nombre:" }),
          " ",
          user?.nombre ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Edad:" }),
          " ",
          user?.edad ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          user?.email ?? "N/A"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Sexo:" }),
          " ",
          user?.sexo ?? "N/A"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDelete,
            className: `${deleting ? "bg-red-300" : "bg-red-500 hover:bg-red-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`,
            disabled: deleting,
            children: deleting ? "Eliminando..." : "Eliminar Usuario"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
            children: "Cancelar"
          }
        )
      ] })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Delete = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Delete;
  const id = Astro2.url.searchParams.get("id") ?? void 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Delete User" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">Eliminar Usuario</h1> ${renderComponent($$result2, "UserDelete", UserDelete, { "userId": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/www/astro-tailwind-css/src/components/UserDelete.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "C:/www/astro-tailwind-css/src/pages/delete.astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/delete.astro";
const $$url = "/delete";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Delete,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
