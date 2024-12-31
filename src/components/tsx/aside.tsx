interface SidebarProps {
    isAsideOpen: boolean;
    handleNavigation: (path: string) => void;
    navLinks: { path: string; label: string }[];
    showModal: () => void;
    isLogged: boolean;
}

const Sidebar = ({
    isAsideOpen,
    handleNavigation,
    navLinks,
    showModal,
    isLogged,
}: SidebarProps) => (
    <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isAsideOpen ? "translate-x-0" : "-translate-x-full"
        } border-r bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-md`}
        aria-label="Sidebar"
    >
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <ul className="space-y-2 font-medium">
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleNavigation(link.path)}
                            className="transition duration-300 transform hover:scale-105 flex items-center p-2 text-white rounded-lg bg-gray-800 hover:bg-gray-500 w-full text-left"
                        >
                            <span className="flex-1 ml-3 whitespace-nowrap">{link.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
            {isLogged && (
                <div className="mt-auto">
                    <button
                        onClick={showModal}
                        className="transition duration-300 transform hover:scale-105 w-full p-2 text-white bg-orange-600 hover:bg-orange-700 rounded-lg"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    </aside>
);

export default Sidebar;
