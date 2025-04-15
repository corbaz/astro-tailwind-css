import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CpbBJ4mL.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const UserEdit = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      setNombre(userData.nombre || "");
      setEdad(String(userData.edad) || "");
      setEmail(userData.email || "");
      setSexo(userData.sexo || "");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getUserId();
    if (!id) {
      setError("ID de usuario no válido");
      return;
    }
    if (!nombre) {
      setError("Nombre es requerido");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    setDebug(`Intentando actualizar usuario con ID: ${id}`);
    try {
      const apiUrl = `/api/users/${id}`;
      const userData = {
        nombre,
        edad: edad ? parseInt(edad) : 0,
        email,
        sexo
      };
      setDebug(
        (prev) => `${prev}
URL de API: ${apiUrl}
Datos enviados: ${JSON.stringify(
          userData
        )}`
      );
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
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
        } catch (e2) {
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        throw new Error(errorData.error || `Error ${response.status}`);
      }
      const updatedUser = await response.json();
      setDebug(
        (prev) => `${prev}
Usuario actualizado: ${JSON.stringify(
          updatedUser
        )}`
      );
      setUser(updatedUser);
      setSuccess("Usuario actualizado correctamente");
      setNombre(updatedUser.nombre || "");
      setEdad(String(updatedUser.edad) || "");
      setEmail(updatedUser.email || "");
      setSexo(updatedUser.sexo || "");
      console.log("Redireccionando a la página principal...");
      setTimeout(() => {
        document.location.href = "/";
      }, 800);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      setDebug((prev) => `${prev}
Error en actualización: ${errorMsg}`);
      console.error("Error actualizando usuario:", err);
    } finally {
      setSaving(false);
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
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-red-500 py-4", children: "No se encontró el usuario" }),
      debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 overflow-auto", children: debug }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:underline", children: "Volver a la lista de usuarios" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Editar Usuario" }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    success && /* @__PURE__ */ jsx("p", { className: "text-green-500 mb-4", children: success }),
    debug && process.env.NODE_ENV !== "production" && /* @__PURE__ */ jsx("pre", { className: "text-xs bg-gray-100 p-2 mt-2 mb-4 overflow-auto", children: debug }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "nombre",
            className: "block text-gray-700 text-sm font-bold mb-2",
            children: "Nombre:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "nombre",
            placeholder: "Nombre",
            value: nombre,
            onChange: (e) => setNombre(e.target.value),
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            disabled: saving
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "edad",
            className: "block text-gray-700 text-sm font-bold mb-2",
            children: "Edad:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            id: "edad",
            placeholder: "Edad",
            value: edad,
            onChange: (e) => setEdad(e.target.value),
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            disabled: saving
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "email",
            className: "block text-gray-700 text-sm font-bold mb-2",
            children: "Email:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            disabled: saving
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "sexo",
            className: "block text-gray-700 text-sm font-bold mb-2",
            children: "Sexo:"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "sexo",
            value: sexo,
            onChange: (e) => setSexo(e.target.value),
            className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            disabled: saving,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
              /* @__PURE__ */ jsx("option", { value: "masculino", children: "Masculino" }),
              /* @__PURE__ */ jsx("option", { value: "femenino", children: "Femenino" }),
              /* @__PURE__ */ jsx("option", { value: "otro", children: "Otro" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `${saving ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`,
            disabled: saving,
            children: saving ? "Guardando..." : "Guardar Cambios"
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
const $$Edit = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const id = Astro2.url.searchParams.get("id") ?? void 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Edit User" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto p-4"> <h1 class="text-2xl font-bold mb-4">Editar Usuario</h1> ${renderComponent($$result2, "UserEdit", UserEdit, { "userId": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/www/astro-tailwind-css/src/components/UserEdit.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "C:/www/astro-tailwind-css/src/pages/edit.astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/edit.astro";
const $$url = "/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Edit,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
