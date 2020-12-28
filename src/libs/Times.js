import { GetTimes } from '../services/Times' ;

export const GetTimesData = async ( rutUser , date )  => {
    let times = {} ;
    const datesFormat = await GetFormatDate( date ) ; 
    const timesData = await GetTimes( rutUser, datesFormat.firstDate , datesFormat.lastDate ) ;
    
    timesData.data.forEach(  row  =>  times[row.codigo_hora] = row ) ;
    return times ;
}



const GetFormatDate = async date => {

    const data = await nextDays( date , 5 ) ;
    const firstDay = data[0] ;
    const lastDay  = data[ data.length - 1] ;
    const firstDate = firstDay.getFullYear() + ( ( firstDay.getMonth() + 1 ) + "" ) + firstDay.getDate() ;
    const lastDate  = lastDay.getFullYear()  + ( ( lastDay.getMonth()  + 1 ) + "" ) + lastDay.getDate() ;
    return { firstDate, lastDate } ;
}

const createTimes = () => {
    let times = [] ;
    let hour = '' ;
    let hourMedium = '' ; 
    for( let i = 0 ; i < 24 ; i++ ) {
        hour = ( i > 9 ) ? `${i}:00` : `0${i}:00` ;
        hourMedium = ( i > 9 ) ? `${i}:30` : `0${i}:30` ;
        times.push( hour ) ; 
        times.push( hourMedium ) ; 
    }
    return times ;
} ;


const nextDays = ( dayToReady ,  quantityDays) => {
    const dayParameter = ( dayToReady.getMonth() + 1 ) + '/' + dayToReady.getDate() + '/' + dayToReady.getFullYear() ;
    let days = [] ;

    for( let i = 0 ; i < quantityDays ; i++ ) {
        let day = new Date( dayParameter ) ;   
      
        day.setDate( day.getDate() + i ) ;
        days.push( day ) ;        
    }
    return days ;
} ;

const weekdays = day => {
    const days = ['Domingo' , 'Lunes' , 'Martes' ,'Miercoles', 'Jueves' , 'Viernes' , 'Sabado' ] ;
    return days[day] ;
} ;

const weekdaysCode = day => {
    const days = ['sun' , 'mon' , 'tue' ,'wed', 'thu' , 'fri' , 'sat' ] ;
    return days[day] ;
} ;

const monthOfTheYearCode = month => {
    const months = [ 
                        'Jan'   , 'Feb'   , 'Mar' ,
                        'Apr'   , 'May'   , 'Jun' , 
                        'Jul'   , 'Aug'   , 'Sep',
                        'Oct'   , 'Nov'   , 'Dec'
                    ] ;
    return months[month] ;
} ;

const monthOfTheYear = month => {
    const months = [ 
                        'Enero'   , 'Febrero'   , 'Marzo' ,
                        'Abril'   , 'Mayo'      , 'Junio' , 
                        'Julio'   , 'Agosto'    , 'Septiembre',
                        'Octubre' , 'Noviembre' , 'Diciembre'
                    ] ;
    return months[month] ;
}  ;

export const GetNextsDaysNames = async dayToReady  => { 
    const quantityDays = 5 ;
    const days = await nextDays( dayToReady,  quantityDays ) ;
    let nameDays = days.map( day => {
        const date = day.getDate() + '/' +   ( day.getMonth() - 1 ).toString() + '/' + day.getFullYear()
        return { 
            name : weekdays( day.getDay() ) ,
            date ,

        }
    }); 
    return nameDays ;
}

export const GetHours = async ( rutUser , dayToReady ) => {
    let   data = [] ;
    const quantityDays = 5 ;
    const times = await createTimes() ;
    const days  = await nextDays( dayToReady , quantityDays ) ;
    const timesFounded = await GetTimesData( rutUser , dayToReady ) ;
    let i = 1 ;
    
    data = times.map( ( date , indexHours ) => {
        let obj = {} ;
        days.forEach( ( day , index ) => {
            
            const dayOfMonth =  day.getDate() ;
            const month      =  day.getMonth() ; 
            const year       =  day.getFullYear() ;
            const nameDay    =  weekdays( day.getDay() ) ;  
            const nameMonth  =  monthOfTheYear( month ) ;  

            const dateFormat =  ( dayOfMonth + "" ) + '/' + ( month + 1 ) + '/' + year  ;
            const id = ( indexHours + 1 ) + weekdaysCode( day.getDay() ) + monthOfTheYearCode( month ) + dayOfMonth + "" + month + year ;

            const assigned      = ( timesFounded[id] !== undefined ) ;
            const timeData      = ( timesFounded[id] !== undefined ) ? timesFounded[id] : { estado_nombre : 'Disponible' } ; 
            const idTimesDetail = ( timesFounded[id] !== undefined ) ? timesFounded[id].id_orden_detalle : 0 ; 
            const idStateTime   = ( timesFounded[id] !== undefined ) ? timesFounded[id].id_estado : 0 ; 

            obj[ 'day' + ( index + 1 ) ] = {
                numberIndex: i,
                id ,
                dateFormat ,
                nameDay ,
                time : date ,
                nameMonth ,
                day ,
                assigned ,
                timeData ,
                idTimesDetail ,
                idStateTime
            } ;
        }) ;
        
        i++ ;
        return obj ;
    }) ;

    return data ;
}

export const GetTimesDayCurrentAssigned = async ( rutUser , dayToReady ) => {
    let i = 0 ;
    const times = await GetHours( rutUser , dayToReady ) ;
    const timesAssigned = times.filter( time => (time.day1.assigned) ) ;

    const timesFormat   = timesAssigned.map( time => {
        i++ ;
        return {
            id : i ,
            assigned      : time.day1.assigned ,
            dateFormat    : time.day1.dateFormat ,
            codeTime      : time.day1.id  , 
            name          : time.day1.timeData.nombres ,
            secondNameFather : time.day1.timeData.apellido_paterno ,
            fullName      : time.day1.timeData.fullNombre ,
            rutPatient    : time.day1.timeData.rut_paciente ,
            stateName     : time.day1.timeData.estado_nombre ,
            date          : time.day1.timeData.fecha   , 
            time          : time.day1.time ,
            idTimesDetail : time.day1.idTimesDetail ,
            idTimesDetail : time.day1.idTimesDetail ,
            idStateTime   : time.day1.idStateTime 
        };
    }) ;
    return  timesFormat ;
} ;