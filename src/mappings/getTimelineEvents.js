import { getCalendarDateTimeString } from "../utils/getCalendarDateTimeString";
import { CalendarUtils } from "react-native-calendars";

export function getTimelineEvents(events, eventStartDateProp, eventEndDateProp, eventTextProp, eventSummaryProp, selectedDay) {
    let eventsArray = {};
    let markedDatesArray = {};

    events.map(event => {

        let startDate = eventStartDateProp.get(event).value;
        let endDate = eventEndDateProp.get(event).value;

        let startDateTimeString = getCalendarDateTimeString(startDate);
        let endDateTimeString = getCalendarDateTimeString(endDate);

        let startDateString = CalendarUtils.getCalendarDateString(startDate);

        newEvent = {
            start: startDateTimeString,
            end: endDateTimeString,
            title: eventTextProp.get(event).value, //todo check empty
            summary: eventSummaryProp.get(event).value, //todo check empty
        };

        if (eventsArray[startDateString]) {
            eventsArray[startDateString].push(newEvent);
        } else {
            eventsArray[startDateString] = [newEvent];
            markedDatesArray[startDateString] = { marked: true };
        }
    });

    /*if (selectedDay) {
        if (eventsArray[selectedDay]) {
            eventsArray[selectedDay].selected = true;
        } else
            eventsArray[selectedDay] = {
                selected: true
            };
    }*/

    console.warn(eventsArray);

    return [eventsArray, markedDatesArray];
}