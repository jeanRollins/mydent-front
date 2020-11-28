import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const SignIn = async ( user ) => {
    const url = RUTE_SERVICE + '/login/authorize' ;
    const response = await axios.post( url , user ) ;
    return response.data ;
}