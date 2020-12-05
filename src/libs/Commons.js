export const Months =  ( monthsIndex = 0 )  => {
    const month = [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ] ;
    return ( monthsIndex == 0 ) ? month : month[ monthsIndex ] ;
} 

export const DayCurrent = (  ) => {
    const date = new Date();
    return  date.getDate() + " de " + Months( date.getMonth() ) + " de " + date.getFullYear() ;

}