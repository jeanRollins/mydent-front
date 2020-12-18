import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const AddItem = async data  =>  {;
    const url = RUTE_SERVICE + '/api/budget/AddItemBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const GetItemsBudget = async data  =>  {;
    const url = RUTE_SERVICE + '/api/budget/GetItemsBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const DeleteItemBudget = async data  =>  {;
    const url = RUTE_SERVICE + '/api/budget/DeleteItemBudget' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}