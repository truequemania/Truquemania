import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

function handleEmailVerificacion(
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    setIsLoading(true);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const register = await handleSubmitEmail(event, email, setEmail);

        if (register) {
            setTimeout(() => {
                navigate("/verificacion");
            }, 3000);
        }

        setIsLoading(false);
    };

    return { handleSubmit, isLoading };

}

export default handleEmailVerificacion;