import React from 'react';
import "./index.css";
import { slide as Menu }     from  "react-burger-menu" ;
import { ClearStorage }      from  '../../libs/Storage' ;
import { withRouter, Link }  from  'react-router-dom' ;


const styles = {
  link : {
    color : '#FFFFFF',
    textDecoration : 'none' 
  },
  buttonMenu : {
    float: 'right',
    margin : '10px 0px 0px 0px '
  }

} ;

const props = ( props ) => {
  
  const closeSession = ( e ) => {
    e.preventDefault() ;
    ClearStorage() ;
    props.history.push('/') ;
  }


  return (
    <div style={ styles.buttonMenu }> 
      <Menu {...props} right >
        { props.menu.map( ( row , index ) => (
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
    </div>
  );
};


export default withRouter( props )  ;
