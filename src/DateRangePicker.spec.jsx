import React from 'react';
import { mount } from 'enzyme';

import DateRangePicker from './DateRangePicker';

describe('DateRangePicker', () => {
  it('passes default name to DateInput components', () => {
    const component = mount(
      <DateRangePicker />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('name')).toBe('daterange_from');
    expect(dateInput.at(1).prop('name')).toBe('daterange_to');
  });

  it('passes custom name to DateInput components', () => {
    const name = 'testName';

    const component = mount(
      <DateRangePicker name={name} />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('name')).toBe(`${name}_from`);
    expect(dateInput.at(1).prop('name')).toBe(`${name}_to`);
  });

  it('passes autoFocus flag to first DateInput component', () => {
    const component = mount(
      <DateRangePicker autoFocus />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('autoFocus')).toBeTruthy();
    expect(dateInput.at(1).prop('autoFocus')).toBe(undefined);
  });

  it('passes disabled flag to DateInput components', () => {
    const component = mount(
      <DateRangePicker disabled />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('disabled')).toBeTruthy();
    expect(dateInput.at(1).prop('disabled')).toBeTruthy();
  });

  it('passes format to DateInput components', () => {
    const format = 'y-MM-dd';

    const component = mount(
      <DateRangePicker format={format} />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('format')).toBe(format);
    expect(dateInput.at(1).prop('format')).toBe(format);
  });

  it('passes aria-label props to DateInput components', () => {
    const ariaLabelProps = {
      calendarAriaLabel: 'Toggle calendar',
      clearAriaLabel: 'Clear value',
      dayAriaLabel: 'Day',
      monthAriaLabel: 'Month',
      nativeInputAriaLabel: 'Date',
      yearAriaLabel: 'Year',
    };

    const component = mount(
      <DateRangePicker {...ariaLabelProps} />,
    );

    const calendarButton = component.find('button.react-daterange-picker__calendar-button');
    const clearButton = component.find('button.react-daterange-picker__clear-button');
    const dateInput = component.find('DateInput');

    expect(calendarButton.prop('aria-label')).toBe(ariaLabelProps.calendarAriaLabel);
    expect(clearButton.prop('aria-label')).toBe(ariaLabelProps.clearAriaLabel);
    expect(dateInput.at(0).prop('dayAriaLabel')).toBe(ariaLabelProps.dayAriaLabel);
    expect(dateInput.at(0).prop('monthAriaLabel')).toBe(ariaLabelProps.monthAriaLabel);
    expect(dateInput.at(0).prop('nativeInputAriaLabel')).toBe(ariaLabelProps.nativeInputAriaLabel);
    expect(dateInput.at(0).prop('yearAriaLabel')).toBe(ariaLabelProps.yearAriaLabel);
    expect(dateInput.at(1).prop('dayAriaLabel')).toBe(ariaLabelProps.dayAriaLabel);
    expect(dateInput.at(1).prop('monthAriaLabel')).toBe(ariaLabelProps.monthAriaLabel);
    expect(dateInput.at(1).prop('nativeInputAriaLabel')).toBe(ariaLabelProps.nativeInputAriaLabel);
    expect(dateInput.at(1).prop('yearAriaLabel')).toBe(ariaLabelProps.yearAriaLabel);
  });

  it('passes placeholder props to DateInput components', () => {
    const placeholderProps = {
      dayPlaceholder: 'dd',
      monthPlaceholder: 'mm',
      yearPlaceholder: 'yyyy',
    };

    const component = mount(
      <DateRangePicker {...placeholderProps} />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput.at(0).prop('dayPlaceholder')).toBe(placeholderProps.dayPlaceholder);
    expect(dateInput.at(0).prop('monthPlaceholder')).toBe(placeholderProps.monthPlaceholder);
    expect(dateInput.at(0).prop('yearPlaceholder')).toBe(placeholderProps.yearPlaceholder);
    expect(dateInput.at(1).prop('dayPlaceholder')).toBe(placeholderProps.dayPlaceholder);
    expect(dateInput.at(1).prop('monthPlaceholder')).toBe(placeholderProps.monthPlaceholder);
    expect(dateInput.at(1).prop('yearPlaceholder')).toBe(placeholderProps.yearPlaceholder);
  });

  describe('passes value to DateInput components', () => {
    it('passes single value to DateInput components', () => {
      const value = new Date(2019, 0, 1);

      const component = mount(
        <DateRangePicker value={value} />,
      );

      const dateInput = component.find('DateInput');

      expect(dateInput.at(0).prop('value')).toBe(value);
      expect(dateInput.at(1).prop('value')).toBe(undefined);
    });

    it('passes the first item of an array of values to DateInput components', () => {
      const value1 = new Date(2019, 0, 1);
      const value2 = new Date(2019, 6, 1);

      const component = mount(
        <DateRangePicker value={[value1, value2]} />,
      );

      const dateInput = component.find('DateInput');

      expect(dateInput.at(0).prop('value')).toBe(value1);
      expect(dateInput.at(1).prop('value')).toBe(value2);
    });
  });

  it('applies className to its wrapper when given a string', () => {
    const className = 'testClassName';

    const component = mount(
      <DateRangePicker className={className} />,
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
      />,
    );

    const calendar = component.find('Calendar');
    const calendarWrapperClassName = calendar.prop('className');

    expect(calendarWrapperClassName.includes(calendarClassName)).toBe(true);
  });

  it('renders DateInput components', () => {
    const component = mount(
      <DateRangePicker />,
    );

    const dateInput = component.find('DateInput');

    expect(dateInput).toHaveLength(2);
  });

  it('renders range divider with default divider', () => {
    const component = mount(
      <DateRangePicker />,
    );

    const rangeDivider = component.find('.react-daterange-picker__range-divider');

    expect(rangeDivider).toHaveLength(1);
    expect(rangeDivider.text()).toBe('–');
  });

  it('renders range divider with custom divider', () => {
    const component = mount(
      <DateRangePicker rangeDivider="to" />,
    );

    const rangeDivider = component.find('.react-daterange-picker__range-divider');

    expect(rangeDivider).toHaveLength(1);
    expect(rangeDivider.text()).toBe('to');
  });

  it('renders clear button', () => {
    const component = mount(
      <DateRangePicker />,
    );

    const clearButton = component.find('button.react-daterange-picker__clear-button');

    expect(clearButton).toHaveLength(1);
  });

  it('renders calendar button', () => {
    const component = mount(
      <DateRangePicker />,
    );

    const calendarButton = component.find('button.react-daterange-picker__calendar-button');

    expect(calendarButton).toHaveLength(1);
  });

  it('renders DateInput and Calendar components when given isOpen flag', () => {
    const component = mount(
      <DateRangePicker isOpen />,
    );

    const dateInput = component.find('DateInput');
    const calendar = component.find('Calendar');

    expect(dateInput).toHaveLength(2);
    expect(calendar).toHaveLength(1);
  });

  it('does not render Calendar component when given disableCalendar & isOpen flags', () => {
    const component = mount(
      <DateRangePicker disableCalendar isOpen />,
    );

    const dateInput = component.find('DateInput');
    const calendar = component.find('Calendar');

    expect(dateInput).toHaveLength(2);
    expect(calendar).toHaveLength(0);
  });

  it('opens Calendar component when given isOpen flag by changing props', () => {
    const component = mount(
      <DateRangePicker />,
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
      <DateRangePicker />,
    );

    const calendar = component.find('Calendar');
    const button = component.find('button.react-daterange-picker__calendar-button');

    expect(calendar).toHaveLength(0);

    button.simulate('click');
    component.update();

    const calendar2 = component.find('Calendar');

    expect(calendar2).toHaveLength(1);
  });

  describe('handles opening Calendar component when focusing on an input inside properly', () => {
    it('opens Calendar component when focusing on an input inside by default', () => {
      const component = mount(
        <DateRangePicker />,
      );

      const calendar = component.find('Calendar');
      const input = component.find('input[name="day"]').first();

      expect(calendar).toHaveLength(0);

      input.simulate('focus');
      component.update();

      const calendar2 = component.find('Calendar');

      expect(calendar2).toHaveLength(1);
    });

    it('opens Calendar component when focusing on an input inside given openCalendarOnFocus = true', () => {
      const component = mount(
        <DateRangePicker openCalendarOnFocus />,
      );

      const calendar = component.find('Calendar');
      const input = component.find('input[name="day"]').first();

      expect(calendar).toHaveLength(0);

      input.simulate('focus');
      component.update();

      const calendar2 = component.find('Calendar');

      expect(calendar2).toHaveLength(1);
    });

    it('does not open Calendar component when focusing on an input inside given openCalendarOnFocus = false', () => {
      const component = mount(
        <DateRangePicker openCalendarOnFocus={false} />,
      );

      const calendar = component.find('Calendar');
      const input = component.find('input[name="day"]').first();

      expect(calendar).toHaveLength(0);

      input.simulate('focus');
      component.update();

      const calendar2 = component.find('Calendar');

      expect(calendar2).toHaveLength(0);
    });

    it('does not open Calendar component when focusing on a select element', () => {
      const component = mount(
        <DateRangePicker format="dd.MMMM.yyyy" />,
      );

      const calendar = component.find('Calendar');
      const select = component.find('select[name="month"]').first();

      expect(calendar).toHaveLength(0);

      select.simulate('focus');
      component.update();

      const calendar2 = component.find('Calendar');

      expect(calendar2).toHaveLength(0);
    });
  });

  it('closes Calendar component when clicked outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const component = mount(
      <DateRangePicker isOpen />,
      { attachTo: root },
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
      { attachTo: root },
    );

    const event = document.createEvent('FocusEvent');
    event.initEvent('focusin', true, true);
    document.body.dispatchEvent(event);
    component.update();

    expect(component.state('isOpen')).toBe(false);
  });

  it('closes Calendar component when tapped outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const component = mount(
      <DateRangePicker isOpen />,
      { attachTo: root },
    );

    const event = document.createEvent('TouchEvent');
    event.initEvent('touchstart', true, true);
    document.body.dispatchEvent(event);
    component.update();

    expect(component.state('isOpen')).toBe(false);
  });

  it('does not close Calendar component when focused inside', () => {
    const component = mount(
      <DateRangePicker isOpen />,
    );

    const customInputs = component.find('input[type="number"]');
    const dayInput = customInputs.at(0);
    const monthInput = customInputs.at(1);

    dayInput.simulate('blur');
    monthInput.simulate('focus');
    component.update();

    expect(component.state('isOpen')).toBe(true);
  });

  it('closes Calendar when calling internal onChange by default', () => {
    const component = mount(
      <DateRangePicker isOpen />,
    );

    const { onChange } = component.instance();

    onChange(new Date());

    expect(component.state('isOpen')).toBe(false);
  });

  it('does not close Calendar when calling internal onChange with prop closeCalendar = false', () => {
    const component = mount(
      <DateRangePicker
        closeCalendar={false}
        isOpen
      />,
    );

    const { onChange } = component.instance();

    onChange(new Date());

    expect(component.state('isOpen')).toBe(true);
  });

  it('does not close Calendar when calling internal onChange with closeCalendar = false', () => {
    const component = mount(
      <DateRangePicker isOpen />,
    );

    const { onChange } = component.instance();

    onChange(new Date(), false);

    expect(component.state('isOpen')).toBe(true);
  });

  it('calls onChange callback when calling internal onChange', () => {
    const nextValue = new Date(2019, 0, 1);
    const onChange = jest.fn();

    const component = mount(
      <DateRangePicker onChange={onChange} />,
    );

    const { onChange: onChangeInternal } = component.instance();

    onChangeInternal(nextValue);

    expect(onChange).toHaveBeenCalledWith(nextValue);
  });

  it('clears the value when clicking on a button', () => {
    const onChange = jest.fn();

    const component = mount(
      <DateRangePicker onChange={onChange} />,
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
        <DateRangePicker />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], undefined);
    });

    it('calls onChange properly given single initial value', () => {
      const value = new Date(2018, 0, 1);

      const component = mount(
        <DateRangePicker value={value} />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], undefined);
    });

    it('calls onChange properly given initial value as an array', () => {
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      const component = mount(
        <DateRangePicker value={value} />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();
      componentInstance.onChangeFrom(nextValueFrom);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, valueTo], undefined);
    });
  });

  describe('onChangeTo', () => {
    it('calls onChange properly given no initial value', () => {
      const component = mount(
        <DateRangePicker />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([undefined, nextValueTo], undefined);
    });

    it('calls onChange properly given single initial value', () => {
      const value = new Date(2018, 0, 1);

      const component = mount(
        <DateRangePicker value={value} />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([value, nextValueTo], undefined);
    });

    it('calls onChange properly given initial value as an array', () => {
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      const component = mount(
        <DateRangePicker value={value} />,
      );

      const componentInstance = component.instance();

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();
      componentInstance.onChangeTo(nextValueTo);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([valueFrom, nextValueTo], undefined);
    });
  });
});
