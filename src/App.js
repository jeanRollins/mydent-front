import React , { useState , useEffect } from 'react';
import { BrowserRouter as Router , Route , Switch , withRouter } from 'react-router-dom';
import Header from './components/Header';

//Pages
import RecoveryPass from './pages/RecoveryPass' ;
import Home from './pages/Home' ;
import Dashboard from './pages/Dashboard' ;
import Emails from './pages/Emails' ;
import { GetItem, GetItemJson } from './libs/Storage';



function App( props ) {  

  const [user, setUser] = useState({}) ;
  
  const isUserActive = () => {
    if( user.id == undefined ) {
      props.history.push('/') ;
      return ;
    }
  }
  //isUserActive() ;
  
  //console.log( 'item*' , GetItemJson('user') ) ;
  

  return (
    
    <Router>

      <>
          <Header  />
         
          <Switch>
          
            <Route path="/"              exact component = { Home } /> 
            <Route path="/dashboard"     exact component = { Dashboard } />
            <Route path="/recoverypass"  exact component = { RecoveryPass } /> 
            <Route path="/correos"       exact component = { Emails } /> 


            

            {/* <Route path = "*"  component = { PageNotFound }  /> */}
          </Switch>
      </>

    </Router>
  );
}

export default   App  ;
