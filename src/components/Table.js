import  React from 'react';
import { DataGrid } from '@material-ui/data-grid';


export default function Table(props) {
  return (
    <div style={{ height: 400, width: '89.5%',background:'#F9F9F9' }}>
      <DataGrid 
        rows     = { props.rows} 
        columns  = { props.columns} 
        pageSize = { 5 } 
        checkboxSelection = { props.selected }
    />
    </div>
  );
}