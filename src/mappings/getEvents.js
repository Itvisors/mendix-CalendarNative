import { CalendarUtils } from "react-native-calendars";

//combine with getMarkedDates

export function getEvents(events, eventStartDate, eventEndDate) {
    let eventArray = [];

    events.map(event => {
        //todo get times and use
        const dateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const dotColor = eventStartDate.get(event).value ? eventDotColor.get(event).value : "blue";

        dot = { key: event.id, color: dotColor, selectedDotColor: dotColor };

        if (dotsArray[dateString]) {
            dotsArray[dateString].dots.push(dot);
        } else {
            dotsArray[dateString] = {
                selected: false,
                marked: true,
                dots: [dot]
            };
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

    return dotsArray;
}