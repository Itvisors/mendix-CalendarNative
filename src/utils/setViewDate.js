export function setViewDate(viewDate, date) {
    if (!viewDate.readOnly) {
        viewDate.setValue(date);
    } else {
        console.error('Please give the attribute used for "Date to show" read/write access');
    }
}