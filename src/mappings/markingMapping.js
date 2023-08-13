import { getCalendarDateTimeString, addDaysToDate, differenceInDays } from "../utils/dateUtils";
import { CalendarUtils } from "react-native-calendars";

export function markingMapping(markingType, events, eventStartDate, eventEndDate, eventDotColor, eventTextProp, eventSummaryProp, selectedDay) {
    let eventsArray = {};
    let markedDatesArray = {};

    //To-Do ignore get functions when props is not set in the widget.
    events.map(event => {
        const startDateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const endDateString = CalendarUtils.getCalendarDateString(eventEndDate.get(event).value);
        const startDateTimeString = getCalendarDateTimeString(eventStartDate.get(event).value);
        const endDateTimeString = getCalendarDateTimeString(eventEndDate.get(event).value);
        const color = eventDotColor.get(event).value ? eventDotColor.get(event).value : "blue";
        const eventText = eventTextProp.get(event).value ? eventTextProp.get(event).value : '';
        const eventSummary = eventSummaryProp.get(event).value ? eventSummaryProp.get(event).value : '';

          if (startDateString === endDateString || !endDateString) {
            period = { startingDay: true, endingDay: true, color: color };
            dot = { key: event.id, color: color, selectedDotColor: color };
            if (markedDatesArray[startDateString]) {
                if (markingType === "multi-period") {
                    markedDatesArray[startDateString].periods.push(period);
                } else if (markingType === "multi-dot") {
                    markedDatesArray[startDateString].dots.push(dot);
                }
            } else {
                if (markingType === "multi-period") {
                    markedDatesArray[startDateString] = {
                        periods: [period]
                    };
                } else if (markingType === "multi-dot") {
                    markedDatesArray[startDateString] = {
                        dots: [dot]
                    };
                }
            }
        } else if (startDateString && endDateString) {
            daysInBetween = differenceInDays(eventStartDate.get(event).value, eventEndDate.get(event).value);
            for (let i = 0; i < daysInBetween + 1; i++) {
                const dateString = addDaysToDate(eventStartDate.get(event).value, i);
                period = {
                    startingDay: i === 0 ? true : false,
                    endingDay: i === daysInBetween ? true : false,
                    color: color
                };
                dot = { key: event.id, color: color, selectedDotColor: color };
                if (markedDatesArray[dateString]) {
                    if (markingType === "multi-period") {
                        markedDatesArray[dateString].periods.push(period);
                    } else if (markingType === "multi-dot") {
                        markedDatesArray[dateString].dots.push(dot);
                    }
                } else {
                    if (markingType === "multi-period") {
                        markedDatesArray[dateString] = {
                            periods: [period]
                        };
                    } else if (markingType === "multi-dot") {
                        markedDatesArray[dateString] = {
                            dots: [dot]
                        };
                    }
                }
            }
        }

        if (selectedDay) {
            if (markedDatesArray[selectedDay]) {
                markedDatesArray[selectedDay].selected = true;
            } else {
                if (markingType === "multi-period") {
                    markedDatesArray[selectedDay] = {
                        selected: true,
                        periods: []
                    };
                } else if (markingType === "multi-dot") {
                    markedDatesArray[selectedDay] = {
                        selected: true,
                        dots: []
                    };
                }
            }
        }

        newEvent = {
            start: startDateTimeString,
            end: endDateTimeString,
            title: eventText,
            summary: eventSummary,
        };

        if (eventsArray[startDateString]) {
            eventsArray[startDateString].push(newEvent);
        } else {
            eventsArray[startDateString] = [newEvent];
            markedDatesArray[startDateString].marked = true ;
        }
     });

    return [eventsArray, markedDatesArray];
}
