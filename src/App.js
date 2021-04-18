import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Game from "./Components/Game";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Menu from "./Components/Menu";
import Settings from "./Components/Settings";

function App() {

  const {fieldWidth} = useSelector(({game, settings}) => {
    return {
      fieldWidth: settings.fieldWidth
    }
  })

  return (
    <div className="App">
      <div className="container" style={{width: fieldWidth}}>
        <Switch>
          {/*<Redirect exact from="/" to="/menu" />*/}
          <Route path="/menu" component={Menu}/>
          <Route path="/run" component={Game}/>
          <Route path="/settings" component={Settings}/>
          <Redirect from="*" to="/menu" />
        </Switch>

      </div>
    </div>
  );
}

export default App;
