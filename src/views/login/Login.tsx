import useLoginForm from '../../components/Login/userLogin';
import ButUser from '../../components/Register/ButUser';
import EmailUser from '../../components/Register/EmailUser';
import Message from '../../components/Register/Message';
import PassUser from '../../components/Register/PassUser';
import authRedirect from '../../validation/autRedirect';
import handleSubmitLogin from '../../validation/login/HandleLogin';
import verificarTokens from '../../validation/login/VerificacionTokenLogin';

function Login() {

    const { email, setEmail, password, setPassword, showPassword, togglePasswordVisibility } = useLoginForm();

    authRedirect("/");

    const urlParams = new URLSearchParams(window.location.search);
    const tokens = urlParams.get("token");

    verificarTokens(tokens);

    const { handleSubmitLoginData, isLoading } = handleSubmitLogin(
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
                <form onSubmit={handleSubmitLoginData} className="space-y-6">
                    <EmailUser
                        email={email}
                        setEmail={setEmail}
                    />

                    <PassUser
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />

                    <div className="flex justify-between items-center">
                        <div>
                            <a href="/emailverificacion" className="text-orange-400 hover:text-yellow-400 transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <ButUser
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
