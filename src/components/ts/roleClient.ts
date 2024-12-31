const roleClient = (navigate: (path: string) => void) => {
  const roles = localStorage.getItem("USER_SESSION");

  if (roles) {
    const userSession = JSON.parse(roles);
    const role = userSession.role;

    if (role === "client") {
      navigate("/explorar");
    }
  }
};

export default roleClient;
