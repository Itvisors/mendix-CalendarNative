import { CalendarUtils } from "react-native-calendars";

export function getEventsOnDate(date, events, eventStartDate, eventEndDate) {
    let filteredEvents = [];
    const dateToCheck = CalendarUtils.getCalendarDateString(date);

    events.map(event => {
        const startDateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const endDateString = CalendarUtils.getCalendarDateString(eventEndDate.get(event).value);

        if (startDateString && startDateString === dateToCheck) {
            filteredEvents.push(event.id);
        } else if (startDateString && startDateString <= dateToCheck && endDateString && endDateString >= dateToCheck) {
            filteredEvents.push(event.id);
        }
    });
    return filteredEvents;
}