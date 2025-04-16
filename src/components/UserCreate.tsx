import React, { useState } from "react";

interface UserCreateProps {
    onUserCreated?: () => void; // Callback para notificar creación exitosa
}

declare global {
    interface Window {
        // Método global para refrescar la lista de usuarios
        refreshUserList?: () => Promise<void>;
    }
}

const UserCreate: React.FC<UserCreateProps> = ({ onUserCreated }) => {
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        setIsLoading(true); // Activar el estado de carga

        // Validación básica 
        if (!nombre.trim()) {
            setIsLoading(false);
            return;
        }
        const userData = {
            nombre: nombre.trim(),
            edad: edad ? parseInt(edad) : 0,
            email: email.trim(),
            sexo: sexo,
        };
        try {
            await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
        } finally {
            window.location.href = "/create";
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
        >
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
                    isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={isLoading}
            >
                {isLoading ? "Creando..." : "Crear Usuario"}
            </button>
        </form>
    );
};

export default UserCreate;
