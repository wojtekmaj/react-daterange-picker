![downloads](https://img.shields.io/npm/dt/react-daterange-picker.svg) ![build](https://img.shields.io/travis/wojtekmaj/react-daterange-picker/master.svg) ![dependencies](https://img.shields.io/david/wojtekmaj/react-daterange-picker.svg
) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/react-daterange-picker.svg
) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# React-DateRange-Picker

A date range picker for your React app.

* Pick days, months, years, or even decades
* Supports virtually any language
* No moment.js needed

## tl;dr
* Install by executing `npm install wojtekmaj/react-daterange-picker` or `yarn add wojtekmaj/react-daterange-picker`.
* Build the project by `npm install` and `npm run build` or `yarn install` and `yarn run build`. This step is temporary as the package is not yet published.
* Import by adding `import DateRangePicker from 'react-daterange-picker'`.
* Use by adding `<DateRangePicker />`. Use `onChange` prop for getting new values.

## Demo

Minimal demo page is included in sample directory.

[Online demo](http://projects.wojtekmaj.pl/react-daterange-picker/) is also available!

## Looking for a time picker or a datetime picker?

React-DateRange-Picker will play nicely with [React-Date-Picker](https://github.com/wojtekmaj/react-date-picker), [React-Time-Picker](https://github.com/wojtekmaj/react-time-picker) and [React-DateTime-Picker](https://github.com/wojtekmaj/react-datetime-picker). Check them out!

## Getting started

### Compatibility

Your project needs to use React 16 or later.

[React-Calendar](https://github.com/wojtekmaj/react-calendar), on which React-DateRange-Picker relies heavily, uses modern web technologies. That's why it's so fast, lightweight and easy to style. This, however, comes at a cost of [supporting only modern browsers](https://caniuse.com/#feat=internationalization).

#### Legacy browsers

If you need to support legacy browsers like Internet Explorer 10, you will need to use [Intl.js](https://github.com/andyearnshaw/Intl.js/) or another Intl polyfill along with React-DateRange-Picker.

### Installation

Add React-DateRange-Picker to your project by executing `npm install wojtekmaj/react-daterange-picker` or `yarn add wojtekmaj/react-daterange-picker`.

Build the project by `npm install` and `npm run build` or `yarn install` and `yarn run build`. This step is temporary as the package is not yet published.

### Usage

Here's an example of basic usage:

```js
import React, { Component } from 'react';
import DateRangePicker from 'react-daterange-picker';

class MyApp extends Component {
  state = {
    date: [new Date(), new Date()],
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <DateRangePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
```

### Custom styling

If you don't want to use default React-DateRange-Picker styling to build upon it, you can import React-DateRange-Picker by using `import DateRangePicker from 'react-daterange-picker/dist/entry.nostyle';` instead.

## User guide

### DateRangePicker

Displays an input field complete with custom inputs, native input, and a calendar.

#### Props

|Prop name|Description|Example values|
|----|----|----|
|calendarClassName|Defines class name(s) that will be added along with "react-calendar" to the main React-Calendar `<div>` element.|<ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li></ul>|
|calendarIcon|Defines the content of the calendar button.|<ul><li>String: `"Calendar"`</li><li>React element: `<CalendarIcon />`</li></ul>|
|className|Defines class name(s) that will be added along with "react-daterange-picker" to the main React-DateRange-Picker `<div>` element.|<ul><li>String: `"class1 class2"`</li><li>Array of strings: `["class1", "class2 class3"]`</li></ul>|
|clearIcon|Defines the content of the clear button.|<ul><li>String: `"Clear"`</li><li>React element: `<ClearIcon />`</li></ul>|
|isOpen|Defines whether the calendar should be opened. Defaults to false.|`true`|
|locale|Defines which locale should be used by the date range picker and the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). Defaults to user's browser settings.|`"hu-HU"`|
|maxDate|Defines maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although React-DateRange-Picker will ensure that no later date is selected.|Date: `new Date()`|
|maxDetail|Defines the most detailed calendar view that the user shall see. View defined here also becomes the one on which clicking an item in the calendar will select a date and pass it to onChange. Can be "month", "year", "decade" or "century". Defaults to "month".|`"month"`|
|minDate|Defines minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-DateRange-Picker will ensure that no earlier date is selected.|Date: `new Date()`|
|minDetail|Defines the least detailed calendar view that the user shall see. Can be "month", "year", "decade" or "century". Defaults to "century".|`"century"`|
|name|Defines input name prefix. Date from/Date to fields will be named "yourprefix_from" and "yourprefix_to" respectively. Defaults to "daterange".|`"myCustomName"`|
|onChange|Function called when the user clicks an item on the most detailed view available.|`(value) => alert('New date is: ', value)`|
|required|Defines whether date input should be required. Defaults to false.|`true`|
|showLeadingZeros|Defines whether leading zeros should be rendered in date inputs. Defaults to false.|`true`|
|value|Defines the value of the input.|<ul><li>Date: `new Date()`</li><li>An array of dates: `[new Date(2017, 0, 1), new Date(2017, 7, 1)]`</li></ul>|

### Calendar

DateRangePicker component passes all props to React-Calendar, with the exception of `className` (you can use `calendarClassName` for that instead). There are tons of customizations you can do! For more information, see [Calendar component props](https://github.com/wojtekmaj/react-calendar#props).

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
