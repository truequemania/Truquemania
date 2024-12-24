import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Submit } from "./submit";

export interface UserData {
    name: string;
    email: string;
}

function Handle(
    password: string,
    verPassword: string,
    setPassword: Dispatch<SetStateAction<string>>,
    setVerPassword: Dispatch<SetStateAction<string>>,
) {
     const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
    
        const handleSubmit = async (event: FormEvent) => {
            event.preventDefault();
            setIsLoading(true);
    
            const shipment = await Submit(event, password,  verPassword, setPassword, setVerPassword);
    
            if (shipment) {
                const { tokens, name, email } = shipment;
                localStorage.setItem("ACCESS_TOKEN", tokens);
                const sessionData: UserData = {
                    name, email
                };
        
                localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));
                setTimeout(() => {
                    navigate("/explorar");
                }, 3000);
            }
        };
    
        return { handleSubmit, isLoading };
}

export default Handle;
