import React , { useState , useEffect } from 'react';
import { BrowserRouter as Router , Route , Switch , withRouter } from 'react-router-dom';
import Header from './components/Header';
import { GetItem, GetItemJson } from './libs/Storage';

//Pages
import RecoveryPass from './pages/RecoveryPass' ;
import Home from './pages/Home' ;
import Dashboard from './pages/Dashboard' ;
import Emails from './pages/Emails' ;
import { Pacient } from './pages/Pacient';
import { MedicalRecord } from './pages/MedicalRecord';
import { Odontogram } from './pages/odontogram/Odontogram';



function App( props ) {  

  const [user, setUser] = useState({}) ;
  

  return (
    
    <Router>

      <>
          <Header  />
         
          <Switch>
          
            <Route path="/"              exact component = { Home } /> 
            <Route path="/dashboard"     exact component = { Dashboard } />
            <Route path="/recoverypass"  exact component = { RecoveryPass } /> 
            <Route path="/correos"       exact component = { Emails } /> 
            <Route path="/pacientes"     exact component = {Pacient} />
            <Route path="/ficha_medica"  exact component = {MedicalRecord} />
            <Route path="/odontograma"   exact component = {Odontogram} />

            

            {/* <Route path = "*"  component = { PageNotFound }  /> */}
          </Switch>
      </>

    </Router>
  );
}

export default   App  ;
