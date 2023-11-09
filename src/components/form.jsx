import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { states, departments, months } from '../data/Dropdown';
import DatePicker from 'react-datepicker';
import { subYears, getYear, getMonth } from 'date-fns';
import range from 'lodash/range';
import 'react-datepicker/dist/react-datepicker.css';
// import Modal from 'modal-library-lfmi';
// import close from '../assets/img/close.png';

export default function Form() {
  const [birthDate, setBirthDate] = useState(subYears(new Date(), 18));
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1950, getYear(new Date()) + 1, 1);

  return (
    <form action="" className="employee-form">
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" />
      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" />
      <label for="date-of-birth">Date of Birth</label>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
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
        placeholderText="jj/mm/aaaa"
        maxDate={new Date()}
        onChange={(date) => setBirthDate(date)}
      />
      <label for="start-date">Start Date</label>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy"
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
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
        placeholderText="jj/mm/aaaa"
        onChange={(date) => setStartDate(date)}
      />
      <fieldset class="address">
        <legend>Address</legend>

        <label for="street">Street</label>
        <input id="street" type="text" />

        <label for="city">City</label>
        <input id="city" type="text" />

        <label for="state">State</label>
        <Dropdown
          options={states}
          // onChange={this._onSelect}
          // value={states}
          placeholder={'Select a state'}
        />

        <label for="zip-code">Zip Code</label>
        <input id="zip-code" type="text" />
      </fieldset>

      <label for="department">Department</label>
      <Dropdown
        options={departments}
        // onChange={this._onSelect}
        // value={departments[0]}
        placeholder="Select a department"
      />

      <button type="submit" className="save">
        Save
      </button>
      {/* <Modal
        iconClose={close}
        title="Confirmation"
        hideTitle="false"
        text="Employee created"
        hideText="false"
      /> */}
    </form>
  );
}
