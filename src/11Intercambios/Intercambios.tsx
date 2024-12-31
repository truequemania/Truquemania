import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function Intercambios() {
    authRedirectNoToken("/login");
    return (
        <div>Trueques</div>
    );
}

export default Intercambios;