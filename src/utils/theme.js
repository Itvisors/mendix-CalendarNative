import { Appearance } from "react-native";

const deviceDarkMode = Appearance.getColorScheme() === "dark";

const textColor = deviceDarkMode ? "#ececec" : "#000000";
const backgroundColor = deviceDarkMode ? "#0A1325" : "#fff";
const disabledColorText = deviceDarkMode ? "#444" : "#999";
const headerColor = deviceDarkMode ? "#D9E1E8" : "#000";
const selectedDayBackgroundColor = deviceDarkMode ? "#333" : "#c7e3ff";

export const theme = {
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
    eventTimes: {
        display: "none"
    },
    eventTitle: {
        color: textColor
    },
    eventSummary: {
        fontWeight: "bold",
        color: textColor
    },
    nowIndicatorLine: {
        height: 3
    },
    nowIndicatorKnob: {
        height: 10,
        width: 10,
        marginLeft: -2,
        marginTop: -2
    }
};
