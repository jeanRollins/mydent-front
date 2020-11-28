import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Header from './components/Header';
import 'fontsource-roboto';

//Pages
import RecoveryPass from './pages/RecoveryPass' ;
import Home from './pages/Home' ;
import Dashboard from './pages/Dashboard' ;



function App( props ) {  
  return (
    
    <Router>

      <>
          <Header/>
         
          <Switch>
          
            <Route path="/"              exact component = { Home } /> 
            <Route path="/dashboard"     exact component = { Dashboard } />
            <Route path="/recoverypass"  exact component = { RecoveryPass } /> 

            

            {/* <Route path = "*"  component = { PageNotFound }  /> */}
          </Switch>
      </>

    </Router>
  );
}

export default App;
