import React, { useState, useEffect, useCallback } from "react";

interface UserDeleteProps {
    userId?: string;
}

interface User {
    id: number;
    nombre: string;
    edad: string | number;
    email: string;
    sexo: string;
}

declare global {
    interface Window {
        refreshUserList?: () => Promise<void>;
    }
}

const UserDelete: React.FC<UserDeleteProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
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
            // Primero intentamos obtener el usuario específico
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

    const handleDelete = async () => {
        const id = getUserId();
        if (!id || !user) {
            setError("No hay usuario para eliminar");
            return;
        }

        // Eliminamos el confirm para evitar la alerta del navegador
        // Procedemos directamente con la eliminación

        setDeleting(true);
        setError("");
        setSuccess("");

        try {
            const apiUrl = `/api/users/${id}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorText = await response.text();

                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    throw new Error(
                        `Error ${response.status}: ${
                            response.statusText || errorText
                        }`
                    );
                }

                throw new Error(errorData.error || `Error ${response.status}`);
            }

            // Intentamos parsear la respuesta como JSON
            try {
                await response.json();
            } catch (e) {
                // Si no se puede parsear, continuamos normalmente
                console.log(
                    "No se pudo parsear la respuesta como JSON, pero el usuario fue eliminado correctamente."
                );
            }

            setUser(null);
            setSuccess("Usuario eliminado correctamente");

            // Refrescar la lista de usuarios
            if (window.refreshUserList) {
                try {
                    await window.refreshUserList();
                } catch (error) {
                    console.error(
                        "Error al refrescar lista de usuarios:",
                        error
                    );
                }
            }

            // Usar una redirección compatible con Astro
            console.log(
                "Redireccionando a la página de gestión de usuarios..."
            );

            // Mostrar mensaje por un breve momento antes de redireccionar
            setTimeout(() => {
                // Usamos esta forma de redirección que es compatible con SSR de Astro
                document.location.href = "/create";
            }, 800);
        } catch (err) {
            const errorMsg =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMsg);
            console.error("Error eliminando usuario:", err);
        } finally {
            setDeleting(false);
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

    if (!user && !success) {
        return (
            <div>
                <p className="text-red-500 py-4">No se encontró el usuario</p>
                <a href="/create" className="text-blue-500 hover:underline">
                    Volver a la gestión de usuarios
                </a>
            </div>
        );
    }

    if (success) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p>{success}</p>
                <p className="text-sm">
                    Redirigiendo a la página de gestión de usuarios...
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h3 className="font-bold text-xl mb-4">
                    ¿Está seguro que desea eliminar este usuario?
                </h3>

                <div className="mb-4">
                    <p>
                        <strong>ID:</strong> {user?.id ?? "N/A"}
                    </p>
                    <p>
                        <strong>Nombre:</strong> {user?.nombre ?? "N/A"}
                    </p>
                    <p>
                        <strong>Edad:</strong> {user?.edad ?? "N/A"}
                    </p>
                    <p>
                        <strong>Email:</strong> {user?.email ?? "N/A"}
                    </p>
                    <p>
                        <strong>Sexo:</strong> {user?.sexo ?? "N/A"}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleDelete}
                        className={`${
                            deleting
                                ? "bg-red-300"
                                : "bg-red-500 hover:bg-red-700"
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        disabled={deleting}
                    >
                        {deleting ? "Eliminando..." : "Eliminar Usuario"}
                    </button>
                    <a
                        href="/create"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancelar
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserDelete;
