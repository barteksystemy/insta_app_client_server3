import { useEffect } from 'react';
const WszystkieZdjecia = () => {

    if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    setInterval(() => {
        if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    }, 30000)

    const handleGet = async () => {
  try {
    let result = await fetch("http://localhost:4000/api/photos/user", {
      method: "GET",
      headers: { authorization: 'Bearer ' + localStorage.getItem("myToken"), }
    });
    const array = await result.json();
    for (let element of array) {
      let result2 = await fetch("http://localhost:4000/api/photos/image/" +element.id, {
      method: "GET",
      headers: { authorization: 'Bearer ' + localStorage.getItem("myToken"), }
    });
    const photo = await result2.blob();
      let img = document.createElement("img");
      let div = document.createElement("div");
      img.setAttribute("id", element.id)
      div.setAttribute("id", element.originalName + element.id)
      if (!document.getElementById(element.originalName)) {
        if (!document.getElementById(element.originalName + element.id)) {
        div.style.height = "200px"
        div.style.padding = "50px"
        div.style.display = "flex"
        div.style.alignItems = "center"
        div.style.justifyContent = "center"
        div.style.border = "1px solid"
        div.style.flexDirection = "column"
        img.setAttribute("src", URL.createObjectURL(photo))
        img.style.width = "auto"
        img.style.height = "100px"
        img.style.cursor = "pointer"
        img.onclick = () => {
          window.open(URL.createObjectURL(photo), '_blank');
        }
        div.append(img)
        document.getElementById('wszystkiezdjecia').append(div)
        }
      }
    }
    
  } catch (ex) {
    console.log(ex);
  }
};

  useEffect(() => {
      handleGet()
    }, [])

  return (
    <>
    <div>
        <navbar className = "navbar" id = "navLogin">
            <div className='wyloguj'><a href="/wyloguj">Wyloguj</a></div>
            <div><a href="/zalogowano">Wstecz</a></div>
        </navbar>
    </div>
      <div><input type="submit" onClick={handleGet} id="wszystkiesubmit" value={"odśwież"}/></div>
      <div id="wszystkiezdjecia"></div>
    </>
  );
};

export default WszystkieZdjecia;
