import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainScreen from "./components/MainScreen";
import AddressScreen from "./components/AddressScreen";
import AddressSelection from "./components/AddressSelection";
import PathSelection from "./components/PathSelection";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'

import { Helmet } from 'react-helmet';
import ThankYou from "./components/ThankYou";
import i18next from 'i18next';


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({

    fallbackLng: "es",
    detection: {
      order: ['cookie', 'localStorage', 'path', 'subdomain']
    },
    backend:{
      loadPath: "./locales/{{lng}}/translation.json",      
    },
    react: {useSuspense: false}
  });

function App() {
  /*
  <Helmet>
        <html htmlAttributes={{lang: i18next.language}} />
      </Helmet>    
  */
 
  return (
    <BrowserRouter>
      <Helmet>
        <html lang="es" />
      </Helmet>    
      <Switch>
        <Route path='/thank-you' component={ThankYou}/>
        <Route path='/path-selection' component={PathSelection}/>
        <Route path='/address-selection' component={AddressSelection}/>
        <Route path='/address' component={AddressScreen} />
        <Route path='/' component={MainScreen} />
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
