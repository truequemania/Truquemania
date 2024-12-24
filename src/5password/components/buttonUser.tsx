
interface UserString{
    isLoading:boolean;
}
function ButtonUser({isLoading}:UserString) {
    return (
        <div>
            <div>
                <button
                    type="submit"
                    className="w-full p-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:opacity-90 transition transform hover:scale-105" disabled={isLoading}
                >
                    {isLoading ? "Ingresando..." : "Ingresar"}
                </button>
            </div>
        </div>
    );
}

export default ButtonUser;