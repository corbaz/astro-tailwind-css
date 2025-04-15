import React, { useState, useEffect, useCallback } from "react";

interface UserEditProps {
    userId?: string;
}

interface User {
    id: number;
    nombre: string;
    edad: string | number;
    email: string;
    sexo: string;
}

const UserEdit: React.FC<UserEditProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Obtener ID de la URL si no fue proporcionado como prop
    const getUserId = useCallback(() => {
        if (userId) return userId;

        // Intentar obtener ID de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        // Logging para debug
        console.log("ID obtenido de URL:", id);
        return id || "";
    }, [userId]);

    // Función para cargar el usuario
    const fetchUser = useCallback(async () => {
        const id = getUserId();
        if (!id) {
            setError("No se proporcionó ID de usuario");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Llamar al endpoint específico del usuario
            const apiUrl = `/api/users/${id}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Error al cargar usuario (${response.status})`);
            }

            const userData = await response.json();

            if (!userData || typeof userData !== "object") {
                throw new Error("Datos de usuario no válidos");
            }

            setUser(userData);
            setNombre(userData.nombre || "");
            setEdad(String(userData.edad) || "");
            setEmail(userData.email || "");
            setSexo(userData.sexo || "");
        } catch (err) {
            const errorMsg =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMsg);
            console.error("Error al cargar usuario:", err);
        } finally {
            setLoading(false);
        }
    }, [getUserId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = getUserId();

        if (!id) {
            setError("ID de usuario no válido");
            return;
        }

        // Validaciones
        if (!nombre) {
            setError("Nombre es requerido");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const apiUrl = `/api/users/${id}`;
            const userData = {
                nombre,
                edad: edad ? parseInt(edad) : 0,
                email,
                sexo,
            };

            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorText = await response.text();

                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                throw new Error(errorData.error || `Error ${response.status}`);
            }

            const updatedUser = await response.json();

            setUser(updatedUser);
            setSuccess("Usuario actualizado correctamente");

            // Actualizar los campos con los datos actualizados
            setNombre(updatedUser.nombre || "");
            setEdad(String(updatedUser.edad) || "");
            setEmail(updatedUser.email || "");
            setSexo(updatedUser.sexo || "");

            // Usar una redirección compatible con Astro
            console.log(
                "Redireccionando a la página de gestión de usuarios..."
            );

            // Mostrar mensaje por un breve momento antes de redirecciónar
            setTimeout(() => {
                // Usamos esta forma de redirección que es compatible con SSR de Astro
                document.location.href = "/create";
            }, 800);
        } catch (err) {
            const errorMsg =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMsg);
            console.error("Error actualizando usuario:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="text-center py-4">Cargando usuario...</p>;
    }

    if (error && !user) {
        return (
            <div>
                <p className="text-red-500 py-4">{error}</p>
                <a href="/create" className="text-blue-500 hover:underline">
                    Volver a la gestión de usuarios
                </a>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <p className="text-red-500 py-4">No se encontró el usuario</p>
                <a href="/create" className="text-blue-500 hover:underline">
                    Volver a la gestión de usuarios
                </a>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">

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
                        disabled={saving}
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
                        disabled={saving}
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
                        disabled={saving}
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
                        disabled={saving}
                    >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className={`${
                            saving
                                ? "bg-blue-300"
                                : "bg-blue-500 hover:bg-blue-700"
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        disabled={saving}
                    >
                        {saving ? "Guardando..." : "Guardar Cambios"}
                    </button>
                    <a
                        href="/create"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancelar
                    </a>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
