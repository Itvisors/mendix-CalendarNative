import { CalendarUtils } from "react-native-calendars";

export function multiDotMapping(events, eventStartDate, eventDotColor, selectedDay) {
    let dotsArray = {};

    events.map(event => {
        const dateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const dotColor = eventDotColor.get(event).value ? eventDotColor.get(event).value : "blue";

        dot = { key: event.id, color: dotColor, selectedDotColor: dotColor };

        if (dotsArray[dateString]) {
            dotsArray[dateString].dots.push(dot);
        } else {
            dotsArray[dateString] = {
                selected: false,
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