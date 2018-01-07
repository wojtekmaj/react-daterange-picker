import React from 'react';
import { mount } from 'enzyme';

import DateRangePicker from '../DateRangePicker';

/* eslint-disable comma-dangle */

describe('DateRangePicker', () => {
  it('applies className to its wrapper when given a string', () => {
    const className = 'testClassName';

    const component = mount(
      <DateRangePicker className={className} />
    );

    const wrapperClassName = component.prop('className');

    expect(wrapperClassName.includes(className)).toBe(true);
  });

  it('applies calendarClassName to the calendar when given a string', () => {
    const calendarClassName = 'testClassName';

    const component = mount(
      <DateRangePicker
        calendarClassName={calendarClassName}
        isOpen
      />
    );

    const calendar = component.find('Calendar');
    const calendarWrapperClassName = calendar.prop('className');

    expect(calendarWrapperClassName.includes(calendarClassName)).toBe(true);
  });

  it('renders DateInput components', () => {
    const component = mount(
      <DateRangePicker />
    );

    const dateInput = component.find('DateInput');

    expect(dateInput).toHaveLength(2);
  });

  it('renders clear button', () => {
    const component = mount(
      <DateRangePicker />
    );

    const clearButton = component.find('button.react-daterange-picker__clear-button');

    expect(clearButton).toHaveLength(1);
  });

  it('renders calendar button', () => {
    const component = mount(
      <DateRangePicker />
    );

    const calendarButton = component.find('button.react-daterange-picker__calendar-button');

    expect(calendarButton).toHaveLength(1);
  });

  it('renders DateInput and Calendar components when given isOpen flag', () => {
    const component = mount(
      <DateRangePicker isOpen />
    );

    const dateInput = component.find('DateInput');
    const calendar = component.find('Calendar');

    expect(dateInput).toHaveLength(2);
    expect(calendar).toHaveLength(1);
  });

  it('opens Calendar component when given isOpen flag by changing props', () => {
    const component = mount(
      <DateRangePicker />
    );

    const calendar = component.find('Calendar');

    expect(calendar).toHaveLength(0);

    component.setProps({ isOpen: true });
    component.update();

    const calendar2 = component.find('Calendar');

    expect(calendar2).toHaveLength(1);
  });

  it('opens Calendar component when clicking on a button', () => {
    const component = mount(
      <DateRangePicker />
    );

    const calendar = component.find('Calendar');
    const button = component.find('button.react-daterange-picker__calendar-button');

    expect(calendar).toHaveLength(0);

    button.simulate('click');
    component.update();

    const calendar2 = component.find('Calendar');

    expect(calendar2).toHaveLength(1);
  });

  it('opens Calendar component when focusing on an input inside', () => {
    const component = mount(
      <DateRangePicker />
    );

    const calendar = component.find('Calendar');
    const input = component.find('input[name="day"]').first();

    expect(calendar).toHaveLength(0);

    input.simulate('focus');
    component.update();

    const calendar2 = component.find('Calendar');

    expect(calendar2).toHaveLength(1);
  });
});
