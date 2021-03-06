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

export const ValidEmail = async email => {
    const data = { email } ;
    const url = RUTE_SERVICE + '/user/ValidateEmailExist' ;
    const response = await axios.post( url , data ) ;
    return response.data.isValid ;
}


export const RecoveryPassword = async rut => {
    const data = { rut } ;
    const url = RUTE_SERVICE + '/login/recoverypass' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const ValidRut = async rut  =>  {
    const data = { rut } ;
    const url = RUTE_SERVICE + '/user/ValidateRutExist' ;
    const response = await axios.post( url , data ) ;
    return response.data.isValid ;
}

export const CheckMail = async codMail  =>  {
    const data = { codMail } ;
    const url = RUTE_SERVICE + '/user/CheckMail' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const ValidTokenEmail = async token  =>  {
    const data = { token } ;
    const url = RUTE_SERVICE + '/login/validTokenEmail' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const ChangePass = async (token , password1, password2 )  =>  {
    const data = { token , password1, password2 } ;
    const url = RUTE_SERVICE + '/login/ChangePassword' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}


