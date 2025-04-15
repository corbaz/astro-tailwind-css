import React, { useState } from "react";

interface UserCreateProps {
    onUserCreated?: () => void; // Callback para notificar creación exitosa
}

declare global {
    interface Window {
        refreshUserList?: () => Promise<void>;
    }
}

const UserCreate: React.FC<UserCreateProps> = ({ onUserCreated }) => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        // Validaciones
        if (!nombre.trim()) {
            setError("Nombre es requerido");
            setIsLoading(false);
            return;
        }

        try {
            // Preparar los datos para el API
            const userData = {
                nombre: nombre.trim(),
                edad: edad ? parseInt(edad) : 0,
                email: email.trim(),
                sexo: sexo,
            };

            console.log("Enviando datos:", JSON.stringify(userData));

            // Usar el endpoint API con manejo explícito de errores
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
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

            // Limpiar el formulario después de éxito
            setNombre("");
            setEdad("");
            setEmail("");
            setSexo("");
            setSuccess("Usuario creado exitosamente");

            // Refrescar la lista de usuarios
            if (window.refreshUserList) {
                window.refreshUserList();
            }

            // Notificar que se creó el usuario
            if (onUserCreated) {
                onUserCreated();
            }

            // Usar una redirección compatible con Astro
            console.log("Redireccionando a la página principal...");

            // Mostrar mensaje por un breve momento antes de redireccionar
            setTimeout(() => {
                // Usamos esta forma de redirección que es compatible con SSR de Astro
                document.location.href = "/";
            }, 800);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Error desconocido"
            );
            console.error("Error creating user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label
                        htmlFor="edad"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Edad:
                    </label>
                    <input
                        type="number"
                        id="edad"
                        placeholder="Edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label
                        htmlFor="sexo"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Sexo:
                    </label>
                    <select
                        id="sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`${
                        isLoading
                            ? "bg-blue-300"
                            : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    disabled={isLoading}
                >
                    {isLoading ? "Creando..." : "Crear Usuario"}
                </button>
            </form>
        </div>
    );
};

export default UserCreate;
