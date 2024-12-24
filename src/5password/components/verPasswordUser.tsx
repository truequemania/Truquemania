
interface PassUser{
    verpassword:string;
    setVerPassword: (value:string) => void;
    showConfirmPassword: boolean;
    toggleConfirmPasswordVisibility: () => void;
}

function VerPasswordUser({verpassword, setVerPassword, showConfirmPassword, toggleConfirmPasswordVisibility}:PassUser) {
    return (
        <div>
            <div>
                <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="password">
                    Confirmar nueva contraseña
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={verpassword}
                        onChange={(e) => setVerPassword(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        placeholder="Tu contraseña"
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 hover:text-white focus:outline-none"
                    >
                        {showConfirmPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerPasswordUser;