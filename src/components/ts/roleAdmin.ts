const roleAdmin = (navigate: (path: string) => void) => {
  const roles = localStorage.getItem("USER_SESSION");

  if (roles) {
    const userSession = JSON.parse(roles);
    const role = userSession.role;

    if (role === "admin") {
      navigate("/categoriasUser");
    }
  }
};

export default roleAdmin;
