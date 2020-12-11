import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const SignIn = async ( user ) => {
    const url = RUTE_SERVICE + '/login/authorize' ;
    const response = await axios.post( url , user ) ;
    return response.data ;
}

export const ValidToken = async ( rut , token ) => {
    const data = { rut , token } ;
    const url = RUTE_SERVICE + '/login/validToken' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}