import { CalendarUtils } from "react-native-calendars";

export function getMarkedDates(events, eventStartDate, eventDotColor, selectedDay) {
    //todo easier
    let dotsArray = {};

    events.map(event => {
        const dateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const dotColor = eventStartDate.get(event).value ? eventDotColor.get(event).value : "blue";

        dot = {
            key: event.id,
            color: dotColor,
            selectedDotColor: dotColor,
            selected: false,
            marked: true,
            start: dateString + ' 10:00:00',
            end: dateString + ' 16:00:00',
            title: 'Meeting',
            summary: 'test'
        };

        if (dotsArray[dateString]) {
            dotsArray[dateString].push(dot);
        } else {
            dotsArray[dateString] = [dot];
        }
    });

    if (selectedDay) {
        if (dotsArray[selectedDay]) {
            dotsArray[selectedDay].selected = true;
        } else
            dotsArray[selectedDay] = {
                selected: true
            };
    }

    console.warn(dotsArray);

    return dotsArray;
}