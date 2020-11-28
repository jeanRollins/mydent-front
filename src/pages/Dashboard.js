import React from 'react';
import Title from '../components/Title';
import { GetItemJson } from '../libs/Storage';

function Dashboard () {  

    const user = GetItemJson('user') ;
    console.log( 'item*' , GetItemJson('user') ) ;
    
    return (
        <>
            <Title title={ 'Dr. ' + user.nombres } />
            
        </>
        
    
  );
}



export default Dashboard  ;