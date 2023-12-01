import React from 'react';
import MaterialTable from 'material-table';
import useStore from '../store';

export default function Table() {
  const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);
  const employeesList = useStore((state) => state.employees);
  return (
    <MaterialTable
      title="Current Employees"
      columns={[
        {
          title: 'First Name',
          field: 'firstname',
          type: 'text',
          width: '12%',
        },
        {
          title: 'Last Name',
          field: 'lastname',
          type: 'text',
          width: '12%',
        },
        {
          title: 'Start Date',
          field: 'startdate',
          type: 'date',
          width: '11%',
          customSort: (a, b) =>
            new Date(...a.startdate.split('/').reverse()) -
            new Date(...b.startdate.split('/').reverse()),
        },
        {
          title: 'Department',
          field: 'department',
          type: 'text',
          width: '12%',
        },
        {
          title: 'Date of Birth',
          field: 'birthdate',
          type: 'date',
          width: '11%',
          customSort: (a, b) =>
            new Date(...a.birthdate.split('/').reverse()) -
            new Date(...b.birthdate.split('/').reverse()),
        },
        {
          title: 'Street',
          field: 'street',
          type: 'text',
        },
        { title: 'City', field: 'city', type: 'text', width: '12%' },
        { title: 'State', field: 'state', type: 'text', width: '5%' },
        {
          title: 'Zip Code',
          field: 'zipcode',
          type: 'numeric',
          width: '10%',
        },
      ]}
      data={employeesList}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      options={{
        sorting: true,
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? 'lightgrey' : '#FFF',
          fontSize: '13px',
          height: '50px',
        }),
        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
        tableLayout: 'fixed',
        headerStyle: {
          backgroundColor: '#93ad18',
          fontWeight: 'bold',
          fontSize: '13px',
        },
      }}
    />
  );
}
