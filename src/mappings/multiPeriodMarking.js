import { CalendarUtils } from "react-native-calendars";

const addDaysToDate = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return CalendarUtils.getCalendarDateString(newDate);
  };

function differenceInDays(date1, date2) {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
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
        } else {
            daysInBetween = differenceInDays(eventStartDate.get(event).value, eventEndDate.get(event).value);
            for (let i = 0; i < daysInBetween + 1; i++) {
                const dateString = addDaysToDate(eventStartDate.get(event).value,i);
                period = {startingDay: i === 0 ? true : false, endingDay: i === daysInBetween ? true : false, color: color}
                if (periodArray[dateString]) {
                    periodArray[dateString].periods.push(period);
                } else {
                    periodArray[dateString] = {
                        periods: [period]
                    };
                }
            }
        }
    });

    return periodArray;
}