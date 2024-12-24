import { useState } from 'react';

function User() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [verPassword, setVerPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return {
        password, setPassword, verPassword, setVerPassword, showPassword, showConfirmPassword,
        togglePasswordVisibility, toggleConfirmPasswordVisibility
    };
}

export default User;
