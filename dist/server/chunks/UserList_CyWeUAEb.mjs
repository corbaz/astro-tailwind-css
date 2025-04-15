import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refreshListRef = useRef(null);
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Error al cargar usuarios. Por favor, intenta de nuevo.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refreshListRef.current = fetchUsers;
    window.refreshUserList = fetchUsers;
    return () => {
      delete window.refreshUserList;
    };
  }, [fetchUsers]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-4", children: "Cargando usuarios..." });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "text-red-500 py-4", children: error });
  }
  if (users.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-4", children: "No hay usuarios registrados." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Listado de Usuarios" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white border border-gray-300", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "Edad" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "Sexo" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-100", children: [
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: user.id }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: user.nombre }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: user.edad }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: user.sexo }),
        /* @__PURE__ */ jsxs("td", { className: "py-2 px-4 border-b", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/edit?id=${user.id}`,
              className: "text-blue-500 hover:underline mr-2",
              children: "Editar"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/delete?id=${user.id}`,
              className: "text-red-500 hover:underline",
              children: "Eliminar"
            }
          )
        ] })
      ] }, user.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: fetchUsers,
        className: "mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
        children: "Refrescar"
      }
    )
  ] });
};

export { UserList as U };
