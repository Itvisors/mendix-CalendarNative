import { CalendarUtils } from "react-native-calendars";

export function multiDotMapping(events, eventStartDate, eventDotColor) {
    let dotsArray = {};

    events.map(event => {
        const dateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const dotColor = eventStartDate.get(event).value ? eventDotColor.get(event).value : "blue";

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

    return dotsArray;
}