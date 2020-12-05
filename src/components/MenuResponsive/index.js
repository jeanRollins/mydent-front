import React from 'react';

import "./index.css";

import { slide as Menu } from "react-burger-menu";
import { ClearStorage } from '../../libs/Storage';
import { withRouter, Link } from 'react-router-dom'



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

const props = ( props ) => {
  
  const closeSession = (e) => {
    e.preventDefault();
    ClearStorage() ;
    props.history.push('/') ;
  }


  return (
    <Menu {...props} right >
      { menu.map( (row , index) => (
        <div key = { index }>      
          <Link   
            to        = { row.url }
            style     = { styles.link }
          >
            { row.name }
          </Link>
          <hr/>
        </div>
      ))}

      <a style= { styles.link } onClick = { e => closeSession( e ) } > Cerrar sesión  </a>
    </Menu>
  );
};


export default withRouter( props )  ;
