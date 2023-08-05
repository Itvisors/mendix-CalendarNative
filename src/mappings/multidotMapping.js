import { CalendarUtils } from "react-native-calendars";

export function multiDotMapping(event, eventStartDate, eventDotColor) {

    console.warn(eventStartDate);
    const dateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
    const dotColor = eventStartDate.get(event).value ? eventDotColor.get(event).value : 'blue';


    
    return ({[dateString]: {
        selected: false,
        dots: [
            {key: event.id, color: dotColor, selectedDotColor: "red"}
        ]
    }})
}