[![npm](https://img.shields.io/npm/v/@wojtekmaj/react-daterange-picker.svg)](https://www.npmjs.com/package/@wojtekmaj/react-daterange-picker) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/react-daterange-picker.svg) [![CI](https://github.com/wojtekmaj/react-daterange-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/react-daterange-picker/actions)

# React-DateRange-Picker

A date range picker for your React app.

- Pick days, months, years, or even decades
- Supports virtually any language
- No moment.js needed

## tl;dr

- Install by executing `npm install @wojtekmaj/react-daterange-picker` or `yarn add @wojtekmaj/react-daterange-picker`.
- Import by adding `import DateRangePicker from '@wojtekmaj/react-daterange-picker'`.
- Use by adding `<DateRangePicker />`. Use `onChange` prop for getting new values.

## Demo

A minimal demo page can be found in `sample` directory.

[Online demo](https://projects.wojtekmaj.pl/react-daterange-picker/) is also available!

## Consider native alternative

If you don't need to support legacy browsers and don't need the advanced features this package provides, consider using native date input instead. It's more accessible, adds no extra weight to your bundle, and works better on mobile devices.

```tsx
<input aria-label="Date from" max={valueTo} min={minDate} type="date" />
<input aria-label="Date to" max={maxDate} min={valueFrom} type="date" />
```

## Looking for a time picker or a datetime picker?

React-DateRange-Picker will play nicely with [React-Date-Picker](https://github.com/wojtekmaj/react-date-picker), [React-Time-Picker](https://github.com/wojtekmaj/react-time-picker) and [React-DateTime-Picker](https://github.com/wojtekmaj/react-datetime-picker). Check them out!

## Getting started

### Compatibility

Your project needs to use React 16.3 or later. If you use an older version of React, please refer to the table below to find a suitable React-DateRange-Picker version.

| React version | Newest compatible React-DateRange-Picker version |
| ------------- | ------------------------------------------------ |
| ≥16.8         | latest                                           |
| ≥16.3         | 4.x                                              |
| ≥16.0         | 2.x                                              |

[React-Calendar](https://github.com/wojtekmaj/react-calendar), on which React-DateRange-Picker relies heavily, uses modern web technologies. That's why it's so fast, lightweight and easy to style. This, however, comes at a cost of [supporting only modern browsers](https://caniuse.com/#feat=internationalization).

### Installation

Add React-DateRange-Picker to your project by executing `npm install @wojtekmaj/react-daterange-picker` or `yarn add @wojtekmaj/react-daterange-picker`.

### Usage

Here's an example of basic usage:

```tsx
import { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyApp() {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  return (
    <div>
      <DateRangePicker onChange={onChange} value={value} />
    </div>
  );
}
```

### Custom styling

If you want to use default React-DateRange-Picker and React-Calendar styling to build upon it, you can import them by using:

```ts
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
```

## User guide

### DateRangePicker

Displays an input field complete with custom inputs, native input, and a calendar.

#### Props

| Prop name            | Description                                                                                                                                                                                                                                                                                                                                | Default value                         | Example values                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus            | Automatically focuses the input on mount.                                                                                                                                                                                                                                                                                                  | n/a                                   | `true`                                                                                                                                                                                                              |
| calendarAriaLabel    | `aria-label` for the calendar button.                                                                                                                                                                                                                                                                                                      | n/a                                   | `"Toggle calendar"`                                                                                                                                                                                                 |
| calendarProps        | Props to pass to React-Calendar component.                                                                                                                                                                                                                                                                                                 | n/a                                   | See [React-Calendar documentation](https://github.com/wojtekmaj/react-calendar)                                                                                                                                     |
| calendarIcon         | Content of the calendar button. Setting the value explicitly to `null` will hide the icon.                                                                                                                                                                                                                                                 | (default icon)                        | <ul><li>String: `"Calendar"`</li><li>React element: `<CalendarIcon />`</li><li>React function: `CalendarIcon`</li></ul>                                                                                             |
| className            | Class name(s) that will be added along with `"react-daterange-picker"` to the main React-DateRange-Picker `<div>` element.                                                                                                                                                                                                                 | n/a                                   | <ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li></ul>                                                                                                                 |
| clearAriaLabel       | `aria-label` for the clear button.                                                                                                                                                                                                                                                                                                         | n/a                                   | `"Clear value"`                                                                                                                                                                                                     |
| clearIcon            | Content of the clear button. Setting the value explicitly to `null` will hide the icon.                                                                                                                                                                                                                                                    | (default icon)                        | <ul><li>String: `"Clear"`</li><li>React element: `<ClearIcon />`</li><li>React function: `ClearIcon`</li></ul>                                                                                                      |
| closeCalendar        | Whether to close the calendar on value selection. **Note**: It's recommended to use `shouldCloseCalendar` function instead.                                                                                                                                                                                                                | `true`                                | `false`                                                                                                                                                                                                             |
| data-testid          | `data-testid` attribute for the main React-DateRange-Picker `<div>` element.                                                                                                                                                                                                                                                               | n/a                                   | `"daterange-picker"`                                                                                                                                                                                                |
| dayAriaLabel         | `aria-label` for the day input.                                                                                                                                                                                                                                                                                                            | n/a                                   | `"Day"`                                                                                                                                                                                                             |
| dayPlaceholder       | `placeholder` for the day input.                                                                                                                                                                                                                                                                                                           | `"--"`                                | `"dd"`                                                                                                                                                                                                              |
| disableCalendar      | When set to `true`, will remove the calendar and the button toggling its visibility.                                                                                                                                                                                                                                                       | `false`                               | `true`                                                                                                                                                                                                              |
| disabled             | Whether the date range picker should be disabled.                                                                                                                                                                                                                                                                                          | `false`                               | `true`                                                                                                                                                                                                              |
| format               | Input format based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). Supported values are: `y`, `M`, `MM`, `MMM`, `MMMM`, `d`, `dd`. **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client. | n/a                                   | `"y-MM-dd"`                                                                                                                                                                                                         |
| id                   | `id` attribute for the main React-DateRange-Picker `<div>` element.                                                                                                                                                                                                                                                                        | n/a                                   | `"daterange-picker"`                                                                                                                                                                                                |
| isOpen               | Whether the calendar should be opened.                                                                                                                                                                                                                                                                                                     | `false`                               | `true`                                                                                                                                                                                                              |
| locale               | Locale that should be used by the date range picker and the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.                                                | Server locale/User's browser settings | `"hu-HU"`                                                                                                                                                                                                           |
| maxDate              | Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although React-DateRange-Picker will ensure that no later date is selected.                                                                                                                                                        | n/a                                   | Date: `new Date()`                                                                                                                                                                                                  |
| maxDetail            | The most detailed calendar view that the user shall see. View defined here also becomes the one on which clicking an item in the calendar will select a date and pass it to onChange. Can be `"month"`, `"year"`, `"decade"` or `"century"`.                                                                                               | `"month"`                             | `"year"`                                                                                                                                                                                                            |
| minDate              | Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-DateRange-Picker will ensure that no earlier date is selected.                                                                                                                                                      | n/a                                   | Date: `new Date()`                                                                                                                                                                                                  |
| monthAriaLabel       | `aria-label` for the month input.                                                                                                                                                                                                                                                                                                          | n/a                                   | `"Month"`                                                                                                                                                                                                           |
| monthPlaceholder     | `placeholder` for the month input.                                                                                                                                                                                                                                                                                                         | `"--"`                                | `"mm"`                                                                                                                                                                                                              |
| name                 | Input name prefix. Date from/Date to fields will be named `"yourprefix_from"` and `"yourprefix_to"` respectively.                                                                                                                                                                                                                          | `"daterange"`                         | `"myCustomName"`                                                                                                                                                                                                    |
| nativeInputAriaLabel | `aria-label` for the native date input.                                                                                                                                                                                                                                                                                                    | n/a                                   | `"Date"`                                                                                                                                                                                                            |
| onCalendarClose      | Function called when the calendar closes.                                                                                                                                                                                                                                                                                                  | n/a                                   | `() => alert('Calendar closed')`                                                                                                                                                                                    |
| onCalendarOpen       | Function called when the calendar opens.                                                                                                                                                                                                                                                                                                   | n/a                                   | `() => alert('Calendar opened')`                                                                                                                                                                                    |
| onChange             | Function called when the user picks a valid date. If any of the fields were excluded using custom `format`, `new Date(y, 0, 1, 0, 0, 0)`, where `y` is the current year, is going to serve as a "base".                                                                                                                                    | n/a                                   | `(value) => alert('New date is: ', value)`                                                                                                                                                                          |
| onFocus              | Function called when the user focuses an input.                                                                                                                                                                                                                                                                                            | n/a                                   | `(event) => alert('Focused input: ', event.target.name)`                                                                                                                                                            |
| onInvalidChange      | Function called when the user picks an invalid date.                                                                                                                                                                                                                                                                                       | n/a                                   | `() => alert('Invalid date')`                                                                                                                                                                                       |
| openCalendarOnFocus  | Whether to open the calendar on input focus. **Note**: It's recommended to use `shouldOpenCalendar` function instead.                                                                                                                                                                                                                      | `true`                                | `false`                                                                                                                                                                                                             |
| portalContainer      | Element to render the calendar in using portal.                                                                                                                                                                                                                                                                                            | n/a                                   | `document.getElementById('my-div')`                                                                                                                                                                                 |
| rangeDivider         | Divider between date inputs.                                                                                                                                                                                                                                                                                                               | `"–"`                                 | `" to "`                                                                                                                                                                                                            |
| required             | Whether date input should be required.                                                                                                                                                                                                                                                                                                     | `false`                               | `true`                                                                                                                                                                                                              |
| shouldCloseCalendar  | Function called before the calendar closes. `reason` can be `"buttonClick"`, `"escape"`, `"outsideAction"`, or `"select"`. If it returns `false`, the calendar will not close.                                                                                                                                                             | n/a                                   | `({ reason }) => reason !== 'outsideAction'`                                                                                                                                                                        |
| shouldOpenCalendar   | Function called before the calendar opens. `reason` can be `"buttonClick"` or `"focus"`. If it returns `false`, the calendar will not open.                                                                                                                                                                                                | n/a                                   | `({ reason }) => reason !== 'focus'`                                                                                                                                                                                |
| showLeadingZeros     | Whether leading zeros should be rendered in date inputs.                                                                                                                                                                                                                                                                                   | `false`                               | `true`                                                                                                                                                                                                              |
| value                | Input value.                                                                                                                                                                                                                                                                                                                               | n/a                                   | <ul><li>Date: `new Date(2017, 0, 1)`</li><li>String: `"2017-01-01"`</li><li>An array of dates: `[new Date(2017, 0, 1), new Date(2017, 7, 1)]`</li><li>An array of strings: `["2017-01-01", "2017-08-01"]`</li></ul> |
| yearAriaLabel        | `aria-label` for the year input.                                                                                                                                                                                                                                                                                                           | n/a                                   | `"Year"`                                                                                                                                                                                                            |
| yearPlaceholder      | `aria-label` for the year input.                                                                                                                                                                                                                                                                                                           | `"----"`                              | `"yyyy"`                                                                                                                                                                                                            |

### Calendar

DateRangePicker component passes all props to React-Calendar, with the exception of `className` (you can use `calendarClassName` for that instead). There are tons of customizations you can do! For more information, see [Calendar component props](https://github.com/wojtekmaj/react-calendar#props).

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
