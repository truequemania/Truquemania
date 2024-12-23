import { useState } from "react";

function useEmailVerificacion() {
    const [email, setEmail] = useState("");
    return { email, setEmail };
}

export default useEmailVerificacion;