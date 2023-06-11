import { useState } from 'react';
// const utils = require("./utils");

const WyslijZdjecie = () => {

    if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    setInterval(() => {
        if (!localStorage.getItem("myToken")) {
        window.location.href = '/';
    }
    }, 30000)

  const [state, setState] = useState({
    text: "album",
    file: null
  });

  const onChangeFile = (e) => {
  const file = e.target.files[0];
  setState((prevState) => ({ ...prevState, file }));
};


    const postFileToServer = async (event) => {
  event.preventDefault();
  const { file } = state;
  
  const fd = new FormData();

  if (file) {
    fd.append("file", file);

    try {
    let result = await fetch("http://localhost:4000/api/photos", {
      method: "POST",
      body: fd,
      headers: { authorization: 'Bearer ' + localStorage.getItem("myToken"), }
    });
    const responseText = await result.text()
    console.log(responseText);
    if (result) {
      document.getElementById('bladwysl').innerHTML = "Wysłano!"
    }
  } catch (ex) {
    console.log(ex);
  }
  }

};


  return (
    <>
    <div>
        <navbar className = "navbar" id = "navLogin">
            <div className='wyloguj'><a href="/wyloguj">Wyloguj</a></div>
            <div><a href="/zalogowano">Wstecz</a></div>
        </navbar>
    </div>
    <div>
      <form onSubmit={postFileToServer}>
        <pre>
            <div>
            Wybierz zdjęcie:    <input id="fileWys" type="file" accept=".png, .jpg, .jpeg, .gif" onChange={onChangeFile}/>
          </div>
          <input type='submit' id="submitWys" name='submitek'/>
          <div id='bladwysl'></div>
        </pre>
      </form>
    </div>
    </>
  );
};

export default WyslijZdjecie;
