import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppBack from './AppBack';

import './styles.css'

const url = window.location.pathname.substr(0,5)

if( url != '/back' ){
    
    ReactDOM.render(<App />, document.getElementById('root'));
    
}else{
    ReactDOM.render(<AppBack />, document.getElementById('root'));
    
}
