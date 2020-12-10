import React , {useState , useEffect} from 'react';
import { BrowserRouter as Router , Switch  } from 'react-router-dom';
import Header from './components/Header';
import { GetItem, GetItemJson } from './libs/Storage';

import Routes from './Routes';



function App(  ) {  

    return (
      <Router>

        <>
          <Header  />
          
          <Switch>
            <Routes 
              route={"app"}
            />
          </Switch>
        </>

      </Router>
    );
}

export default   App  ;
