import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const AddItem = async data  =>  {
    const url = RUTE_SERVICE + '/api/budget/AddItemBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const GetItemsBudget = async data  =>  {
    const url = RUTE_SERVICE + '/api/budget/GetItemsBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const DeleteItemBudget = async data  =>  {
    const url = RUTE_SERVICE + '/api/budget/DeleteItemBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const GetItemsBudgetFull = async ( id ,rutUser ) =>  {
    const data = { id, rutUser } ;
    const url = RUTE_SERVICE + '/api/budget/GetItemsBudgetFull' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const GetBudgetsFull = async ( rutUser , rutPatient )  =>  {
    const data = { rutUser , rutPatient } ;
    const url = RUTE_SERVICE + '/api/budget/GetBudgetsFull' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const UpdateStateItem = async idItem =>  {
    const data = { idItem } ;
    const url = RUTE_SERVICE + '/api/budget/UpdateStateItem' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const CreateBudgetByUser = async data =>  {
    const url = RUTE_SERVICE + '/api/budget/CreateBudgetByUser' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}
