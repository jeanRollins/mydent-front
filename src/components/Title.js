import React from 'react';
import { Typography  } from '@material-ui/core/';


const Title = props => {
        
    const type = ( props.type === undefined ) ? 'primary' : props.type ;
    let   size  = '' ; 
    let   align = '' ; 

    if( type == 'secondary' ){
        size   = 'h6' ;
        align  = ( props.position === undefined ) ? 'left' : props.position ;
    }
    else{
        size   = 'h4' ;
        align  = ( props.position === undefined ) ? 'center' : props.position ;
    }

    return(

        <Typography variant={ size } align={ align }  style={ {  margin : '50px 0px 30px 0px ' } } gutterBottom>
            <span className="monserrat400" style={ { color : '#595959' } }  >  { props.title } </span>
        </Typography>
    )
}

export default Title ;