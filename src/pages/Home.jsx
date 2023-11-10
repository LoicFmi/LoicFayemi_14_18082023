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
            { title: 'First Name', field: 'firstname', type: 'text' },
            { title: 'Last Name', field: 'lastname', type: 'text' },
            { title: 'Start Date', field: 'startdate', type: 'date' },
            { title: 'Department', field: 'department', type: 'text' },
            { title: 'Date of Birth', field: 'birthdate', type: 'date' },
            { title: 'Street', field: 'street', type: 'text' },
            { title: 'City', field: 'city', type: 'text' },
            { title: 'State', field: 'state', type: 'text' },
            { title: 'Zip Code', field: 'zipcode', type: 'numeric' },
          ]}
          data={employeesList}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? '#EEE' : '#FFF',
            }),
          }}
        />
      </div>
    </div>
  );
}
