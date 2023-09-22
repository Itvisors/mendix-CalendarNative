import { Appearance } from "react-native";

const deviceDarkMode = Appearance.getColorScheme() === "dark";

const textColor = deviceDarkMode ? 'ececec' : '000000';
const backgroundColor = deviceDarkMode ? '#1c1c1c' :'#f8f8f8' ;
const disabledColorText = deviceDarkMode ? '#444' : '#999';
const headerColor = deviceDarkMode ? '#D9E1E8' : '#000';
const selectedDayBackgroundColor = deviceDarkMode ? '#333' : '#1E90FF';

export const theme = ({
    backgroundColor: backgroundColor,
    calendarBackground: backgroundColor,
    textSectionTitleColor: textColor,
    textSectionTitleDisabledColor: disabledColorText,
    dayTextColor: headerColor,
    todayTextColor: textColor,
    selectedDayTextColor: textColor,
    monthTextColor: textColor,
    indicatorColor: textColor,
    selectedDayBackgroundColor: selectedDayBackgroundColor,
    arrowColor: textColor,
    textDisabledColor: disabledColorText,
    unavailableHoursColor: disabledColorText,
    eventTimes: {
        display: 'none'
    },
    eventSummary: {
        fontWeight: 'bold'
    }
})
