import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/src/entry.nostyle';
import '@wojtekmaj/react-daterange-picker/src/DateRangePicker.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-calendar/src/Calendar.less';

import ValidityOptions from './ValidityOptions';
import MaxDetailOptions from './MaxDetailOptions';
import MinDetailOptions from './MinDetailOptions';
import LocaleOptions from './LocaleOptions';
import ValueOptions from './ValueOptions';
import ViewOptions from './ViewOptions';

import './Test.less';

const now = new Date();

const ariaLabelProps = {
  calendarAriaLabel: 'Toggle calendar',
  clearAriaLabel: 'Clear value',
  dayAriaLabel: 'Day',
  monthAriaLabel: 'Month',
  nativeInputAriaLabel: 'Date',
  yearAriaLabel: 'Year',
};

const placeholderProps = {
  dayPlaceholder: 'dd',
  monthPlaceholder: 'mm',
  yearPlaceholder: 'yyyy',
};

/* eslint-disable no-console */

export default class Test extends Component {
  state = {
    disabled: false,
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
      disabled,
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
              disabled={disabled}
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

                console.warn('Calendar triggered submitting the form.');
                console.log(event);
              }}
            >
              <DateRangePicker
                {...ariaLabelProps}
                {...placeholderProps}
                className="myCustomDateRangePickerClassName"
                calendarClassName="myCustomCalendarClassName"
                disabled={disabled}
                locale={locale}
                maxDate={maxDate}
                maxDetail={maxDetail}
                minDate={minDate}
                minDetail={minDetail}
                name="myCustomName"
                onChange={this.onChange}
                onCalendarOpen={() => console.log('Calendar opened')}
                onCalendarClose={() => console.log('Calendar closed')}
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
