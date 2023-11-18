import React from 'react';
import MaterialTable from 'material-table';
import employees from '../data/Employees.json';

export default function Home() {
  const { useState } = React;
  const [selectedRow, setSelectedRow] = useState(null);
  let employeesList =
    JSON.parse(window.localStorage.getItem('employeesList')) || employees;
  return (
    <div className="employees-list">
      <h2 className="title">Current Employees</h2>
      <div style={{ maxWidth: '100%' }}>
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
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? 'lightgrey' : '#FFF',
              fontSize: '13px',
            }),
            pageSizeOptions: [5, 10, 20, 50],
            tableLayout: 'fixed',
            headerStyle: {
              backgroundColor: '#93ad18',
              fontWeight: 'bold',
              fontSize: '13px',
            },
          }}
        />
      </div>
    </div>
  );
}
