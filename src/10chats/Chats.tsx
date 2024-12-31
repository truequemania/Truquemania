import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function Chats(){
    authRedirectNoToken("/login");
    return(
        <div>
            Chats
        </div>
    );
}

export default Chats;