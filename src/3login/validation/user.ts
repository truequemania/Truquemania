import { useState } from 'react';

function User() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return { email, setEmail, password, setPassword, showPassword,
        isLoading, setIsLoading, togglePasswordVisibility
    };
}

export default User;
