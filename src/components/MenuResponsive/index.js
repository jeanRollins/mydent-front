import React from 'react';
import "./index.css";
import { slide as Menu }     from  "react-burger-menu" ;
import { ClearStorage }      from  '../../libs/Storage' ;
import { withRouter, Link }  from  'react-router-dom' ;
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


const styles = {
  link : {
    color : '#FFFFFF',
    textDecoration : 'none' 
  },
  buttonMenu : {
    float: 'right',
    margin : '10px 0px 0px 0px '
  },
  icon : {
    display: 'inline' ,
    position: 'fixed' ,
    margin: '0px 0px 0px 10px'
  }
} ;

const MenuResponsive = props => {
  
  const closeSession = ( e ) => {
    e.preventDefault() ;
    ClearStorage() ;
    window.location.pathname = "/"  ;
  };

  return (
    <div style={ styles.buttonMenu }> 
      <Menu  right >
         <Link   
            to    = { '/back/dashboard' }
            style = { styles.link }
          >
          <span className="monserrat700"> Dr. { props.name } </span>   
          <div style={ styles.icon }>
           <AccountCircleRoundedIcon/>
          
          </div> 
        </Link>
 
        <br/>  
        { props.menu.map( ( row , index ) => (
          <div key = { index }>
            { ( row.type !== 'select' ) && (
              <>      
                <Link   
                  to    = { row.url }
                  style = { styles.link }
                >
                  { row.name }
                </Link>
                <hr/>
              </>
            )}
          </div>
        ))}

        <a style= { styles.link } onClick = { e => closeSession( e ) } > Cerrar sesión  </a>
      </Menu>
    </div>
  );
};


export default withRouter( MenuResponsive )  ;
