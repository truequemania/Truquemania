import { useEffect } from "react";
import authRedirectToken from "../components/ts/autRedirectToken";
import Message from "../components/tsx/message";
import ButtonUser from "./components/buttonUser";
import EmailUser from "./components/emailUser";
import PasswordUser from "./components/passwordUser";
import Handle from "./validation/handle";
import User from "./validation/user";
import VerificationUrls from "./validation/verificationUrls";


function Login() {

    authRedirectToken("/user");

    const { email, setEmail, password, setPassword, showPassword, togglePasswordVisibility } = User();

    const urlParams = new URLSearchParams(window.location.search);
    const tokens = urlParams.get("token");

    useEffect(() => {
        const verifyTokens = async () => {
            if (tokens) {
                await VerificationUrls(tokens);
            }
        };

        verifyTokens();
    }, [tokens]);

    const { handleSubmit, isLoading } = Handle(
        email,
        password,
        setEmail,
        setPassword
    );

    return (
        <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">
                    Inicia Sesión
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <EmailUser
                        email={email}
                        setEmail={setEmail}
                    />

                    <PasswordUser
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />

                    <div className="flex justify-between items-center">
                        <div>
                            <a href="/email" className="text-orange-400 hover:text-yellow-400 transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <ButtonUser
                        isLoading={isLoading}
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-orange-400 hover:text-yellow-400 transition">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
