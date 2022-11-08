import React, { createRef } from 'react';
import { act, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';

import DateRangePicker from './DateRangePicker';

describe('DateRangePicker', () => {
  it('passes default name to DateInput components', () => {
    const { container } = render(<DateRangePicker />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toHaveAttribute('name', 'daterange_from');
    expect(nativeInputs[1]).toHaveAttribute('name', 'daterange_to');
  });

  it('passes custom name to DateInput components', () => {
    const name = 'testName';

    const { container } = render(<DateRangePicker name={name} />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toHaveAttribute('name', `${name}_from`);
    expect(nativeInputs[1]).toHaveAttribute('name', `${name}_to`);
  });

  // See https://github.com/jsdom/jsdom/issues/3041
  it.skip('passes autoFocus flag to first DateInput component', () => {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    const { container } = render(<DateRangePicker autoFocus />);

    const customInputs = container.querySelectorAll('input[data-input]');

    expect(customInputs[0]).toHaveAttribute('autofocus');
  });

  it('passes disabled flag to DateInput components', () => {
    const { container } = render(<DateRangePicker disabled />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toBeDisabled();
    expect(nativeInputs[1]).toBeDisabled();
  });

  it('passes format to DateInput components', () => {
    const { container } = render(<DateRangePicker format="yyyy" />);

    const customInputs = container.querySelectorAll('input[data-input]');

    expect(customInputs).toHaveLength(2);
    expect(customInputs[0]).toHaveAttribute('name', 'year');
    expect(customInputs[1]).toHaveAttribute('name', 'year');
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

    const { container } = render(<DateRangePicker {...ariaLabelProps} />);

    const calendarButton = container.querySelector(
      'button.react-daterange-picker__calendar-button',
    );
    const clearButton = container.querySelector('button.react-daterange-picker__clear-button');
    const dateInputs = container.querySelectorAll('.react-daterange-picker__inputGroup');

    const [dateFromInput, dateToInput] = dateInputs;

    const nativeFromInput = dateFromInput.querySelector('input[type="date"]');
    const dayFromInput = dateFromInput.querySelector('input[name="day"]');
    const monthFromInput = dateFromInput.querySelector('input[name="month"]');
    const yearFromInput = dateFromInput.querySelector('input[name="year"]');

    const nativeToInput = dateToInput.querySelector('input[type="date"]');
    const dayToInput = dateToInput.querySelector('input[name="day"]');
    const monthToInput = dateToInput.querySelector('input[name="month"]');
    const yearToInput = dateToInput.querySelector('input[name="year"]');

    expect(calendarButton).toHaveAttribute('aria-label', ariaLabelProps.calendarAriaLabel);
    expect(clearButton).toHaveAttribute('aria-label', ariaLabelProps.clearAriaLabel);

    expect(nativeFromInput).toHaveAttribute('aria-label', ariaLabelProps.nativeInputAriaLabel);
    expect(dayFromInput).toHaveAttribute('aria-label', ariaLabelProps.dayAriaLabel);
    expect(monthFromInput).toHaveAttribute('aria-label', ariaLabelProps.monthAriaLabel);
    expect(yearFromInput).toHaveAttribute('aria-label', ariaLabelProps.yearAriaLabel);

    expect(nativeToInput).toHaveAttribute('aria-label', ariaLabelProps.nativeInputAriaLabel);
    expect(dayToInput).toHaveAttribute('aria-label', ariaLabelProps.dayAriaLabel);
    expect(monthToInput).toHaveAttribute('aria-label', ariaLabelProps.monthAriaLabel);
    expect(yearToInput).toHaveAttribute('aria-label', ariaLabelProps.yearAriaLabel);
  });

  it('passes placeholder props to DateInput components', () => {
    const placeholderProps = {
      dayPlaceholder: 'dd',
      monthPlaceholder: 'mm',
      yearPlaceholder: 'yyyy',
    };

    const { container } = render(<DateRangePicker {...placeholderProps} />);

    const dateInputs = container.querySelectorAll('.react-daterange-picker__inputGroup');

    const [dateFromInput, dateToInput] = dateInputs;

    const dayFromInput = dateFromInput.querySelector('input[name="day"]');
    const monthFromInput = dateFromInput.querySelector('input[name="month"]');
    const yearFromInput = dateFromInput.querySelector('input[name="year"]');

    const dayToInput = dateToInput.querySelector('input[name="day"]');
    const monthToInput = dateToInput.querySelector('input[name="month"]');
    const yearToInput = dateToInput.querySelector('input[name="year"]');

    expect(dayFromInput).toHaveAttribute('placeholder', placeholderProps.dayPlaceholder);
    expect(monthFromInput).toHaveAttribute('placeholder', placeholderProps.monthPlaceholder);
    expect(yearFromInput).toHaveAttribute('placeholder', placeholderProps.yearPlaceholder);

    expect(dayToInput).toHaveAttribute('placeholder', placeholderProps.dayPlaceholder);
    expect(monthToInput).toHaveAttribute('placeholder', placeholderProps.monthPlaceholder);
    expect(yearToInput).toHaveAttribute('placeholder', placeholderProps.yearPlaceholder);
  });

  describe('passes value to DateInput components', () => {
    it('passes single value to DateInput components', () => {
      const value = new Date(2019, 0, 1);

      const { container } = render(<DateRangePicker value={value} />);

      const nativeInputs = container.querySelectorAll('input[type="date"]');

      expect(nativeInputs[0]).toHaveValue('2019-01-01');
      expect(nativeInputs[1]).toHaveValue('');
    });

    it('passes the first item of an array of values to DateInput components', () => {
      const value1 = new Date(2019, 0, 1);
      const value2 = new Date(2019, 6, 1);

      const { container } = render(<DateRangePicker value={[value1, value2]} />);

      const nativeInputs = container.querySelectorAll('input[type="date"]');

      expect(nativeInputs[0]).toHaveValue('2019-01-01');
      expect(nativeInputs[1]).toHaveValue('2019-07-01');
    });
  });

  it('applies className to its wrapper when given a string', () => {
    const className = 'testClassName';

    const { container } = render(<DateRangePicker className={className} />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass(className);
  });

  it('applies "--open" className to its wrapper when given isOpen flag', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('react-daterange-picker--open');
  });

  it('applies calendarClassName to the calendar when given a string', () => {
    const calendarClassName = 'testClassName';

    const { container } = render(<DateRangePicker calendarClassName={calendarClassName} isOpen />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toHaveClass(calendarClassName);
  });

  it('renders DateInput components', () => {
    const { container } = render(<DateRangePicker />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs.length).toBe(2);
  });

  it('renders range divider with default divider', () => {
    const { container } = render(<DateRangePicker />);

    const rangeDivider = container.querySelector('.react-daterange-picker__range-divider');

    expect(rangeDivider).toBeInTheDocument();
    expect(rangeDivider).toHaveTextContent('–');
  });

  it('renders range divider with custom divider', () => {
    const { container } = render(<DateRangePicker rangeDivider="to" />);

    const rangeDivider = container.querySelector('.react-daterange-picker__range-divider');

    expect(rangeDivider).toBeInTheDocument();
    expect(rangeDivider).toHaveTextContent('to');
  });

  it('renders clear button', () => {
    const { container } = render(<DateRangePicker />);

    const clearButton = container.querySelector('button.react-daterange-picker__clear-button');

    expect(clearButton).toBeInTheDocument();
  });

  it('renders calendar button', () => {
    const { container } = render(<DateRangePicker />);

    const calendarButton = container.querySelector(
      'button.react-daterange-picker__calendar-button',
    );

    expect(calendarButton).toBeInTheDocument();
  });

  it('renders Calendar component when given isOpen flag', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument(1);
  });

  it('does not render Calendar component when given disableCalendar & isOpen flags', () => {
    const { container } = render(<DateRangePicker disableCalendar isOpen />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeFalsy();
  });

  it('opens Calendar component when given isOpen flag by changing props', () => {
    const { container, rerender } = render(<DateRangePicker />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeFalsy();

    rerender(<DateRangePicker isOpen />);

    const calendar2 = container.querySelector('.react-calendar');

    expect(calendar2).toBeInTheDocument();
  });

  it('opens Calendar component when clicking on a button', () => {
    const { container } = render(<DateRangePicker />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeFalsy();

    const button = container.querySelector('button.react-daterange-picker__calendar-button');

    fireEvent.click(button);

    const calendar2 = container.querySelector('.react-calendar');

    expect(calendar2).toBeInTheDocument();
  });

  describe('handles opening Calendar component when focusing on an input inside properly', () => {
    it('opens Calendar component when focusing on an input inside by default', () => {
      const { container } = render(<DateRangePicker />);

      const calendar = container.querySelector('.react-calendar');

      expect(calendar).toBeFalsy();

      const input = container.querySelector('input[name="day"]');

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('opens Calendar component when focusing on an input inside given openCalendarOnFocus = true', () => {
      const { container } = render(<DateRangePicker openCalendarOnFocus />);

      const calendar = container.querySelector('.react-calendar');
      const input = container.querySelector('input[name="day"]');

      expect(calendar).toBeFalsy();

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('does not open Calendar component when focusing on an input inside given openCalendarOnFocus = false', () => {
      const { container } = render(<DateRangePicker openCalendarOnFocus={false} />);

      const calendar = container.querySelector('.react-calendar');
      const input = container.querySelector('input[name="day"]');

      expect(calendar).toBeFalsy();

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });

    it('does not open Calendar component when focusing on a select element', () => {
      const { container } = render(<DateRangePicker format="dd.MMMM.yyyy" />);

      const calendar = container.querySelector('.react-calendar');
      const select = container.querySelector('select[name="month"]');

      expect(calendar).toBeFalsy();

      fireEvent.focus(select);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });
  });

  it('closes Calendar component when clicked outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const { container } = render(<DateRangePicker isOpen />, { attachTo: root });

    fireEvent.mouseDown(document.body);

    waitForElementToBeRemoved(() => container.querySelector('.react-calendar'));
  });

  it('closes Calendar component when focused outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const { container } = render(<DateRangePicker isOpen />, { attachTo: root });

    fireEvent.focusIn(document.body);

    waitForElementToBeRemoved(() => container.querySelector('.react-calendar'));
  });

  it('closes Calendar component when tapped outside', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    const { container } = render(<DateRangePicker isOpen />, { attachTo: root });

    fireEvent.touchStart(document.body);

    waitForElementToBeRemoved(() => container.querySelector('.react-calendar'));
  });

  it('does not close Calendar component when focused inside', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const customInputs = container.querySelectorAll('input[data-input]');
    const dayInput = customInputs[0];
    const monthInput = customInputs[1];

    fireEvent.blur(dayInput);
    fireEvent.focus(monthInput);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('closes Calendar when calling internal onChange by default', () => {
    const instance = createRef();

    const { container } = render(<DateRangePicker isOpen ref={instance} />);

    const { onChange: onChangeInternal } = instance.current;

    act(() => {
      onChangeInternal(new Date());
    });

    waitForElementToBeRemoved(() => container.querySelector('.react-calendar'));
  });

  it('does not close Calendar when calling internal onChange with prop closeCalendar = false', () => {
    const instance = createRef();

    const { container } = render(<DateRangePicker closeCalendar={false} isOpen ref={instance} />);

    const { onChange: onChangeInternal } = instance.current;

    act(() => {
      onChangeInternal(new Date());
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not close Calendar when calling internal onChange with closeCalendar = false', () => {
    const instance = createRef();

    const { container } = render(<DateRangePicker isOpen ref={instance} />);

    const { onChange: onChangeInternal } = instance.current;

    act(() => {
      onChangeInternal(new Date(), false);
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('calls onChange callback when calling internal onChange', () => {
    const instance = createRef();
    const nextValue = new Date(2019, 0, 1);
    const onChange = jest.fn();

    render(<DateRangePicker onChange={onChange} ref={instance} />);

    const { onChange: onChangeInternal } = instance.current;

    act(() => {
      onChangeInternal(nextValue);
    });

    expect(onChange).toHaveBeenCalledWith(nextValue);
  });

  it('clears the value when clicking on a button', () => {
    const onChange = jest.fn();

    const { container } = render(<DateRangePicker onChange={onChange} />);

    const calendar = container.querySelector('.react-calendar');
    const button = container.querySelector('button.react-daterange-picker__clear-button');

    expect(calendar).toBeFalsy();

    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  describe('onChangeFrom', () => {
    it('calls onChange properly given no initial value', () => {
      const instance = createRef();

      render(<DateRangePicker ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeFrom: onChangeFromInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();

      act(() => {
        onChangeFromInternal(nextValueFrom);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], undefined);
    });

    it('calls onChange properly given single initial value', () => {
      const instance = createRef();
      const value = new Date(2018, 0, 1);

      render(<DateRangePicker value={value} ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeFrom: onChangeFromInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();

      act(() => {
        onChangeFromInternal(nextValueFrom);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, undefined], undefined);
    });

    it('calls onChange properly given initial value as an array', () => {
      const instance = createRef();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      render(<DateRangePicker value={value} ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeFrom: onChangeFromInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueFrom = new Date();

      act(() => {
        onChangeFromInternal(nextValueFrom);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([nextValueFrom, valueTo], undefined);
    });
  });

  describe('onChangeTo', () => {
    it('calls onChange properly given no initial value', () => {
      const instance = createRef();

      render(<DateRangePicker ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeTo: onChangeToInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();

      act(() => {
        onChangeToInternal(nextValueTo);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([undefined, nextValueTo], undefined);
    });

    it('calls onChange properly given single initial value', () => {
      const instance = createRef();
      const value = new Date(2018, 0, 1);

      render(<DateRangePicker value={value} ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeTo: onChangeToInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();

      act(() => {
        onChangeToInternal(nextValueTo);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([value, nextValueTo], undefined);
    });

    it('calls onChange properly given initial value as an array', () => {
      const instance = createRef();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo];

      render(<DateRangePicker value={value} ref={instance} />);

      const componentInstance = instance.current;
      const { onChangeTo: onChangeToInternal } = componentInstance;

      const onChangeSpy = jest.spyOn(componentInstance, 'onChange');

      const nextValueTo = new Date();

      act(() => {
        onChangeToInternal(nextValueTo);
      });

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith([valueFrom, nextValueTo], undefined);
    });
  });
});
