
import React, { useState } from "react";
import Magic from 'magic-sdk/dist/magic.js';

const magic = new Magic("pk_test_6FF36775EE4686D4");
console.log(magic);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(magic.user.isLoggedIn());
  const [userMetadata] = useState(magic.user.getMetadata());

  const handleLogin = async e => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    if (email) {
      await magic.auth.loginWithMagicLink({ email });
    }
  };
  
  const handleLogout = async () => {
    setLoggedIn(false);
    await magic.user.logout();
  };
  
  return (
    <div id="app">
      {loggedIn ? <>
        <h1>Current user: { userMetadata.email }</h1>
        <button onClick={() => handleLogout()}>Logout</button>
      </> : <>
        <h1>Please sign up or login</h1>
        <form onSubmit={event => handleLogin(event)}>
          <input 
            type="email" 
            name="email" 
            required="required" 
            placeholder="Enter your email" 
          />
          <button type="submit">Send</button>
        </form> 
      </>}
    </div>
  )
}

export default App;

