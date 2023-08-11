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