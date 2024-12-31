import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function Favorito() {
    authRedirectNoToken("/login");
    return (
        <div>favorito</div>
    );
}

export default Favorito;