import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { states, departments, months } from '../data/Dropdown';
import DatePicker from 'react-datepicker';
import { subYears, addYears, getYear, getMonth } from 'date-fns';
import range from 'lodash/range';
import 'react-datepicker/dist/react-datepicker.css';
import employees from '../data/Employees.json';
import ConfirmationModal from 'modal-library-lfmi';
import close from '../assets/img/close.png';
import user from '../assets/img/user.png';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [department, setDepartment] = useState('Sales');
  const [birthDate, setBirthDate] = useState(subYears(new Date(), 18));
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Alabama');
  const [zipCode, setZipCode] = useState('');

  const years = range(1950, getYear(new Date()) + 2, 1);

  const initialState = {
    firstname: '',
    lastname: '',
    startdate: '',
    department: '',
    birthdate: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
  };

  const [newEmployee, setNewEmployee] = useState(initialState);
  const [modalState, setModalState] = useState(false);
  const handleOpen = () => {
    setModalState(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setModalState(false);
  };

  let employeesList =
    JSON.parse(window.localStorage.getItem('employeesList')) || employees;

  const handleSubmit = (e) => {
    e.preventDefault();

    newEmployee.firstname = firstName;
    newEmployee.lastname = lastName;
    newEmployee.startdate = startDate;
    newEmployee.department = department.value;
    newEmployee.birthdate = birthDate;
    newEmployee.street = street;
    newEmployee.city = city;
    newEmployee.state = state.value;
    newEmployee.zipcode = zipCode;

    employeesList.push(newEmployee);

    localStorage.setItem('employeesList', JSON.stringify(employeesList));

    setNewEmployee({ ...newEmployee }, e.target.reset());

    setFirstName('');
    setLastName('');
    setStartDate(new Date());
    setDepartment('Sales');
    setBirthDate(subYears(new Date(), 18));
    setStreet('');
    setCity('');
    setState('Alabama');
    setZipCode('');

    handleOpen();
  };

  return (
    <form action="" className="employee-form" onSubmit={handleSubmit}>
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        required
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        required
      />
      <label htmlFor="date-of-birth">Date of Birth</label>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="datepicker-header">
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="datepicker-select"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className="datepicker-select"
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        selected={birthDate}
        placeholderText="dd/mm/yyyy"
        maxDate={new Date()}
        onChange={(e) => setBirthDate(e)}
        value={birthDate}
        required
      />
      <label htmlFor="start-date">Start Date</label>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="datepicker-header">
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="datepicker-select"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className="datepicker-select"
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        selected={startDate}
        placeholderText="dd/mm/yyyy"
        maxDate={addYears(new Date(), 2)}
        onChange={(date) => setStartDate(date)}
        value={startDate}
        required
      />
      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
          required
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        />

        <label htmlFor="state">State</label>
        <Dropdown
          options={states}
          placeholder={state}
          onChange={(state) => setState(state)}
          value={state}
          required
        />

        <label htmlFor="zip-code">Zip Code</label>
        <input
          id="zip-code"
          type="text"
          pattern="[0-9]{5}"
          maxLength={5}
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
          required
        />
      </fieldset>

      <label htmlFor="department">Department</label>
      <Dropdown
        options={departments}
        placeholder={department}
        onChange={(department) => setDepartment(department)}
        value={department}
        required
      />

      <button type="submit" className="save">
        Save
      </button>

      <ConfirmationModal
        show={modalState}
        defaultStyle={true}
        closeModal={handleClose}
        iconClose={close}
        title="Confirmation"
        hideTitle={false}
        icon={user}
        hideIcon={false}
        text="Employee created"
        hideText={false}
      />
    </form>
  );
}
