import React from 'react';

import "./index.css";

import { slide as Menu } from "react-burger-menu";
import {Link} from 'react-router-dom' ;

const menu = [
  {
    name : 'Home' ,
    url : '/dashboard'
  },
  {
    name : 'Presupuestos' ,
    url : '/presupuesto'
  },
  {
    name : 'Ficha Médica' ,
    url : '/ficha_medica'
  },
  {
    name : 'Agenda' ,
    url : '/agenda'
  },
  {
    name : 'Envío Correos' ,
    url : '/correos'
  }
] ;

const styles = {
 
  link : {
    color : '#FFFFFF',
    textDecoration : 'none' 
  }


} ;

export default props => {
  

  return (
    <Menu {...props} right >
      { menu.map( row => (
        <>      
          <Link   
            to        = { row.url }
            style     = { styles.link }
          >
            { row.name }
          </Link>
          <hr/>
        </>
      ))}
    </Menu>
  );
};