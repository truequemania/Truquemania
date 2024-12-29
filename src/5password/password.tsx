import authRedirectToken from "../components/ts/autRedirectToken";
import Message from "../components/tsx/message";
import ButtonUser from "./components/buttonUser";
import PasswordUser from "./components/passwordUser";
import VerPasswordUser from "./components/verPasswordUser";
import Handle from "./validation/handle";
import User from "./validation/user";
import VerificationUrls from "./validation/verificationUrls";

export interface UserData {
  name: string;
  email: string;
}

function Password() {
  const {
    password,
    setPassword,
    verPassword,
    setVerPassword,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = User();
  VerificationUrls();

  authRedirectToken("/explorar");

  const { handleSubmit, isLoading } = Handle(
    password,
    verPassword,
    setPassword,
    setVerPassword
  );

  return (
    <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Actualiza tu Contraseña
        </h2>
        <Message />
        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordUser
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <VerPasswordUser
            verpassword={verPassword}
            setVerPassword={setVerPassword}
            showConfirmPassword={showConfirmPassword}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          />

          <ButtonUser isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}

export default Password;
