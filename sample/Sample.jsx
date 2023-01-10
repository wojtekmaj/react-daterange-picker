import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import './Sample.css';

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

export default function Sample() {
  const [value, onChange] = useState([yesterdayBegin, todayEnd]);

  return (
    <div className="Sample">
      <header>
        <h1>react-daterange-picker sample page</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DateRangePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange}
            value={value}
            yearAriaLabel="Year"
          />
        </main>
      </div>
    </div>
  );
}
