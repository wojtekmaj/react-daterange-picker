import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { act, fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateRangePicker from './DateRangePicker.js';

async function waitForElementToBeRemovedOrHidden(callback: () => HTMLElement | null) {
  const element = callback();

  if (element) {
    try {
      await waitFor(() =>
        expect(element).toHaveAttribute('class', expect.stringContaining('--closed')),
      );
    } catch (error) {
      await waitForElementToBeRemoved(element);
    }
  }
}

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

  it('passes autoFocus flag to first DateInput component', () => {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    const { container } = render(<DateRangePicker autoFocus />);

    const customInputs = container.querySelectorAll('input[data-input]');

    expect(customInputs[0]).toHaveFocus();
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
    const dateInputs = container.querySelectorAll(
      '.react-daterange-picker__inputGroup',
    ) as unknown as [HTMLDivElement, HTMLDivElement];

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

    const dateInputs = container.querySelectorAll(
      '.react-daterange-picker__inputGroup',
    ) as unknown as [HTMLDivElement, HTMLDivElement];

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

    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveClass(className);
  });

  it('applies "--open" className to its wrapper when given isOpen flag', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const wrapper = container.firstElementChild;

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

  describe('renders clear button properly', () => {
    it('renders clear button', () => {
      const { container } = render(<DateRangePicker />);

      const clearButton = container.querySelector('button.react-daterange-picker__clear-button');

      expect(clearButton).toBeInTheDocument();
    });

    it('renders clear icon by default when clearIcon is not given', () => {
      const { container } = render(<DateRangePicker />);

      const clearButton = container.querySelector(
        'button.react-daterange-picker__clear-button',
      ) as HTMLButtonElement;

      const clearIcon = clearButton.querySelector('svg');

      expect(clearIcon).toBeInTheDocument();
    });

    it('renders clear icon when given clearIcon as a string', () => {
      const { container } = render(<DateRangePicker clearIcon="❌" />);

      const clearButton = container.querySelector('button.react-daterange-picker__clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });

    it('renders clear icon when given clearIcon as a React element', () => {
      function ClearIcon() {
        return <>❌</>;
      }

      const { container } = render(<DateRangePicker clearIcon={<ClearIcon />} />);

      const clearButton = container.querySelector('button.react-daterange-picker__clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });

    it('renders clear icon when given clearIcon as a function', () => {
      function ClearIcon() {
        return <>❌</>;
      }

      const { container } = render(<DateRangePicker clearIcon={ClearIcon} />);

      const clearButton = container.querySelector('button.react-daterange-picker__clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });
  });

  describe('renders calendar button properly', () => {
    it('renders calendar button', () => {
      const { container } = render(<DateRangePicker />);

      const calendarButton = container.querySelector(
        'button.react-daterange-picker__calendar-button',
      );

      expect(calendarButton).toBeInTheDocument();
    });

    it('renders calendar icon by default when calendarIcon is not given', () => {
      const { container } = render(<DateRangePicker />);

      const calendarButton = container.querySelector(
        'button.react-daterange-picker__calendar-button',
      ) as HTMLButtonElement;

      const calendarIcon = calendarButton.querySelector('svg');

      expect(calendarIcon).toBeInTheDocument();
    });

    it('renders calendar icon when given calendarIcon as a string', () => {
      const { container } = render(<DateRangePicker calendarIcon="📅" />);

      const calendarButton = container.querySelector(
        'button.react-daterange-picker__calendar-button',
      );

      expect(calendarButton).toHaveTextContent('📅');
    });

    it('renders calendar icon when given calendarIcon as a React element', () => {
      function CalendarIcon() {
        return <>📅</>;
      }

      const { container } = render(<DateRangePicker calendarIcon={<CalendarIcon />} />);

      const calendarButton = container.querySelector(
        'button.react-daterange-picker__calendar-button',
      );

      expect(calendarButton).toHaveTextContent('📅');
    });

    it('renders calendar icon when given calendarIcon as a function', () => {
      function CalendarIcon() {
        return <>📅</>;
      }

      const { container } = render(<DateRangePicker calendarIcon={CalendarIcon} />);

      const calendarButton = container.querySelector(
        'button.react-daterange-picker__calendar-button',
      );

      expect(calendarButton).toHaveTextContent('📅');
    });
  });

  it('renders Calendar component when given isOpen flag', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
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

    const button = container.querySelector(
      'button.react-daterange-picker__calendar-button',
    ) as HTMLButtonElement;

    fireEvent.click(button);

    const calendar2 = container.querySelector('.react-calendar');

    expect(calendar2).toBeInTheDocument();
  });

  describe('handles opening Calendar component when focusing on an input inside properly', () => {
    it('opens Calendar component when focusing on an input inside by default', () => {
      const { container } = render(<DateRangePicker />);

      const calendar = container.querySelector('.react-calendar');

      expect(calendar).toBeFalsy();

      const input = container.querySelector('input[name="day"]') as HTMLInputElement;

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('opens Calendar component when focusing on an input inside given openCalendarOnFocus = true', () => {
      const { container } = render(<DateRangePicker openCalendarOnFocus />);

      const calendar = container.querySelector('.react-calendar');
      const input = container.querySelector('input[name="day"]') as HTMLInputElement;

      expect(calendar).toBeFalsy();

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('does not open Calendar component when focusing on an input inside given openCalendarOnFocus = false', () => {
      const { container } = render(<DateRangePicker openCalendarOnFocus={false} />);

      const calendar = container.querySelector('.react-calendar');
      const input = container.querySelector('input[name="day"]') as HTMLInputElement;

      expect(calendar).toBeFalsy();

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });

    it('does not open Calendar when focusing on an input inside given shouldOpenCalendar function returning false', () => {
      const shouldOpenCalendar = () => false;

      const { container } = render(<DateRangePicker shouldOpenCalendar={shouldOpenCalendar} />);

      const calendar = container.querySelector('.react-calendar');
      const input = container.querySelector('input[name="day"]') as HTMLInputElement;

      expect(calendar).toBeFalsy();

      fireEvent.focus(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });

    it('does not open Calendar component when focusing on a select element', () => {
      const { container } = render(<DateRangePicker format="dd.MMMM.yyyy" />);

      const calendar = container.querySelector('.react-calendar');
      const select = container.querySelector('select[name="month"]') as HTMLSelectElement;

      expect(calendar).toBeFalsy();

      fireEvent.focus(select);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });
  });

  it('closes Calendar component when clicked outside', async () => {
    const { container } = render(<DateRangePicker isOpen />);

    userEvent.click(document.body);

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('closes Calendar component when focused outside', async () => {
    const { container } = render(<DateRangePicker isOpen />);

    fireEvent.focusIn(document.body);

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('closes Calendar component when tapped outside', async () => {
    const { container } = render(<DateRangePicker isOpen />);

    fireEvent.touchStart(document.body);

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('does not close Calendar component when focused inside', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const customInputs = container.querySelectorAll('input[data-input]');
    const monthInput = customInputs[0] as HTMLInputElement;
    const dayInput = customInputs[1] as HTMLInputElement;

    fireEvent.blur(monthInput);
    fireEvent.focus(dayInput);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('closes Calendar when changing value by default', async () => {
    const { container } = render(<DateRangePicker isOpen />);

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    act(() => {
      fireEvent.click(firstTile);
    });

    act(() => {
      fireEvent.click(secondTile);
    });

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('closes Calendar when changing value with prop closeCalendar = true', async () => {
    const { container } = render(<DateRangePicker closeCalendar isOpen />);

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    act(() => {
      fireEvent.click(firstTile);
    });

    act(() => {
      fireEvent.click(secondTile);
    });

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('does not close Calendar when changing value with prop closeCalendar = false', () => {
    const { container } = render(<DateRangePicker closeCalendar={false} isOpen />);

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    act(() => {
      fireEvent.click(firstTile);
    });

    act(() => {
      fireEvent.click(secondTile);
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not close Calendar when changing value with shouldCloseCalendar function returning false', () => {
    const shouldCloseCalendar = () => false;

    const { container } = render(
      <DateRangePicker isOpen shouldCloseCalendar={shouldCloseCalendar} />,
    );

    const firstTile = container.querySelector('.react-calendar__tile') as HTMLButtonElement;

    act(() => {
      fireEvent.click(firstTile);
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not close Calendar when changing value using inputs', () => {
    const { container } = render(<DateRangePicker isOpen />);

    const dayInput = container.querySelector('input[name="day"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(dayInput, { target: { value: '1' } });
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('calls onChange callback when changing value', () => {
    const value = new Date(2023, 0, 31);
    const onChange = vi.fn();

    const { container } = render(<DateRangePicker onChange={onChange} value={value} />);

    const dayInput = container.querySelector('input[name="day"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(dayInput, { target: { value: '1' } });
    });

    expect(onChange).toHaveBeenCalledWith([new Date(2023, 0, 1), null]);
  });

  it('calls onInvalidChange callback when changing value to an invalid one', () => {
    const value = new Date(2023, 0, 31);
    const onInvalidChange = vi.fn();

    const { container } = render(
      <DateRangePicker onInvalidChange={onInvalidChange} value={value} />,
    );

    const dayInput = container.querySelector('input[name="day"]') as HTMLInputElement;

    act(() => {
      fireEvent.change(dayInput, { target: { value: '32' } });
    });

    expect(onInvalidChange).toHaveBeenCalled();
  });

  it('clears the value when clicking on a button', () => {
    const onChange = vi.fn();

    const { container } = render(<DateRangePicker onChange={onChange} />);

    const calendar = container.querySelector('.react-calendar');
    const button = container.querySelector(
      'button.react-daterange-picker__clear-button',
    ) as HTMLButtonElement;

    expect(calendar).toBeFalsy();

    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  describe('onChangeFrom', () => {
    it('calls onChange properly given no initial value', () => {
      const onChange = vi.fn();

      const { container } = render(<DateRangePicker onChange={onChange} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[0] as HTMLInputElement;
      const dayInput = customInputs[1] as HTMLInputElement;
      const yearInput = customInputs[2] as HTMLInputElement;

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, null]);
    });

    it('calls onChange properly given single initial value', () => {
      const onChange = vi.fn();
      const value = new Date(2018, 0, 1);

      const { container } = render(<DateRangePicker onChange={onChange} value={value} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[0] as HTMLInputElement;
      const dayInput = customInputs[1] as HTMLInputElement;
      const yearInput = customInputs[2] as HTMLInputElement;

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, null]);
    });

    it('calls onChange properly given initial value as an array', () => {
      const onChange = vi.fn();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo] as [Date, Date];

      const { container } = render(<DateRangePicker onChange={onChange} value={value} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[0] as HTMLInputElement;
      const dayInput = customInputs[1] as HTMLInputElement;
      const yearInput = customInputs[2] as HTMLInputElement;

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, valueTo]);
    });
  });

  describe('onChangeTo', () => {
    it('calls onChange properly given no initial value', () => {
      const onChange = vi.fn();

      const { container } = render(<DateRangePicker onChange={onChange} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[3] as HTMLInputElement;
      const dayInput = customInputs[4] as HTMLInputElement;
      const yearInput = customInputs[5] as HTMLInputElement;

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([null, nextValueTo]);
    });

    it('calls onChange properly given single initial value', () => {
      const onChange = vi.fn();
      const value = new Date(2018, 0, 1);

      const { container } = render(<DateRangePicker onChange={onChange} value={value} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[3] as HTMLInputElement;
      const dayInput = customInputs[4] as HTMLInputElement;
      const yearInput = customInputs[5] as HTMLInputElement;

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([value, nextValueTo]);
    });

    it('calls onChange properly given initial value as an array', () => {
      const onChange = vi.fn();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo] as [Date, Date];

      const { container } = render(<DateRangePicker onChange={onChange} value={value} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const customInputs = container.querySelectorAll('input[data-input]');
      const monthInput = customInputs[3] as HTMLInputElement;
      const dayInput = customInputs[4] as HTMLInputElement;
      const yearInput = customInputs[5] as HTMLInputElement;

      act(() => {
        fireEvent.change(dayInput, { target: { value: '15' } });
      });

      act(() => {
        fireEvent.change(monthInput, { target: { value: '2' } });
      });

      act(() => {
        fireEvent.change(yearInput, { target: { value: '2018' } });
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([valueFrom, nextValueTo]);
    });
  });

  it('calls onClick callback when clicked a page (sample of mouse events family)', () => {
    const onClick = vi.fn();

    const { container } = render(<DateRangePicker onClick={onClick} />);

    const wrapper = container.firstElementChild as HTMLDivElement;
    fireEvent.click(wrapper);

    expect(onClick).toHaveBeenCalled();
  });

  it('calls onTouchStart callback when touched a page (sample of touch events family)', () => {
    const onTouchStart = vi.fn();

    const { container } = render(<DateRangePicker onTouchStart={onTouchStart} />);

    const wrapper = container.firstElementChild as HTMLDivElement;
    fireEvent.touchStart(wrapper);

    expect(onTouchStart).toHaveBeenCalled();
  });
});
