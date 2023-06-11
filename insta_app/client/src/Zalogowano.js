
const Zalogowano = () => {

    console.log(localStorage.getItem("myToken"));

    if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    setInterval(() => {
        if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    }, 30000)

 return (  
        <>
            <navbar className = "navbar" id = "navZalogowano">
                <div className='wyloguj'><a href="/wyloguj">Wyloguj</a></div>
                <div><a href="/wyslijZdjecie">Wyślij zdjęcie</a></div>
                <div><a href="/mojeZdjecia">Moje zdjęcia</a></div>
                <div><a href="/wszystkieZdjecia">Wszystkie zdjęcia</a></div>
            </navbar>
        </>
    )

}

export default Zalogowano;
