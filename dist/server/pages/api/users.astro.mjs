import { e as createComponent, f as createAstro, r as renderTemplate } from '../../chunks/astro/server_Cy-f2f86.mjs';
import 'kleur/colors';
import 'clsx';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import fs from 'node:fs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Users;
  const dbPath = path.join(process.cwd(), "src", "databases", "db.json");
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
  }
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
    await writeFile(dbPath, JSON.stringify(db, null, 2));
  }
  if (Astro2.request.method === "GET") {
    try {
      const database = await readDatabase();
      return new Response(JSON.stringify(database.users), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      return new Response(
        JSON.stringify({ error: "Error al obtener usuarios" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  } else if (Astro2.request.method === "POST") {
    try {
      const contentType = Astro2.request.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        return new Response(
          JSON.stringify({ error: "El contenido debe ser JSON" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      const text = await Astro2.request.text();
      if (!text || text.trim() === "") {
        return new Response(
          JSON.stringify({
            error: "El cuerpo de la petici\xF3n est\xE1 vac\xEDo"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      let body;
      try {
        body = JSON.parse(text);
      } catch (e) {
        return new Response(
          JSON.stringify({ error: "JSON inv\xE1lido", details: e.message }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      if (!body.nombre) {
        return new Response(
          JSON.stringify({ error: "Nombre es requerido" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
      const db = await readDatabase();
      const newUser = {
        id: Date.now(),
        nombre: body.nombre,
        edad: body.edad || 0,
        email: body.email || "",
        sexo: body.sexo || ""
      };
      db.users.push(newUser);
      await writeDatabase(db);
      return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error creando usuario:", error);
      return new Response(
        JSON.stringify({
          error: "Error al crear usuario",
          details: error.message
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "M\xE9todo no soportado" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET, POST"
      }
    });
  }
  return renderTemplate``;
}, "C:/www/astro-tailwind-css/src/pages/api/users.astro", void 0);

const $$file = "C:/www/astro-tailwind-css/src/pages/api/users.astro";
const $$url = "/api/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
