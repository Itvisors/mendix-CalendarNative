import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales';

export function setLocaleConfig(locale) {
  moment.locale(locale);
    LocaleConfig.locales[locale] = {
      monthNames: moment.months(),
      monthNamesShort: moment.monthsShort(),
      dayNames: moment.weekdays(),
      dayNamesShort: moment.weekdaysShort(),
      today: "Today"
    };
    LocaleConfig.defaultLocale = locale;
}