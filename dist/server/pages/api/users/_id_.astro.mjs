import { e as createComponent, f as createAstro, r as renderTemplate } from '../../../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import 'clsx';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const numericId = id ? parseInt(id) : 0;
  const dbPath = path.join(process.cwd(), "src", "databases", "db.json");
  console.log(`API Request: ${Astro2.request.method} to /api/users/${id}`);
  async function readDatabase() {
    try {
      const data = await readFile(dbPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer la base de datos:", error);
      return { users: [] };
    }
  }
  async function writeDatabase(db) {
    try {
      await writeFile(dbPath, JSON.stringify(db, null, 2));
      console.log("Base de datos actualizada correctamente");
    } catch (error) {
      console.error("Error al escribir en la base de datos:", error);
      throw error;
    }
  }
  if (Astro2.request.method === "GET") {
    try {
      const db = await readDatabase();
      const user = db.users.find((user2) => user2.id === numericId);
      console.log(`GET: Buscando usuario con ID ${numericId}`);
      if (!user) {
        console.log(`Usuario con ID ${numericId} no encontrado`);
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      console.log(`Usuario encontrado:`, user);
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return new Response(
        JSON.stringify({ error: "Error al obtener el usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } else if (Astro2.request.method === "DELETE") {
    try {
      console.log(`DELETE: Intentando eliminar usuario con ID ${numericId}`);
      const db = await readDatabase();
      const userIndex = db.users.findIndex((user) => user.id === numericId);
      if (userIndex === -1) {
        console.log(
          `Usuario con ID ${numericId} no encontrado para eliminar`
        );
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      const deletedUser = db.users[userIndex];
      db.users.splice(userIndex, 1);
      await writeDatabase(db);
      console.log(`Usuario con ID ${numericId} eliminado correctamente`);
      return new Response(JSON.stringify(deletedUser), {
        status: 200,
        // Cambiar a 200 para proporcionar datos del usuario eliminado
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return new Response(
        JSON.stringify({ error: "Error al eliminar el usuario" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } else if (Astro2.request.method === "PUT") {
    try {
      console.log(`PUT: Intentando actualizar usuario con ID ${numericId}`);
      const body = await Astro2.request.json();
      console.log(`Datos recibidos para actualizaci\xF3n:`, body);
      const db = await readDatabase();
      const userIndex = db.users.findIndex((user) => user.id === numericId);
      if (userIndex === -1) {
        console.log(
          `Usuario con ID ${numericId} no encontrado para actualizar`
        );
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      db.users[userIndex] = {
        ...db.users[userIndex],
        ...body,
        id: db.users[userIndex].id
      };
      await writeDatabase(db);
      console.log(
        `Usuario con ID ${numericId} actualizado correctamente:`,
        db.users[userIndex]
      );
      return new Response(JSON.stringify(db.users[userIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return new Response(
        JSON.stringify({
          error: "Error al actualizar el usuario",
          details: String(error)
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } else {
    console.log(`M\xE9todo ${Astro2.request.method} no soportado`);
    return new Response(JSON.stringify({ error: "M\xE9todo no soportado" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET, PUT, DELETE"
      }
    });
  }
  return renderTemplate``;
}, "C:/www/astro-tailwind-css/src/pages/api/users/[id].astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/api/users/[id].astro";
const $$url = "/api/users/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
