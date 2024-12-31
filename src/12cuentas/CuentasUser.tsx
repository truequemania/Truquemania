import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function CuentasUser(){
    authRedirectNoToken("/login");
    return(
        <div>Cuentas usuarios</div>
    );
}

export default CuentasUser;