// 📄 server.js

// Importamos el handler del servidor generado en build
import { handler } from "./dist/server/entry.mjs";
import http from "http";

const PORT = process.env.PORT || 4321;

// Creamos un servidor HTTP que usa el handler de Astro
http.createServer(handler).listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
