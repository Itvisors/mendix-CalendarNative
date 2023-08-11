import { CalendarUtils } from "react-native-calendars";

import { addDaysToDate, differenceInDays } from "../utils/dateUtils";

export function markingMapping(markingType, events, eventStartDate, eventEndDate, eventDotColor, selectedDay) {
    let datesArray = {};

    events.map(event => {
        const startDateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const endDateString = CalendarUtils.getCalendarDateString(eventEndDate.get(event).value);
        const color = eventDotColor.get(event).value ? eventDotColor.get(event).value : "blue";

        let period = {};
        let dot = {};

        if (startDateString === endDateString || !endDateString) {
            period = { startingDay: true, endingDay: true, color: color };
            dot = { key: event.id, color: color, selectedDotColor: color };
            if (datesArray[startDateString]) {
                if (markingType === "multi-period") {
                    datesArray[startDateString].periods.push(period);
                } else if (markingType === "multi-dot") {
                    datesArray[startDateString].dots.push(dot);
                }
            } else {
                if (markingType === "multi-period") {
                    datesArray[startDateString] = {
                        periods: [period]
                    };
                } else if (markingType === "multi-dot") {
                    datesArray[startDateString] = {
                        dots: [dot]
                    };
                }
            }
        } else {
            daysInBetween = differenceInDays(eventStartDate.get(event).value, eventEndDate.get(event).value);
            for (let i = 0; i < daysInBetween + 1; i++) {
                const dateString = addDaysToDate(eventStartDate.get(event).value, i);
                period = {
                    startingDay: i === 0 ? true : false,
                    endingDay: i === daysInBetween ? true : false,
                    color: color
                };
                dot = { key: event.id, color: color, selectedDotColor: color };
                if (datesArray[dateString]) {
                    if (markingType === "multi-period") {
                        datesArray[dateString].periods.push(period);
                    } else if (markingType === "multi-dot") {
                        datesArray[dateString].dots.push(dot);
                    }
                } else {
                    if (markingType === "multi-period") {
                        datesArray[dateString] = {
                            periods: [period]
                        };
                    } else if (markingType === "multi-dot") {
                        datesArray[dateString] = {
                            dots: [dot]
                        };
                    }
                }
            }
        }

        if (selectedDay) {
            if (datesArray[selectedDay]) {
                datesArray[selectedDay].selected = true;
            } else
                datesArray[selectedDay] = {
                    selected: true
                };
        }
    
    });

    return datesArray;
}
