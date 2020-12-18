import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import {
	List, 
	ListItem , 
	ListItemAvatar , 
	Avatar, 
	ListItemText, 
	ListItemSecondaryAction ,
	IconButton

} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Dent } from './Dent';
import { GetSpecialty,GetTratament } from '../../services/Specialty'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}

const useStyles = makeStyles((theme) => ({
    formControl: {

        minWidth: 130,
        marginBottom: 40

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        marginTop: 20,
        marginBottom: 20
    }
}));

export const Odontogram = () => {

    const classes = useStyles();

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const [specialties, setSpecialties] = useState([]);
    const [specialtiesTreatment, setSpecialtiesTreatment] = useState([]);

    const [specialty, setSpecialty] = useState('');
    const [specialitiesTreatmentSelected, setSpecialitiesTreatmentSelected] = useState('')


    const [itemBudget, setItemBudget] = useState();


    const [itemsBudget, setItemsBudget] = useState([]);
    
    const [specialtyGeneral, setSpecialtyGeneral] = useState();



    const handleChange = e => {
        setSpecialty(e.target.value)
        GetDataSpecialtiesTreatment(e.target.value)
    }

    const handleChangeTreatment = e => {

        const valueSpecialty = e.target.value;

        const specialtyFounded  = specialtiesTreatment.filter( row => row.id === valueSpecialty );
        const specialtySelected = specialtyFounded[0] ;
        setSpecialtyGeneral( specialtySelected );


        setSpecialitiesTreatmentSelected( e.target.value ) ;
        
        if( specialtySelected.type === 'no-mark' ){

            setItemsBudget( [...itemsBudget, specialtySelected] ) ;
        }


        
    }



    const GetDataSpecialty = async () => {
        const data = await GetSpecialty();
        setSpecialties(data);
        
    }

    const GetDataSpecialtiesTreatment = async treatment => {
        const data = await GetTratament(treatment);
        setSpecialtiesTreatment(data);

        
    }



    useEffect(() => {
        GetDataSpecialty();
    }, []);


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

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={2}
                        xl={2}
                    >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Especialidades</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={specialty}
                                onChange={handleChange}
                            >
                                {specialties.map(specialty => <MenuItem key={specialty.id} value={specialty.id}>{specialty.name}</MenuItem>)}
                            </Select>

                        </FormControl>
                    </Grid>



                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={3}
                        xl={3}
                    >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Trataminetos</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={specialitiesTreatmentSelected}
                                onChange={handleChangeTreatment}
                            >
                                {specialtiesTreatment.map(specialtiesTreatment => <MenuItem key={specialtiesTreatment.id} value={specialtiesTreatment.id}>{specialtiesTreatment.nombre}</MenuItem>)}
                            </Select>

                        </FormControl>
                    </Grid>
                </Grid>







                <br />

                {dientes.map(index => (
                    <Dent
                        specialtiesTreatment={specialtiesTreatment}
                        specialtyGeneral={specialtyGeneral}
                        specialitiesTreatmentSelected={specialitiesTreatmentSelected}
                        key={index}
                        index={index}
                        
                    />
                ))}

            </Container>




            <Container className={classes.margin} >

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={2}
                        xl={2}
                    >
                        <Title title="Presupuesto" type="secondary" />
                      
                    </Grid>

                </Grid>
            </Container>

            <Container  >

                <Grid container>
    
                    {  itemsBudget.map( (row , index) => (
                        <Grid item xs={12}   key={index}>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <FormatListBulletedIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary   = {row.nombre}
                                        secondary ={secondary ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>


            <Container className={classes.margin} >

                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={2}
                        xl={2}
                    >
                    </Grid>


                    <Button
                        color     = "primary"
                        variant   = "contained"
                    >
                        Generar Presupuesto
                    </Button>
                </Grid>
            </Container>
            
        </>
    )
}
