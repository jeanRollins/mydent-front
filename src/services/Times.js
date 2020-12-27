import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';


export const AddTimeDate = async ( codTime , rutPatient, rutUser, date, time ) => {
    const data = { 
        codTime , 
        rutPatient , 
        rutUser , 
        date , 
        time
    } ;
    const url = RUTE_SERVICE + '/api/time/AddTime'  ;
    const response = await axios.post( url , data );
    return response.data;
}

export const GetTimes = async ( rutUser, since, until ) => {
    const data = { rutUser, since, until } ;
    const url = RUTE_SERVICE + '/api/time/GetTimes'  ;
    const response = await axios.post( url , data );
    return response.data;
}

export const ChangeStatusTime = async id  => {
    const data = { id } ;
    const url = RUTE_SERVICE + '/api/time/ChangeStatusTime'  ;
    const response = await axios.post( url , data );
    return response.data;
}
