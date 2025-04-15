import React, { useState } from "react";
import { VERSION } from "../const/appConstants";

interface NavbarProps {
    // Define any props here, if needed
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Función simplificada para alternar el menú
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-white font-bold text-xl"
                            >
                                Sistema de Usuarios
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    href="/"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Inicio
                                </a>
                                <a
                                    href="/create"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Gestionar Usuarios
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Versión de la aplicación */}
                    <div className="hidden md:flex items-center">
                        <span className="text-gray-400 text-sm font-medium">
                            v.{VERSION}
                        </span>
                    </div>

                    <div className="md:hidden flex items-center">
                        <span className="text-gray-400 text-sm font-medium mr-3">
                            v.{VERSION}
                        </span>
                        {/* Simplificar el botón hamburguesa */}
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="z-20 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            {isOpen ? (
                                // Icono X cuando está abierto
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                // Icono de hamburguesa cuando está cerrado
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil con transición */}
            <div
                className={`${
                    isOpen ? "block" : "hidden"
                } md:hidden bg-gray-800 shadow-lg z-10`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a
                        href="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Inicio
                    </a>
                    <a
                        href="/create"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Gestionar Usuarios
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
