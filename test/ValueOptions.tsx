import React from 'react';
import { getDayStart, getDayEnd, getISOLocalDate } from '@wojtekmaj/date-utils';

import type { LooseValue } from './shared/types.js';

type ValueOptionsProps = {
  setValue: (value: LooseValue) => void;
  value?: LooseValue;
};

export default function ValueOptions({ setValue, value }: ValueOptionsProps) {
  const [startDate, endDate] = Array.isArray(value) ? value : [value, null];

  function setStartValue(nextStartDate: string | Date | null) {
    if (!nextStartDate) {
      setValue(endDate);
      return;
    }

    if (Array.isArray(value)) {
      setValue([nextStartDate, endDate]);
    } else {
      setValue(nextStartDate);
    }
  }

  function setEndValue(nextEndDate: string | Date | null) {
    if (!nextEndDate) {
      setValue(startDate || null);
      return;
    }

    setValue([startDate || null, nextEndDate]);
  }

  function onStartChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: nextValue } = event.target;

    setStartValue(nextValue ? getDayStart(new Date(nextValue)) : null);
  }

  function onEndChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: nextValue } = event.target;

    setEndValue(nextValue ? getDayEnd(new Date(nextValue)) : null);
  }

  return (
    <fieldset>
      <legend>Value options</legend>

      <div>
        <label htmlFor="startDate">Start date</label>
        <input
          id="startDate"
          onChange={onStartChange}
          type="date"
          value={
            startDate && startDate instanceof Date
              ? getISOLocalDate(startDate)
              : startDate || undefined
          }
        />
        &nbsp;
        <button onClick={() => setStartValue(null)} type="button">
          Clear to null
        </button>
        <button onClick={() => setStartValue('')} type="button">
          Clear to empty string
        </button>
      </div>

      <div>
        <label htmlFor="endDate">End date</label>
        <input
          id="endDate"
          onChange={onEndChange}
          type="date"
          value={
            endDate && endDate instanceof Date ? getISOLocalDate(endDate) : endDate || undefined
          }
        />
        &nbsp;
        <button onClick={() => setEndValue(null)} type="button">
          Clear to null
        </button>
        <button onClick={() => setEndValue('')} type="button">
          Clear to empty string
        </button>
      </div>
    </fieldset>
  );
}
