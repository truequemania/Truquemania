
import { handleSubmitUserSesion } from "./AuthLogin";
import { useNavigate } from "react-router-dom";
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

function handleSubmitLogin(
    email: string,
    password: string,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>,
) {
     const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
    
        const handleSubmitLoginData = async (event: FormEvent) => {
            event.preventDefault();
            setIsLoading(true);
    
            const registrationSuccessful = await handleSubmitUserSesion(event, email, password, setEmail, setPassword);
    
            if (registrationSuccessful) {
                setTimeout(() => {
                    navigate("/verificacion");
                }, 3000);
            }
    
            setIsLoading(false);
        };
    
        return { handleSubmitLoginData, isLoading };
}

export default handleSubmitLogin