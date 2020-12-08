import React, { useState } from 'react'
import './dent.css'


export const Dent = ({ index, action }) => {

    const [dent, setDent] = useState({
        state: '',
        cuadro: false,
        izquierdo: false,
        debajo: false,
        derecha: false,
        centro: false
    });


    let valueAction = '';

    const handleChangeAction = (pieza) => {



        if (action) {
            if (action === "extraccion") {

                console.log('antes', valueAction);

                if (pieza === "cuadro" || pieza === "izquierdo" || pieza === "debajo" || pieza === "derecha" || pieza === "centro") {
                    setDent({ ...dent, cuadro: true, izquierdo: true, debajo: true, derecha: true, centro: true, state: 'extraccion' });
                    valueAction = 'extraccion';

                    console.log('despues', valueAction);
                }

            } else if (action === "ortodoncia") {

            } else if (action === "tapadura") {

                if (pieza === 'cuadro') {
                    setDent({ ...dent, cuadro: true })

                    if (dent.cuadro === true) {
                        setDent({ ...dent, cuadro: false })
                    }
                }


                if (pieza === 'izquierdo') {
                    setDent({ ...dent, izquierdo: true })

                    if (dent.izquierdo === true) {
                        setDent({ ...dent, izquierdo: false })
                    }
                }

                if (pieza === 'debajo') {
                    setDent({ ...dent, debajo: true })

                    if (dent.debajo === true) {
                        setDent({ ...dent, debajo: false })
                    }
                }

                if (pieza === 'derecha') {
                    setDent({ ...dent, derecha: true })

                    if (dent.derecha === true) {
                        setDent({ ...dent, derecha: false })
                    }
                }

                if (pieza === 'centro') {
                    setDent({ ...dent, centro: true })

                    if (dent.centro === true) {
                        setDent({ ...dent, centro: false })
                    }
                }
            }
        } else {
            console.log('error');
            return false;
        }

    }


    return (
        <>

            <div className="diente">
                <p style={{ align: 'center' }} >{index}</p>

                <div onClick={() => handleChangeAction('cuadro')} className={`cuadro ${dent.state}`}></div>
                <div onClick={() => handleChangeAction('izquierdo')} className={`cuadro izquierdo ${dent.state}`} ></div>
                <div onClick={() => handleChangeAction('debajo')} className={`cuadro debajo ${dent.state}`} ></div>
                <div onClick={() => handleChangeAction('derecha')} className={`cuadro derecha ${dent.state}`}></div>
                <div onClick={() => handleChangeAction('centro')} className={`centro ${dent.state}`}></div>


            </div>

        </>
    )
}
