import fs from 'node:fs';

fs.copyFile('src/DateRangePicker.css', 'dist/DateRangePicker.css', (error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log('DateRangePicker.css copied successfully.');
});
