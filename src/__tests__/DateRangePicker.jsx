import React from 'react';
import { mount } from 'enzyme';

import DateRangePicker from '../DateRangePicker';

/* eslint-disable comma-dangle */

describe('DateRangePicker', () => {
  it('passes default name to DateInput', () => {
    const component = mount(
      <DateRangePicker />
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('name')).toBe('daterange_from');
    expect(dateInput.at(1).prop('name')).toBe('daterange_to');
  });

  it('passes custom name to DateInput', () => {
    const name = 'testName';

    const component = mount(
      <DateRangePicker name={name} />
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('name')).toBe(`${name}_from`);
    expect(dateInput.at(1).prop('name')).toBe(`${name}_to`);
  });

  it('passes format to DateInput', () => {
    const format = 'y-MM-dd';

    const component = mount(
      <DateRangePicker format={format} />
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('format')).toBe(format);
    expect(dateInput.at(1).prop('format')).toBe(format);
  });

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

  it('renders range divider', () => {
    const component = mount(
      <DateRangePicker />
    );

    const rangeDivider = component.find('.react-daterange-picker__range-divider');

    expect(rangeDivider).toHaveLength(1);
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


  it('closes Calendar component when clicked outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const component = mount(
      <DateRangePicker isOpen />,
      { attachTo: root }
    );

    const event = document.createEvent('MouseEvent');
    event.initEvent('mousedown', true, true);
    document.body.dispatchEvent(event);
    component.update();

    expect(component.state('isOpen')).toBe(false);
  });

  it('closes Calendar component when focused outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const component = mount(
      <DateRangePicker isOpen />,
      { attachTo: root }
    );

    const event = document.createEvent('FocusEvent');
    event.initEvent('focusin', true, true);
    document.body.dispatchEvent(event);
    component.update();

    expect(component.state('isOpen')).toBe(false);
  });

  it('closes Calendar component when tapping outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const component = mount(
      <DateRangePicker isOpen />,
      { attachTo: root }
    );

    const event = document.createEvent('TouchEvent');
    event.initEvent('touchstart', true, true);
    document.body.dispatchEvent(event);
    component.update();

    expect(component.state('isOpen')).toBe(false);
  });

  it('does not close Calendar component when focused inside', () => {
    const component = mount(
      <DateRangePicker isOpen />
    );

    const customInputs = component.find('input[type="number"]');
    const dayInput = customInputs.at(0);
    const monthInput = customInputs.at(1);

    dayInput.simulate('blur');
    monthInput.simulate('focus');
    component.update();

    expect(component.state('isOpen')).toBe(true);
  });

  it('clears the value when clicking on a button', () => {
    const onChange = jest.fn();

    const component = mount(
      <DateRangePicker onChange={onChange} />
    );

    const calendar = component.find('Calendar');
    const button = component.find('button.react-daterange-picker__clear-button');

    expect(calendar).toHaveLength(0);

    button.simulate('click');
    component.update();

    expect(onChange).toHaveBeenCalledWith(null);
  });

  describe('onChangeFrom', () => {
    it('calls onChange properly given no initial value', () => {
      const component = mount(
        <DateRangePicker />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], true);
    });

    it('calls onChange properly given single initial value', () => {
      const value = new Date(2018, 0, 1);

      const component = mount(
        <DateRangePicker value={value} />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], true);
    });

    it('calls onChange properly given initial value as an array', () => {
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      const component = mount(
        <DateRangePicker value={value} />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, valueTo], true);
    });
  });

  describe('onChangeTo', () => {
    it('calls onChange properly given no initial value', () => {
      const component = mount(
        <DateRangePicker />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([undefined, nextValueTo], true);
    });

    it('calls onChange properly given single initial value', () => {
      const value = new Date(2018, 0, 1);

      const component = mount(
        <DateRangePicker value={value} />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([value, nextValueTo], true);
    });

    it('calls onChange properly given initial value as an array', () => {
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      const component = mount(
        <DateRangePicker value={value} />
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([valueFrom, nextValueTo], true);
    });
  });
});
