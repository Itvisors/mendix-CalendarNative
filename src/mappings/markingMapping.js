import {
    addDaysToDate,
    beginOfDate,
    differenceInDays,
    getCalendarDateTimeString,
    getCalendarTimeString
} from "../utils/dateUtils";
import { CalendarUtils } from "react-native-calendars";
import { Appearance } from "react-native";

export function markingMapping(
    markingType,
    events,
    eventStartDate,
    eventEndDate,
    eventDotColor,
    eventTextProp,
    singleMarkingColor,
    eventColorInput
) {
    const deviceDarkMode = Appearance.getColorScheme() === "dark";
    const selectedDotColor = deviceDarkMode ? "#FFFFFF" : "#000000";

    const eventsArray = {};
    const markedDatesArray = {};
    let key = 0;

    //To-Do ignore get functions when props is not set in the widget.
    events.forEach(event => {
        let hasEndDate = true;
        let endDate = eventEndDate ? eventEndDate.get(event).value : undefined;
        const startDate = eventStartDate.get(event).value;
        if (endDate === undefined) {
            hasEndDate = false;
            endDate = startDate;
        }
        //Retrieve attributes of an event
        const startDateString = CalendarUtils.getCalendarDateString(startDate);
        const startTimeString = getCalendarTimeString(startDate);
        const startDateTimeString = getCalendarDateTimeString(startDate);

        const endDateString = CalendarUtils.getCalendarDateString(endDate);
        const endTimeString = getCalendarTimeString(endDate);
        const endDateTimeString = getCalendarDateTimeString(endDate);

        let color = eventDotColor ? eventDotColor.get(event).value : "#6096e0";
        if (!color || color.trim === "") {
            color = "#6096e0";
        }

        let eventColor = eventColorInput ? eventColorInput.get(event).value : "#6096e0";
        if (!eventColor || eventColor.trim === "") {
            eventColor = "#6096e0";
        }

        const eventText = eventTextProp ? eventTextProp.get(event).value ?? "" : "";

        //SM = single marking
        let SMColor = singleMarkingColor ? singleMarkingColor.value : "#6096e0";
        if (!SMColor || SMColor.trim === "") {
            SMColor = "#6096e0";
        }

        //Add markings and events for an activy of a single day
        if (hasEndDate === false || startDateString === endDateString) {
            //Markings
            period = { startingDay: true, endingDay: true, color: color };
            dot = { key: event.id, color: color, selectedDotColor: selectedDotColor };
            singledot = { dotColor: SMColor, marked: true };
            if (markedDatesArray[startDateString]) {
                if (markingType === "multi-period") {
                    markedDatesArray[startDateString].periods.push(period);
                } else if (markingType === "multi-dot") {
                    markedDatesArray[startDateString].dots.push(dot);
                }
            } else {
                if (markingType === "multi-period") {
                    markedDatesArray[startDateString] = {
                        periods: [period]
                    };
                } else if (markingType === "multi-dot") {
                    markedDatesArray[startDateString] = {
                        dots: [dot]
                    };
                } else if (markingType === "single-dot") {
                    markedDatesArray[startDateString] = singledot;
                }
            }

            //Timeline events
            newEvent = {
                key: key,
                title: eventText,
                summary: startTimeString + " - " + endTimeString,
                start: startDateTimeString,
                end: endDateTimeString,
                color: eventColor
            };

            if (eventsArray[startDateString]) {
                eventsArray[startDateString].push(newEvent);
            } else {
                eventsArray[startDateString] = [newEvent];
            }

            key++;

            //Add markings and events across multiple days
        } else if (startDateString && endDateString) {
            daysInBetween = differenceInDays(startDate, endDate);
            for (let i = 0; i < daysInBetween + 1; i++) {
                const [dateDaysAdded, dateString] = addDaysToDate(startDate, i);

                //Markings
                period = {
                    startingDay: i === 0,
                    endingDay: i === daysInBetween,
                    color: color
                };
                dot = { key: event.id, color: color, selectedDotColor: selectedDotColor };
                singledot = { dotColor: SMColor, marked: true };

                if (markedDatesArray[dateString]) {
                    if (markingType === "multi-period") {
                        markedDatesArray[dateString].periods.push(period);
                    } else if (markingType === "multi-dot") {
                        markedDatesArray[dateString].dots.push(dot);
                    }
                } else {
                    if (markingType === "multi-period") {
                        markedDatesArray[dateString] = {
                            periods: [period]
                        };
                    } else if (markingType === "multi-dot") {
                        markedDatesArray[dateString] = {
                            dots: [dot]
                        };
                    } else if (markingType === "single-dot") {
                        markedDatesArray[dateString] = singledot;
                    }
                }

                //Timeline events
                newEvent = {
                    key: key,
                    title: eventText,
                    summary:
                        startDateString +
                        " (" +
                        startTimeString +
                        ")" +
                        "\n" +
                        endDateString +
                        " (" +
                        endTimeString +
                        ")",
                    color: eventColor
                };
                if (i === 0) {
                    newEvent = {
                        ...newEvent,
                        start: startDateTimeString,
                        end: endDateTimeString
                    };
                } else {
                    const dateTimeString = getCalendarDateTimeString(beginOfDate(dateDaysAdded));
                    newEvent = {
                        ...newEvent,
                        start: dateTimeString,
                        end: endDateTimeString
                    };
                }

                if (eventsArray[dateString]) {
                    eventsArray[dateString].push(newEvent);
                } else {
                    eventsArray[dateString] = [newEvent];
                }
            }

            key++;
        }
    });

    return [eventsArray, markedDatesArray];
}
