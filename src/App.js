import React from "react";
import MainPage from "./MainPage";
import SuccessPage from './SuccessPage';
import { Provider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Firstpage from "./components/Login";
import "./styles.css";


export default class App extends React.Component {
 

  render() {
    return (
      <Provider>
       <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Firstpage} />  
            <Route exact path="/wheel/" component={MainPage} />
            <Route exact path="/success/:item" component={SuccessPage} />
          </Switch>
        </div>
      </Router>
      </Provider>

    );
  }
}

