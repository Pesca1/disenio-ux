import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainScreen from "./components/MainScreen";
import AddressScreen from "./components/AddressScreen";
import AddressSelection from "./components/AddressSelection";
import PathSelection from "./components/PathSelection";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/path-selection' component={PathSelection}/>
        <Route path='/address-selection' component={AddressSelection}/>
        <Route path='/address' component={AddressScreen} />
        <Route path='/' component={MainScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
