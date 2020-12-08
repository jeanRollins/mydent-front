import React from 'react'
import Title from '../../components/Title';
import { Container, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Dent } from './Dent';



const useStyles = makeStyles((theme) => ({
    formControl: {

        minWidth: 120,
        marginBottom: 40

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin:{
        marginTop: 20,
        marginBottom: 20
    }
}));

export const Odontogram = () => {

    const classes = useStyles();
    const [action, setAction] = React.useState('');

    const handleChange = (event) => {
        setAction(event.target.value)
        
    };

    const dientes =
        [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32,
        ];

    return (
        <>
            <Title title="Odontograma" />

            <Container className={classes.margin} >

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Accion</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={action}
                        onChange={handleChange}
                    >
                        <MenuItem value="extraccion">Extraccion</MenuItem>
                        <MenuItem value="ortodoncia">Ortodoncia</MenuItem>
                        <MenuItem value={30}>Protesis</MenuItem>
                        <MenuItem value={40}>Implante</MenuItem>
                        <MenuItem value={"tapadura"}>Tapadura</MenuItem>
                    </Select>
                </FormControl>

                <br />

                {dientes.map(index => (
                    <Dent
                        action={action}
                        key={index}
                        index={index}
                        />
                ))}

                    <br/>
                    <br/>
                   

                    

                <Button
                    color="primary"
                    variant="contained"
                >Guardar Odontograma
                    </Button>

                    

            </Container>
        </>
    )
}
