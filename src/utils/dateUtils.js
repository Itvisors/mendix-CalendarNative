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

export function getCalendarTimeString(date) {
    if (isDate(date) && !isNaN(date.getFullYear())) {
        return (padNumber(date.getHours()) + ':' + padNumber(date.getMinutes()))
    }
}

export const addDaysToDate = (date, days) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return [newDate, CalendarUtils.getCalendarDateString(newDate)];
};

export function differenceInDays(date1, date2) {
    const difference = date1.getTime() - date2.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return Math.abs(TotalDays);
}

export const beginOfDate = (date) => {
    date.setHours(0,0,0,0);
    return new Date(date);
}

export const endofDate = (date) => {
    date.setHours(23,59,59,999);
    return new Date(date);
}