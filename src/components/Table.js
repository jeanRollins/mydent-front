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
        onSelectionChange = { props.change }
    />
    </div>
  );
}

export const GetRowCurrent =  params => {

    const fields =  params.api.getAllColumns().map((c) => c.field).filter((c) => c !== "__check__" && !!c);
    const thisRow = {};

    fields.forEach((f) => {
      thisRow[f] = params.getValue(f);
    });

    return thisRow
} ;