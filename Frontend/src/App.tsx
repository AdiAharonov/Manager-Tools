import React, { useState, useEffect } from 'react';
import { Home } from './Pages/Home';
import NewProject  from './Pages/NewProject';
import { Route, Switch } from 'react-router-dom'
import UserContext from './context/userContext';
import Axios from 'axios'

function App() {

const [userData, setUserData] = useState<{token: string, user: Object}>({
  token: '',
  user: {}
})

useEffect(() => {
const checkLoggedIn = async () => {
  let token = localStorage.getItem('auth-token')
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }

  const tokenRes = await Axios.post(
    "http://localhost:3050/users/tokenIsValid",
    null,
    { headers: { "x-auth-token": token}}
  );
if (tokenRes.data) {
  const userRes = await Axios.get("http://localhost:3050/users/", {headers: {"x-auth-token": token}})
  setUserData({ token, user: userRes.data})
}
}
checkLoggedIn()
}, [])

  return (
    <>
    <UserContext.Provider value={{userData, setUserData}}>

      <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={NewProject} path="/newproject" />
      </Switch>
    </UserContext.Provider>
    </>
  );
}

export default App;
