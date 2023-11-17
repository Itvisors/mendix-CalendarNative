import { LocaleConfig } from "react-native-calendars";
import { todayTranslations } from "./todayTranslations";
import moment from "moment/min/moment-with-locales";

export function setLocaleConfig(locale) {
    const localeLowerCase = locale.toLowercase();
    moment.locale(localeLowerCase);
    const today = todayTranslations[localeLowerCase] ? todayTranslations[localeLowerCase] : "Today";
    LocaleConfig.locales[localeLowerCase] = {
        monthNames: moment.months(),
        monthNamesShort: moment.monthsShort(),
        dayNames: moment.weekdays(),
        dayNamesShort: moment.weekdaysShort(),
        today: today
    };
    LocaleConfig.defaultLocale = localeLowerCase;
}
