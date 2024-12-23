import { useNavigate } from "react-router-dom";
import { submitUrls } from "./submitUrls";

export interface UserData {
    name: string;
    email: string;
}

async function VerificationUrls(tokens: any) {

    const navigate = useNavigate();

    if (tokens) {
        const tokenData = await submitUrls(tokens);

        if (tokenData) {
            const { token, name, email } = tokenData;

            localStorage.setItem("ACCESS_TOKEN", token);

            const sessionData: UserData = {
                name,
                email,
            };

            localStorage.setItem("USER_SESSION", JSON.stringify(sessionData));

            setTimeout(() => {
                navigate("/user");
            }, 1000);
        }
    }
}

export default VerificationUrls;