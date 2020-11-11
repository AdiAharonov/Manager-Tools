import React from 'react';
import { Home } from './Pages/Home';
import NewProject  from './Pages/NewProject';
import { Route, Switch } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={NewProject} path="/newproject" />
      </Switch>
    </div>
  );
}

export default App;
