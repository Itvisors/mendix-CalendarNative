import { Appearance } from "react-native";

const deviceDarkMode = Appearance.getColorScheme() === "dark";

const textColor = deviceDarkMode ? 'ececec' : '000000';
const backgroundColor = deviceDarkMode ? '#1c1c1c' :'#fff' ;
const disabledColorText = deviceDarkMode ? '#444' : '#999';
const headerColor = deviceDarkMode ? '#D9E1E8' : '#000';
const selectedDayBackgroundColor = deviceDarkMode ? '#333' : '#1E90FF';

export const theme = ({
    backgroundColor: backgroundColor,
    calendarBackground: backgroundColor,
    textSectionTitleColor: textColor,
    textSectionTitleDisabledColor: disabledColorText,
    dayTextColor: headerColor,
    selectedDayTextColor: textColor,
    monthTextColor: textColor,
    indicatorColor: textColor,
    selectedDayBackgroundColor: selectedDayBackgroundColor,
    arrowColor: textColor,
    arrowWidth: 20,
    arrowHeight: 20,
    textDisabledColor: disabledColorText,
    unavailableHoursColor: disabledColorText,
//    todayTextColor: '#FFFFFF',
//    todayBackgroundColor: '#bfd72f', 
    eventTimes: {
        display: 'none'
    },
    eventTitle: {
        color: textColor
    },
    eventSummary: {
        fontWeight: 'bold',
        color: textColor
    },
    nowIndicatorLine: {
        height:3
    },
    nowIndicatorKnob: {
        height:10,
        width:10,
        marginLeft:-2,
        marginTop:-2
    }
})
