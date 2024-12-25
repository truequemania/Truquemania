
import { useState } from 'react';

function User() {
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState("");
    const [imagen, setImagen] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    return { id, setId, nombre, setNombre, descripcion, setDescripcion, categoria, setCategoria, fecha, setFecha, estado, setEstado, imagen, setImagen, isOpen, setIsOpen};
}

export default User;
