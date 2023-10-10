import { getCalendarDateTimeString, getCalendarTimeString, addDaysToDate, differenceInDays, beginOfDate } from "../utils/dateUtils";
import { CalendarUtils } from "react-native-calendars";

export function markingMapping(markingType, events, eventStartDate, eventEndDate, eventDotColor, eventTextProp, selectedDay, singleMarkingColor, singleMarkingSelectedColor, singleMarkingSelectedTextColor, eventColorInput) {
    let eventsArray = {};
    let markedDatesArray = {};
    let key=0;

    //To-Do ignore get functions when props is not set in the widget.
    events.map(event => {
        let endDate = eventEndDate ? eventEndDate.get(event).value : undefined;
        if (endDate === undefined) {
            endDate = eventStartDate.get(event).value;
        }  
        //Retrieve attributes of an event
        const startDateString = CalendarUtils.getCalendarDateString(eventStartDate.get(event).value);
        const startTimeString = getCalendarTimeString(eventStartDate.get(event).value);
        const startDateTimeString = getCalendarDateTimeString(eventStartDate.get(event).value);

        const endDateString = CalendarUtils.getCalendarDateString(endDate);
        const endTimeString = getCalendarTimeString(endDate);
        const endDateTimeString = getCalendarDateTimeString(endDate);

        let color = eventDotColor ? eventDotColor.get(event).value : '#6096e0';
        if (!color || color.trim === '') {
            color = '#6096e0'
        }

        let eventColor = eventColorInput ? eventColorInput.get(event).value : '#6096e0';
        if (!eventColor || eventColor.trim === '') {
            eventColor = '#6096e0'
        }

        const eventText = eventTextProp ? eventTextProp.get(event).value ?? '' : '';

        //SM = single marking
        const SMColor = singleMarkingColor ?? "#808080";
        const SMSelectedColor = singleMarkingSelectedColor ?? "#0000FF";
        const SMSelectedTextColor = singleMarkingSelectedTextColor ?? "#FFFFFF";

        //Add markings and events for an activy of a single day
          if (startDateString === endDateString || !endDateString) {
            //Markings
            period = { startingDay: true, endingDay: true, color: color };
            dot = { key: event.id, color: color, selectedDotColor: '#FFFFFF' };
            singledot = { dotColor: SMColor, selectedColor: SMSelectedColor, selectedTextColor: SMSelectedTextColor, marked: true }
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
                summary: startTimeString + ' - ' + endTimeString,
                start: startDateTimeString,
                end: endDateTimeString,
                color: eventColor,
            }

            if (eventsArray[startDateString]) {
                eventsArray[startDateString].push(newEvent);
            } else {
                eventsArray[startDateString] = [newEvent];
            }

            key++;

            //Add markings and events across multiple days
        } else if (startDateString && endDateString) {

            daysInBetween = differenceInDays(eventStartDate.get(event).value, eventEndDate.get(event).value);
            for (let i = 0; i < daysInBetween + 1; i++) {
                const [dateDaysAdded, dateString] = addDaysToDate(eventStartDate.get(event).value, i);

                //Markings
                period = {
                    startingDay: i === 0 ? true : false,
                    endingDay: i === daysInBetween ? true : false,
                    color: color
                };
                dot = { key: event.id, color: color, selectedDotColor: '#FFFFFF' };
                singledot = { dotColor: SMColor, selectedColor: SMSelectedColor, selectedTextColor: SMSelectedTextColor, marked: true }

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
                    summary: startDateString + ' (' + startTimeString + ')' + '\n' + endDateString + ' (' + endTimeString + ')',
                    color: eventColor,
                };
                if (i === 0) {
                    newEvent = {
                        ...newEvent,
                        start: startDateTimeString,
                        end: endDateTimeString,
                    };
                } else {
                    const dateTimeString = getCalendarDateTimeString(beginOfDate(dateDaysAdded));
                    newEvent = {
                        ...newEvent,
                        start: dateTimeString,
                        end: endDateTimeString,
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


        //Mark Selected day
        if (selectedDay) {
            if (markedDatesArray[selectedDay]) {
                markedDatesArray[selectedDay].selected = true;
            } else {
                if (markingType === "multi-period") {
                    markedDatesArray[selectedDay] = {
                        selected: true,
                        periods: []
                    };
                } else if (markingType === "multi-dot") {
                    markedDatesArray[selectedDay] = {
                        selected: true,
                        dots: []
                    };
                }
            }
        }
     });

    return [eventsArray, markedDatesArray];
}