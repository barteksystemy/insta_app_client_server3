import { useState } from 'react';
// const utils = require("./utils");

const Login = () => {

  const [state, setState] = useState({
    email: "email",
    passwd: "password"
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
    // console.log(state);
  };

  const handleInputClick = (event) => {
    const { id, value } = event.target;
    if (value === state[id]) {
      setState((prevState) => ({ ...prevState, [id]: '' }));
    }
  };

  const handleFormSubmit = async (event) => {
  event.preventDefault();

  const { email, passwd } = state;
  const data = {
    email: email,
    password: passwd
  };

  try {
    let result = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseText = await result.text();
    if (responseText === 'Złe hasło!' || responseText === 'Zły email!' || responseText === 'Nie potwierdzone konto!') {
        document.getElementById("blad").innerHTML = responseText
    } else {
        localStorage.setItem("myToken", responseText);
        window.location.href = '/zalogowano';  
    }
  } catch (ex) {
    console.log(ex);
  }
};

  return (
    <>
    <div>
        <navbar className = "navbar" id = "navLogin">
            <div><a href="/">Strona główna</a></div>
            <div><a href="/register">Register</a></div>
        </navbar>
    </div>
    <div>
      <form onSubmit={handleFormSubmit}>
        <pre>
          <div>
            email:      <input id="email" type="email" value={state.email} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <div>
            password:   <input id="passwd" type="password" value={state.passwd} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <input type='submit' id="submitLogin" name='submitek'/>
          <div id='blad'></div>
        </pre>
      </form>
    </div>
    </>
  );
};

export default Login;
