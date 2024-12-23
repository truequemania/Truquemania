

import { useNavigate } from "react-router-dom";
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Submit } from "./submit";

function Handle(
    email: string,
    password: string,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>,
) {
     const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
    
        const handleSubmit = async (event: FormEvent) => {
            event.preventDefault();
            setIsLoading(true);
    
            const shipment = await Submit(event, email, password, setEmail, setPassword);
    
            if (shipment) {
                setTimeout(() => {
                    navigate("/verificacion");
                }, 1000);
            }
    
            setIsLoading(false);
        };
    
        return { handleSubmit, isLoading };
}

export default Handle;