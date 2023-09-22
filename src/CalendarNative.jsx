import React, { createElement, useState, useEffect } from "react";

import { BasicCalendar } from "./components/BasicCalendar";
import { TimelineCalendar } from "./components/TimelineCalendar"
import { CalendarUtils } from "react-native-calendars";
import { setLocaleConfig } from "./utils/setLocaleConfig";
import moment from 'moment';

export function CalendarNative(props) {
    const [selectedDateString, setSelectedDateString] = useState('');

    //Set locale if changes
    useEffect(() => {
        if (props.locale && props.locale.value) {
            setLocaleConfig(props.locale.value);
        }
    }, [props.locale]);

    const executeOnDayPress = (date) => {
        setSelectedDateString(date.dateString);
        executeActionAndSetDate(date.dateString, props.onDayPress);

        //Filter events planned on this day - NOT ABLE TO STORE IT IN A VALUE YET
        //const filteredEvents = getEventsOnDate(dateObject, props.datasourceEvents.items, props.eventStartDate, props.eventEndDate);
        //console.warn(filteredEvents);

    }

    const executeOnDayLongPress = (date) => {
        setSelectedDateString(date.dateString);
        executeActionAndSetDate(date.dateString, props.onDayLongPress);
    }

    const executeOnBackgroundLongPress = (timeString, timeObject) => {
        executeActionAndSetDate(moment(timeString), props.onBackgroundLongPress);
    }

    const executeActionAndSetDate = (date, action) => {
        const dateObject = new Date(date);
        if (props.selectedDate) {
            if (!props.selectedDate.readOnly) {
                props.selectedDate.setValue(dateObject)
            }
        }
        //Execute the on day press action if needed
        if (action && action.canExecute) {
            action.execute();
        }
    }

    const executeEventPress = (event) => {
        const datasourceItem = props.datasourceEvents.items[event.key];
        //Execute the on event action if needed
        if (props.onEventPress && props.onEventPress.get(datasourceItem).canExecute) {
            props.onEventPress.get(datasourceItem).execute();
        }
    }


    props.markingType = props.markingType.replace("_", "-")

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
                    eventDotColor={props.eventDotColor}
                    viewDate={viewDateString}
                    onDayPress={props.onDayPress ? executeOnDayPress : undefined}
                    onDayLongPress={props.onDayLongPress ? executeOnDayLongPress : undefined}
                    onEventPress={props.onEventPress ? executeEventPress : undefined}
                    onBackgroundLongPress={props.onBackgroundLongPress ? executeOnBackgroundLongPress : undefined}
                    selectedDay={selectedDateString}
                    firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                    markingType={props.markingType}
                    singleMarkingColor={props.singleMarkingColor}
                    singleMarkingSelectedColor={props.singleMarkingSelectedColor}
                    singleMarkingSelectedTextColor={props.singleMarkingSelectedTextColor}
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
                    eventDotColor={props.eventDotColor}
                    viewDate={viewDateString}
                    onDayPress={executeOnDayPress}
                    onDayLongPress={executeOnDayLongPress}
                    selectedDay={selectedDateString}
                    firstDay={props.startOfWeek === 'Sunday' ? 0 : 1}
                    markingType={props.markingType}
                    singleMarkingColor={props.singleMarkingColor}
                    singleMarkingSelectedColor={props.singleMarkingSelectedColor}
                    singleMarkingSelectedTextColor={props.singleMarkingSelectedTextColor}
                />
            );
        }
    } else {
        return <></>;
    }
}
