import { CalendarUtils } from "react-native-calendars";

export function getEventsOnDate(date, events, eventStartDate, eventEndDate) {
    const filteredEvents = [];
    const dateToCheck = CalendarUtils.getCalendarDateString(date);

    events.forEach(event => {
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
