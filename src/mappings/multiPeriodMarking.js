import { CalendarUtils } from "react-native-calendars";


function differenceInDays(date1, date2) {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}

export function multiPeriodMarking(events, eventStartDate, eventEndDate, eventDotColor, selectedDay) {
    let periodArray = {};

    events.map(event => {
        const startDateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const endDateString = CalendarUtils.getCalendarDateString(eventEndDate.get(event).value);
        const color = eventDotColor.get(event).value ? eventDotColor.get(event).value : "blue";

        let period = {}
        if (startDateString === endDateString || !endDateString) {
            period = {startingDay: true, endingDay: true, color: color}
            if (periodArray[startDateString]) {
                periodArray[startDateString].periods.push(period);
            } else {
                periodArray[startDateString] = {
                    periods: [period]
                };
            }
        // } else {
            
        //     daysInBetween = differenceInDays(eventStartDate.get(event).value, eventEndDate.get(event).value);
        //     i = 0;
        //     while (i < daysInBetween) {
        //         ii++
        //     }
        }
    });

    return periodArray;
}