export const Months =  ( monthsIndex = 0 , monthName = false )  => {
    console.log( 'monthsIndex' , monthsIndex)
    const month = [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ] ;
    if( monthName )  return month[ monthsIndex ] ;
    return ( monthsIndex == 0 ) ? month : month[ monthsIndex ] ;
} 

export const DayCurrent = (  ) => {
    const date = new Date();
    const dateString = date.getDate() + " de " + Months( date.getMonth(), true ) + " de " + date.getFullYear()
    
    return  dateString ;

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

export const format = ( num ) => {
    num = num + '' ;
    num = num.replace(/\./g,'');
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
    return num
}

export const rutFormater = rut => {
    if (rut.length == 8) {
        return rut.slice(0, -1) + '-' + rut.substr(7);
    } else if (rut.length === 9) {
        return rut.slice(0, -1) + '-' + rut.substr(8);
    } else if (rut.length === 10) {
        return rut.slice(0, -1) + '-' + rut.substr(9);
    }
}

export const DateFormat = date => {
    let day = date.substr(8, 2);
    let month = date.substr(5, 2);
    let year = date.substr(0, 4);
    let time = date.substr(11, 5);
    return (day + '-' + month + '-' + year + ' ' + time)
}

export const TypeFormatEmail = type => {

    if (type === 1) {
        return "Promoción"
    }

    if (type === 2) {
        return "Informativo"
    }

}