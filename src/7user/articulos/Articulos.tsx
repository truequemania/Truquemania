import User from "./validation/user";
import ArticulosTable from "./components/articulosTable";
import ArticulosCabecera from "./components/articulosCabecera";
import ArticulosForm from "./components/articulosForm";
function Articulos() {

    const { setId, setNombre, setDescripcion, setCategoria, setFecha, setEstado, setImagen, isOpen, setIsOpen } = User();

    const toggleModal = () => {
        setId(0); setNombre(""); setDescripcion(""); setCategoria("");
        setFecha(""); setEstado(""); setImagen(""); setIsOpen(!isOpen);
    };

    const toggleModalAct = () => {
        setId(0); setNombre(""); setDescripcion(""); setCategoria("");
        setFecha(""); setEstado(""); setImagen(""); setIsOpen(!isOpen);
    };

    return (
        <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
            <ArticulosCabecera
                toggleModal={toggleModal}
            />
            <ArticulosTable
                toggleModalAct={toggleModalAct}
            />
            {isOpen && (
                <ArticulosForm
                    toggleModal={toggleModal}
                />
            )}
        </div>
    );
}

export default Articulos;