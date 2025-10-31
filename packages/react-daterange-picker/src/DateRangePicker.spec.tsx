import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { act } from 'react-dom/test-utils';

import DateRangePicker from './DateRangePicker.js';

import type { Locator } from 'vitest/browser';

async function waitForElementToBeRemovedOrHidden(callback: () => HTMLElement | null) {
  const element = callback();

  if (element) {
    await vi.waitFor(() =>
      expect(element).toHaveAttribute('class', expect.stringContaining('--closed')),
    );
  }
}

describe('DateRangePicker', () => {
  const defaultProps = {
    dayAriaLabel: 'day',
    monthAriaLabel: 'month',
    yearAriaLabel: 'year',
  };

  it('passes default name to DateInput components', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toHaveAttribute('name', 'daterange_from');
    expect(nativeInputs[1]).toHaveAttribute('name', 'daterange_to');
  });

  it('passes custom name to DateInput components', async () => {
    const name = 'testName';

    const { container } = await render(<DateRangePicker {...defaultProps} name={name} />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toHaveAttribute('name', `${name}_from`);
    expect(nativeInputs[1]).toHaveAttribute('name', `${name}_to`);
  });

  it('passes autoFocus flag to first DateInput component', async () => {
    await render(<DateRangePicker {...defaultProps} autoFocus />);

    const customInputs = page.getByRole('spinbutton');

    expect(customInputs.nth(0)).toHaveFocus();
  });

  it('passes disabled flag to DateInput components', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} disabled />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs[0]).toBeDisabled();
    expect(nativeInputs[1]).toBeDisabled();
  });

  it('passes format to DateInput components', async () => {
    await render(<DateRangePicker {...defaultProps} format="yyyy" />);

    const customInputs = page.getByRole('spinbutton');

    expect(customInputs).toHaveLength(2);
    expect(customInputs.nth(0)).toHaveAttribute('name', 'year');
    expect(customInputs.nth(1)).toHaveAttribute('name', 'year');
  });

  it('passes aria-label props to DateInput components', async () => {
    const ariaLabelProps = {
      calendarAriaLabel: 'Toggle calendar',
      clearAriaLabel: 'Clear value',
      dayAriaLabel: 'Day',
      monthAriaLabel: 'Month',
      nativeInputAriaLabel: 'Date',
      yearAriaLabel: 'Year',
    };

    const { container } = await render(<DateRangePicker {...ariaLabelProps} />);

    const calendarButton = page.getByTestId('calendar-button');
    const clearButton = page.getByTestId('clear-button');
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

  it('passes placeholder props to DateInput components', async () => {
    const placeholderProps = {
      dayPlaceholder: 'dd',
      monthPlaceholder: 'mm',
      yearPlaceholder: 'yyyy',
    };

    const { container } = await render(<DateRangePicker {...defaultProps} {...placeholderProps} />);

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
    it('passes single value to DateInput components', async () => {
      const value = new Date(2019, 0, 1);

      const { container } = await render(<DateRangePicker {...defaultProps} value={value} />);

      const nativeInputs = container.querySelectorAll('input[type="date"]');

      expect(nativeInputs[0]).toHaveValue('2019-01-01');
      expect(nativeInputs[1]).toHaveValue('');
    });

    it('passes the first item of an array of values to DateInput components', async () => {
      const value1 = new Date(2019, 0, 1);
      const value2 = new Date(2019, 6, 1);

      const { container } = await render(
        <DateRangePicker {...defaultProps} value={[value1, value2]} />,
      );

      const nativeInputs = container.querySelectorAll('input[type="date"]');

      expect(nativeInputs[0]).toHaveValue('2019-01-01');
      expect(nativeInputs[1]).toHaveValue('2019-07-01');
    });
  });

  it('applies className to its wrapper when given a string', async () => {
    const className = 'testClassName';

    const { container } = await render(<DateRangePicker {...defaultProps} className={className} />);

    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveClass(className);
  });

  it('applies "--open" className to its wrapper when given isOpen flag', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    const wrapper = container.firstElementChild;

    expect(wrapper).toHaveClass('react-daterange-picker--open');
  });

  it('applies calendarClassName to the calendar when given a string', async () => {
    const calendarClassName = 'testClassName';

    const { container } = await render(
      <DateRangePicker {...defaultProps} calendarProps={{ className: calendarClassName }} isOpen />,
    );

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toHaveClass(calendarClassName);
  });

  it('renders DateInput components', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} />);

    const nativeInputs = container.querySelectorAll('input[type="date"]');

    expect(nativeInputs.length).toBe(2);
  });

  it('renders range divider with default divider', async () => {
    await render(<DateRangePicker {...defaultProps} />);

    const rangeDivider = page.getByTestId('range-divider');

    expect(rangeDivider).toBeInTheDocument();
    expect(rangeDivider).toHaveTextContent('–');
  });

  it('renders range divider with custom divider', async () => {
    await render(<DateRangePicker {...defaultProps} rangeDivider="to" />);

    const rangeDivider = page.getByTestId('range-divider');

    expect(rangeDivider).toBeInTheDocument();
    expect(rangeDivider).toHaveTextContent('to');
  });

  describe('renders clear button properly', () => {
    it('renders clear button', async () => {
      await render(<DateRangePicker {...defaultProps} />);

      const clearButton = page.getByTestId('clear-button');

      expect(clearButton).toBeInTheDocument();
    });

    it('renders clear icon by default when clearIcon is not given', async () => {
      await render(<DateRangePicker {...defaultProps} />);

      const clearButton = page.getByTestId('clear-button');

      const clearIcon = clearButton.element().querySelector('svg');

      expect(clearIcon).toBeInTheDocument();
    });

    it('renders clear icon when given clearIcon as a string', async () => {
      await render(<DateRangePicker {...defaultProps} clearIcon="❌" />);

      const clearButton = page.getByTestId('clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });

    it('renders clear icon when given clearIcon as a React element', async () => {
      function ClearIcon() {
        return <>❌</>;
      }

      await render(<DateRangePicker {...defaultProps} clearIcon={<ClearIcon />} />);

      const clearButton = page.getByTestId('clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });

    it('renders clear icon when given clearIcon as a function', async () => {
      function ClearIcon() {
        return <>❌</>;
      }

      await render(<DateRangePicker {...defaultProps} clearIcon={ClearIcon} />);

      const clearButton = page.getByTestId('clear-button');

      expect(clearButton).toHaveTextContent('❌');
    });
  });

  describe('renders calendar button properly', () => {
    it('renders calendar button', async () => {
      await render(<DateRangePicker {...defaultProps} />);

      const calendarButton = page.getByTestId('calendar-button');

      expect(calendarButton).toBeInTheDocument();
    });

    it('renders calendar icon by default when calendarIcon is not given', async () => {
      await render(<DateRangePicker {...defaultProps} />);

      const calendarButton = page.getByTestId('calendar-button');

      const calendarIcon = calendarButton.element().querySelector('svg');

      expect(calendarIcon).toBeInTheDocument();
    });

    it('renders calendar icon when given calendarIcon as a string', async () => {
      await render(<DateRangePicker {...defaultProps} calendarIcon="📅" />);

      const calendarButton = page.getByTestId('calendar-button');

      expect(calendarButton).toHaveTextContent('📅');
    });

    it('renders calendar icon when given calendarIcon as a React element', async () => {
      function CalendarIcon() {
        return <>📅</>;
      }

      await render(<DateRangePicker {...defaultProps} calendarIcon={<CalendarIcon />} />);

      const calendarButton = page.getByTestId('calendar-button');

      expect(calendarButton).toHaveTextContent('📅');
    });

    it('renders calendar icon when given calendarIcon as a function', async () => {
      function CalendarIcon() {
        return <>📅</>;
      }

      await render(<DateRangePicker {...defaultProps} calendarIcon={CalendarIcon} />);

      const calendarButton = page.getByTestId('calendar-button');

      expect(calendarButton).toHaveTextContent('📅');
    });
  });

  it('renders Calendar component when given isOpen flag', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not render Calendar component when given disableCalendar & isOpen flags', async () => {
    const { container } = await render(
      <DateRangePicker {...defaultProps} disableCalendar isOpen />,
    );

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).not.toBeInTheDocument();
  });

  it('opens Calendar component when given isOpen flag by changing props', async () => {
    const { container, rerender } = await render(<DateRangePicker {...defaultProps} />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).not.toBeInTheDocument();

    rerender(<DateRangePicker {...defaultProps} isOpen />);

    const calendar2 = container.querySelector('.react-calendar');

    expect(calendar2).toBeInTheDocument();
  });

  it('opens Calendar component when clicking on a button', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} />);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).not.toBeInTheDocument();

    const button = page.getByTestId('calendar-button');

    await userEvent.click(button);

    const calendar2 = container.querySelector('.react-calendar');

    expect(calendar2).toBeInTheDocument();
  });

  function triggerFocusInEvent(locator: Locator) {
    const element = locator.element();

    element.dispatchEvent(
      new FocusEvent('focusin', { bubbles: true, cancelable: false, composed: true }),
    );
  }

  function triggerFocusEvent(locator: Locator) {
    triggerFocusInEvent(locator);

    const element = locator.element();

    element.dispatchEvent(
      new FocusEvent('focus', { bubbles: false, cancelable: false, composed: true }),
    );
  }

  describe('handles opening Calendar component when focusing on an input inside properly', () => {
    it('opens Calendar component when focusing on an input inside by default', async () => {
      const { container } = await render(<DateRangePicker {...defaultProps} />);

      const calendar = container.querySelector('.react-calendar');

      expect(calendar).not.toBeInTheDocument();

      const input = page.getByRole('spinbutton', { name: 'day' }).first();

      act(() => {
        triggerFocusEvent(input);
      });

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('opens Calendar component when focusing on an input inside given openCalendarOnFocus = true', async () => {
      const { container } = await render(<DateRangePicker {...defaultProps} openCalendarOnFocus />);

      const calendar = container.querySelector('.react-calendar');
      const input = page.getByRole('spinbutton', { name: 'day' }).first();

      expect(calendar).not.toBeInTheDocument();

      act(() => {
        triggerFocusEvent(input);
      });

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeInTheDocument();
    });

    it('does not open Calendar component when focusing on an input inside given openCalendarOnFocus = false', async () => {
      const { container } = await render(
        <DateRangePicker {...defaultProps} openCalendarOnFocus={false} />,
      );

      const calendar = container.querySelector('.react-calendar');
      const input = page.getByRole('spinbutton', { name: 'day' }).first();

      expect(calendar).not.toBeInTheDocument();

      act(() => {
        triggerFocusEvent(input);
      });

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });

    it('does not open Calendar when focusing on an input inside given shouldOpenCalendar function returning false', async () => {
      const shouldOpenCalendar = () => false;

      const { container } = await render(
        <DateRangePicker {...defaultProps} shouldOpenCalendar={shouldOpenCalendar} />,
      );

      const calendar = container.querySelector('.react-calendar');
      const input = page.getByRole('spinbutton', { name: 'day' }).first();

      expect(calendar).not.toBeInTheDocument();

      triggerFocusEvent(input);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });

    it('does not open Calendar component when focusing on a select element', async () => {
      const { container } = await render(
        <DateRangePicker {...defaultProps} format="dd.MMMM.yyyy" />,
      );

      const calendar = container.querySelector('.react-calendar');
      const select = page.getByRole('combobox', { name: 'month' }).first();

      expect(calendar).not.toBeInTheDocument();

      triggerFocusEvent(select);

      const calendar2 = container.querySelector('.react-calendar');

      expect(calendar2).toBeFalsy();
    });
  });

  it('closes Calendar component when clicked outside', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    await userEvent.click(document.body);

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('closes Calendar component when focused outside', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    triggerFocusInEvent(page.elementLocator(document.body));

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  function triggerTouchStart(element: HTMLElement) {
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));
  }

  it('closes Calendar component when tapped outside', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    triggerTouchStart(document.body);

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  function triggerFocusOutEvent(locator: Locator) {
    const element = locator.element();

    element.dispatchEvent(
      new FocusEvent('focusout', { bubbles: true, cancelable: false, composed: true }),
    );
  }

  function triggerBlurEvent(locator: Locator) {
    triggerFocusOutEvent(locator);

    const element = locator.element();

    element.dispatchEvent(
      new FocusEvent('blur', { bubbles: false, cancelable: false, composed: true }),
    );
  }

  it('does not close Calendar component when focused inside', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    const monthInput = page.getByRole('spinbutton', { name: 'month' }).first();
    const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();

    triggerBlurEvent(monthInput);
    triggerFocusEvent(dayInput);

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('closes Calendar when changing value by default', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    await act(async () => {
      await userEvent.click(firstTile);
    });

    await act(async () => {
      await userEvent.click(secondTile);
    });

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('closes Calendar when changing value with prop closeCalendar = true', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} closeCalendar isOpen />);

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    await act(async () => {
      await userEvent.click(firstTile);
    });

    await act(async () => {
      await userEvent.click(secondTile);
    });

    await waitForElementToBeRemovedOrHidden(() =>
      container.querySelector('.react-daterange-picker__calendar'),
    );
  });

  it('does not close Calendar when changing value with prop closeCalendar = false', async () => {
    const { container } = await render(
      <DateRangePicker {...defaultProps} closeCalendar={false} isOpen />,
    );

    const [firstTile, secondTile] = container.querySelectorAll(
      '.react-calendar__tile',
    ) as unknown as [HTMLButtonElement, HTMLButtonElement];

    await act(async () => {
      await userEvent.click(firstTile);
    });

    await act(async () => {
      await userEvent.click(secondTile);
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not close Calendar when changing value with shouldCloseCalendar function returning false', async () => {
    const shouldCloseCalendar = () => false;

    const { container } = await render(
      <DateRangePicker {...defaultProps} isOpen shouldCloseCalendar={shouldCloseCalendar} />,
    );

    const firstTile = container.querySelector('.react-calendar__tile') as HTMLButtonElement;

    await act(async () => {
      await userEvent.click(firstTile);
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('does not close Calendar when changing value using inputs', async () => {
    const { container } = await render(<DateRangePicker {...defaultProps} isOpen />);

    const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();

    await act(async () => {
      await userEvent.fill(dayInput, '1');
    });

    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  it('calls onChange callback when changing value', async () => {
    const value = new Date(2023, 0, 31);
    const onChange = vi.fn();

    await render(<DateRangePicker {...defaultProps} onChange={onChange} value={value} />);

    const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();

    await act(async () => {
      await userEvent.fill(dayInput, '1');
    });

    expect(onChange).toHaveBeenCalledWith([new Date(2023, 0, 1), null]);
  });

  it('calls onInvalidChange callback when changing value to an invalid one', async () => {
    const value = new Date(2023, 0, 31);
    const onInvalidChange = vi.fn();

    await render(
      <DateRangePicker {...defaultProps} onInvalidChange={onInvalidChange} value={value} />,
    );

    const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();

    await act(async () => {
      await userEvent.fill(dayInput, '32');
    });

    expect(onInvalidChange).toHaveBeenCalled();
  });

  it('clears the value when clicking on a button', async () => {
    const onChange = vi.fn();

    const { container } = await render(<DateRangePicker {...defaultProps} onChange={onChange} />);

    const calendar = container.querySelector('.react-calendar');
    const button = page.getByTestId('clear-button');

    expect(calendar).not.toBeInTheDocument();

    await userEvent.click(button);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  describe('onChangeFrom', () => {
    it('calls onChange properly given no initial value', async () => {
      const onChange = vi.fn();

      await render(<DateRangePicker {...defaultProps} onChange={onChange} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).first();
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).first();

      await act(async () => {
        await userEvent.fill(monthInput, '2');

        await userEvent.fill(dayInput, '15');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, null]);
    });

    it('calls onChange properly given single initial value', async () => {
      const onChange = vi.fn();
      const value = new Date(2018, 0, 1);

      await render(<DateRangePicker {...defaultProps} onChange={onChange} value={value} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).first();
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).first();

      await act(async () => {
        await userEvent.fill(monthInput, '2');

        await userEvent.fill(dayInput, '15');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, null]);
    });

    it('calls onChange properly given initial value as an array', async () => {
      const onChange = vi.fn();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo] as [Date, Date];

      await render(<DateRangePicker {...defaultProps} onChange={onChange} value={value} />);

      const nextValueFrom = new Date(2018, 1, 15);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).first();
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).first();
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).first();

      await act(async () => {
        await userEvent.fill(monthInput, '2');

        await userEvent.fill(dayInput, '15');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([nextValueFrom, valueTo]);
    });
  });

  describe('onChangeTo', () => {
    it('calls onChange properly given no initial value', async () => {
      const onChange = vi.fn();

      await render(<DateRangePicker {...defaultProps} onChange={onChange} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).nth(1);
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).nth(1);
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).nth(1);

      await act(async () => {
        await userEvent.fill(dayInput, '15');

        await userEvent.fill(monthInput, '2');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([null, nextValueTo]);
    });

    it('calls onChange properly given single initial value', async () => {
      const onChange = vi.fn();
      const value = new Date(2018, 0, 1);

      await render(<DateRangePicker {...defaultProps} onChange={onChange} value={value} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).nth(1);
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).nth(1);
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).nth(1);

      await act(async () => {
        await userEvent.fill(dayInput, '15');

        await userEvent.fill(monthInput, '2');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([value, nextValueTo]);
    });

    it('calls onChange properly given initial value as an array', async () => {
      const onChange = vi.fn();
      const valueFrom = new Date(2018, 0, 1);
      const valueTo = new Date(2018, 6, 1);
      const value = [valueFrom, valueTo] as [Date, Date];

      await render(<DateRangePicker {...defaultProps} onChange={onChange} value={value} />);

      const nextValueTo = new Date(2018, 1, 15);
      nextValueTo.setDate(nextValueTo.getDate() + 1);
      nextValueTo.setTime(nextValueTo.getTime() - 1);

      const monthInput = page.getByRole('spinbutton', { name: 'month' }).nth(1);
      const dayInput = page.getByRole('spinbutton', { name: 'day' }).nth(1);
      const yearInput = page.getByRole('spinbutton', { name: 'year' }).nth(1);

      await act(async () => {
        await userEvent.fill(dayInput, '15');

        await userEvent.fill(monthInput, '2');

        await userEvent.fill(yearInput, '2018');
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith([valueFrom, nextValueTo]);
    });
  });

  it('calls onClick callback when clicked a page (sample of mouse events family)', async () => {
    const onClick = vi.fn();

    const { container } = await render(<DateRangePicker {...defaultProps} onClick={onClick} />);

    const wrapper = container.firstElementChild as HTMLDivElement;
    await userEvent.click(wrapper);

    expect(onClick).toHaveBeenCalled();
  });

  it('calls onTouchStart callback when touched a page (sample of touch events family)', async () => {
    const onTouchStart = vi.fn();

    const { container } = await render(
      <DateRangePicker {...defaultProps} onTouchStart={onTouchStart} />,
    );

    const wrapper = container.firstElementChild as HTMLDivElement;

    triggerTouchStart(wrapper);

    expect(onTouchStart).toHaveBeenCalled();
  });
});
