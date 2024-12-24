import authRedirect from "../components/ts/autRedirectToken";
import ButtonUser from "./components/buttonUser";
import EmailUser from "./components/emailUser";
import Message from "../components/tsx/message";
import NameUser from "./components/nameUser";
import PasswordUser from "./components/passwordUser";
import Handle from "./validation/handle";
import User from "./validation/user";

function Register() {

    const { name, setName, email, setEmail, password, setPassword,
        isVerified, setisVerified, showPassword,
        togglePasswordVisibility,
    } = User();

    authRedirect("/user");

    const { handleSubmit, isLoading } = Handle(
        name,
        email,
        password,
        isVerified,
        setName,
        setEmail,
        setPassword,
        setisVerified
    );

    return (
        <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">
                    Crea tu Cuenta
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <NameUser
                        name={name}
                        setName={setName}
                    />
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
                    <ButtonUser
                        isLoading={isLoading}
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-orange-400 hover:text-yellow-400 transition">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
