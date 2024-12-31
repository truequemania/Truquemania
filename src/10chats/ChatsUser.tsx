import authRedirectNoToken from "../components/ts/autRedirectNoToken";

function ChatsUser(){
    authRedirectNoToken("/login");
    return(
        <div>Chats usuarios</div>
    );
}

export default ChatsUser;