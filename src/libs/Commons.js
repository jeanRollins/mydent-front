export const Months =  ( monthsIndex = 0 )  => {
    const month = [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ] ;
    return ( monthsIndex == 0 ) ? month : month[ monthsIndex ] ;
} 

export const DayCurrent = (  ) => {
    const date = new Date();
    return  date.getDate() + " de " + Months( date.getMonth() ) + " de " + date.getFullYear() ;

}

export const ValidateEmail  =  email  =>  {
    const formatEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ ;
    return ( !formatEmail.exec(email) ) ? false : true ;
}

export const ValidateRut  =  rutWithDigit  =>  {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutWithDigit ) ) return false ;
    let tmp 	= rutWithDigit.split('-');
    let digv	= tmp[ 1 ] ; 
    let rut 	= tmp[ 0 ] ;
  
    if ( digv == 'K' ) digv = 'k' ;

    return ( DigitVerificator( rut ) == digv );
}

export const DigitVerificator =  digit => {
    let M = 0 ;
    let S = 1 ;
    for( ; digit ; digit = Math.floor( digit/10) ) S=(S+digit%10*(9-M++%6))%11;
    
    return S ? S - 1 : 'k' ;
}