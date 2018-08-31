import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import DateRangePicker from '@wojtekmaj/react-daterange-picker/src/entry.nostyle';
// eslint-disable-next-line import/no-unresolved
import '@wojtekmaj/react-daterange-picker/src/DateRangePicker.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-calendar/src/Calendar.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-date-picker/dist/DatePicker.css';

import ValidityOptions from './ValidityOptions';
import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';
import ViewOptions from './ViewOptions';

import './Test.less';

const now = new Date();

export default class Test extends Component {
  state = {
    locale: null,
    maxDate: new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 15, 12),
    maxDetail: 'month',
    minDate: new Date(1995, now.getUTCMonth() + 1, 15, 12),
    minDetail: 'century',
    required: true,
    showLeadingZeros: true,
    showNeighboringMonth: false,
    showWeekNumbers: false,
    value: now,
  }

  onChange = value => this.setState({ value })

  render() {
    const {
      locale,
      maxDate,
      maxDetail,
      minDate,
      minDetail,
      required,
      showLeadingZeros,
      showNeighboringMonth,
      showWeekNumbers,
      value,
    } = this.state;

    const setState = state => this.setState(state);

    return (
      <div className="Test">
        <header>
          <h1>
            react-daterange-picker test page
          </h1>
        </header>
        <div className="Test__container">
          <aside className="Test__container__options">
            <MinDetailOptions
              maxDetail={maxDetail}
              minDetail={minDetail}
              setState={setState}
            />
            <MaxDetailOptions
              maxDetail={maxDetail}
              minDetail={minDetail}
              setState={setState}
            />
            <ValidityOptions
              maxDate={maxDate}
              minDate={minDate}
              required={required}
              setState={setState}
            />
            <LocaleOptions
              setState={setState}
              locale={locale}
            />
            <ValueOptions
              setState={setState}
              value={value}
            />
            <ViewOptions
              setState={setState}
              showLeadingZeros={showLeadingZeros}
              showNeighboringMonth={showNeighboringMonth}
              showWeekNumbers={showWeekNumbers}
            />
          </aside>
          <main className="Test__container__content">
            <form
              onSubmit={(event) => {
                event.preventDefault();

                /* eslint-disable no-console */
                console.warn('Calendar triggered submitting the form.');
                console.log(event);
                /* eslint-enable no-console */
              }}
            >
              <DateRangePicker
                className="myCustomDateRangePickerClassName"
                calendarClassName="myCustomCalendarClassName"
                disabled={false}
                locale={locale}
                maxDate={maxDate}
                maxDetail={maxDetail}
                minDate={minDate}
                minDetail={minDetail}
                name="myCustomName"
                onChange={this.onChange}
                required={required}
                showLeadingZeros={showLeadingZeros}
                showNeighboringMonth={showNeighboringMonth}
                showWeekNumbers={showWeekNumbers}
                value={value}
              />
              <br />
              <br />
              <button
                type="submit"
                id="submit"
              >
                Submit
              </button>
            </form>
          </main>
        </div>
      </div>
    );
  }
}
