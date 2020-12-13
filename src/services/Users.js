import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const AddUser = async ( user ) => {
    const url = RUTE_SERVICE + '/user/AddUser' ;
    const response = await axios.post( url , user ) ;
    return response.data ;
}