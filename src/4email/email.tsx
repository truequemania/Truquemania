import authRedirectToken from "../components/ts/autRedirectToken";
import Message from "../components/tsx/message";
import ButtonUser from "./components/buttonUser";
import EmailUser from "./components/emailUser";
import Handle from "./validation/handle";
import User from "./validation/user";

function Email() {

    authRedirectToken("/explorar");

    const { email, setEmail } = User();

    const { handleSubmit, isLoading } = Handle(
        email,
        setEmail
    );

    return (
        <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">
                    Verifica tu Correo Electrónico
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <EmailUser
                        email={email}
                        setEmail={setEmail}
                    />
                    <ButtonUser
                        isLoading={isLoading}
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿Recuerdas la contraseña?{" "}
                    <a href="/login" className="text-orange-400 hover:text-yellow-400 transition">
                        Inicia Sesión
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Email;
