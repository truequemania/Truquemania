import { useState } from 'react';

function User() {
    const [email, setEmail] = useState("");

    return { email, setEmail};
}

export default User;
