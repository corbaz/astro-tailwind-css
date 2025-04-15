import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';

const UserCreate = ({ onUserCreated }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    if (!nombre.trim()) {
      setError("Nombre es requerido");
      setIsLoading(false);
      return;
    }
    try {
      const userData = {
        nombre: nombre.trim(),
        edad: edad ? parseInt(edad) : 0,
        email: email.trim(),
        sexo
      };
      console.log("Enviando datos:", JSON.stringify(userData));
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        let errorMsg = "Error al crear usuario";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
        throw new Error(errorMsg);
      }
      const data = await response.json();
      console.log("Usuario creado:", data);
      setNombre("");
      setEdad("");
      setEmail("");
      setSexo("");
      setSuccess("Usuario creado exitosamente");
      if (window.refreshUserList) {
        window.refreshUserList();
      }
      if (onUserCreated) {
        onUserCreated();
      }
      console.log("Redireccionando a la página principal...");
      setTimeout(() => {
        document.location.href = "/";
      }, 800);
    } catch (error2) {
      setError(
        error2 instanceof Error ? error2.message : "Error desconocido"
      );
      console.error("Error creating user:", error2);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Crear Usuario" }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    success && /* @__PURE__ */ jsx("p", { className: "text-green-500 mb-4", children: success }),
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
            disabled: isLoading
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
            disabled: isLoading
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
            disabled: isLoading
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
            disabled: isLoading,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
              /* @__PURE__ */ jsx("option", { value: "masculino", children: "Masculino" }),
              /* @__PURE__ */ jsx("option", { value: "femenino", children: "Femenino" }),
              /* @__PURE__ */ jsx("option", { value: "otro", children: "Otro" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `${isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`,
          disabled: isLoading,
          children: isLoading ? "Creando..." : "Crear Usuario"
        }
      )
    ] })
  ] });
};

export { UserCreate as U };
