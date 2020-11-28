import React from 'react';
import { Typography  } from '@material-ui/core/';


const Title = props => {
        

    return(
        <Typography variant="h5" align="center" style={ { color : '#595959' , marginTop : '50px' } } gutterBottom>
            { props.title }
        </Typography>
    )
}

export default Title ;