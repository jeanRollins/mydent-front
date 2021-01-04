import { GetItemsBudgetFull , GetBudgetsFull  } from '../services/Budget' ;
import {
    format,
    rutFormater
} from './Commons';

export const GetBudgets = async ( rutUser , rutPatient ) => {
    const data = await GetBudgetsFull( rutUser , rutPatient ) ;
    if( data.data.length > 0 ){
        
        const patient = { 
            name          : data.data[0].name ,
            previsionId   : data.data[0].prevision_id ,
            born          : data.data[0].born , 
            rut           : data.data[0].rut_paciente , 
            namePrevision : data.data[0].name_prevision , 
        }
        let i = 0 ;
        const budgets = data.data.map( row => {
            i++ ;
            return {
                number : i , 
                created : row.create_budget , 
                id  : row.id_budget ,
                state : row.state_budget ,
                rutPatient : data.data[0].rut_paciente ,
                name         : data.data[0].name ,
                rutPatientFormat : rutFormater( data.data[0].rut_paciente ) 
            }
        }) ;

        return { patient , budgets } ;
    }
    else {
        return { patient : {} , budgets : [] } ;
    }
    

}


export const GetItemBudget = async ( id , rutUser ) => {
    const data = await GetItemsBudgetFull( id , rutUser ) ;
    
    if( data.data.length > 0 ){
        
        const patient = { 
            name          : data.data[0].name ,
            previsionId   : data.data[0].prevision_id ,
            born          : data.data[0].born , 
            rut           : data.data[0].rut_paciente , 
            namePrevision : data.data[0].name_prevision , 
        }
        let i = 0 ;
        const items = [] ; 
        
        data.data.forEach( row => {
            i++ ;
            const item = {
                number         : i , 
                id             : row.id_budget , 
                idItem         : row.id_item , 
                idTratament    : row.id_tratament ,
                nameSpeciality : row.name_speciality ,
                tooth          : row.tooth ,
                stateTratament : row.state_tratament ,
                value          : row.value_tratament ,
                formatValue    : '$' + format( row.value_tratament ) ,
                typeSpecialty  : row.type_specialty ,
                class          : row.class_speciality ,
                faceTooth      : row.face_tooth ,
                dateCompleted  : row.date_completed
            }
            items.push(item) ;
        }) ;

        let dataTrataments = [] ;

        data.data.forEach( row => {
            i++ ;
            if( !row.tooth || row.tooth !== 0 ){
                const item = {
                    number         : i , 
                    id             : row.id_budget , 
                    idItem         : row.id_item , 
                    idTratament    : row.id_tratament ,
                    nameSpeciality : row.name_speciality ,
                    tooth          : row.tooth ,
                    stateTratament : row.state_tratament ,
                    value          : row.value_tratament ,
                    formatValue    : '$' + format( row.value_tratament ) ,
                    typeSpecialty  : row.type_specialty ,
                    class          : row.class_speciality ,
                    faceTooth      : row.face_tooth ,
                    dateCompleted  : row.date_completed
                }
                dataTrataments[row.tooth] = item ;
            }
            
        }) ;

        return { patient , items , dataTrataments } ;
    }
    else {
        return { patient : {} , items : [] } ;
    }
}
