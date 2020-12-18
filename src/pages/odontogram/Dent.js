import React, { useRef, useState } from 'react'
import './dent.css'


export const Dent = ({ index, specialitiesTreatmentSelected, handleHistorialOdontogram, specialtyGeneral,specialtiesTreatment }) => {

    const [dent, setDent] = useState({
        state: true,
        cuadro: true,
        izquierdo: true,
        debajo: true,
        derecha: true,
        centro: true
    });

    const sectorPieces = ['centro' , 'izquierdo' , 'derecho' , 'debajo' , 'cuadro'] ;

    const refCuadro = useRef()
    const refIzquierdo = useRef()
    const refDebajo = useRef()
    const refDerecha = useRef()
    const refCentro = useRef()

    const handleChangeAction = pieza => {


        console.log('pieza selecionada',pieza);

        console.log('objeto tratamienot', specialtyGeneral);

    

        if (specialitiesTreatmentSelected) {

            specialtyGeneral.diente = index;
            specialtyGeneral.pieza = pieza;

            console.log('specialtyGeneral' , specialtyGeneral) ;
            if( specialtyGeneral.type === 'piece' ){
                
                const containClassCuadro = refCuadro.current.classList.contains( specialtyGeneral.class)
                const containClassIzquierdo = refIzquierdo.current.classList.contains( specialtyGeneral.class)
                const containClassDebajo = refDebajo.current.classList.contains( specialtyGeneral.class)
                const containClassDerecha = refDerecha.current.classList.contains( specialtyGeneral.class)
                const containClassCentro = refCentro.current.classList.contains( specialtyGeneral.class)


                if( !containClassCuadro ,  !containClassIzquierdo ,  !containClassDebajo,  !containClassDerecha,  !containClassCentro ){
                    refCuadro.current.classList.add( specialtyGeneral.class );
                    refIzquierdo.current.classList.add( specialtyGeneral.class );
                    refDebajo.current.classList.add( specialtyGeneral.class );
                    refDerecha.current.classList.add( specialtyGeneral.class );
                    refCentro.current.classList.add( specialtyGeneral.class );
                }
                else {
                    refCuadro.current.classList.remove( specialtyGeneral.class );
                    refIzquierdo.current.classList.remove( specialtyGeneral.class );
                    refDebajo.current.classList.remove( specialtyGeneral.class );
                    refDerecha.current.classList.remove( specialtyGeneral.class );
                    refCentro.current.classList.remove( specialtyGeneral.class );
                }

 
            }
            else {

                if( specialtyGeneral.type === 'sector' ){

                    if(pieza === 'centro'  ){
                        const containClass = refCentro.current.classList.contains( specialtyGeneral.class)
                        if( !containClass ) 
                            refCentro.current.classList.add( specialtyGeneral.class );
                        else
                            refCentro.current.classList.remove( specialtyGeneral.class );
                    }

                    if(pieza === 'izquierdo'  ){
                        const containClass = refIzquierdo.current.classList.contains( specialtyGeneral.class)
                        if( !containClass ) 
                            refIzquierdo.current.classList.add( specialtyGeneral.class );
                        else
                            refIzquierdo.current.classList.remove( specialtyGeneral.class );
                    }

                    if(pieza === 'debajo'  ){
                        const containClass = refDebajo.current.classList.contains( specialtyGeneral.class)
                        if( !containClass ) 
                            refDebajo.current.classList.add( specialtyGeneral.class );
                        else
                            refDebajo.current.classList.remove( specialtyGeneral.class );
                    }
                
                    if(pieza === 'cuadro'  ){
                        const containClass = refCuadro.current.classList.contains( specialtyGeneral.class)
                        if( !containClass ) 
                            refCuadro.current.classList.add( specialtyGeneral.class );
                        else
                            refCuadro.current.classList.remove( specialtyGeneral.class );
                    }

                    if(pieza === 'derecho'  ){
                        const containClass = refDerecha.current.classList.contains( specialtyGeneral.class)
                        if( !containClass ) 
                            refDerecha.current.classList.add( specialtyGeneral.class );
                        else
                            refDerecha.current.classList.remove( specialtyGeneral.class );
                    }
      
                }

            }




        } 
        else {
            return false;
        }

    }


    return (
        <>

            <div  className="diente" >
                <p
                    style={{ align: 'center' }} >
                    {index}
                </p>
                <div
                    onClick={() => handleChangeAction('cuadro')}
                    ref={refCuadro}
                    className={`cuadro `}>
                </div>

                <div
                    onClick={() => handleChangeAction('izquierdo')}
                    ref={refIzquierdo}
                    className={`cuadro izquierdo `} >

                </div>
                <div
                    onClick={() => handleChangeAction('debajo')}
                    ref={refDebajo}
                    className={`cuadro debajo `} >

                </div>
                <div
                    onClick={() => handleChangeAction('derecho')}
                    ref={refDerecha}
                    className={`cuadro derecho `}>

                </div>
                <div
                    onClick={() => handleChangeAction('centro')}
                    ref={refCentro}
                    className={`centro `}>

                </div>


            </div>

        </>
    )
}
