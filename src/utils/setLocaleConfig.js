import { LocaleConfig } from 'react-native-calendars';
import { todayTranslations } from './todayTranslations'
import moment from 'moment/min/moment-with-locales';

export function setLocaleConfig(locale) {
  moment.locale(locale);
  const today = todayTranslations[locale] ? todayTranslations[locale] : 'Today';
  LocaleConfig.locales[locale] = {
    monthNames: moment.months(),
    monthNamesShort: moment.monthsShort(),
    dayNames: moment.weekdays(),
    dayNamesShort: moment.weekdaysShort(),
    today: today
  };
  LocaleConfig.defaultLocale = locale;
}