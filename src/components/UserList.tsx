import React, { useState, useEffect, useCallback, useRef } from "react";

interface User {
    id: number;
    nombre: string;
    edad: number | string;
    email: string;
    sexo: string;
}

interface UserListProps {
    // Define any props here, if needed
}

const UserList: React.FC<UserListProps> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Corregido: añadir valor inicial null al useRef
    const refreshListRef = useRef<(() => Promise<void>) | null>(null);

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

    // Exponemos la función de actualización globalmente
    useEffect(() => {
        refreshListRef.current = fetchUsers;

        // Definir un método global para que otros componentes puedan refrescar la lista
        (window as any).refreshUserList = fetchUsers;

        return () => {
            delete (window as any).refreshUserList;
        };
    }, [fetchUsers]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) {
        return <div className="text-center py-4">Cargando usuarios...</div>;
    }

    if (error) {
        return <div className="text-red-500 py-4">{error}</div>;
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-4">No hay usuarios registrados.</div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
                Listado de Usuarios{" "}
                <span className="text-blue-400">({users.length})</span>
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Acciones</th>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Edad</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Sexo</th>
                            <th className="py-2 px-4 border-b">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">
                                    <a
                                        href={`/edit?id=${user.id}`}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Editar
                                    </a>
                                    <a
                                        href={`/delete?id=${user.id}`}
                                        className="text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.nombre}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.edad}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.email}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.sexo}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {user.id}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={fetchUsers}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Refrescar
            </button>
        </div>
    );
};

export default UserList;
