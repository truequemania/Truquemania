import { useNavigate } from "react-router-dom";
import { handleSubmitVerifi } from "./AuthLogin";

export interface UserData {
    name: string;
    email: string;
}

async function verificarTokens(tokens: any) {

    const navigate = useNavigate();

    if (tokens) {
        const tokenData = await handleSubmitVerifi(tokens);

        if (tokenData) {
            const { token, name, email } = tokenData;

            localStorage.setItem("ACCESS_TOKEN", token);

            const sessionData: UserData = {
                name,
                email,
            };

            localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));

            setTimeout(() => {
                navigate("/userhome");
            }, 1000);
        }
    }
}

export default verificarTokens;