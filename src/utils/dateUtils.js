import { CalendarUtils } from "react-native-calendars";
import { padNumber } from "react-native-calendars/src/interface";

import isDate from 'lodash/isDate';

export function getCalendarDateTimeString(date) {
    if (isDate(date) && !isNaN(date.getFullYear())) {
        return (date.getFullYear() +
            '-' + padNumber(date.getMonth() + 1) +
            '-' + padNumber(date.getDate()) +
            ' ' + padNumber(date.getHours()) +
            ':' + padNumber(date.getMinutes()) +
            ':' + padNumber(date.getSeconds()));
    }
}

export const addDaysToDate = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return CalendarUtils.getCalendarDateString(newDate);
};

export function differenceInDays(date1, date2) {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
}

/**
 * Convert timeObject to dateTime
 * @param {*} timeObject with params date, hours, minutes
 */
export function timeObjectToDateTime(timeObject) {
    // Todo change for timezones: YYYY-MM-DDTHH:mm:ss.sssZ Z is the timezone offset, which can either be the literal character Z (indicating UTC), or + or - followed by HH:mm, the offset in hours and minutes from UTC.
    return timeObject.date +
        'T' + padNumber(timeObject.hour) +
        ':' + padNumber(timeObject.minutes) +
        ':00.000Z'
}

