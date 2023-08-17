import React, { createElement, useState } from "react";

import { BasicCalendar } from "./components/BasicCalendar";
import { TimelineCalendar } from "./components/TimelineCalendar"
import { CalendarUtils } from "react-native-calendars";
import { getEventsOnDate } from "./utils/getEventsOnDate";

export function CalendarNative(props) {
    const [selectedDateString, setSelectedDateString] = useState('');
    const executeOnDayPress = (date) => {
        setSelectedDateString(date.dateString);
        const dateObject = new Date(date.dateString);
        
        //Filter events planned on this day - NOT ABLE TO STORE IT IN A VALUE YET
        const filteredEvents = getEventsOnDate(dateObject, props.datasourceEvents.items, props.eventStartDate, props.eventEndDate);
        console.warn(filteredEvents);
        
        if (props.selectedDate) {
            if (!props.selectedDate.readOnly) {
                props.selectedDate.setValue(dateObject)
            }
        }
        //Execute the on day press action if needed
        if (props.onDayPress && props.onDayPress.canExecute) {
            props.onDayPress.execute();
        }
    }
    
    props.markingType = props.markingType.replace("_","-")
    
    const viewDateString = props.viewDate && props.viewDate.value ? CalendarUtils.getCalendarDateString(props.viewDate.value) : undefined;
    
    if (props.datasourceEvents.status === "available") {
        if (props.calendarView === "Timeline") {
            return (
                <TimelineCalendar
                    style={props.style}
                    showWeekNumbers={props.showWeekNumbers}
                    showTodayButton={props.showTodayButton}
                    closeOnDayPress={props.closeOnDayPress}
                    hideDayNames={props.hideDayNames}
                    hideArrows={props.hideArrows}
                    events={props.datasourceEvents}
                    eventStartDate={props.eventStartDate}
                    eventEndDate={props.eventEndDate}
                    eventText={props.eventText}
                    eventSummary={props.eventSummary}
                    eventDotColor={props.eventDotColor}
                    viewDate={viewDateString}
                    onDayPress={executeOnDayPress}
                    selectedDay={selectedDateString}
                    firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                    markingType={props.markingType}
                />
            );
        } else {
            return (
                <BasicCalendar
                    style={props.style}
                    showWeekNumbers={props.showWeekNumbers}
                    showSixWeeks={props.showSixWeeks}
                    enableSwipeMonths={props.enableSwipeMonths}
                    hideDayNames={props.hideDayNames}
                    hideArrows={props.hideArrows}
                    events={props.datasourceEvents}
                    eventStartDate={props.eventStartDate}
                    eventEndDate={props.eventEndDate}
                    eventText={props.eventText}
                    eventSummary={props.eventSummary}
                    eventDotColor={props.eventDotColor}
                    viewDate={viewDateString}
                    onDayPress={executeOnDayPress}
                    selectedDay={selectedDateString}
                    firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                    markingType={props.markingType}
                />
            );
        }
    } else {
        return <></>;
    }
}
