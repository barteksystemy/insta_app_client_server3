import { useState } from 'react';

const Register = () => {
  const [state, setState] = useState({
    email: "email",
    fname: "firstname",
    lname: "lastname",
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

  const { fname, lname, email, passwd } = state;
  const data = {
    name: fname,
    lastName: lname,
    email: email,
    password: passwd
  };

  try {
    let result = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseText = await result.text();
    let link = document.getElementById('registerblad');
    link.innerHTML = '<a href="' + responseText.slice(63, 382) + '" target="_blank" style = "color: black">Kliknij ten link aby potwierdzić konto</a>';
    link.onclick = () => {
      setTimeout (() => {
        window.location.href = '/login';
      }, 1000)
    }
  } catch (ex) {
    console.log(ex);
  }
};


  

  return (
    <>
      <div>
        <navbar className = "navbar" id = "navRegister">
          <div><a href="/login">Login</a></div>
          <div><a href="/">Strona główna</a></div>
        </navbar>
    </div>
      <div>
      <form onSubmit={handleFormSubmit}>
        <pre>
          <div>
            email:      <input id="email" type="email" value={state.email} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <div>
            firstname:  <input id="fname" type="text" value={state.fname} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <div>
            lastname:   <input id="lname" type="text" value={state.lname} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <div>
            password:   <input id="passwd" type="password" value={state.passwd} onChange={handleInputChange} onClick={handleInputClick} />
          </div>
          <input type='submit' id="submit" name='submitek'/>
        </pre>
      </form>
        <div id='registerblad'></div>
      </div>
    </>
  );
};

export default Register;
