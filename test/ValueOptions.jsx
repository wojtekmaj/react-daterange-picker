import React from 'react';
import PropTypes from 'prop-types';

import {
  getISOLocalDate,
  getBeginOfDay,
  getEndOfDay,
} from './shared/dates';

export default function ValueOptions({
  setState,
  value,
}) {
  const startDate = [].concat(value)[0];
  const endDate = [].concat(value)[1];

  function setValue(nextValue) {
    setState({ value: nextValue });
  }

  function setStartValue(startValue) {
    if (!startValue) {
      setValue(value[1] || startValue);
      return;
    }

    if (Array.isArray(value)) {
      setValue([startValue, value[1]]);
    } else {
      setValue(startValue);
    }
  }

  function setEndValue(endValue) {
    if (!endValue) {
      setValue(value[0]);
      return;
    }

    if (Array.isArray(value)) {
      setValue([value[0], endValue]);
    } else {
      setValue([value, endValue]);
    }
  }

  function onStartChange(event) {
    const { value: nextValue } = event.target;
    setStartValue(getBeginOfDay(new Date(nextValue)));
  }

  function onEndChange(event) {
    const { value: nextValue } = event.target;
    setEndValue(getEndOfDay(new Date(nextValue)));
  }

  return (
    <fieldset id="valueOptions">
      <legend htmlFor="valueOptions">
        Value options
      </legend>

      <div>
        <label htmlFor="startDate">
          Start date
        </label>
        <input
          id="startDate"
          onChange={onStartChange}
          type="date"
          value={startDate ? getISOLocalDate(startDate) : ''}
        />
        &nbsp;
        <button
          onClick={() => setStartValue(null)}
          type="button"
        >
          Clear to null
        </button>
        <button
          onClick={() => setStartValue('')}
          type="button"
        >
          Clear to empty string
        </button>
      </div>

      <div>
        <label htmlFor="endDate">
          End date
        </label>
        <input
          id="endDate"
          onChange={onEndChange}
          type="date"
          value={endDate ? getISOLocalDate(endDate) : ''}
        />
        &nbsp;
        <button
          onClick={() => setEndValue(null)}
          type="button"
        >
          Clear to null
        </button>
        <button
          onClick={() => setEndValue('')}
          type="button"
        >
          Clear to empty string
        </button>
      </div>
    </fieldset>
  );
}

ValueOptions.propTypes = {
  setState: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ])),
  ]),
};
