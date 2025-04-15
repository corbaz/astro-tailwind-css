import React, { useState, useEffect, useCallback } from "react";

interface UserEditProps {
    userId?: string;
}

const UserEdit: React.FC<UserEditProps> = ({ userId }) => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [loading, setLoading] = useState(true);

    const getUserId = useCallback(() => {
        if (userId) return userId;
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id") || "";
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            const id = getUserId();
            if (!id) {
                window.location.href = "/create";
                return;
            }
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) throw new Error();
                const userData = await response.json();
                setNombre(userData.nombre || "");
                setEdad(String(userData.edad) || "");
                setEmail(userData.email || "");
                setSexo(userData.sexo || "");
            } catch {
                window.location.href = "/create";
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [getUserId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = getUserId();
        if (!id) {
            window.location.href = "/create";
            return;
        }
        const userData = {
            nombre,
            edad: edad ? parseInt(edad) : 0,
            email,
            sexo,
        };
        try {
            await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
        } finally {
            setTimeout(() => {
                window.location.href = "/create";
            }, 100);
        }
    };

    if (loading) return null;

    return (
        <>
            <div className="container mx-auto p-4"></div>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
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
                    />
                </div>
                <div className="mb-4">
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
                    />
                </div>
                <div className="mb-4">
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
                    />
                </div>
                <div className="mb-6">
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/create")}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
};

export default UserEdit;
