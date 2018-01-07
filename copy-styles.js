const fs = require('fs');

fs.copyFile('./src/DateRangePicker.less', 'dist/DateRangePicker.less', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('DateRangePicker.less copied successfully.');
});

fs.copyFile('./src/DateRangePicker.css', 'dist/DateRangePicker.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('DateRangePicker.css copied successfully.');
});
