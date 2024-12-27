import { useState } from 'react';
import logo from "../../assets/logo.png";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <header className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <a href="/sesion">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
                    />
                </a>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                    TruequeMania
                </h1>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                <nav className="hidden md:flex space-x-6 text-base md:text-lg lg:text-xl">
                    <a href="#features" className="hover:text-orange-400 transition-colors duration-200">Características</a>
                    <a href="#how-it-works" className="hover:text-orange-400 transition-colors duration-200">Cómo Funciona</a>
                    <a href="#contact" className="hover:text-orange-400 transition-colors duration-200">Contacto</a>
                </nav>
            </header>

            {isOpen && (
                <nav className="md:hidden bg-gradient-to-r from-black to-gray-900 p-4">
                    <ul className="space-y-4 text-base">
                        <li>
                            <a href="#features" className="block text-white hover:text-orange-400 transition-colors duration-200">
                                Características
                            </a>
                        </li>
                        <li>
                            <a href="#how-it-works" className="block text-white hover:text-orange-400 transition-colors duration-200">
                                Cómo Funciona
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="block text-white hover:text-orange-400 transition-colors duration-200">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </div>

    );
}

export default Header;