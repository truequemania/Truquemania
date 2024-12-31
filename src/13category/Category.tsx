import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function Category(){
    authRedirectNoToken("/login");
    return(
        <div>Categorias usuarios</div>
    );
}

export default Category;