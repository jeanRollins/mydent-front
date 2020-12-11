import React  from 'react';
import { BrowserRouter as Router , Route , Switch , withRouter } from 'react-router-dom';
import HeaderBack from './components/HeaderBack';
import { GetItem, GetItemJson } from './libs/Storage';

import Routes from './Routes';


function AppBack( props ) {  
    return (
        
        <Router>

        <>
            <HeaderBack  />
            
            <Switch>
                <Routes
                  route={"back"}
                />
            </Switch>
        </>

        </Router>
    );
}

export default   AppBack  ;
