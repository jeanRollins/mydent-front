import { ValidToken } from "../services/Login";
import { GetItemJson , ClearStorage } from "./Storage" ;


export const ValidSession = async ( type = '' ) => {
    const user = GetItemJson('user') ;

    const response = ( user != null ) && await ValidToken( user.rut , user.token ) ;


    if( type == 'back' ){

        if( user == null ) redirect('/') ;

        
        if( !response.valid ){
            redirect('/') ;
            //ClearStorage() ;
            return ;
        }
    }
    else {

        if( user != null ){

            if( response.valid ){
                redirect('/back/dashboard') ;
                return ;
            }
        } 
        
          
    }
}  


export const redirect =  url =>  window.location.href = url  ;
 
