import { getCalendarDateTimeString, addDaysToDate, differenceInDays, beginOfDate } from "../utils/dateUtils";
import { CalendarUtils } from "react-native-calendars";

export function markingMapping(markingType, events, eventStartDate, eventEndDate, eventDotColor, eventTextProp, selectedDay, singleMarkingColor, singleMarkingSelectedColor, singleMarkingSelectedTextColor) {
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
        const endDateString = CalendarUtils.getCalendarDateString(endDate);
        const startDateTimeString = getCalendarDateTimeString(eventStartDate.get(event).value);
        const endDateTimeString = getCalendarDateTimeString(endDate);
        const color = eventDotColor.get(event).value ? eventDotColor.get(event).value : "blue";
        const eventText = eventTextProp.get(event).value ? eventTextProp.get(event).value : '';
        
        //SM = single marking
        const SMColor = singleMarkingColor ? singleMarkingColor : "#808080";
        const SMSelectedColor = singleMarkingSelectedColor ? singleMarkingSelectedColor : "#0000FF";
        const SMSelectedTextColor = singleMarkingSelectedTextColor ? singleMarkingSelectedTextColor : "#FFFFFF";

        //Add markings and events for an activy of a single day
          if (startDateString === endDateString || !endDateString) {
            //Markings
            period = { startingDay: true, endingDay: true, color: color };
            dot = { key: event.id, color: color, selectedDotColor: color };
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
                summary: '',
                start: startDateTimeString,
                end: endDateTimeString,
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
                dot = { key: event.id, color: color, selectedDotColor: color };
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
                    summary: startDateString + ' - ' + endDateString,
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
            
                key++;
            }
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