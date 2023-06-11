const Wyloguj = () => {
    localStorage.removeItem("myToken");
    window.location.href = '/';  
}

export default Wyloguj