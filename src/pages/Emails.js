
import React ,{useState} from 'react';
import Title from '../components/Title';
import TableResponsive from '../components/Table';
import  {
          Grid        , 
          TextField   , 
          Container   ,
          FormControl , 
          InputLabel  ,
          Select      ,
          Input       ,
          MenuItem
        }  from '@material-ui/core/';

const style = {

  paddingSearch : {
    pagging: '0px 15px 0px 15px ' 
  },
  topMargin : {
    marginTop: '40px'
  }
} ;
function  Emails ()  {  

    const rows = [
      { id: 1, name: 'Jon Snow',   rut : '18191387-8',    mail: 'rfuran@gmail.com'  , birthday: '12/03/1992' },
      { id: 2, name: 'Lannister',  rut : '11222333-4',    mail: 'rttcarl@gmail.com' , birthday: '12/03/1992' },
      { id: 3, name: 'Lannister',  rut : '22333444-5',    mail: 'taluis@gmail.com' , birthday: '12/03/1992' },
      { id: 4, name: 'Stark',      rut : '77222333-1',    mail: 'jsoto@gmail.com' , birthday: '12/03/1992' },
      { id: 5, name: 'Targaryen',  rut : '66111444-1',    mail: 'rafita@gmail.com' , birthday: '12/03/1992' },
      { id: 6, name: 'Melisandre', rut : '33222555-4',    mail: 'hsimpsons@gmail.com' , birthday: '12/03/1992' },
      { id: 7, name: 'Clifford',   rut : '77888444-2',    mail: 'ernesto@gmail.com' , birthday: '12/03/1992' },
      { id: 8, name: 'Frances',    rut : '55444666-1',    mail: 'cruiz@gmail.com' , birthday: '12/03/1992' },
      { id: 9, name: 'Roxie',      rut : '22000111-4',    mail: 'ftocalli@gmail.com' , birthday: '12/03/1992' },
    ] ; 

    const columns = [
      { field: 'id',      headerName: 'N°'     , width: 60 },
      { field: 'name',      headerName: 'Nombre'     , width: 150 },
      { field: 'rut',    headerName: 'Rut'   , width: 140 },
      { field: 'mail',    headerName: 'Correo' , width: 220  },
      { field: 'birthday',  headerName: 'Cumpleaños' , width: 150 } 

    ];

    const typesEmails = [
      'Promoción',
      'Informativo'
    ];


    const [typeEmail, setPersonName] = useState([]);



    return (
        <>
          <Container fixed>
            <Title title={"Envio de correos"}/>

            <Grid 
              container 
              style={ style.topMargin }  
              >
                  
              <Grid item xl={12}>
                <TextField id="standard-basic" label="Buscador Pacientes" fullWidth />
              </Grid>

              <Grid item xl={12} style={ style.topMargin }>
                <FormControl fullWidth>
                  <InputLabel id="demo-mutiple-name-label">Tipo de correo</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={typeEmail}
                    //onChange={handleChange}
                    input={<Input />}
                    
                    //MenuProps={MenuProps}
                  >
                    {typesEmails.map( type => (
                      <MenuItem key={type} value={type} >
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
           
          </Container>

          <Container fixed>

            <Grid container  >
                  
              <Grid 
                item 
                xl = {12 }
                style={ style.topMargin }
              >
                  <TableResponsive 
                    rows = {rows}
                    columns = {columns} 
                    selected = { true }
                  />
              </Grid>
            </Grid>
          </Container>

      
         
        </>
        
    
  );
}

export default Emails ;
