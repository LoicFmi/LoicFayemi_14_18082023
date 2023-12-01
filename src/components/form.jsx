import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { states, departments, months } from '../data/Dropdown';
import DatePicker from 'react-datepicker';
import { subYears, addYears, getYear, getMonth } from 'date-fns';
import range from 'lodash/range';
import 'react-datepicker/dist/react-datepicker.css';
import useStore from '../store';
import { useForm } from 'react-hook-form';
import ConfirmationModal from 'modal-library-lfmi';
import close from '../assets/img/close.png';
import user from '../assets/img/user.png';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [department, setDepartment] = useState(departments[0]);
  const [birthDate, setBirthDate] = useState(subYears(new Date(), 18));
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(states[0]);
  const [zipCode, setZipCode] = useState('');
  const years = range(1950, getYear(new Date()) + 2, 1);
  const [modalState, setModalState] = useState(false);
  const handleOpen = () => {
    setModalState(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setModalState(false);
  };
  const { handleSubmit } = useForm();
  const addEmployee = useStore((state) => state.addEmployee);
  const onSave = (data) => {
    data.firstname = firstName;
    data.lastname = lastName;
    data.startdate = startDate;
    data.department = department.value;
    data.birthdate = birthDate;
    data.street = street;
    data.city = city;
    data.state = state.value;
    data.zipcode = zipCode;

    addEmployee(data);

    setFirstName('');
    setLastName('');
    setStartDate(new Date());
    setDepartment(departments[0]);
    setBirthDate(subYears(new Date(), 18));
    setStreet('');
    setCity('');
    setState(states[0]);
    setZipCode('');

    handleOpen();
  };

  return (
    <form action="" className="employee-form" onSubmit={handleSubmit(onSave)}>
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
          placeholder={'Alabama'}
          onChange={(state) => setState(state)}
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
        placeholder={'Sales'}
        onChange={(department) => setDepartment(department)}
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
