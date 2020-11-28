
export const AddItemJson =  ( field , value ) => {
    const valueToSaved =  JSON.stringify( value ) ;
    localStorage.setItem( field, valueToSaved ) ;
} ; 

export const GetItemJson =  ( field ) => {
    const data =  localStorage.getItem( field ) ;
    return JSON.parse( data ) ;
} ; 

export const GetItem = ( field  ) => {
    const data = localStorage.getItem( field ) ;
    return data ;
} ; 

export const AddItem = ( field , value ) => {
    localStorage.setItem( field, value ) ;
} ; 

export const RemoveItem = ( field ) => {
    localStorage.removeItem( field ) ;
} ;

export const ClearStorage = ( ) => {
    localStorage.clear(  ) ;
} ;

